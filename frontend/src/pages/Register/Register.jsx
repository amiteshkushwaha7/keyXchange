import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser, clearError } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiUser, FiPhone, FiMail, FiLock, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),  
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (passwordValue.length >= 8) strength += 1;
    if (/[A-Z]/.test(passwordValue)) strength += 1;
    if (/[a-z]/.test(passwordValue)) strength += 1; // <-- Added lowercase check
    if (/[0-9]/.test(passwordValue)) strength += 1;
    if (/[^A-Za-z0-9]/.test(passwordValue)) strength += 1;
    setPasswordStrength(strength);
  }, [passwordValue]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      dispatch(clearError());
    }
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Create Account</h2>
                <p className="mt-2 text-purple-100 font-light">
                  Join us to get started
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition placeholder-gray-400"
                      placeholder="1234567890"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition placeholder-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register('password')}
                      className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition placeholder-gray-400"
                      placeholder="••••••••"
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
                  {passwordValue && (
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
                          style={{ width: `${(passwordStrength / 5) * 100}%` }} // <-- update denominator to 5
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <ul className="mt-2 text-xs text-gray-500 space-y-1">
                    <li className={`flex items-center ${passwordValue.length >= 8 ? 'text-green-500' : ''}`}>
                      {passwordValue.length >= 8 ? (
                        <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(passwordValue) ? 'text-green-500' : ''}`}>
                      {/[A-Z]/.test(passwordValue) ? (
                        <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One uppercase letter
                    </li>
                    <li className={`flex items-center ${/[a-z]/.test(passwordValue) ? 'text-green-500' : ''}`}> {/* <-- Added lowercase check */}
                      {/[a-z]/.test(passwordValue) ? (
                        <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One lowercase letter
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(passwordValue) ? 'text-green-500' : ''}`}>
                      {/[0-9]/.test(passwordValue) ? (
                        <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One number
                    </li>
                    <li className={`flex items-center ${/[^A-Za-z0-9]/.test(passwordValue) ? 'text-green-500' : ''}`}>
                      {/[^A-Za-z0-9]/.test(passwordValue) ? (
                        <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-gray-300 mr-1"></div>
                      )}
                      One special character
                    </li>
                  </ul>
                  
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(126, 58, 242, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Register
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
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