// OrderButton.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, verifyPayment, deleteOrder } from '../../features/orders/orderSlice';

const OrderButton = ({ product }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.orders);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null); // Track created order ID

  const handleOrder = async () => { 
    try {
      const result = await dispatch(createOrder({
        productId: product._id,
        amount: product.price,
        quantity: product.quantity || 1
      })).unwrap();

      const razorpayOrder = result.data.razorpayOrder;
      const createdOrder = result.data.order;
      setCreatedOrderId(createdOrder._id); // Store the order ID for potential deletion

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'keyXchange',
        description: product.title,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const verificationResult = await dispatch(verifyPayment({
              orderId: createdOrder._id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: razorpayOrder.id,
              razorpaySignature: response.razorpay_signature
            })).unwrap();

            setTransactionDetails({
              paymentId: response.razorpay_payment_id,
              orderId: razorpayOrder.id,
              amount: (razorpayOrder.amount / 100).toFixed(2),
              currency: razorpayOrder.currency,
              productName: product.title,
              date: new Date().toLocaleString(),
              status: 'Completed',
              ...verificationResult.data
            });
            setShowSuccessModal(true);
          } catch (err) {
            console.error('Payment verification failed:', err);
            // Delete the order if verification fails
            if (createdOrderId) { 
              const deletedOrder = await dispatch(deleteOrder(createdOrderId));
              console.log('Order deleted:', deletedOrder);
            }
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '90000'
        },
        theme: {
          color: '#F37254'
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', async function (response) {
        console.error('Payment failed:', response.error);
        // Delete the order on payment failure
        if (createdOrderId) {
          const deletedOrder = await dispatch(deleteOrder(createdOrderId));
          console.log('Order deleted:', deletedOrder);
        }
        alert(`Payment failed: ${response.error.description}`);
      });
      
      razorpay.on('modal.close', async function () {
        // This handles when user closes the payment modal without completing payment
        if (razorpay && !razorpay.isPaymentDone && createdOrderId) {
          const deletedOrder = await dispatch(deleteOrder(createdOrderId));
          console.log('Order deleted:', deletedOrder);
          console.log('Order deleted due to modal close without payment');
        }
      });

      razorpay.open();

    } catch (err) {
      console.error('Order failed:', err);
      alert('Order creation failed. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Buy Now'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4"> 
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{transactionDetails.productName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium">
                  {transactionDetails.amount} {transactionDetails.currency}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium text-blue-600">{transactionDetails.paymentId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{transactionDetails.orderId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{transactionDetails.date}</span>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-600">Status:</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {transactionDetails.status}
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderButton;