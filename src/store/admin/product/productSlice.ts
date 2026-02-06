import { createSlice } from '@reduxjs/toolkit';
import { AdminProduct } from '@/features/admin/products/product.types';
import {
  fetchAdminProducts,
  fetchAdminProductById,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from './productThunks';

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
    builder.addCase(fetchAdminProducts.pending, (state) => {
      state.loading = true;
    })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        console.error('Failed to fetch products:', action.error);
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.current && state.current.id === action.payload.id) {
          state.current = action.payload;
        }
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
        if (state.current && state.current.id === action.payload) {
          state.current = undefined;
        }
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
