import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser, clearError } from '../../features/auth/authSlice';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const redirect = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
      dispatch(clearError());
    }
  }, [isAuthenticated, navigate, redirect]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="mt-2 text-purple-100">
                Sign in to access your account
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
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
                {/* Email */}
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
                      onChange={onChange}
                      placeholder="you@example.com"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      minLength="6"
                      value={password}
                      onChange={onChange}
                      placeholder="••••••••"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    onClick={() => navigate('/forgot-password')}
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-800 hover:underline transition"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
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
                    'Signing in...'
                  ) : (
                    <>
                      Sign In <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline transition"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;