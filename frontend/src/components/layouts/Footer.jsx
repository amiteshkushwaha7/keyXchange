import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-md mr-3">
                <span className="text-purple-700 font-bold text-xl">KX</span>
              </div>
              <span className="text-2xl font-bold text-white">keyXchange</span>
            </div>
            <p className="text-purple-100 leading-relaxed">
              Your trusted marketplace for digital goods and services. Connecting buyers and sellers with trust and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-purple-500 pb-2">Marketplace</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  Browse Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/company" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-purple-500 pb-2">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-purple-500 pb-2">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-and-conditions" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-purple-100 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-300 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-purple-200 text-sm mb-4 md:mb-0 flex items-center">
            © {new Date().getFullYear()} keyXchange Marketplace. All rights reserved.
            <span className="mx-2">•</span>
            <span className="flex items-center">
              Made with <FaHeart className="text-red-400 mx-1" /> for digital creators
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-purple-200 text-sm">
              v1.2.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;