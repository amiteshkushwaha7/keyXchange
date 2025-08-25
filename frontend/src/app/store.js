import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice'
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import orderReducer from '../features/orders/orderSlice';
import contactReducer from '../features/contact/contactSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    products: productReducer,
    orders: orderReducer, 
    contact: contactReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false
  //   })
});

export default store;