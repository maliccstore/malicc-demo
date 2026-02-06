import { cartAPI } from "./cart.service";
import { Order } from "@/types/orders";
import { orderManager } from "./sharedOrders";

// Local orders state is now managed in sharedOrders to sync with Admin

export const orderAPI = {
  checkout: async (addressId: number, paymentMethod: string = "COD") => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(addressId, paymentMethod);

    // Get current cart items
    const cart = await cartAPI.getCart();

    if (cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      status: 'CREATED',
      fulfillmentStatus: 'UNFULFILLED',
      totalAmount: cart.totalAmount,
      createdAt: new Date().toISOString(),
      items: cart.items.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        productName: item.name,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
      })),
      shippingAddress: {
        addressLine1: '123 Innovation Drive',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560100',
        country: 'India',
        fullName: 'Pranay Gupta',
        phoneNumber: '+91 98765 43210'
      }
    };

    // Add to shared state
    orderManager.add(newOrder);

    // Clear the cart
    cartAPI.clearCart();

    return {
      success: true,
      message: "Order placed successfully",
      order: newOrder
    };
  },

  myOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      message: "Orders fetched",
      orders: orderManager.getAll()
    };
  },

  getOrder: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const order = orderManager.getById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      success: true,
      message: "Order fetched",
      order: {
        ...order,
        subtotal: order.totalAmount,
        tax: 0,
        shippingFee: 0,
        currency: 'INR',
        paymentMethod: 'COD',
        shippingMethod: 'Standard',
        updatedAt: order.createdAt,
        shippingAddress: order.shippingAddress ? {
          ...order.shippingAddress,
          fullName: order.shippingAddress.fullName || '',
          phoneNumber: order.shippingAddress.phoneNumber || '',
          postalCode: order.shippingAddress.postalCode || '',
          country: order.shippingAddress.country || '',
        } : undefined,
      }
    };
  },
};
