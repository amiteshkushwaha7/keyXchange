import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaCommentAlt, FaMobileAlt, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm, clearContactState, resetContactSuccess } from '../../features/contact/contactSlice';

const Contact = () => {
  const dispatch = useDispatch();
  // ...existing code...
  const loading = useSelector(state => state.contact.contactForm.loading);
  const error = useSelector(state => state.contact.contactForm.error);
  const success = useSelector(state => state.contact.contactForm.success);
  const message = useSelector(state => state.contact.contactForm.message);
  // ...existing code...

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactType: '',
    message: '',
  });

  const [activeTab, setActiveTab] = useState('web');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearContactState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowSuccessModal(true);
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        dispatch(resetContactSuccess());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));

    setFormData({
      name: '',
      email: '',
      contactType: '',
      message: '',
    });
  };

  return (
    <>
      <title>Contact Us | Digital Goods Marketplace</title>
      <meta name="description" content="Get in touch with our team" />

      <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center max-w-sm mx-auto">
                <FaCheckCircle className="text-green-500 text-4xl mb-2" />
                <h2 className="text-lg font-bold mb-2">Message Sent!</h2>
                <p className="text-gray-700 text-center mb-2">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              We're here to help you
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Contact our support team for any questions or issues.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Warning Notice */}
            <div className="bg-yellow-50 p-4 border-b border-yellow-200">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-700">
                  Digital Goods Marketplace does not have an official customer support phone number. Please beware of fake numbers & spam calls!
                </p>
              </div>
            </div>

            {/* Contact Options */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'web' && (
                  <motion.div
                    key="web"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <FaCommentAlt className="h-6 w-6 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Web & Email Support</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Contact us through our web form or email for general inquiries.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="p-3 bg-red-50 text-red-700 rounded-lg text-sm"
                          >
                            {error}
                          </motion.div>
                        )}

                        {success && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="p-3 bg-green-50 text-green-700 rounded-lg text-sm"
                          >
                            {message || 'Thank you! Your message has been sent successfully.'}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <select
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="product">Product Information</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Additional Contact Info */}
            <div className="border-t border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Other ways to reach us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FaEnvelope className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us at</p>
                    <p className="text-sm font-medium text-gray-900">amiteshkushwaha2020@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <FaQuestionCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Help Center</p>
                    <Link to="/faq" className="text-sm font-medium text-gray-900">FAQ & Knowledge Base</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;