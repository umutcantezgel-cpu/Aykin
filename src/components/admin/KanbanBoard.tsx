'use client';

import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { Order } from '@/types/firestore';
import { Clock, Check, ChevronRight } from 'lucide-react';

const STATUS_COLUMNS = ['pending', 'preparing', 'ready'] as const;

interface KanbanBoardProps {
  initialOrders: Order[];
}

export function KanbanBoard({ initialOrders }: KanbanBoardProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Sync when real-time updates arrive
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    // Optimistic update
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
      // Revert on error
      setOrders(initialOrders);
    }
  };

  const handleAdvance = (order: Order) => {
    if (order.status === 'pending') updateOrderStatus(order.id, 'preparing');
    else if (order.status === 'preparing') updateOrderStatus(order.id, 'ready');
    else if (order.status === 'ready') updateOrderStatus(order.id, 'completed');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {STATUS_COLUMNS.map(column => {
        const columnOrders = orders.filter(o => o.status === column);
        
        let title = '';
        let bgColor = '';
        if (column === 'pending') { title = 'Eingegangen'; bgColor = 'bg-peach/30'; }
        if (column === 'preparing') { title = 'In Zubereitung'; bgColor = 'bg-[#E8D5C4]/40'; }
        if (column === 'ready') { title = 'Abholbereit'; bgColor = 'bg-terracotta/10 border-terracotta/20'; }

        return (
          <div key={column} className={`flex flex-col rounded-3xl ${bgColor} border border-peach/50 p-4`}>
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="font-calistoga text-xl text-charcoal">{title}</h2>
              <span className="bg-white/60 text-charcoal font-bold px-3 py-1 rounded-full text-sm">
                {columnOrders.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <Reorder.Group 
                axis="y" 
                values={columnOrders} 
                onReorder={(newOrder) => {
                  // If we just want reordering within the same column:
                  // We would update local state here. For simplicity in this demo,
                  // cross-column drag is tricky with basic Reorder.Group, so we rely on the Advance button
                  // and simple intra-column sorting if needed.
                }}
                className="flex flex-col gap-3 min-h-[50%]"
              >
                <AnimatePresence>
                  {columnOrders.map(order => (
                    <Reorder.Item 
                      key={order.id} 
                      value={order}
                      className="bg-cream rounded-2xl p-4 shadow-sm border border-white relative cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-charcoal text-sm">#{order.id.slice(-5).toUpperCase()}</span>
                        <div className="flex items-center gap-1 text-terracotta font-bold text-sm bg-terracotta/10 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3" />
                          {order.time}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="font-bold text-charcoal line-clamp-1">{order.name}</p>
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-xs text-charcoal/70 font-bold leading-tight mt-1">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-peach/50">
                        <span className="font-calistoga text-terracotta">
                          {order.total.toFixed(2).replace('.', ',')} €
                        </span>
                        
                        <button 
                          onClick={() => handleAdvance(order)}
                          className="bg-charcoal text-cream w-8 h-8 rounded-full flex items-center justify-center hover:bg-terracotta transition-colors"
                        >
                          {column === 'ready' ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </div>
        );
      })}
    </div>
  );
}
