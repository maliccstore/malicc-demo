'use client';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// import { useDispatch } from 'react-redux';
// import { toggleCart } from '../../store/slices/cartSlice';

const CartIcon = () => {
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  // const dispatch = useDispatch();

  return (
    <button
      className="relative p-2"
      // onClick={() => dispatch(toggleCart())}
      aria-label="Cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
