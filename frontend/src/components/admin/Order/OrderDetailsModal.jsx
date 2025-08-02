import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../../features/admin/adminSlice';
import Modal from '../../ui/Modal';

const OrderDetailsModal = ({ isOpen, orderId, onClose }) => {
  const dispatch = useDispatch();
  const { orders, ordersLoading, ordersError } = useSelector((state) => state.admin);
  
  // Find the order in the existing orders array
  const order = orders.find(order => order._id === orderId);

  useEffect(() => {
    // If order is not found in existing orders, you might want to fetch it
    // But your current slice doesn't have getOrderById, only getAllOrders
    // You might want to add that to your adminSlice if needed
  }, [orderId, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details">
      {ordersLoading ? (
        <div>Loading order details...</div>
      ) : ( 
        <div className="space-y-4">
          {order ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Order Information</h3>
                  <p>Order ID: #{order?._id.slice(-6).toUpperCase()}</p>
                  <p>Date: {new Date(order?.createdAt).toLocaleString()}</p>
                  <p>Status: <span className={`px-2 py-1 text-xs rounded ${
                    order?.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order?.status}
                  </span></p>
                </div>
                <div>
                  <h3 className="font-medium">Customer Information</h3>
                  <p>Name: {order?.user?.name || 'Guest'}</p>
                  <p>Email: {order?.user?.email || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Products</h3>
                <div className="mt-2 border rounded">
                  {order?.items?.map((item) => (
                    <div key={item._id} className="p-3 border-b last:border-b-0 flex justify-between">
                      <div>
                        <p>{item.product?.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p>${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <p className="font-medium">Total: ${order?.total}</p>
              </div>
            </>
          ) : (
            <div>Order not found</div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default OrderDetailsModal;