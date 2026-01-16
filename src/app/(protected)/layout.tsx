'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuthActions';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import { Box, Container } from '@radix-ui/themes';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect(`/auth/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname]);

  return (
    <>
      <Header />
      <Container className="p-4">
        <Box>
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              Loading...
            </div>
          ) : (
            children
          )}
        </Box>
      </Container>
      <BottomNavigation />
    </>
  );
}
