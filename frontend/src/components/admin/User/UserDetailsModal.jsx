import { useMemo } from 'react';
import Modal from '../../ui/Modal';
import { useSelector } from 'react-redux';

const UserDetailsModal = ({ isOpen, userId, onClose }) => {
  const { users } = useSelector(state => state.admin);
  
  // Find user by id from Redux store
  const user = useMemo(
    () => users.find((u) => u._id === userId),
    [userId, users]
  ); 

  const isLoading = useSelector(state => state.admin.usersLoading);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      {isLoading ? (
        <div>Loading user details...</div>
      ) : user ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src={user.avatar || 'https://via.placeholder.com/80'} 
              alt={user.name} 
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role || 'user'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="font-medium">Contact Information</h4>
              <p className="mt-1 text-gray-600">Mobile: {user.mobile || 'N/A'}</p>
              <p className="mt-1 text-gray-600">Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">User Statistics</h4>
              <p className="mt-1 text-gray-600">Status: {user.active ? 'Active' : 'Inactive'}</p>
            </div>
          </div>

          {user.role === 'customer' && (
            <div className="mt-6">
              <h4 className="font-medium">Order Statistics</h4>
              <p className="mt-1 text-gray-600">Total Orders: {user.orderCount || 0}</p>
              <p className="mt-1 text-gray-600">Total Spent: ${user.totalSpent?.toFixed(2) || '0.00'}</p>
              
              <h4 className="font-medium mt-4">Recent Orders</h4>
              {user.recentOrders?.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {user.recentOrders.map(order => (
                    <li key={order._id} className="p-2 border rounded">
                      <p>Order #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-gray-600">${order.total} - {new Date(order.createdAt).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-600">No recent orders</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-600">User not found</div>
      )}
    </Modal>
  );
};

export default UserDetailsModal;