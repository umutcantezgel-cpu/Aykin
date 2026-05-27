import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AuthGuard } from '@/components/auth/AuthGuard';

export const metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAdmin={true}>
      <div className="flex h-screen bg-[#FAF8F5]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
