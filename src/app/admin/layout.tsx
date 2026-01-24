// src/app/admin/layout.tsx - Updated with hamburger inside container

import AdminHeader from '@/components/admin/layout/AdminHeader';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import { Flex, Box } from '@radix-ui/themes';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <AdminHeader />
      <Box p="4">{children}</Box>
    </Flex>
  );
}
