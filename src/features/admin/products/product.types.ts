export type AdminProductStatus = 'ACTIVE' | 'INACTIVE';

export interface AdminProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: AdminProductStatus;
  category?: string;
  //   healthTags?: string[];
  images?: string[];
  createdAt: string;
  updatedAt: string;
}
