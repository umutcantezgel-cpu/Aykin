'use client';

import React from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListOrdered, Utensils, Settings, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'KDS Kanban', icon: ListOrdered },
  { href: '/admin/menu', label: 'Menü Manager', icon: Utensils },
  { href: '/admin/settings', label: 'Einstellungen', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-cream border-r border-peach h-screen sticky top-0 flex flex-col hidden md:flex shrink-0">
      <div className="p-6 border-b border-peach">
        <TransitionLink href="/" className="flex items-center gap-3">
          <Logo variant="primary" className="w-8 h-8" />
          <span className="font-calistoga text-xl text-bark mt-1">Admin</span>
        </TransitionLink>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <TransitionLink 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                isActive 
                  ? 'bg-terra text-white shadow-terra' 
                  : 'text-bark hover:bg-beige hover:text-terra'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold text-[14px]">{item.label}</span>
            </TransitionLink>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <TransitionLink 
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-bark-soft hover:bg-beige hover:text-terra transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-bold text-[14px]">Zum Shop</span>
        </TransitionLink>
      </div>
    </aside>
  );
}
