import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { refreshUser, clearAuthState } from './features/auth/authSlice';
import { loadUser } from './features/auth/authSlice';

import Navbar from './components/layouts/Navbar';
import Category from './components/layouts/Category';
import Company from './components/layouts/Category';
import Footer from './components/layouts/Footer';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import PrivacyPolicy from './pages/Privacy Policy/Privacy';
import Terms from './pages/T&C/T&C';
import FAQ from './pages/FAQ/FAQ';
// import NavigationBar from './components/layouts/NavigationBar';
// import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Unauthorized from './pages/Unauthorized/Unauthorized';

import Home from './pages/Home/Home';
import ProductDetails from './pages/Products/ProductDetails';
import NotFound from './pages/NotFound/NotFound';
import LoadingScreen from './components/common/LoadingScreen';

// import CreateOrder from './pages/Order/CreateOrder';

// User components
import PrivateRoute from './routes/PrivateRoute';
import AccountLayout from './components/user/AccountLayout';
import Profile from './pages/User/Profile';
import Order from './pages/User/Order';

// Admin components 
import AdminRoute from './routes/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import Orders from './pages/Admin/Orders';
import AdminOrderDetails from './components/admin/Order/AdminOrderDetails';
import Customers from './pages/Admin/Customers';
import CustomerDetails from './components/admin/Customer/CustomerDetails';
import Users from './pages/Admin/Users';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Load user on app mount
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // const [initialAuthCheckComplete, setInitialAuthCheckComplete] = useState(false);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       if (!initialAuthCheckComplete) {
  //         // Call refreshUser thunk — it should internally call /auth/refresh
  //         await dispatch(refreshUser()).unwrap();

  //         // If refresh succeeded, user is authenticated
  //         setInitialAuthCheckComplete(true);
  //       }
  //     } catch (error) {
  //       // On error, user is considered logged out
  //       dispatch(clearAuthState());
  //       setInitialAuthCheckComplete(true);

  //       if (window.location.pathname !== '/login') {
  //         navigate('/login', { replace: true });
  //       }
  //     }
  //   };

  //   initializeAuth();
  // }, [dispatch, navigate, initialAuthCheckComplete]);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       // Only attempt refresh if we haven't completed initial check
  //       if (!initialAuthCheckComplete) {
  //         const result = await dispatch(refreshUser()).unwrap();

  //         // If no token received, treat as unauthenticated
  //         if (!result?.accessToken) {
  //           throw new Error('No access token received');
  //         }

  //         setInitialAuthCheckComplete(true);
  //       }
  //     } catch (error) {
  //       // Clear auth state and mark check as complete
  //       dispatch(clearAuthState());
  //       setInitialAuthCheckComplete(true);

  //       // Only navigate if we're not already on login page
  //       if (window.location.pathname !== '/login') {
  //         navigate('/', { replace: true });
  //       }
  //     }
  //   };

  //   initializeAuth();
  // }, [dispatch, navigate, initialAuthCheckComplete]);

  // Show loading only if we're still checking initial auth
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />
      {/* <NavigationBar/> */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        {/* User routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="my-orders" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-orders" element={<Order />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<Products />} />
            <Route path="products/:id" element={<Products />} />
            <Route path="products/search" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<AdminOrderDetails />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:customerId" element={<CustomerDetails />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<Users />} />
          </Route>
        </Route>


        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Category />
      <Company />
      <Footer />
    </>
  );
}

export default App;