import { AdminProduct } from '@/features/admin/products/product.types';
import { demoProducts } from '@/data/products';
import { Product } from '@/types/product';

// Helper to map generic demo Product to AdminProduct
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

const STORAGE_KEY = 'MALICC_DEMO_PRODUCTS';

const getStoredProducts = (): AdminProduct[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Initialize with demo data if empty
  const initial = demoProducts.map(mapProductToAdmin);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

const saveStoredProducts = (products: AdminProduct[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const adminProductAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: getStoredProducts() };
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getStoredProducts();
    const product = products.find(p => p.id === id);
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

    const products = getStoredProducts();
    products.push(newProduct);
    saveStoredProducts(products);

    return { data: newProduct };
  },

  update: async (id: string, data: Partial<AdminProduct>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");

    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
      // Simple merge for inventory if present
      inventory: data.inventory ? { ...products[index].inventory, ...data.inventory } : products[index].inventory
    };

    saveStoredProducts(products);
    return { data: products[index] };
  },

  disable: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");

    const newStatus = products[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    products[index] = { ...products[index], status: newStatus };

    saveStoredProducts(products);
    return { data: { isActive: newStatus === 'ACTIVE' } };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const products = getStoredProducts();
    const initialLen = products.length;
    const newProducts = products.filter(p => p.id !== id);

    if (newProducts.length === initialLen) throw new Error("Product not found");

    saveStoredProducts(newProducts);
    return { data: { success: true, message: "Product deleted" } };
  },
};
