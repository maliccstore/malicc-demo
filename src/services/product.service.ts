import { Product, ProductFilterInput } from '@/types/product';
import { demoProducts } from '@/data/products';
import { AdminProduct } from '@/features/admin/products/product.types';

const STORAGE_KEY = 'MALICC_DEMO_PRODUCTS';

const mapAdminToProduct = (adminP: AdminProduct): Product => ({
    id: adminP.id,
    name: adminP.name,
    description: adminP.description || '',
    image: adminP.images?.[0] || '',
    price: adminP.price,
    rating: '4', // Default rating as AdminProduct doesn't persist it. Type is '1'|'2'|'3'|'4'
    category: typeof adminP.category === 'string' ? adminP.category : adminP.category?.name || '',
    inStock: adminP.status === 'ACTIVE' && (adminP.inventory?.availableQuantity > 0),
    createdAt: adminP.createdAt,
});

export const productService = {
    fetchProducts: async (filters?: ProductFilterInput): Promise<Product[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredProducts: Product[] = [];

        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const adminProducts: AdminProduct[] = JSON.parse(stored);
                    filteredProducts = adminProducts.map(mapAdminToProduct);
                } catch (e) {
                    console.error("Failed to parse products from local storage", e);
                    filteredProducts = [...demoProducts];
                }
            } else {
                filteredProducts = [...demoProducts];
            }
        } else {
            filteredProducts = [...demoProducts];
        }

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
