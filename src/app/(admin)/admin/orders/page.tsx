'use client';

import React from 'react';
import { useOrders } from '@/hooks/useOrders';
import { KanbanBoard } from '@/components/admin/KanbanBoard';

export default function AdminOrdersPage() {
  const { orders, loading } = useOrders();

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="font-calistoga text-4xl text-charcoal mb-2">KDS Kanban</h1>
          <p className="font-bold text-charcoal/60">Aufträge verwalten & bearbeiten</p>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-peach border-t-terracotta rounded-full animate-spin" />
        </div>
      ) : (
        <KanbanBoard initialOrders={orders} />
      )}
    </div>
  );
}
