import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrderSuccess = ({ transactionDetails, product, setShowSuccessModal }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setShowSuccessModal(false), 300);
    };

    return (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-xl flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div
                className={`bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl transform transition-transform duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                style={{
                    background: "linear-gradient(to bottom, #ffffff, #f9fafb)"
                }}
            >
                {/* Animated Confetti Background */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 opacity-0 animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.1}s`,
                                background: ['#ff5757', '#47b475', '#4a8cff', '#ffbb33'][i % 4]
                            }}
                        />
                    ))}
                </div>

                {/* Close Button */}
                <div className='hover:text-purple-700 hover:cursor-pointer'>
                <button
                    onClick={handleClose}
                    className="absolute cursor-pointer top-5 left-5 text-gray-400 hover:text-purple-700 transition-colors duration-200 z-10 flex items-center gap-2"
                    aria-label="Go Back"
                >
                    <span className="font-medium text-gray-700 hover:text-purple-700">← Go Back</span>
                </button>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* LEFT SIDE */}
                    <div className="flex flex-col">
                        {/* Animated Checkmark */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-16 h-16 text-green-500 animate-checkmark"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <path
                                            d="M7 13l3 3 7-7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="path"
                                            fill="none"
                                        />
                                    </svg>
                                </div>

                                {/* Pulsing ring effect */}
                                <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping-slow opacity-0"></div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Order Successful!</h2>
                        <p className="text-gray-500 text-center mb-6">
                            Your package is being prepared for shipment
                        </p>

                        {/* Product Info */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6 flex justify-between items-center border border-purple-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                                    {product?.images[0]?.url ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="h-10 w-10 object-contain"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{product?.title}</p>
                                    <p className="text-gray-500 text-sm">{product?.subtitle}</p>
                                </div>
                            </div>
                            <p className="font-bold text-purple-700">₹{transactionDetails.amount}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-col gap-3">
                            <Link
                                to={'/account/my-orders'}
                                className="w-full bg-purple-700 text-white py-3 rounded-xl text-center font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                View My Orders
                            </Link>
                            <p className="text-purple-700 text-sm text-center mt-3 flex items-center justify-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Your order is confirmed and in transit
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Order Summary */}
                    <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-6 space-y-4 border border-gray-100 shadow-sm">
                        <p className="font-bold text-lg text-gray-800 mb-2 pb-2 border-b border-gray-200">Order Summary</p>

                        {/* Order Details */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Order ID</span>
                                <span className="font-medium text-gray-800">{transactionDetails.orderId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment Date</span>
                                <span className="font-medium text-gray-800">{transactionDetails.date}</span>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-2"></div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment ID</span>
                                <span className="font-medium text-gray-800">{transactionDetails.paymentId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment Method</span>
                                <span className="font-medium text-gray-800">{transactionDetails.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Payment Status</span>
                                <span className="font-medium text-purple-700">{transactionDetails.status}</span>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-2"></div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Amount Paid</span>
                                <span className="font-medium text-gray-800">
                                    ₹{transactionDetails.amount} {transactionDetails.currency}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Quantity</span>
                                <span className="font-medium text-gray-800">{transactionDetails.quantity || 1}</span>
                            </div>
                        </div>

                        {/* Delivery Progress */}
                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <div className="mt-4 flex flex-col gap-3">
                                <Link
                                    to={'/contact'}
                                    className="w-full bg-white text-purple-700 py-3 rounded-xl text-center font-medium border border-purple-200 shadow-sm hover:bg-purple-50 transition-colors duration-200"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes checkmark {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            stroke-dashoffset: 0;
            transform: scale(1);
          }
        }
        
        @keyframes confetti {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        
        .animate-checkmark .path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmark 0.8s ease-in-out forwards;
          animation-delay: 0.2s;
        }
        
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 0.5s;
        }
      `}</style>
        </div>
    );
};

export default OrderSuccess;