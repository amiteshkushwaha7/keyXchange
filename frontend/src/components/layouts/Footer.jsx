import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay, FaAppStore } from 'react-icons/fa';
import { SiTrustpilot } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">keyXchange</h2>
            <p className="text-gray-400">Your trusted marketplace for digital goods and services</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-yellow-400">
              <SiTrustpilot size={24} />
              <span>Rated 4.8/5 on Trustpilot</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Marketplace</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Featured Deals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Releases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Subscription Services</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Delivery Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Legal & App Download */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Get the App</h3>
              <div className="flex flex-col space-y-3">
                <a href="#" className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <FaGooglePlay size={20} />
                  <span>Google Play</span>
                </a>
                <a href="#" className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <FaAppStore size={20} />
                  <span>App Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} keyXchange Marketplace. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Security</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Sitemap</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Affiliates</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Developers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;