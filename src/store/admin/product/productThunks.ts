import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminProductAPI } from '@/services/admin/product.admin';

export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchAll',
  async () => {
    const res = await adminProductAPI.getAll();
    return res.data;
  }
);

export const fetchAdminProductById = createAsyncThunk(
  'adminProducts/fetchById',
  async (id: string) => {
    const res = await adminProductAPI.getById(id);
    return res.data;
  }
);
