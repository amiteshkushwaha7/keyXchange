import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { resetPassword, clearError, clearMessage } from '../../features/auth/authSlice';
import { FiLock, FiCheckCircle, FiX, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, message, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1; // <-- Added lowercase check
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  useEffect(() => {
    if (message && !error) {
      setShowSuccessModal(true);
      setPassword('');
    }
  }, [message, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password }));
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    dispatch(clearMessage());
    navigate('/login');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 font-sans relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700/5 rounded-tl-full"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Back button */}
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate('/login')}
            className="flex items-center text-purple-700 font-medium mb-6 hover:text-purple-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Login
          </motion.button>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-8 text-center relative">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
              
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Reset Password</h2>
                <p className="mt-2 text-purple-100 font-light">
                  Create a new password for your account
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
              {message && !showSuccessModal && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center"
                >
                  <FiCheckCircle className="mr-2 text-green-600" />
                  {message}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {error}
                </motion.div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition placeholder-gray-400"
                      placeholder="Enter new password"
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Password strength:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength < 2 ? 'text-red-500' : 
                          passwordStrength < 4 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <ul className="mt-2 text-xs text-gray-500 space-y-1">
                    <li className={`flex items-center ${password.length >= 8 ? 'text-green-500' : ''}`}>
                      {password.length >= 8 ? (
                        <FiCheckCircle className="mr-1" size={12} />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : ''}`}>
                      {/[A-Z]/.test(password) ? (
                        <FiCheckCircle className="mr-1" size={12} />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One uppercase letter
                    </li>
                    <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-500' : ''}`}> {/* <-- Added lowercase check */}
                      {/[a-z]/.test(password) ? (
                        <FiCheckCircle className="mr-1" size={12} />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One lowercase letter
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : ''}`}>
                      {/[0-9]/.test(password) ? (
                        <FiCheckCircle className="mr-1" size={12} />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One number
                    </li>
                    <li className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : ''}`}>
                      {/[^A-Za-z0-9]/.test(password) ? (
                        <FiCheckCircle className="mr-1" size={12} />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One special character
                    </li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(126, 58, 242, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || password.length < 8}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 ${
                    loading || password.length < 8 ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden border border-purple-100"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FiX className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4"
                >
                  <FiCheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Password Reset Successful
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Your password has been successfully reset. You can now log in with your new password.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium"
                >
                  Continue to Login
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResetPassword;