import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../ui/Modal';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  failed: 'bg-red-50 text-red-700 border-red-200',
  refunded: 'bg-blue-50 text-blue-700 border-blue-200',
  Yes: 'bg-green-50 text-green-700 border-green-200',
  No: 'bg-gray-50 text-gray-600 border-gray-200',
};

function StatusBadge({ value }) {
  return (
    <span className={`px-3 py-1 rounded-full font-medium text-xs border ${statusColor[value] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
    </span>
  );
}

const OrderDetailsModal = ({ isOpen, orderId, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { orders, ordersLoading } = useSelector((state) => state.admin);
  const order = orders?.find((order) => order._id === orderId);

  if (ordersLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Order Details" width="max-w-2xl">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Modal>
    );
  }

  if (!order) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Order Details" width="max-w-2xl">
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-3 text-lg font-medium">Order not found</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details" width="max-w-4xl">
      <div className="flex flex-col h-full">
        {/* Header with summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-lg border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Order #{order._id.slice(-8).toUpperCase()}</h2>
              <p className="text-gray-600 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm border">
              <div className="text-sm text-gray-500">Total Amount</div>
              <div className="text-2xl font-bold text-gray-800">₹{order.amountPaid}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'payment' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Payment
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'products' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Products
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Buyer ID</p>
                    <p className="text-gray-800 font-mono text-sm mt-1">{order.buyer}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge value={order.paymentStatus} />
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Delivered</p>
                    <StatusBadge value={order.isDelivered ? "Yes" : "No"} />
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="text-gray-800">{order.quantity ?? "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="text-gray-800 mt-1">{order.paymentMethod || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="text-gray-800 font-bold mt-1">₹{order.amountPaid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Razorpay Order ID</p>
                  <p className="text-gray-800 font-mono text-sm mt-1">{order.razorpayOrderId || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <div className="mt-1">
                    <StatusBadge value={order.paymentStatus} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Product Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Product ID</p>
                  <p className="text-gray-800 font-mono text-sm mt-1">{order.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-gray-800 mt-1">{order.quantity ?? "-"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(order.updatedAt).toLocaleString()}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;