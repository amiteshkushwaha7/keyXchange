import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { getAllOrders, updateOrderStatus } from '../../features/admin/adminSlice';

import OrdersTable from '../../components/admin/Order/OrdersTable';
import OrderDetailsModal from '../../components/admin/Order/OrderDetailsModal';
import SearchInput from '../../components/admin/Common/SeachInput';
import StatusFilter from '../../components/admin/Common/StatusFilter';

const Orders = () => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, ordersLoading } = useSelector(state => state.admin);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(!!id);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]); 

  // Filter orders based on search and status
  const displayOrders = orders.filter(order => {
    const matchesSearch =
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.includes(searchTerm);
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }; 

  const handleViewDetails = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen px-8 py-4 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SearchInput 
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StatusFilter 
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {ordersLoading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : (
        <OrdersTable 
          orders={displayOrders} 
          onViewDetails={handleViewDetails}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      <OrderDetailsModal 
        isOpen={isModalOpen} 
        orderId={id}
        onClose={() => {
          navigate('/admin/orders');
          setIsModalOpen(false);
        }}
      />
    </div>
  ); 
};

export default Orders;