import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Box } from '@radix-ui/themes';

const CheckoutSummary = () => {
  const { totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <Box className=" rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Items ({totalQuantity})</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="border-t  pt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </Box>
  );
};

export default CheckoutSummary;
