import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  CubeIcon,
  UsersIcon,
  TagIcon,
  CogIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <CubeIcon className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <UsersIcon className="w-5 h-5" /> },
    { name: 'Users', path: '/admin/users', icon: <TagIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md lg:hidden"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
 
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md lg:hidden"
            >
              <Bars3Icon className="w-6 h-6 text-gray-500" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <span className="sr-only">Notifications</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></div>
                </button>
              </div>
              <div className="flex items-center">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;