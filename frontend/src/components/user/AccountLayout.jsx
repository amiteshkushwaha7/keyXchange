import { Outlet, Link, useLocation } from 'react-router-dom';
import LogoutButton from "../../components/layouts/LogoutButton";
import { useSelector } from 'react-redux';

const AccountLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const tabs = [
    { name: 'Profile', path: '/account/profile' },
    { name: 'Orders', path: '/account/orders' },
    { name: 'Payment Methods', path: '/account/payments' },
    { name: 'Addresses', path: '/account/addresses' },
    { name: 'Settings', path: '/account/settings' },
    { name: 'Wishlist', path: '/account/wishlist' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8 ">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 bg-green-50">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`block px-4 py-2 rounded-lg ${pathname.startsWith(tab.path)
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {tab.name}
              </Link>
            ))}
            <div className='block px-4 py-2 rounded-lg'>
              {isAuthenticated && <LogoutButton />}
            </div>

          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;