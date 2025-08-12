import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  CubeIcon,
  BookOpenIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  UserIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Product', href: '/product', icon: CubeIcon },
    { name: 'Blog', href: '/blog', icon: BookOpenIcon },
    { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'FAQ', href: '/faq', icon: InformationCircleIcon },
    { name: 'Privacy Policy', href: '/privacy-policy', icon: InformationCircleIcon },
    { name: 'Terms and Conditions', href: '/terms-and-conditions', icon: InformationCircleIcon },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-gray-200 py-4 lg:border-none">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">KX</span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                keyXchange
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="ml-10 block lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Middle - Navigation links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 group transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-indigo-600" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right side - Conditional buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 group transition-colors duration-200"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-indigo-600" />
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/account"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 group transition-colors duration-200"
                >
                  <UserIcon className="h-5 w-5 mr-2 text-gray-500 group-hover:text-indigo-600" />
                  Profile
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                Get Started
                <ArrowRightOnRectangleIcon className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-lg mt-2">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3 text-gray-500" />
                    {link.name}
                  </Link>
                );
              })}
              {isAuthenticated && (
                <>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ChartBarIcon className="h-5 w-5 mr-3 text-gray-500" />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/account"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5 mr-3 text-gray-500" />
                    Profile
                  </Link>
                </>
              )}
            </div>
            <div className="border-t border-gray-200 px-5 py-4">
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:from-indigo-700 hover:to-purple-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                  <ArrowRightOnRectangleIcon className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}