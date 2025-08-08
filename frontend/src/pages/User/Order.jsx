import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../features/orders/orderSlice.js';
import {
    FiShoppingBag,
    FiPackage,
    FiUser,
    FiCreditCard,
    FiTruck,
    FiCalendar,
    FiInfo,
    FiChevronDown,
    FiChevronUp,
    FiArrowLeft
} from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';
import { BsXCircle } from 'react-icons/bs';

const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const { orders = [], loading = false } = useSelector((state) => state.orders || {});

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm max-w-md w-full mx-4">
                    <ImSpinner8 className="animate-spin text-4xl text-blue-500 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Orders</h3>
                    <p className="text-gray-500 text-center">Please wait while we fetch your order information...</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
                        <FiShoppingBag className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        No orders yet
                    </h3>
                    <p className="text-gray-500 text-center mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                    <div className="flex justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            >
                                <FiArrowLeft className="h-5 w-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                                <p className="text-sm text-gray-500 mt-1">View and manage your order history</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                to="/"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Orders Section */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                                <FiShoppingBag className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
                                <p className="text-sm text-gray-500">
                                    {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-5">
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
                                >
                                    {/* Order Summary */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</p>
                                            <p className="text-sm font-mono text-gray-900 truncate">{order._id}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</p>
                                            <p className="text-sm font-medium text-green-600">
                                                {formatCurrency(order.amountPaid)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-start">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
                                                <div className={`text-sm font-medium ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'
                                                    }`}>
                                                    {order.isDelivered ? (
                                                        <span className="inline-flex items-center">
                                                            <FiTruck className="mr-1" /> Delivered
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center">
                                                            <FiPackage className="mr-1" /> Processing
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setExpandedOrderId(
                                                        expandedOrderId === order._id ? null : order._id
                                                    )
                                                }
                                                className="ml-4 md:ml-6 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                {expandedOrderId === order._id ? (
                                                    <FiChevronUp className="h-5 w-5" />
                                                ) : (
                                                    <FiChevronDown className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Order Details */}
                                    {expandedOrderId === order._id && (
                                        <div className="border-t border-gray-200">
                                            <div className="max-h-96 overflow-y-auto p-4 bg-white">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Order Information */}
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                                                            Order Information
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {Object.entries(order).map(([key, value]) => {
                                                                if (key === 'productDetails' || key === '_id' || key === 'createdAt') return null;
                                                                return (
                                                                    <div key={key} className="grid grid-cols-3 gap-2">
                                                                        <span className="text-xs font-medium text-gray-500 capitalize col-span-1">
                                                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                                                        </span>
                                                                        <span className="text-xs font-medium text-gray-900 col-span-2 truncate">
                                                                            {Array.isArray(value)
                                                                                ? value.join(', ')
                                                                                : typeof value === 'object' && value !== null
                                                                                    ? JSON.stringify(value)
                                                                                    : String(value)}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Product Information */}
                                                    {order.productDetails && (
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                                                                Product Information
                                                            </h3>
                                                            <div className="space-y-3">
                                                                {Object.entries(order.productDetails).map(([key, value]) => {
                                                                    if (key === 'images') return null;
                                                                    return (
                                                                        <div key={key} className="grid grid-cols-3 gap-2">
                                                                            <span className="text-xs font-medium text-gray-500 capitalize col-span-1">
                                                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                                                            </span>
                                                                            <span className="text-xs font-medium text-gray-900 col-span-2">
                                                                                {Array.isArray(value)
                                                                                    ? value.map((v, i) => (
                                                                                        <div key={i} className="ml-2">
                                                                                            • {v}
                                                                                        </div>
                                                                                    ))
                                                                                    : typeof value === 'object' && value !== null
                                                                                        ? JSON.stringify(value)
                                                                                        : String(value)}
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>


                                                            {/* Product Images */}
                                                            {order.productDetails.images?.length > 0 && (
                                                                <div className="mt-4">
                                                                    <h4 className="text-xs font-medium text-gray-500 mb-2">PRODUCT IMAGES</h4>
                                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                                            <div className="aspect-square overflow-hidden rounded border border-gray-200">
                                                                                <img
                                                                                    src={order.productDetails.images[0].url}
                                                                                    alt='Product Image'
                                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                                                                />
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;