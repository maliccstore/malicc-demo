import { demoCart, Cart, CartItem } from "../data/cart";
import { demoProducts } from "../data/products";

// Local cart state
let currentCart: Cart = { ...demoCart };

export const cartAPI = {
  addToCart: async (productId: string, quantity: number = 1) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const product = demoProducts.find(p => p.id === productId);
    if (!product) throw new Error("Product not found");

    const existingItemIndex = currentCart.items.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      currentCart.items[existingItemIndex].quantity += quantity;
      // Recalculate logic if needed, simplistically:
    } else {
      const newItem: CartItem = {
        productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      };
      currentCart.items.push(newItem);
    }

    // Recalculate totals
    currentCart.totalItems = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.totalAmount = currentCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Return structure expected by frontend
    return currentCart;
  },

  getCart: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Return a copy so Redux doesn't freeze the mutable service state
    return { ...currentCart, items: [...currentCart.items] };
  },

  // Helper to clear cart (used in checkout)
  clearCart: () => {
    currentCart = {
      id: 'cart-123',
      items: [],
      totalAmount: 0,
      totalItems: 0
    };
  }
};
