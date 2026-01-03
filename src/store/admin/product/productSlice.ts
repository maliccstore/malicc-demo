import { createSlice } from '@reduxjs/toolkit';
import { AdminProduct } from '@/features/admin/products/product.types';
import { fetchAdminProducts, fetchAdminProductById } from './productThunks';

interface ProductState {
  list: AdminProduct[];
  current?: AdminProduct;
  loading: boolean;
}

const initialState: ProductState = {
  list: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.current = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
