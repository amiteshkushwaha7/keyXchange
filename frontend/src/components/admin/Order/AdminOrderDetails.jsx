import { useSelector } from 'react-redux'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  failed: 'bg-red-50 text-red-700 border-red-200',
  refunded: 'bg-blue-50 text-blue-700 border-blue-200',
  Yes: 'bg-green-50 text-green-700 border-green-200',
  No: 'bg-gray-50 text-gray-600 border-gray-200',
};

function StatusBadge({ value }) {
  const colorClasses = statusColor[value?.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200';
  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${colorClasses}`}>
      {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
    </span>
  );
}

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, ordersLoading } = useSelector((state) => state.admin);
  
  const order = orders?.find((order) => order._id === id);

  useEffect(() => {
    if (!ordersLoading && !order) {
      navigate('/admin/orders');
    }
  }, [ordersLoading, order, navigate]);

  if (ordersLoading) return <div>Loading order details...</div>;

  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto my-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="mb-2">
        <strong>Order ID:</strong> {order._id}
      </div>
      <div className="mb-2">
        <strong>Placed on:</strong>{' '}
        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <div className="mb-2">
        <strong>Buyer ID:</strong> {order.buyer}
      </div>
      <div className="mb-2">
        <strong>Status:</strong> <StatusBadge value={order.status || (order.isDelivered ? 'Delivered' : 'Pending')} />
      </div>
      <div className="mb-2">
        <strong>Quantity:</strong> {order.quantity ?? '-'}
      </div>
      <div className="mb-2">
        <strong>Payment Method:</strong> {order.paymentMethod || '-'}
      </div>
      <div className="mb-2">
        <strong>Amount Paid:</strong> ₹{order.amountPaid}
      </div>
      <div className="mb-2">
        <strong>Razorpay Order ID:</strong> {order.razorpayOrderId || '-'}
      </div>
      <div className="mb-2">
        <strong>Payment Status:</strong> <StatusBadge value={order.paymentStatus || '-'} />
      </div>
      <div className="mb-2">
        <strong>Product ID:</strong> {order.product}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
