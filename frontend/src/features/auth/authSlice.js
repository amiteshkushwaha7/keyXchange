import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authAPI';

// Helper function to handle common async thunk patterns
const createAuthThunk = (name, apiCall) => createAsyncThunk(
  `auth/${name}`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCall(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
); 

export const registerUser = createAuthThunk('register', authAPI.registerAPI);
export const loginUser = createAuthThunk('login', authAPI.loginAPI);
export const logoutUser = createAuthThunk('logout', authAPI.logoutAPI);
export const loadUser = createAuthThunk('loadUser', authAPI.loadUserAPI);
export const refreshUser = createAuthThunk('refreshUser', authAPI.refreshAPI);
export const forgotPassword = createAuthThunk('forgotPassword', authAPI.forgotPasswordAPI);
export const updatePassword = createAuthThunk('updatePassword', authAPI.updatePasswordAPI);
export const resetPassword = createAuthThunk('resetPassword', authAPI.resetPasswordAPI);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  // accessToken: null,
  error: null,
  message: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => { 
      state.message = null;
    },
    setAccessToken: (state, action) => {
      // state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isAuthenticated = true; 
      state.message = action.payload.message;
    },
    clearAuthState: (state) => {
      state.user = null;
      // state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
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

    // Register
    addCommonCases(registerUser);
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      // state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    }); 

    // Login
    addCommonCases(loginUser);
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      // state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    }); 

    // Logout
    addCommonCases(logoutUser);
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      // state.accessToken = null;
      state.isAuthenticated = false;
      state.message = 'Logged out successfully';
    });
 
    // Load User
    addCommonCases(loadUser);
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      // state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    });

    // Refresh User
    addCommonCases(refreshUser);
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.loading = false;
      // state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    });

    // Forgot Password
    addCommonCases(forgotPassword);
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });

    // Update Password
    addCommonCases(updatePassword);
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });

    // Reset Password
    addCommonCases(resetPassword);
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
  }
});

export const { clearError, clearMessage, setAccessToken, clearAuthState } = authSlice.actions;
export default authSlice.reducer;