'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      redirect('/auth/login');
    }
  }, [isAuthenticated, loading]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
