"use client";

import { Box, Heading, Text, Button, Card, Flex } from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Generate a mock order ID
    const randomId = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`ORD-${randomId}`);
  }, []);

  return (
    <Box
      className="max-w-2xl mx-auto p-4 md:p-12 text-center"
      style={{ minHeight: "60vh" }}
    >
      <Card size="4" className="py-12">
        <Flex direction="column" align="center" gap="4">
          <CheckCircledIcon color="green" width={80} height={80} />
          <Heading size="8" color="green">
            Order Confirmed!
          </Heading>
          <Text size="4" color="gray" className="max-w-md mx-auto mt-2">
            Thank you for your purchase. We&apos;ve received your order and will
            begin processing it right away.
          </Text>

          <Box className="bg-gray-50 p-4 rounded-lg my-6 w-full max-w-sm">
            <Text
              size="2"
              color="gray"
              weight="bold"
              className="uppercase tracking-wider"
            >
              Order Number
            </Text>
            <Heading size="6" className="mt-1">
              {orderId || "Loading..."}
            </Heading>
          </Box>

          <Flex gap="4" mt="4">
            <Link href="/orders">
              <Button variant="outline" color="gray">
                View Orders
              </Button>
            </Link>
            <Link href="/explore">
              <Button color="gray" highContrast>
                Continue Shopping
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
