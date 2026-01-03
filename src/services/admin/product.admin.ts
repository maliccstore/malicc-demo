import apiClient from '@/services/apiClient';
import { AdminProduct } from '@/features/admin/products/product.types';

export const adminProductAPI = {
  getAll: () => apiClient.get<AdminProduct[]>('/admin/products'),

  getById: (id: string) => apiClient.get<AdminProduct>(`/admin/products/${id}`),

  create: (data: Partial<AdminProduct>) =>
    apiClient.post('/admin/products', data),

  update: (id: string, data: Partial<AdminProduct>) =>
    apiClient.put(`/admin/products/${id}`, data),

  disable: (id: string) => apiClient.patch(`/admin/products/${id}/disable`),
};
