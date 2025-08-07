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

const initialState = {
  // Profile
  profile: null,
  profileLoading: false,
  profileError: null,
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
    clearUserState: (state) => {
      state.profile = null;
      state.profileLoading = false;
      state.profileError = null;
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
  }
});

export const { 
  clearUserError, 
  clearUserMessage, 
  clearUserState 
} = userSlice.actions;

export default userSlice.reducer;