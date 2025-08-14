import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser, clearError } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiUser, FiPhone, FiMail, FiLock } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .trim()
    .min(3, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .trim()
    .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  email: Yup.string()
    .required('Email is required')
    .trim()
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),  
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      dispatch(clearError());
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
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
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="mt-2 text-purple-100">
                Join us to get started
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="mobile"
                      type="text"
                      {...register('mobile')}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                      placeholder="1234567890"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                  )}
                </div>

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
                      type="email"
                      {...register('email')}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
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
                      type="password"
                      {...register('password')}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    Password must contain:
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      <li className={errors.password?.message?.includes('lowercase') ? 'text-red-600' : 'text-gray-500'}>One lowercase letter</li>
                      <li className={errors.password?.message?.includes('uppercase') ? 'text-red-600' : 'text-gray-500'}>One uppercase letter</li>
                      <li className={errors.password?.message?.includes('number') ? 'text-red-600' : 'text-gray-500'}>One number</li>
                      <li className={errors.password?.message?.includes('special character') ? 'text-red-600' : 'text-gray-500'}>One special character</li>
                      <li className={errors.password?.message?.includes('8 characters') ? 'text-red-600' : 'text-gray-500'}>At least 8 characters</li>
                    </ul>
                  </div>
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
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      Register <FaArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline transition"
                  >
                    Sign in
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

export default Register;