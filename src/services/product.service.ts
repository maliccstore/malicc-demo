import { Product, ProductFilterInput } from '@/types/product';
import { demoProducts } from '@/data/products';

export const productService = {
    fetchProducts: async (filters?: ProductFilterInput): Promise<Product[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredProducts = [...demoProducts];

        if (filters) {
            if (filters.category) {
                // Determine if category is ID or name. Demo data uses names like 'Electronics'
                // The filter input usually comes from URL, which might be name or slug. 
                // We'll perform a loose match for demo purposes.
                const catLower = filters.category.toLowerCase();
                filteredProducts = filteredProducts.filter(p =>
                    p.category.toLowerCase() === catLower ||
                    p.category.toLowerCase().includes(catLower)
                );
            }
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower)
                );
            }
            if (filters.minPrice !== undefined) {
                filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
            }
            if (filters.maxPrice !== undefined) {
                filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
            }
            // isActive is not strictly in Product type in d.ts but inferred in demo data.
            // demo products don't have isActive property explicitly in the list I created, 
            // but the original service mapped it. 
            // My demo data has inStock.
        }

        return filteredProducts;
    },
};
