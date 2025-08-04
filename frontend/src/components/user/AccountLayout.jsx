import { Outlet, Link, useLocation } from 'react-router-dom'; 
import LogoutButton from "../../components/layouts/LogoutButton"; 
import { useSelector } from 'react-redux'; 
import { UserIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'; 

const AccountLayout = () => { 
  const { isAuthenticated } = useSelector((state) => state.auth); 
  const { pathname } = useLocation(); 

  const tabs = [ 
    { name: 'Profile', path: '/account/profile', icon: UserIcon }, 
    { name: 'Orders', path: '/account/my-orders', icon: ClipboardDocumentListIcon } 
  ]; 

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Account</h1>
        <p className="mb-8 text-gray-600">Manage your information, settings, and orders</p>

        <nav className="flex flex-col space-y-2 flex-grow">
          {tabs.map(({ name, path, icon: Icon }) => {
            const active = pathname.startsWith(path);
            return (
              <Link
                key={name}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition ${
                  active ? "bg-blue-100 text-blue-700 font-semibold" : ""
                }`}
              >
                <Icon className="w-6 h-6" />
                {name}
              </Link>
            );
          })}
        </nav>

        <LogoutButton className="mt-auto self-start px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition" />
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 bg-white rounded-l-3xl shadow-lg">
        <Outlet />
      </main>
    </div>
  ); 
}; 

export default AccountLayout;
