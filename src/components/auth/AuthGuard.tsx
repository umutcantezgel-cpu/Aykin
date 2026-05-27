"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import * as Icons from 'lucide-react';

export function AuthGuard({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
      } else if (requireAdmin && role !== 'admin') {
        router.push('/profile');
      }
    }
  }, [user, role, loading, router, pathname, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Icons.Loader2 className="w-8 h-8 text-[#C41E3A] animate-spin" />
      </div>
    );
  }

  if (!user || (requireAdmin && role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
}
