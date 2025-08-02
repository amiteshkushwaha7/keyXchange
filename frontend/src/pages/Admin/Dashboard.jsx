import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../../components/admin/Common/StatCard';

import { getAllProducts, getAllOrders, getAllUsers } from '../../features/admin/adminSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products = [], orders = [], users = [] } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]); // ✅ added dependency array

  // ✅ Derive stats from the fetched data
  const stats = {
    totalRevenue: orders.reduce((acc, order) => acc + order.amount, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalCustomers: users.length,
    salesData: orders.map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      amount: order.amount,
    })),
    // Optional: mock trends
    revenueTrend: 5,
    ordersTrend: 8,
    productsTrend: 2,
    customersTrend: 10,
    recentOrders: orders.slice(0, 5),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.totalRevenue.toFixed(2)}`}
          icon="💰"
          trend={stats.revenueTrend}
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders}
          icon="📦"
          trend={stats.ordersTrend}
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts}
          icon="🛍️"
          trend={stats.productsTrend}
        />
        <StatCard 
          title="Total Customers" 
          value={stats.totalCustomers}
          icon="👥"
          trend={stats.customersTrend}
        />
      </div>
    </div>
  );
};

export default Dashboard;
