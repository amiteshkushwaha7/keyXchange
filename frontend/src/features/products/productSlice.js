import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productAPI from './productAPI';

// Helper function to create product thunks with consistent error handling
const createProductThunk = (name, apiCall) => createAsyncThunk(
  `products/${name}`,
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
export const getAllProducts = createProductThunk('fetchAll', productAPI.getAllProductsAPI);
export const getProductById = createProductThunk('getById', productAPI.getProductByIdAPI);
export const createProduct = createProductThunk('create', productAPI.createProductAPI);
export const updateProduct = createProductThunk('update', productAPI.updateProductAPI);
export const deleteProduct = createProductThunk('delete', productAPI.deleteProductAPI);
export const getSimilarProducts = createProductThunk('getSimilar', productAPI.getSimilarProducts);
export const searchProducts = createProductThunk('search', productAPI.searchProducts);

const initialState = {
  products: [],
  currentProduct: null,
  similarProducts: [],
  loading: false,
  error: null,
  message: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearProductMessage: (state) => {
      state.message = null;
    },
    resetCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearSimilarProducts: (state) => {
      state.similarProducts = [];
    },
    clearProductState: (state) => {
      state.products = [];
      state.currentProduct = null;
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

    // Fetch Products
    addCommonCases(getAllProducts);
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.message = action.payload.message;
    });
 
    // Get Product By ID
    addCommonCases(getProductById);
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
      state.message = action.payload.message;
    });

    // Create Product
    addCommonCases(createProduct);
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload);
      state.message = action.payload.message;
    });

    // Update Product
    addCommonCases(updateProduct);
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = state.products.map(product => 
      //   product._id === action.payload._id ? action.payload : product
      // );
      state.products.unshift(action.payload);
      // state.currentProduct = action.payload;
      state.message = action.payload.message;
    });

    // Delete Product
    addCommonCases(deleteProduct);
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(p => p._id !== action.payload);
      state.message = 'Product deleted successfully';
    });

    // Get similar products
    addCommonCases(getSimilarProducts);
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.similarProducts = action.payload;
      // console.log(action.payload);
    });

    // Search Products
    addCommonCases(searchProducts); 
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.message = action.payload.message;
    });
  }
});

export const { 
  clearProductError, 
  clearProductMessage, 
  resetCurrentProduct, 
  clearSimilarProducts, 
  clearProductState 
} = productSlice.actions;

export default productSlice.reducer;