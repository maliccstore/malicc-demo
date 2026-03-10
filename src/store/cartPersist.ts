import { RootState } from './index';

const isBrowser = typeof window !== 'undefined';

export const loadState = () => {
  if (!isBrowser) return undefined;

  try {
    const serializedState = localStorage.getItem('cartState');
    if (!serializedState) return undefined;
    const parsed = JSON.parse(serializedState);
    return {
      ...parsed,
      couponCode: parsed.couponCode || null,
      discountAmount: typeof parsed.discountAmount === 'number' && !isNaN(parsed.discountAmount) ? parsed.discountAmount : 0,
    };
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  if (!isBrowser) return;

  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};
