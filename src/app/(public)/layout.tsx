// src/app/layout.tsx

import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '@radix-ui/themes/styles.css';

import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';

import { Box, Container } from '@radix-ui/themes';

export const metadata: Metadata = {
  title: 'Malicc Store',
  description: 'An Ecommerce Store for all',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <Container className="p-4">
        <Box>{children}</Box>
      </Container>
      <BottomNavigation />
    </>
  );
}
