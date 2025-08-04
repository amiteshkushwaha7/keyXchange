import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../features/orders/orderSlice.js';
import {
    ClockIcon,
    CreditCardIcon,
    CubeIcon,
    CurrencyRupeeIcon, 
    XMarkIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

const Order = () => {
    const dispatch = useDispatch();
    const { orders = [], loading = false } = useSelector((state) => state.orders || {});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Reference to the first order item to measure its height
    const orderItemRef = useRef(null);

    // State to hold dynamic count of how many orders fit per page
    const [ordersPerPage, setOrdersPerPage] = useState(5);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    // Calculate how many orders per page fit in the viewport height
    useLayoutEffect(() => {
        if (orders.length === 0) return;

        const calculateOrdersPerPage = () => {
            const viewportHeight = window.innerHeight;
            const containerPadding = 32 * 2; // approx padding top + bottom (p-4 = 16px*2)
            const paginationHeight = 72; // estimate height for pagination controls and margins
            const extraSpacing = 48; // additional spacing for margins/headers if needed

            if (orderItemRef.current) {
                const orderItemHeight = orderItemRef.current.getBoundingClientRect().height;
                // Calculate number of orders that can fit without scrolling
                const fitCount = Math.floor(
                    (viewportHeight - containerPadding - paginationHeight - extraSpacing) / orderItemHeight
                );
                setOrdersPerPage(fitCount > 0 ? fitCount : 1);
            }
        };

        calculateOrdersPerPage();

        window.addEventListener('resize', calculateOrdersPerPage);
        return () => window.removeEventListener('resize', calculateOrdersPerPage);
    }, [orders]);

    // Adjust total pages based on dynamic ordersPerPage
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    // Ensure currentPage is within bounds when ordersPerPage or orders change
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [totalPages, currentPage]);

    // Slice orders based on pagination
    const paginatedOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const closeModal = () => setSelectedOrder(null);

    const renderStatus = (delivered) =>
        delivered ? (
            <span className="flex items-center space-x-1 text-green-600 font-semibold">
                <CheckCircleIcon className="h-5 w-5" />
                <span>Delivered</span>
            </span>
        ) : (
            <span className="flex items-center space-x-1 text-red-600 font-semibold">
                <XCircleIcon className="h-5 w-5" />
                <span>Pending</span>
            </span>
        );

    const formatDateLong = (dateString) =>
        new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

    const formatDateTime = (dateString) =>
        new Date(dateString).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <span className="text-gray-500 text-lg">Loading your orders...</span>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                <CubeIcon className="h-14 w-14 mb-4" />
                <p className="text-lg font-semibold">You haven't placed any orders yet.</p>
                <Link
                    to="/"
                    className="mt-3 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4 space-y-4">
                {paginatedOrders.map((order, idx) => (
                    <div
                        key={order._id}
                        ref={idx === 0 ? orderItemRef : null} // Measure only the first order's height
                        onClick={() => setSelectedOrder(order)}
                        className="cursor-pointer bg-white shadow-md rounded-md p-6 border border-gray-100 hover:shadow-lg transition transform hover:scale-[1.02]"
                        aria-label={`Open details for order ${order._id}`}
                    >
                        <h3 className="text-lg font-semibold mb-2 text-blue-700">Order #{order._id}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Order Status</div>
                                {renderStatus(order.isDelivered)}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Payment Status</div>
                                <span className="capitalize">{order.paymentStatus}</span>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Amount Paid</div>
                                <div className="flex items-center space-x-1">
                                    <CurrencyRupeeIcon className="h-5 w-5 text-gray-500" />
                                    <span>₹{order.amountPaid}</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Placed On</div>
                                <div>{formatDateLong(order.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-4 mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal for order details */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="
        bg-gradient-to-br from-white to-gray-50
        rounded-xl shadow-2xl max-w-3xl w-full p-8 relative
        overflow-y-auto max-h-[90vh]  /* scroll inside if content is tall */
        transform transition-transform duration-300 scale-100
        animate-fadeInModal
      "
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
                        tabIndex={-1}
                    >
                        <button
                            onClick={closeModal}
                            aria-label="Close modal"
                            className="
          absolute top-4 right-4
          text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded
          transition-colors duration-200
        "
                        >
                            <XMarkIcon className="h-7 w-7" />
                        </button>
                        <h2
                            id="modal-title"
                            className="text-3xl font-extrabold mb-6 text-blue-700 tracking-wide"
                        >
                            Order Details - #{selectedOrder._id}
                        </h2>
                        <div className="space-y-5 text-gray-800 leading-relaxed">

                            {/* Created & Updated Times */}
                            <section className="flex flex-col sm:flex-row sm:space-x-12 border-b border-gray-300 pb-4">
                                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                    <ClockIcon className="h-6 w-6 text-blue-400" />
                                    <span>
                                        <strong className="font-semibold">Created At:</strong> {formatDateTime(selectedOrder.createdAt)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <ClockIcon className="h-6 w-6 text-blue-400" />
                                    <span>
                                        <strong className="font-semibold">Updated At:</strong> {formatDateTime(selectedOrder.updatedAt)}
                                    </span>
                                </div>
                            </section>

                            {/* Product info */}
                            <section className="border-b border-gray-300 pb-4">
                                <div className="flex items-center space-x-3 mb-2">
                                    <CubeIcon className="h-6 w-6 text-green-400" />
                                    <span>
                                        <strong className="font-semibold">Product ID:</strong> {selectedOrder.product}
                                    </span>
                                </div>
                            </section>

                            {/* Payment and Amount */}
                            <section className="border-b border-gray-300 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                <div className="flex items-center space-x-3">
                                    <CurrencyRupeeIcon className="h-6 w-6 text-green-500" />
                                    <span>
                                        <strong className="font-semibold">Amount Paid:</strong> ₹{selectedOrder.amountPaid}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CreditCardIcon className="h-6 w-6 text-yellow-500" />
                                    <span>
                                        <strong className="font-semibold">Payment Method:</strong> {selectedOrder.paymentMethod}
                                    </span>
                                </div>
                                <div>
                                    <strong className="font-semibold">Payment Status:</strong> {selectedOrder.paymentStatus}
                                </div>
                                <div>
                                    <strong className="font-semibold">Quantity:</strong> {selectedOrder.quantity}
                                </div>
                            </section>

                            {/* Razorpay Order ID */}
                            <section className="border-b border-gray-300 pb-4">
                                <div>
                                    <strong className="font-semibold">Razorpay Order ID:</strong>{' '}
                                    <code className="text-sm text-gray-600 break-all bg-gray-100 p-1 rounded">
                                        {selectedOrder.razorpayOrderId}
                                    </code>
                                </div>
                            </section>

                            {/* Delivery & Buyer info */}
                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <strong className="font-semibold">Delivered:</strong>{' '}
                                    <span className={selectedOrder.isDelivered ? "text-green-600" : "text-red-600"}>
                                        {selectedOrder.isDelivered ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div>
                                    <strong className="font-semibold">Buyer ID:</strong> {selectedOrder.buyer}
                                </div>
                                <div>
                                    <strong className="font-semibold">Version (__v):</strong> {selectedOrder.__v}
                                </div>
                            </section>
                        </div>
                    </div>

                    <style jsx>{`
      @keyframes fadeInModal {
        0% {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      .animate-fadeInModal {
        animation: fadeInModal 0.3s ease forwards;
      }
    `}</style>
                </div>
            )}
        </>
    );
};

export default Order;
