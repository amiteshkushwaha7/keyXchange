import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerWithOrders } from '../../../features/admin/adminSlice';
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

const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const {
    customer,
    customerOrders,
    customerOrdersLoading,
    customerOrdersError
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerWithOrders(customerId));
    }
  }, [dispatch, customerId]);

  if (customerOrdersLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm max-w-md w-full mx-4">
          <ImSpinner8 className="animate-spin text-4xl text-blue-500 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Customer Details</h3>
          <p className="text-gray-500 text-center">Please wait while we fetch the customer information...</p>
        </div>
      </div>
    );
  }

  if (customerOrdersError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
            <BsXCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
            Error loading customer details
          </h3>
          <p className="text-gray-500 text-center mb-6">{customerOrdersError}</p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/admin/customers')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Back to Customers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) return null;

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
                onClick={() => navigate('/admin/customers')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FiArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
                <p className="text-sm text-gray-500 mt-1">View and manage customer information</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/admin/customers')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Customer Info Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                <FiUser className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                <p className="text-sm text-gray-500">Personal details and account information</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={
                    'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(customer.name || 'Customer') +
                    '&background=random'
                  }
                  alt={customer.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-indigo-600 hover:text-indigo-500">
                      <a href={`mailto:${customer.email}`}>{customer.email}</a>
                    </p>
                  </div>
                  <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active Customer
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</p>
                    <p className="text-sm font-mono text-gray-900 truncate">{customer._id}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</p>
                    <p className="text-sm font-medium text-gray-900">
                      {customer.mobile || 'Not provided'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(customer.createdAt)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
                    <p className="text-sm font-medium text-gray-900">
                      {customerOrders?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  {customerOrders?.length || 0} {customerOrders?.length === 1 ? 'order' : 'orders'} found
                </p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            {customerOrders?.length > 0 ? (
              <div className="space-y-4">
                {customerOrders.map((order) => (
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
                          <div className={`text-sm font-medium ${
                            order.isDelivered ? 'text-green-600' : 'text-yellow-600'
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

                    {/* Expanded Order Details with Scroll */}
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
                                      {order.productDetails.images.map((img, idx) => (
                                        <div key={idx} className="aspect-square overflow-hidden rounded border border-gray-200">
                                          <img
                                            src={img.url || img}
                                            alt={`Product image ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                          />
                                        </div>
                                      ))}
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
            ) : (
              <div className="text-center py-12">
                <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">This customer hasn't placed any orders yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;