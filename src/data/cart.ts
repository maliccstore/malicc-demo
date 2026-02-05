export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
}

export interface Cart {
    id: string;
    items: CartItem[];
    totalAmount: number;
    totalItems: number;
}

export const demoCart: Cart = {
    id: 'cart-123',
    items: [],
    totalAmount: 0,
    totalItems: 0
};
