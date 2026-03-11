import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAdminOrders, updateAdminOrderStatus } from "./orderThunks";
import { OrderStatus, FulfillmentStatus } from "@/services/admin/order.admin";

/* ================================
   Domain Types
================================ */

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  fulfillmentStatus?: FulfillmentStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  shippingAddress: {
    fullName: string;
  };
  items: OrderItem[];
}

export interface OrdersPayload {
  orders: Order[];
  totalCount: number;
}

/* ================================
   State
================================ */

interface OrderState {
  list: Order[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  list: [],
  totalCount: 0,
  loading: false,
  error: null,
};

/* ================================
   Slice
================================ */

const orderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchAdminOrders.fulfilled,
        (state, action: PayloadAction<OrdersPayload>) => {
          state.loading = false;
          state.list = action.payload.orders;
          state.totalCount = action.payload.totalCount;
        },
      )

      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Order Status
      .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
        const order = state.list.find((o) => o.id === action.payload.id);
        if (order) {
          order.status = action.payload.status;
        }
      });
  },
});

export default orderSlice.reducer;
