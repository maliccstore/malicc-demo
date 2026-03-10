import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import { AdminCoupon, DiscountType } from '@/features/admin/coupons/coupon.types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isCartOpen: boolean;
  couponCode: string | null;
  appliedCoupon: AdminCoupon | null;
  discountAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isCartOpen: false,
  couponCode: null,
  appliedCoupon: null,
  discountAmount: 0,
};

const recalculateDiscount = (state: CartState) => {
  const coupon = state.appliedCoupon;
  if (!coupon || !coupon.isActive) {
    state.discountAmount = 0;
    state.couponCode = null;
    state.appliedCoupon = null;
    return;
  }

  // Check min order value
  if (coupon.minOrderValue && state.totalAmount < coupon.minOrderValue) {
    state.discountAmount = 0;
    // We keep the coupon applied but with 0 discount if it doesn't meet the criteria? 
    // Usually it's better to just invalidate it if the criteria isn't met.
    return;
  }

  let discount = 0;
  if (coupon.discountType === DiscountType.PERCENTAGE) {
    discount = state.totalAmount * (coupon.discountValue / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  state.discountAmount = Math.min(discount, state.totalAmount);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (!state.items) state.items = [];
      if (typeof state.totalQuantity !== 'number' || isNaN(state.totalQuantity)) state.totalQuantity = 0;
      if (typeof state.totalAmount !== 'number' || isNaN(state.totalAmount)) state.totalAmount = 0;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
      recalculateDiscount(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      if (!state.items) state.items = [];
      if (typeof state.totalQuantity !== 'number' || isNaN(state.totalQuantity)) state.totalQuantity = 0;
      if (typeof state.totalAmount !== 'number' || isNaN(state.totalAmount)) state.totalAmount = 0;
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          existingItem.quantity -= 1;
        }
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
        recalculateDiscount(state);
      }
    },
    removeItemCompletely: (state, action: PayloadAction<string>) => {
      if (!state.items) state.items = [];
      if (typeof state.totalQuantity !== 'number' || isNaN(state.totalQuantity)) state.totalQuantity = 0;
      if (typeof state.totalAmount !== 'number' || isNaN(state.totalAmount)) state.totalAmount = 0;
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
        recalculateDiscount(state);
      }
    },
    applyCoupon: (state, action: PayloadAction<{ coupon: AdminCoupon; discountAmount: number }>) => {
      state.appliedCoupon = action.payload.coupon;
      state.couponCode = action.payload.coupon.code;
      state.discountAmount = action.payload.discountAmount;
    },
    clearCoupon: (state) => {
      state.couponCode = null;
      state.appliedCoupon = null;
      state.discountAmount = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.couponCode = null;
      state.appliedCoupon = null;
      state.discountAmount = 0;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeItemCompletely,
  applyCoupon,
  clearCoupon,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
