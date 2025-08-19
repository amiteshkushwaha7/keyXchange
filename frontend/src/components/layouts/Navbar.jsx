import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX,
  FiBox,
  FiBookOpen,
  FiMail,
  FiInfo,
  FiUser,
  FiBarChart2,
  FiLogIn,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const mainLinks = [
    { name: 'Contact', href: '/contact', icon: FiMail },
  ];

  const aboutLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  ];

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-10 w-10 bg-purple-700 rounded-lg flex items-center justify-center shadow-md"
              >
                <span className="text-white font-bold text-xl">KX</span>
              </motion.div>
              <span className="ml-3 text-xl font-bold text-purple-700">
                keyXchange
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {/* Main links */}
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors duration-200 rounded-lg hover:bg-purple-50"
                >
                  {link.name}
                </Link>
              );
            })}

            {/* About dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors duration-200 rounded-lg hover:bg-purple-50"
              >
                About
                <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 py-1 z-10"
                  >
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center"
                      >
                        <FiChevronRight className="mr-2 text-purple-400" />
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legal dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('legal')}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors duration-200 rounded-lg hover:bg-purple-50"
              >
                Legal
                <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'legal' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'legal' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 py-1 z-10"
                  >
                    {legalLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center"
                      >
                        <FiChevronRight className="mr-2 text-purple-400" />
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* User actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors duration-200 rounded-lg hover:bg-purple-50"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/account"
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-700 rounded-lg hover:bg-purple-50"
                >
                  <FiUser className="h-5 w-5" />
                  <span>Account</span>
                </Link>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.03 }}>
                <Link
                  to="/login"
                  className="ml-4 inline-flex items-center justify-center rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Get Started
                  <FiLogIn className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100"
            >
              <div className="space-y-1 px-2 pt-2 pb-3">
                {/* Main links */}
                {mainLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-b border-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3 text-purple-500" />
                      {link.name}
                    </Link>
                  );
                })}

                {/* About section */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown('aboutMobile')}
                    className="flex w-full items-center justify-between px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <div className="flex items-center">
                      <FiInfo className="h-5 w-5 mr-3 text-purple-500" />
                      About
                    </div>
                    <FiChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'aboutMobile' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'aboutMobile' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-8 pr-3 overflow-hidden"
                      >
                        {aboutLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.href}
                            className="block py-2 text-base font-medium text-gray-600 hover:text-purple-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Legal section */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown('legalMobile')}
                    className="flex w-full items-center justify-between px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <div className="flex items-center">
                      <FiBookOpen className="h-5 w-5 mr-3 text-purple-500" />
                      Legal
                    </div>
                    <FiChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'legalMobile' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'legalMobile' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-8 pr-3 overflow-hidden"
                      >
                        {legalLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.href}
                            className="block py-2 text-base font-medium text-gray-600 hover:text-purple-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User section */}
                {isAuthenticated && (
                  <div className="border-b border-gray-100">
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiBarChart2 className="h-5 w-5 mr-3 text-purple-500" />
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/account"
                      className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiUser className="h-5 w-5 mr-3 text-purple-500" />
                      Account
                    </Link>
                  </div>
                )}
              </div> 

              {/* Auth button */}
              <div className="px-5 py-4 bg-gray-50">
                {!isAuthenticated && (
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Link
                      to="/login"
                      className="flex w-full items-center justify-center rounded-lg bg-purple-700 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                      <FiLogIn className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}