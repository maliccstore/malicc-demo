import { orderManager } from '../sharedOrders';

export const ORDER_STATUS = {
  CREATED: 'CREATED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAID: 'PAID',
  FULFILLED: 'FULFILLED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
  PROCESSING: 'PROCESSING',
  DELIVERED: 'DELIVERED'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export const FULFILLMENT_STATUS = {
  UNFULFILLED: "UNFULFILLED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  RETURNED: "RETURNED",
} as const;

export type FulfillmentStatus = typeof FULFILLMENT_STATUS[keyof typeof FULFILLMENT_STATUS];

export interface OrderFilterInput {
  status?: OrderStatus;
  userId?: number;
  limit?: number;
  offset?: number;
}


// Local admin orders state is now shared via orderManager

export const getAllOrders = async (filters?: OrderFilterInput) => {
  await new Promise(resolve => setTimeout(resolve, 700));

  let result = orderManager.getAll();
  if (filters?.status) {
    result = result.filter(o => o.status === filters.status);
  }

  // Map to Admin Order List View structure
  const mappedOrders = result.map(o => ({
    id: o.id,
    status: o.status as OrderStatus,
    fulfillmentStatus: o.fulfillmentStatus as FulfillmentStatus,
    totalAmount: o.totalAmount,
    currency: 'INR',
    createdAt: String(o.createdAt),
    shippingAddress: {
      // Use actual name if available, fallback to Demo User
      fullName: o.shippingAddress?.fullName || 'Demo User'
    },
    items: o.items
  }));

  return {
    success: true,
    message: "Fetched orders",
    totalCount: result.length,
    orders: mappedOrders
  };
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const order = orderManager.update(id, { status });
    return {
      success: true,
      message: "Status updated",
      order: {
        id: id,
        status: order.status as OrderStatus
      }
    };
  } catch {
    throw new Error("Order not found");
  }
};

export const updateFulfillmentStatus = async (id: string, status: FulfillmentStatus) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const order = orderManager.update(id, { fulfillmentStatus: status });
    return {
      success: true,
      message: "Fulfillment status updated",
      order: {
        id: id,
        fulfillmentStatus: order.fulfillmentStatus as FulfillmentStatus
      }
    };
  } catch {
    throw new Error("Order not found");
  }
};

export const getOrderDetails = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const order = orderManager.getById(id);
  if (!order) throw new Error("Order not found");

  // Augment the simple demo order with full details needed for admin view
  const detailedOrder = {
    ...order,
    orderStatus: order.status,
    fulfillmentStatus: order.fulfillmentStatus,
    subtotal: order.totalAmount,
    tax: 0,
    shippingFee: 0,
    currency: 'INR',
    paymentMethod: 'COD',
    shippingMethod: 'Standard',
    updatedAt: order.createdAt,
    shippingAddress: order.shippingAddress ? {
      ...order.shippingAddress,
      // Use existing values if present, else defaults
      fullName: order.shippingAddress.fullName || 'Demo User',
      phoneNumber: order.shippingAddress.phoneNumber || '9876543210',
      postalCode: order.shippingAddress.postalCode || '560100',
      country: order.shippingAddress.country || 'IN',
      addressLine2: order.shippingAddress.addressLine2 || ''
    } : undefined
  };

  return {
    success: true,
    message: "Order details fetched",
    order: detailedOrder
  };
}
