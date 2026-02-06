import { Category, CategoryFilterInput } from '@/types/category';
import { demoCategories } from '@/data/categories';

export const categoryService = {
  getAll: async (filters?: CategoryFilterInput): Promise<Category[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));

    let categories = [...demoCategories];

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        categories = categories.filter(c =>
          c.name.toLowerCase().includes(searchLower)
        );
      }
      if (filters.isActive !== undefined) {
        categories = categories.filter(c => c.isActive === filters.isActive);
      }
      if (filters.parentId !== undefined) {
        // For demo, we don't have nested cats yet, but handle logic
        categories = categories.filter(c => c.parentId === filters.parentId);
      }
    }

    return categories;
  }
};
