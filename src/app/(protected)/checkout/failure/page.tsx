"use client";

import { Box, Heading, Text, Button, Card, Flex } from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function CheckoutFailurePage() {
  return (
    <Box
      className="max-w-2xl mx-auto p-4 md:p-12 text-center"
      style={{ minHeight: "60vh" }}
    >
      <Card size="4" className="py-12">
        <Flex direction="column" align="center" gap="4">
          <CrossCircledIcon color="red" width={80} height={80} />
          <Heading size="8" color="red">
            Payment Failed
          </Heading>
          <Text size="4" color="gray" className="max-w-md mx-auto mt-2">
            We couldn&apos;t process your payment. This might be due to an
            incorrect card detail, insufficient funds, or a network issue.
          </Text>

          <Box className="bg-red-50 text-red-800 p-4 rounded-lg my-6 w-full max-w-sm border border-red-100">
            <Text size="2" weight="medium">
              Error Code: MOCK_GATEWAY_TIMEOUT
            </Text>
          </Box>

          <Flex gap="4" mt="4">
            <Link href="/checkout">
              <Button color="red">Retry Payment</Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" color="gray">
                Return to Cart
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
