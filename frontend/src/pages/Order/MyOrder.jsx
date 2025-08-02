// OrdersList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, clearOrderError } from './orderSlice';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
    return () => {
      dispatch(clearOrderError());
    };
  }, [dispatch]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold">{order.product?.title || 'Product'}</h2>
              <p className="text-gray-600">Order ID: {order._id}</p>
              <p className="font-bold">Amount: ${order.amount}</p>
              <p className={order.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}>
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;