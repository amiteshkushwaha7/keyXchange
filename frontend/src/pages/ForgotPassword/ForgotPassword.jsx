import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { forgotPassword, clearError, clearMessage } from '../../features/auth/authSlice';
import { FiMail } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-purple-600 px-6 py-8 text-center">
              <h2 className="text-3xl font-bold text-white">Reset Password</h2>
              <p className="mt-2 text-purple-100">
                Enter your email to receive a reset link
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                >
                  {message}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-md text-white font-medium bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="font-medium text-purple-600 hover:text-purple-800 hover:underline transition"
                >
                  Remember your password? Sign in
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;