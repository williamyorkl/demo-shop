// @typescript-eslint/no-explicit-any
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Middleware } from 'redux';

export interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  scrollPosition: string;
}



// Helper function to load state from localStorage
const loadState = (): ProductsState | undefined => {
  try {
    const serializedState = localStorage.getItem('productsState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage', err);
    return undefined;
  }
};

// Helper function to save state to localStorage
const saveState = (state: ProductsState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('productsState', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage', err);
  }
};

const initialState: ProductsState = loadState() || {
  products: [],
  selectedProduct: null,
  status: 'idle',
  scrollPosition: '0',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
    setScrollPosition(state, action: PayloadAction<string>) {
      state.scrollPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});


export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  saveState(store.getState().products);
  return result;
};
export const { selectProduct, setScrollPosition } = productsSlice.actions;

export default productsSlice.reducer;
