import { Order } from '@/types/orders';

export const demoOrders: Order[] = [
    {
        id: 'order-1001',
        status: 'PAID',
        fulfillmentStatus: 'DELIVERED',
        totalAmount: 3498,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        items: [
            {
                id: 'item-1',
                productName: 'Wireless Noise Cancelling Headphones',
                productId: '1',
                quantity: 1,
                unitPrice: 2999,
                totalPrice: 2999,
            },
            {
                id: 'item-2',
                productName: 'Cotton T-Shirt',
                productId: '3',
                quantity: 1,
                unitPrice: 499,
                totalPrice: 499,
            }
        ],
        shippingAddress: {
            addressLine1: '123 Innovation Drive',
            city: 'Bangalore',
            state: 'Karnataka',
            postalCode: '560100',
            country: 'India',
            fullName: 'User',
            phoneNumber: '+91 98765 43210'
        }
    },
    {
        id: 'order-1002',
        status: 'SHIPPED',
        fulfillmentStatus: 'PROCESSING',
        totalAmount: 3999,
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        items: [
            {
                id: 'item-3',
                productName: 'Smart Watch Series 5',
                productId: '2',
                quantity: 1,
                unitPrice: 3999,
                totalPrice: 3999,
            }
        ],
        shippingAddress: {
            addressLine1: '123 Innovation Drive',
            city: 'Bangalore',
            state: 'Karnataka',
            postalCode: '560100',
            country: 'India',
            fullName: 'User',
            phoneNumber: '+91 98765 43210'
        }
    }
];
