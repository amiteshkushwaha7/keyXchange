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
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const mainLinks = [
    { name: 'Product', href: '/product', icon: CubeIcon },
    { name: 'Blog', href: '/blog', icon: BookOpenIcon },
    { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
  ];

  const aboutLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms', href: '/terms-and-conditions' },
  ];

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">KX</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                keyXchange
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Main links */}
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              );
            })}

            {/* About dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                About
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'about' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Legal dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('legal')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Legal
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'legal' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'legal' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/account"
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Account</span>
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

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
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
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-lg mt-1">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Main links */}
              {mainLinks.map((link) => {
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

              {/* About section */}
              <div className="px-3 pt-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">About</h3>
                <div className="mt-1 space-y-1">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal section */}
              <div className="px-3 pt-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Legal</h3>
                <div className="mt-1 space-y-1">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User section */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-2">
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
                    Account
                  </Link>
                </div>
              )}
            </div> 

            {/* Auth button */}
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