import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from './userAPI';

// Helper function to create user thunks with consistent error handling
const createUserThunk = (name, apiCall) => createAsyncThunk(
  `user/${name}`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCall(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Profile Thunks
export const getProfile = createUserThunk('getProfile', userAPI.getProfileAPI);
export const updateProfile = createUserThunk('updateProfile', userAPI.updateProfileAPI);
export const updatePassword = createUserThunk('updatePassword', userAPI.updatePasswordAPI);

// Orders Thunks
export const getMyOrders = createUserThunk('getMyOrders', userAPI.getMyOrdersAPI);
export const getOrderDetails = createUserThunk('getOrderDetails', userAPI.getOrderDetailsAPI);

// Addresses Thunks
export const getAddresses = createUserThunk('getAddresses', userAPI.getAddressesAPI);
export const addAddress = createUserThunk('addAddress', userAPI.addAddressAPI);
export const updateAddress = createUserThunk('updateAddress', userAPI.updateAddressAPI);
export const deleteAddress = createUserThunk('deleteAddress', userAPI.deleteAddressAPI);

const initialState = {
  // Profile
  profile: null,
  profileLoading: false,
  profileError: null,
  
  // Orders
  orders: [],
  orderDetails: null,
  ordersLoading: false,
  ordersError: null,
  
  // Addresses
  addresses: [],
  addressesLoading: false,
  addressesError: null,
   
  // General
  message: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.profileError = null;
      state.ordersError = null;
      state.addressesError = null;
    },
    clearUserMessage: (state) => {
      state.message = null;
    },
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearUserState: (state) => {
      state.profile = null;
      state.orders = [];
      state.orderDetails = null;
      state.addresses = [];
      state.profileLoading = false;
      state.ordersLoading = false;
      state.addressesLoading = false;
      state.profileError = null;
      state.ordersError = null;
      state.addressesError = null;
      state.message = null;
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

    // Profile
    addCommonCases(getProfile, 'profile');
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profile = action.payload;
      state.message = action.payload.message;
    });

    addCommonCases(updateProfile, 'profile');
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profile = action.payload;
      state.message = action.payload.message;
    });

    addCommonCases(updatePassword, 'profile');
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.message = action.payload.message;
    });

    // Orders
    addCommonCases(getMyOrders, 'orders');
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.orders = action.payload;
      state.message = action.payload.message;
    });

    addCommonCases(getOrderDetails, 'orders');
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.orderDetails = action.payload;
      state.message = action.payload.message;
    });

    // Addresses
    addCommonCases(getAddresses, 'addresses');
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.addressesLoading = false;
      state.addresses = action.payload;
      state.message = action.payload.message;
    });

    addCommonCases(addAddress, 'addresses');
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.addressesLoading = false;
      state.addresses.push(action.payload);
      state.message = action.payload.message;
    });

    addCommonCases(updateAddress, 'addresses');
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.addressesLoading = false;
      state.addresses = state.addresses.map(address => 
        address._id === action.payload._id ? action.payload : address
      );
      state.message = action.payload.message;
    });

    addCommonCases(deleteAddress, 'addresses');
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addressesLoading = false;
      state.addresses = state.addresses.filter(
        address => address._id !== action.payload._id
      );
      state.message = action.payload.message;
    });
  }
});

export const { 
  clearUserError, 
  clearUserMessage, 
  resetOrderDetails, 
  clearUserState 
} = userSlice.actions;

export default userSlice.reducer;