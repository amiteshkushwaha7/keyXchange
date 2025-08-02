import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderAPI from './orderAPI';

// Helper function to create order thunks with consistent error handling
const createOrderThunk = (name, apiCall) => createAsyncThunk(
  `orders/${name}`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCall(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Create all thunks using the helper
export const createOrder = createOrderThunk('createOrder', orderAPI.createOrderAPI);
export const verifyPayment = createOrderThunk('verifyPayment', orderAPI.verifyPaymentAPI);
export const deleteOrder = createOrderThunk('deleteOrder', orderAPI.deleteOrderAPI);
export const getMyOrders = createOrderThunk('getMyOrders', orderAPI.getMyOrdersAPI);

const initialState = {
  orders: [],
  loading: false,
  error: null,
  message: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearOrderMessage: (state) => {
      state.message = null;
    },
    clearOrderState: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    // Helper function for common pending/rejected cases
    const addCommonCases = (thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Request failed';
        });
    };

    // Place Order
    addCommonCases(createOrder);
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data || [];
      state.message = action.payload.message || 'Order placed successfully';
    });

    // Get My Orders
    addCommonCases(getMyOrders);
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = Array.isArray(action.payload)
        ? action.payload
        : action.payload.data || [];
      state.message = action.payload.message;
    });
  }
});

export const {
  clearOrderError,
  clearOrderMessage,
  clearOrderState
} = orderSlice.actions;

export default orderSlice.reducer;