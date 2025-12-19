// src/app/admin/layout.tsx - Updated with hamburger inside container

import MobileSidebar from '@/components/admin/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileSidebar />

      {/* Main content area */}

      {/* Content */}
      <main>{children}</main>
    </div>
  );
}
