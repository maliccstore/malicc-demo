// src/app/admin/layout.tsx - Updated with hamburger inside container

import AdminSidebar from '@/components/admin/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
