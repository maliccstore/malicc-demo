import { RootState } from './index';

const isBrowser = typeof window !== 'undefined';

export const loadState = () => {
  if (!isBrowser) return undefined;

  try {
    const serializedState = localStorage.getItem('cartState');
    return serializedState ? JSON.parse(serializedState) : undefined;
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
