'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { addressAPI } from '@/services/address.service';
import { Address } from '@/types/address';
import toast from 'react-hot-toast';
import { Card, Heading, Text, Badge, RadioCards, Flex, TextField, Checkbox } from '@radix-ui/themes';
import { MapPin, Truck, CreditCard, Wallet, Banknote, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const rawTotalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalAmount = typeof rawTotalAmount === 'number' && !isNaN(rawTotalAmount) ? rawTotalAmount : 0;
  const couponCode = useAppSelector((state) => state.cart.couponCode);
  const rawDiscount = useAppSelector((state) => state.cart.discountAmount);
  const discountAmount = typeof rawDiscount === 'number' && !isNaN(rawDiscount) ? rawDiscount : 0;
  const finalTotal = Math.max(totalAmount - discountAmount, 0);

  // State
  const [loading, setLoading] = useState(true);
  const [deployingOrder, setDeployingOrder] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const addresses = await addressAPI.getUserAddresses();

        // Find default address
        const def = addresses.find(addr => addr.isDefault) || addresses[0] || null;
        setDefaultAddress(def);

      } catch (error) {
        console.error("Failed to fetch addresses", error);
        toast.error("Could not load addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handlePlaceOrder = async () => {
    if (!defaultAddress) {
      toast.error("Please add a delivery address first");
      return;
    }

    try {
      setDeployingOrder(true);
      
      // Simulate payment processing delay (mock behavior)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 90% success rate mock
      if (Math.random() > 0.1) {
        toast.success("Payment successful!");
        dispatch(clearCart());
        router.push('/checkout/success');
      } else {
        toast.error("Payment failed. Please try again.");
        router.push('/checkout/failure');
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong processing your order");
    } finally {
      setDeployingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Text size="3" className="text-gray-500">Loading checkout details...</Text>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <Heading size="6" className="mb-4">Your cart is empty</Heading>
        <Link href="/explore">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Heading size="8" className="mb-8 font-bold tracking-tight">Checkout</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Delivery Address Section */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
              <MapPin className="text-blue-600" size={24} />
              <Heading size="4" className="font-semibold">Delivery Address</Heading>
            </div>

            {defaultAddress ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Text weight="bold" size="3">{defaultAddress.fullName}</Text>
                  {defaultAddress.isDefault && <Badge color="green">Default</Badge>}
                </div>
                <Text as="p" size="2" className="text-gray-600 block">
                  {defaultAddress.addressLine1}, {defaultAddress.addressLine2 ? defaultAddress.addressLine2 + ', ' : ''}
                </Text>
                <Text as="p" size="2" className="text-gray-600 block">
                  {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.postalCode}
                </Text>
                <Text as="p" size="2" className="text-gray-600 block mt-1">
                  Phone: {defaultAddress.phoneNumber}
                </Text>
              </div>
            ) : (
              <div className="text-center py-6">
                <Text color="gray" className="mb-4 block">No delivery address found.</Text>
                <Link href="/address/new">
                  <Button className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50">Add New Address</Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Payment Method Section */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
              <CreditCard className="text-indigo-600" size={24} />
              <Heading size="4" className="font-semibold">Payment Method</Heading>
            </div>
            
            <div className="mb-6">
              <RadioCards.Root value={paymentMethod} onValueChange={setPaymentMethod} columns={{ initial: '1', sm: '3' }}>
                <RadioCards.Item value="card">
                  <Flex direction="column" align="center" gap="2" py="2">
                    <CreditCard size={20} />
                    <Text weight="medium">Credit/Debit Card</Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item value="wallet">
                  <Flex direction="column" align="center" gap="2" py="2">
                    <Wallet size={20} />
                    <Text weight="medium">Digital Wallet</Text>
                  </Flex>
                </RadioCards.Item>
                <RadioCards.Item value="cod">
                  <Flex direction="column" align="center" gap="2" py="2">
                    <Banknote size={20} />
                    <Text weight="medium">Cash on Delivery</Text>
                  </Flex>
                </RadioCards.Item>
              </RadioCards.Root>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <Text weight="medium" size="3">Card Details</Text>
                <TextField.Root placeholder="Card Number (Mock UI)" size="3">
                  <TextField.Slot>
                    <CreditCard height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
                <div className="grid grid-cols-2 gap-4">
                  <TextField.Root placeholder="MM/YY" size="3" />
                  <TextField.Root placeholder="CVV" size="3" />
                </div>
                <TextField.Root placeholder="Name on Card" size="3" />
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="p-4 bg-gray-50 rounded text-center">
                <Text size="2" color="gray">You will be redirected to your wallet provider after clicking Place Order.</Text>
              </div>
            )}
            
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-gray-50 rounded text-center">
                <Text size="2" color="gray">Pay with cash when your order is delivered to your address.</Text>
              </div>
            )}
          </Card>

          {/* Billing Address Section */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
              <Heading size="4" className="font-semibold">Billing Address</Heading>
            </div>
            
            <Flex align="center" gap="2">
              <Checkbox 
                checked={sameAsBilling} 
                onCheckedChange={(checked) => setSameAsBilling(checked as boolean)} 
              />
              <Text as="label" size="2">Same as delivery address</Text>
            </Flex>

            {!sameAsBilling && (
              <div className="mt-4 p-4 border rounded border-gray-200 bg-gray-50">
                <Text size="2" color="gray" className="block text-center mb-2">
                  (Mock UI: Billing Address Form would appear here)
                </Text>
                <div className="space-y-3">
                  <TextField.Root placeholder="Full Name" />
                  <TextField.Root placeholder="Address Line 1" />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField.Root placeholder="City" />
                    <TextField.Root placeholder="Postal Code" />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Order Items Review */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
              <Truck className="text-orange-600" size={24} />
              <Heading size="4" className="font-semibold">Order Items ({cartItems.length})</Heading>
            </div>
            <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div className="flex gap-4">
                      <div className="space-y-1">
                        <Text weight="medium" className="block">{item.name}</Text>
                        <Text size="1" color="gray">Qty: {item.quantity}</Text>
                      </div>
                    </div>
                    <Text weight="medium">${(item.price * item.quantity).toFixed(2)}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>

        </div>

        {/* Right Column - Order Summary Section */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <Heading size="4" className="font-semibold mb-6">Order Summary</Heading>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {couponCode && `(${couponCode})`}</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full text-lg py-6 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              onClick={handlePlaceOrder}
              disabled={deployingOrder || !defaultAddress}
            >
              {deployingOrder ? (
                <>Processing...</>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  Place Order
                </>
              )}
            </Button>

            {!defaultAddress && (
              <Text size="1" color="red" className="mt-2 block text-center">
                Please add an address to continue
              </Text>
            )}
            
            <Text size="1" color="gray" align="center" className="block mt-4 leading-relaxed">
              Payments are secure and encrypted. <br/> (Mock Checkout for internal demo)
            </Text>
          </Card>
        </div>

      </div>
    </div>
  );
}
