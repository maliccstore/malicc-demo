import { AdminProduct } from '@/features/admin/products/product.types';
import { demoProducts } from '@/data/products';
import { Product } from '@/types/product';

// Helper to map generic demo Product to AdminProduct
const mapProductToAdmin = (p: Product): AdminProduct => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: p.price,
  status: p.inStock ? 'ACTIVE' : 'INACTIVE', // Mapping inStock to status for demo
  category: p.category,
  sku: `SKU-${p.id}`,
  images: p.image ? [p.image] : [],
  inventory: {
    quantity: p.inStock ? 50 : 0,
    availableQuantity: p.inStock ? 50 : 0
  },
  createdAt: p.createdAt,
  updatedAt: p.createdAt,
});

// Maintain a local state for admin edits
let adminProducts = demoProducts.map(mapProductToAdmin);

export const adminProductAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: [...adminProducts] };
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = adminProducts.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return { data: product };
  },

  create: async (data: Partial<AdminProduct>) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newProduct: AdminProduct = {
      id: `prod-${Date.now()}`,
      name: data.name || 'New Product',
      description: data.description || '',
      price: data.price || 0,
      category: data.category || '',
      sku: data.sku || `SKU-${Date.now()}`,
      status: data.status || 'INACTIVE',
      images: data.images || [],
      inventory: data.inventory || { quantity: 0, availableQuantity: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    adminProducts.push(newProduct);
    return { data: newProduct };
  },

  update: async (id: string, data: Partial<AdminProduct>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = adminProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");

    adminProducts[index] = {
      ...adminProducts[index],
      ...data,
      updatedAt: new Date().toISOString(),
      // Simple merge for inventory if present
      inventory: data.inventory ? { ...adminProducts[index].inventory, ...data.inventory } : adminProducts[index].inventory
    };

    return { data: adminProducts[index] };
  },

  disable: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = adminProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");

    const newStatus = adminProducts[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    adminProducts[index] = { ...adminProducts[index], status: newStatus };

    return { data: { isActive: newStatus === 'ACTIVE' } };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const initialLen = adminProducts.length;
    adminProducts = adminProducts.filter(p => p.id !== id);

    if (adminProducts.length === initialLen) throw new Error("Product not found");

    return { data: { success: true, message: "Product deleted" } };
  },
};
