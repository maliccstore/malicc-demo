'use client';
// import { Metadata } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CartItems from '@/components/cart/CartItems';
import CheckoutSummary from '@/components/cart/CheckoutSummary';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// export const metadata: Metadata = {
//   title: 'Your Shopping Cart',
// };

export default function CartPage() {
  // Note: In Next.js 13+ with server components, you might need to use a different approach
  // to access Redux state. You might want to move this to a client component.
  const { totalQuantity } = useSelector((state: RootState) => state.cart);

  if (totalQuantity === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link href="/explore">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart ({totalQuantity})</h1>

      <div className="flex flex-col gap-8">
        <div className="max-w-full">
          <CartItems />
        </div>

        <div className="max-w-full">
          <CheckoutSummary />
        </div>
        <div className="sticky bottom-12 flex justify-center">
          <Link href="/checkout" className="block mt-4">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
