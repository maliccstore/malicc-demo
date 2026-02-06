import { RootState } from './index';

const isBrowser = typeof window !== 'undefined';

export const loadWishlistState = () => {
    if (!isBrowser) return undefined;

    try {
        const serializedState = localStorage.getItem('wishlistState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error('Failed to load wishlist state:', err);
        return undefined;
    }
};

export const saveWishlistState = (state: RootState) => {
    if (!isBrowser) return;

    try {
        const serializedState = JSON.stringify(state.wishlist);
        localStorage.setItem('wishlistState', serializedState);
    } catch (err) {
        console.error('Failed to save wishlist state:', err);
    }
};
