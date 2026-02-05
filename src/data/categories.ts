import { Category } from '@/types/category';

export const demoCategories: Category[] = [
    {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        isActive: true,
        sortOrder: 1,
        children: [],
    },
    {
        id: '2',
        name: 'Clothing',
        slug: 'clothing',
        description: 'Men and Women fashion',
        isActive: true,
        sortOrder: 2,
        children: [],
    },
    {
        id: '3',
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        description: 'Everything you need for your home',
        isActive: true,
        sortOrder: 3,
        children: [],
    },
    {
        id: '4',
        name: 'Books',
        slug: 'books',
        description: 'Explore our vast collection of books',
        isActive: true,
        sortOrder: 4,
        children: [],
    }
];
