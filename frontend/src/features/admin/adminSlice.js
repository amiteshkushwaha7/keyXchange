import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from './adminAPI';

// Helper function to create consistent async thunks
const createAdminThunk = (name, apiCall) => createAsyncThunk(
  `admin/${name}`,
  async (data, { rejectWithValue }) => {
    // console.log(data);

    try {
      const response = await apiCall(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Products
export const getAllProducts = createAdminThunk('getAllProducts', adminAPI.getAllProductsAPI);
export const getProductById = createAdminThunk('getProductById', adminAPI.getProductByIdAPI);
export const createProduct = createAdminThunk('createProduct', adminAPI.createProductAPI);
export const updateProduct = createAdminThunk('updateProduct', adminAPI.updateProductAPI);
export const deleteProduct = createAdminThunk('deleteProduct', adminAPI.deleteProductAPI);
export const searchProducts = createAdminThunk('searchProducts', adminAPI.searchProducts);
 
// Orders
export const getAllOrders = createAdminThunk('getAllOrders', adminAPI.getAllOrdersAPI);
export const getOrderById = createAdminThunk('getOrderById', adminAPI.getOrderByIdAPI);
export const updateOrder = createAdminThunk('updateOrder', adminAPI.updateOrderAPI);
export const deleteOrder = createAdminThunk('deleteOrder', adminAPI.deleteOrderAPI);
export const updateOrderStatus = createAdminThunk('updateOrderStatus', adminAPI.updateOrderStatusAPI);

// Customers
export const getAllCustomers = createAdminThunk('getAllCustomers', adminAPI.getAllCustomersAPI);
export const getCustomerWithOrders = createAdminThunk('getCustomerWithOrders', adminAPI.getCustomerWithOrdersAPI);

// Users
export const getAllUsers = createAdminThunk('getAllUsers', adminAPI.getAllUsersAPI);
export const getUserById = createAdminThunk('getUserById', adminAPI.getUserByIdAPI);

// Dashboard
export const getDashboardStats = createAdminThunk('getDashboardStats', adminAPI.getDashboardStatsAPI);

const initialState = {
  // Products
  products: [],
  product: null,
  productsLoading: false,
  productsError: null,

  // Orders
  orders: [],
  ordersLoading: false,
  ordersError: null,

  // Customers
  customer: null, 
  customers: [],
  customersLoading: false,
  customerOrders: [],
  customerOrdersLoading: false,
  customerOrdersError: null,

  // Users
  users: [],
  usersLoading: false,
  usersError: null,

  // General
  message: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.productsError = null;
      state.ordersError = null;
      state.customersError = null;
      state.usersError = null;
      state.dashboardError = null;
      state.customerOrdersError = null;
    },
    clearAdminMessage: (state) => {
      state.message = null;
    },
    resetProductState: (state) => {
      state.product = null;
    }
  },
  extraReducers: (builder) => {
    // Helper function to handle common loading/error states
    const addCommonCases = (thunk, stateKey) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[`${stateKey}Loading`] = true;
          state[`${stateKey}Error`] = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state[`${stateKey}Loading`] = false;
          state[`${stateKey}Error`] = action.payload?.message || 'Request failed';
          state.message = action.payload?.message || 'Request failed';
        });
    };

    // Products
    addCommonCases(getAllProducts, 'products');
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data || [];
      // console.log('action payload:' ,action.payload);
      // console.log(state.products);
      state.message = action.payload.message;
    });

    addCommonCases(getProductById, 'products');
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.product = action.payload;
      state.message = action.payload.message;
    });

    addCommonCases(createProduct, 'products');
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products.unshift(action.payload);
      state.message = action.payload.message;
    });

    addCommonCases(updateProduct, 'products');
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = state.products.map(product =>
        product._id === action.payload._id ? action.payload : product
      );
      state.message = action.payload.message;
    });

    addCommonCases(deleteProduct, 'products');
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = state.products.filter(
        product => product._id !== action.payload._id
      );
      state.message = action.payload.message;
    });

    addCommonCases(searchProducts, 'products');
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.productsLoading = false;
      state.products = action.payload;
      state.message = action.payload.message;
    });

    // Orders
    addCommonCases(getAllOrders, 'orders');
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.orders = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data || [];
      state.message = action.payload.message;
    });

    addCommonCases(updateOrderStatus, 'orders');
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.orders = state.orders.map(order =>
        order._id === action.payload._id ? action.payload : order
      );
      state.message = action.payload.message;
    });

    // Customers
    addCommonCases(getAllCustomers, 'customers');
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.customersLoading = false;
      state.customers = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data || [];
      state.message = action.payload.message;
    });

    addCommonCases(getCustomerWithOrders, 'customerOrders');
    builder.addCase(getCustomerWithOrders.fulfilled, (state, action) => {
      state.customerOrdersLoading = false;
      state.customer = action.payload?.data?.customer || null;
      state.customerOrders = action.payload?.data?.orders || [];
      state.message = action.payload.message;
    });

    // Users
    addCommonCases(getAllUsers, 'users');
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.usersLoading = false;
      state.users = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data || [];
      state.message = action.payload.message;
    });
  }
});

export const { clearAdminError, clearAdminMessage, resetProductState } = adminSlice.actions;
export default adminSlice.reducer;