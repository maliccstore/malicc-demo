import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Box,
  Flex,
  Heading,
  Text,
  TextField,
  Button,
  Separator,
  Callout,
} from "@radix-ui/themes";
import { InfoCircledIcon, CheckCircledIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { applyCoupon, clearCoupon } from "../../store/slices/cartSlice";

import { adminCouponAPI } from "../../services/admin/coupon.admin";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const { totalQuantity, totalAmount, couponCode: appliedCoupon, discountAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const [couponCode, setCouponCode] = useState(appliedCoupon || "");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setErrorMessage("Please enter a coupon code");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const safeTotal = typeof totalAmount === 'number' && !isNaN(totalAmount) ? totalAmount : 0;
      const { data: coupon, discountAmount } = await adminCouponAPI.validate(couponCode, safeTotal);

      dispatch(applyCoupon({ coupon, discountAmount }));
      
      const discountText = coupon.discountType === 'PERCENTAGE' 
        ? `${coupon.discountValue}%` 
        : `₹${coupon.discountValue}`;
      
      setSuccessMessage(`Coupon applied successfully! You saved ${discountText}`);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Invalid or expired coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearCoupon());
    setCouponCode("");
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const safeTotal = typeof totalAmount === 'number' && !isNaN(totalAmount) ? totalAmount : 0;
  const safeQuantity = typeof totalQuantity === 'number' && !isNaN(totalQuantity) ? totalQuantity : 0;
  const safeDiscount = typeof discountAmount === 'number' && !isNaN(discountAmount) ? discountAmount : 0;
  // Ensure total doesn't go below zero
  const finalTotal = Math.max(safeTotal - safeDiscount, 0);

  return (
    <Box className="rounded-lg shadow p-6" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading as="h2" size="3">
        Order Summary
      </Heading>

      {/* Coupon Input */}
      <Flex direction="column" gap="2">
        <Flex gap="2">
          <TextField.Root
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            style={{ flex: 1 }}
            disabled={!!appliedCoupon}
          />

          {!!appliedCoupon ? (
            <Button onClick={handleRemoveCoupon} disabled={loading} color="red" variant="soft">
              <Cross1Icon /> Remove
            </Button>
          ) : (
            <Button onClick={handleApplyCoupon} disabled={loading} color="gray" highContrast>
              {loading ? "Applying..." : "Apply"}
            </Button>
          )}
        </Flex>

        {successMessage && (
          <Callout.Root color="green" size="1">
            <Callout.Icon>
              <CheckCircledIcon />
            </Callout.Icon>
            <Callout.Text>{successMessage}</Callout.Text>
          </Callout.Root>
        )}
        {errorMessage && (
          <Callout.Root color="red" size="1">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{errorMessage}</Callout.Text>
          </Callout.Root>
        )}

        {!appliedCoupon && !errorMessage && !successMessage && (
          <Text size="1" color="gray" className="pl-1">
            <span className="font-medium text-gray-700">Available:</span> <b>DISCOUNT10</b> (10% off), <b>SAVE20</b> (₹500 off)
          </Text>
        )}
      </Flex>

      {/* Order Details */}
      <Flex direction="column" gap="3" pt="2">
        <Flex justify="between">
          <Text>Subtotal ({safeQuantity} items)</Text>
          <Text>${safeTotal.toFixed(2)}</Text>
        </Flex>

        {safeDiscount > 0 && (
          <Flex justify="between">
            <Text>Discount ({appliedCoupon})</Text>
            <Text color="green">-${safeDiscount.toFixed(2)}</Text>
          </Flex>
        )}

        <Flex justify="between">
          <Text>Shipping</Text>
          <Text color="green">Free</Text>
        </Flex>

        <Separator size="4" />

        <Flex justify="between">
          <Text weight="medium">Total</Text>
          <Text weight="medium">${finalTotal.toFixed(2)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckoutSummary;
