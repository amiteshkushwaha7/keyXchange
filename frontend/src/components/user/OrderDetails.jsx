import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ClockIcon,
  CreditCardIcon,
  CubeIcon,
  CurrencyRupeeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const OrderDetails = () => { 
  const { orderId } = useParams();
  const { orders = [] } = useSelector((state) => state.orders || {});
  const order = orders.find((o) => o._id === orderId);

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
 
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-rose-100 p-6 rounded-full mb-6">
          <XCircleIcon className="h-12 w-12 text-rose-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          The order you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/account/my-orders"
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all shadow-md hover:shadow-lg"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white rounded-2xl shadow-lg border border-gray-100 mx-auto py-3 space-y-6">
      <div className="flex items-center justify-between mb-6 px-6 pt-2">
        <Link
          to="/account/my-orders"
          className="flex items-center text-violet-600 hover:text-violet-800 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Orders
        </Link>
        <span className="text-sm text-gray-500">
          Order ID: {order._id.slice(-8).toUpperCase()}
        </span> 
      </div>
 
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Details</h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Placed on {formatDateTime(order.createdAt)}
              </span>
            </div>
            <div>
              {order.isDelivered ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Delivered
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  Pending
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Product Information</h2>
            <div className="flex items-start space-x-4">
              <div className="bg-violet-100 p-3 rounded-lg">
                <CubeIcon className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Product ID</h3>
                <p className="text-sm text-gray-600 mt-1">{order.product}</p>
                <div className="mt-3 flex items-center">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    Quantity: {order.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount Paid</h3>
                  <p className="font-medium text-gray-800">₹{order.amountPaid}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCardIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <p className="font-medium text-gray-800 capitalize">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
                  <p className="font-medium text-gray-800 capitalize">
                    {order.paymentStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="p-6 border-t border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Additional Details</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Razorpay Order ID</h3>
              <p className="font-mono text-sm text-gray-800 bg-gray-100 p-2 rounded break-all mt-1">
                {order.razorpayOrderId}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Buyer ID</h3>
              <p className="text-sm text-gray-800 mt-1">{order.buyer}</p>
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Last updated: {formatDateTime(order.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;