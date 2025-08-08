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
    ChevronLeftIcon,
    ChevronRightIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const Order = () => {
    const dispatch = useDispatch();
    const { orders = [], loading = false } = useSelector((state) => state.orders || {});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const orderItemRef = useRef(null);
    const [ordersPerPage, setOrdersPerPage] = useState(5);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    useLayoutEffect(() => {
        if (orders.length === 0) return;

        const calculateOrdersPerPage = () => {
            const viewportHeight = window.innerHeight;
            const containerPadding = 32 * 2;
            const paginationHeight = 72;
            const extraSpacing = 48;

            if (orderItemRef.current) {
                const orderItemHeight = orderItemRef.current.getBoundingClientRect().height;
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

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [totalPages, currentPage]);

    const paginatedOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const closeModal = () => setSelectedOrder(null);

    const renderStatus = (delivered) =>
        delivered ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Delivered
            </span>
        ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                <XCircleIcon className="h-4 w-4 mr-1" />
                Pending
            </span>
        );

    const formatDateLong = (dateString) =>
        new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });

    const formatDateTime = (dateString) =>
        new Date(dateString).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-pulse flex flex-col items-center">
                    <ShoppingBagIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <span className="text-gray-400 text-lg">Loading your orders...</span>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-violet-100 p-6 rounded-full mb-6">
                    <ShoppingBagIcon className="h-12 w-12 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all shadow-md hover:shadow-lg"
                >
                    Browse Products
                </Link>
            </div>
        );
    }
 
    return (  
        <div>
            <div className="w-full min-h-screen mx-auto px-8 py-4 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 px-5 pb-3 border-b border-b-gray-200">MY ORDERS</h2>

                <div className="grid gap-5">
                    {paginatedOrders.map((order, idx) => ( 
                        <Link
                            to={`/account/my-orders/${order._id}`}  // Changed to Link
                            key={order._id}
                            ref={idx === 0 ? orderItemRef : null}
                            className="group block cursor-pointer bg-white border-b border-b-gray-200 hover:shadow-md transition-all hover:border-violet-200 hover:translate-y-[-2px] hover:rounded-lg"
                            aria-label={`View details for order ${order._id}`}
                        >
                            <div className="p-5">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-violet-600 transition-colors">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Placed on {formatDateLong(order.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Status</span>
                                            {renderStatus(order.isDelivered)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Amount</span>
                                            <div className="flex items-center font-medium text-gray-800">
                                                <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                                                {order.amountPaid}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeftIcon className="h-5 w-5 mr-1" />
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRightIcon className="h-5 w-5 ml-1" />
                        </button>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                            <h2
                                id="modal-title"
                                className="text-xl font-bold text-gray-800"
                            >
                                Order Details
                            </h2>
                            <button
                                onClick={closeModal}
                                aria-label="Close modal"
                                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Order ID</h3>
                                        <p className="font-mono text-sm text-gray-800">{selectedOrder._id}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                                        {renderStatus(selectedOrder.isDelivered)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Placed On</h3>
                                        <p>{formatDateTime(selectedOrder.createdAt)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                                        <p>{formatDateTime(selectedOrder.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product</h3>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-violet-100 p-3 rounded-lg">
                                        <CubeIcon className="h-6 w-6 text-violet-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Product ID</h4>
                                        <p className="text-sm text-gray-600">{selectedOrder.product}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Amount Paid</h4>
                                            <p className="font-medium text-gray-800">₹{selectedOrder.amountPaid}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <CreditCardIcon className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Payment Method</h4>
                                            <p className="font-medium text-gray-800 capitalize">{selectedOrder.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-amber-100 p-2 rounded-full">
                                            <ShoppingBagIcon className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
                                            <p className="font-medium text-gray-800">{selectedOrder.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Payment Status</h4>
                                            <p className="font-medium text-gray-800 capitalize">{selectedOrder.paymentStatus}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Razorpay Order ID</h4>
                                        <p className="font-mono text-sm text-gray-800 bg-gray-100 p-2 rounded break-all">
                                            {selectedOrder.razorpayOrderId}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Buyer ID</h4>
                                        <p className="text-sm text-gray-800">{selectedOrder.buyer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;