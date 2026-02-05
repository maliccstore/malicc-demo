import { AdminCategory } from '@/features/admin/categories/category.types';
import { demoCategories } from '@/data/categories';
import { Category } from '@/types/category';

// Map generic demo Category to AdminCategory
const mapCategoryToAdmin = (c: Category): AdminCategory => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  description: c.description || '',
  isActive: c.isActive,
  sortOrder: c.sortOrder || 0,
  parentId: c.parentId || undefined,
  children: c.children ? c.children.map(mapCategoryToAdmin) : [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

let adminCategories = demoCategories.map(mapCategoryToAdmin);

export const adminCategoryAPI = {
  getAll: async (filters?: { isActive?: boolean; search?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 400));

    let filtered = [...adminCategories];
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(s));
    }
    if (filters?.isActive !== undefined) {
      filtered = filtered.filter(c => c.isActive === filters.isActive);
    }

    return {
      data: filtered,
      totalCount: filtered.length
    };
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cat = adminCategories.find(c => c.id === id);
    if (!cat) throw new Error("Category not found");
    return { data: cat };
  },

  create: async (data: Partial<AdminCategory>) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newCat: AdminCategory = {
      id: `cat-${Date.now()}`,
      name: data.name || 'New Category',
      slug: data.slug || `cat-${Date.now()}`,
      description: data.description || '',
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder || 0,
      parentId: data.parentId || undefined,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    adminCategories.push(newCat);
    return { data: newCat };
  },

  update: async (id: string, data: Partial<AdminCategory>) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = adminCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Category not found");

    adminCategories[index] = {
      ...adminCategories[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return { data: adminCategories[index] };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const initialLen = adminCategories.length;
    adminCategories = adminCategories.filter(c => c.id !== id);
    if (adminCategories.length === initialLen) throw new Error("Category not found");

    return { data: { success: true, message: "Category deleted" } };
  },
};
