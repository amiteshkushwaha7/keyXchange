import { useMemo } from 'react';
import Modal from '../../ui/Modal';

// Demo customers data
const demoCustomers = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '123-456-7890',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdAt: '2023-01-15T10:00:00Z',
    orderCount: 5,
    totalSpent: 320.5,
    recentOrders: [
      { _id: 'order1', total: 120, createdAt: '2024-06-01T12:00:00Z' },
      { _id: 'order2', total: 200.5, createdAt: '2024-05-15T09:30:00Z' },
    ],
  },
  {
    id: '2',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '234-567-8901',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    createdAt: '2022-11-20T14:30:00Z',
    orderCount: 2,
    totalSpent: 99.99,
    recentOrders: [
      { _id: 'order3', total: 99.99, createdAt: '2024-04-10T11:00:00Z' },
    ],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '345-678-9012',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: '2024-02-05T08:45:00Z',
    orderCount: 0,
    totalSpent: 0,
    recentOrders: [],
  },
];

const CustomerDetailsModal = ({ isOpen, customerId, onClose }) => {
  // Demo: find customer by id
  const customer = useMemo(
    () => demoCustomers.find((c) => c.id === customerId),
    [customerId]
  );
  const isLoading = false; // No loading for demo

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details">
      {isLoading ? (
        <div>Loading customer details...</div>
      ) : customer ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src={customer.avatar || 'https://via.placeholder.com/80'} 
              alt={customer.name} 
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{customer.name}</h3>
              <p className="text-gray-600">{customer.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="font-medium">Contact Information</h4>
              <p className="mt-1 text-gray-600">Phone: {customer.phone || 'N/A'}</p>
              <p className="mt-1 text-gray-600">Joined: {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">Order Statistics</h4>
              <p className="mt-1 text-gray-600">Total Orders: {customer.orderCount || 0}</p>
              <p className="mt-1 text-gray-600">Total Spent: ${customer.totalSpent?.toFixed(2) || '0.00'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium">Recent Orders</h4>
            {customer.recentOrders?.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {customer.recentOrders.map(order => (
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
        </div>
      ) : (
        <div className="text-gray-600">Customer not found</div>
      )}
    </Modal>
  );
};

export default CustomerDetailsModal;