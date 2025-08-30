// OrderButton.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, verifyPayment, deleteOrder } from '../../features/orders/orderSlice';
import OrderSuccess from './OrderSuccess';

const OrderButton = ({ product }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.orders);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleOrder = async () => {
    let orderIdToDelete = null; // Track the created order ID for possible cleanup

    try {
      // 1. Create an order 
      const result = await dispatch(
        createOrder({
          productId: product._id,
          amount: product.price,
          quantity: product.quantity || 1,
        })
      ).unwrap();

      const razorpayOrder = result.data.razorpayOrder;
      const createdOrder = result.data.order;

      orderIdToDelete = createdOrder._id;

      // 2. Razorpay payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'keyXchange',
        description: product.title,
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // 3. Verify payment
            const verificationResult = await dispatch(
              verifyPayment({
                orderId: createdOrder._id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: razorpayOrder.id,
                razorpaySignature: response.razorpay_signature,
              })
            ).unwrap();

            // Payment successful → show details modal
            setTransactionDetails({
              paymentId: response.razorpay_payment_id,
              orderId: razorpayOrder.id,
              amount: (razorpayOrder.amount / 100).toFixed(2),
              currency: razorpayOrder.currency,
              productName: product.title,
              date: new Date().toLocaleString(),
              status: 'Completed',
              ...verificationResult.data,
            });

            setShowSuccessModal(true);
            orderIdToDelete = null; // No cleanup needed now
          } catch (err) {
            console.error('Payment verification failed:', err);
            if (orderIdToDelete) {
              await dispatch(deleteOrder(orderIdToDelete));
              console.log('Order deleted due to verification failure');
            }
            alert('Payment verification failed. Please contact support.');
          }
        },

        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '90000',
        },
        theme: { color: '#F37254' },
      };

      const razorpay = new window.Razorpay(options);

      // Payment failed event
      razorpay.on('payment.failed', async function (response) {
        console.error('Payment failed:', response.error);
        if (orderIdToDelete) {
          await dispatch(deleteOrder(orderIdToDelete));
          console.log('Order deleted due to payment failure');
        }
        alert(`Payment failed: ${response.error.description}`);
      });

      // Modal close event without payment
      razorpay.on('modal.close', async function () {
        if (orderIdToDelete) {
          await dispatch(deleteOrder(orderIdToDelete));
          console.log('Order deleted due to modal close without payment');
        }
      });

      // 4. Open Razorpay checkout
      razorpay.open();
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Order creation failed. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Buy Now'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Success Modal */}
      {showSuccessModal && transactionDetails && (
        <OrderSuccess
          transactionDetails={transactionDetails}
          product={product}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
};

export default OrderButton;
