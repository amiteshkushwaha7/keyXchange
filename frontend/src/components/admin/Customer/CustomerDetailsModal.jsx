import React, { useEffect } from 'react';
import Modal from '../../ui/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerWithOrders } from '../../../features/admin/adminSlice';
import { FiUser, FiShoppingBag, FiPackage, FiCalendar, FiCreditCard, FiTruck, FiInfo, FiClock, FiRefreshCw } from 'react-icons/fi';
import { BsCheckCircle, BsXCircle, BsBoxSeam } from 'react-icons/bs';
import { RiVipCrownLine } from 'react-icons/ri';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { ImSpinner8 } from 'react-icons/im';

const CustomerDetailsModal = ({ isOpen, customerId, onClose }) => {
  const dispatch = useDispatch();
  const {
    customer,
    customerOrders,
    customerBoughtProducts,
    customerOrdersLoading,
    customerOrdersError,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerWithOrders(customerId));
    }
  }, [dispatch, customerId]);

  if (customerOrdersLoading) {
    return (
      <Modal onClose={onClose} title="Loading Customer Data">
        <div className="flex flex-col items-center justify-center py-12">
          <ImSpinner8 className="animate-spin text-3xl text-blue-500 mb-4" />
          <p className="text-gray-600">Fetching customer details...</p>
        </div>
      </Modal>
    );
  }

  if (customerOrdersError) {
    return (
      <Modal onClose={onClose} title="Error">
        <div className="p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <BsXCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading customer data</h3>
          <p className="mt-2 text-sm text-gray-500">{customerOrdersError}</p>
          <div className="mt-5">
            <button
              onClick={onClose}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  if (!customer) {
    return null;
  }

  const statusBadge = customer.active ? (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <BsCheckCircle className="mr-1" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      <BsXCircle className="mr-1" /> Inactive
    </span>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details" size="xl">
      <div className="space-y-6">
        {/* Customer Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <RiVipCrownLine className="mr-2 text-yellow-500" />
              Customer Profile
            </h2>
            {statusBadge}
          </div>
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img 
                  src={'https://ui-avatars.com/api/?name='+encodeURIComponent(customer.name)+'&background=random'} 
                  alt={customer.name} 
                  className="w-24 h-24 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-4">
                  <h3 className="text-2xl font-bold text-gray-900">{customer.name}</h3>
                </div>
                <p className="mt-1 text-gray-600 flex items-center">
                  <FiUser className="mr-1.5 text-gray-400" /> 
                  {customer.email}
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Mobile:</span> {customer.mobile || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Role:</span> {customer.role || 'Customer'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">System Info</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Customer ID:</span> {customer._id}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Version:</span> {customer.__v}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                <FiCalendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                <FiShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {customer.orderCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                <span className="text-2xl font-bold">₹</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  ₹{customer.totalSpent?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Products Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <BsBoxSeam className="mr-2 text-blue-500" />
              Purchased Products ({customerBoughtProducts?.length || 0})
            </h2>
          </div>
          <div className="p-6">
            {customerBoughtProducts?.length > 0 ? (
              <div className="space-y-4">
                {customerBoughtProducts.map(product => (
                  <div key={product._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{product.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ₹{product.price}
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <FiInfo className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Product ID</p>
                            <p className="text-sm font-medium text-gray-900">{product._id}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiPackage className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="text-sm font-medium text-gray-900">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <HiOutlineStatusOnline className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="text-sm font-medium text-gray-900">
                              {product.isActive ? (
                                <span className="text-green-600">Active</span>
                              ) : (
                                <span className="text-red-600">Inactive</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <FiClock className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Created</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(product.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiRefreshCw className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Updated</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(product.updatedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiCalendar className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Expiry Date</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(product.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {product.description && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-500 mb-1">Description</p>
                        <p className="text-sm text-gray-700">{product.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No purchased products</h3>
                <p className="mt-1 text-sm text-gray-500">This customer hasn't purchased any products yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiShoppingBag className="mr-2 text-green-500" />
              Orders ({customerOrders?.length || 0})
            </h2>
          </div>
          <div className="p-6">
            {customerOrders?.length > 0 ? (
              <div className="space-y-4">
                {customerOrders.map(order => (
                  <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <div className="flex space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ₹{
                          order.paymentStatus === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ₹{
                          order.isDelivered 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="mt-1 mr-2 flex-shrink-0 text-gray-400 text-lg">₹</span>
                          <div>
                            <p className="text-sm text-gray-500">Amount Paid</p>
                            <p className="text-sm font-medium text-gray-900">₹{order.amountPaid}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiCreditCard className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiPackage className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Product ID</p>
                            <p className="text-sm font-medium text-gray-900">{order.product}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <FiClock className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiTruck className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Delivery Status</p>
                            <p className="text-sm font-medium text-gray-900">
                              {order.isDelivered ? (
                                <span className="text-green-600">Delivered</span>
                              ) : (
                                <span className="text-yellow-600">Processing</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FiInfo className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Quantity</p>
                            <p className="text-sm font-medium text-gray-900">{order.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {order.razorpayOrderId && (
                      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-500 mb-1">Payment Details</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Razorpay Order ID</p>
                            <p className="text-gray-900">{order.razorpayOrderId}</p>
                          </div>
                          {order.razorpayPaymentId && (
                            <div>
                              <p className="text-gray-500">Payment ID</p>
                              <p className="text-gray-900">{order.razorpayPaymentId}</p>
                            </div>
                          )}
                          {order.razorpaySignature && (
                            <div>
                              <p className="text-gray-500">Signature</p>
                              <p className="text-gray-900">{order.razorpaySignature}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">This customer hasn't placed any orders yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailsModal;