'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuthActions';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/auth/login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
