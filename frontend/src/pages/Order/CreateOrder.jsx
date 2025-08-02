// CreateOrder.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, verifyPayment, deleteOrder } from '../../features/orders/orderSlice';

const CreateOrder = ({ product }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.orders);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(null);

    const handleOrder = async () => {
        if (!product) {
            alert('Product information is missing');
            return;
        }

        try {
            const result = await dispatch(createOrder({
                productId: product._id,
                amount: product.price,
                quantity: product.quantity || 1
            })).unwrap();

            const { razorpayOrder, order: createdOrder } = result.data;

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
            
            razorpay.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                alert(`Payment failed: ${response.error.description}`);
            });
            
            razorpay.open();

        } catch (err) {
            console.error('Order failed:', err);
            alert(`Order creation failed: ${err.message || 'Please try again.'}`);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="create-order-container">
            <button
                onClick={handleOrder}
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
                {loading ? 'Processing...' : 'Buy Now'}
            </button>
            
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Success Modal */}
            {showSuccessModal && transactionDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Product:', value: transactionDetails.productName },
                                { 
                                    label: 'Amount Paid:', 
                                    value: `${transactionDetails.amount} ${transactionDetails.currency}` 
                                },
                                { 
                                    label: 'Transaction ID:', 
                                    value: transactionDetails.paymentId,
                                    highlight: true 
                                },
                                { label: 'Order ID:', value: transactionDetails.orderId },
                                { label: 'Date:', value: transactionDetails.date }
                            ].map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-600">{item.label}</span>
                                    <span className={`font-medium ${item.highlight ? 'text-blue-600' : ''}`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}

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
                                onClick={closeModal}
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

export default CreateOrder;