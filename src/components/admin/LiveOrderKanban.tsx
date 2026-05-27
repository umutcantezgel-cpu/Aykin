'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type OrderStatus = 'pending' | 'preparing' | 'ready';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  time: string;
}

const initialOrders: Order[] = [
  {
    id: '#1024',
    customerName: 'Alice Johnson',
    items: [{ name: 'Avocado Toast', quantity: 1 }, { name: 'Flat White', quantity: 1 }],
    status: 'pending',
    time: '08:42 AM',
  },
  {
    id: '#1025',
    customerName: 'Mark D.',
    items: [{ name: 'Eggs Benedict', quantity: 2 }, { name: 'Orange Juice', quantity: 2 }],
    status: 'pending',
    time: '08:45 AM',
  },
  {
    id: '#1022',
    customerName: 'Sarah Smith',
    items: [{ name: 'Truffle Scramble', quantity: 1 }, { name: 'Matcha Latte', quantity: 1 }],
    status: 'preparing',
    time: '08:35 AM',
  },
  {
    id: '#1023',
    customerName: 'John Doe',
    items: [{ name: 'Pancakes', quantity: 1 }, { name: 'Americano', quantity: 1 }],
    status: 'preparing',
    time: '08:38 AM',
  },
  {
    id: '#1020',
    customerName: 'Emily Clark',
    items: [{ name: 'Breakfast Burrito', quantity: 1 }, { name: 'Iced Latte', quantity: 1 }],
    status: 'ready',
    time: '08:25 AM',
  },
];

export default function LiveOrderKanban() {
  const [orders] = useState<Order[]>(initialOrders);

  const columns: { id: OrderStatus; label: string }[] = [
    { id: 'pending', label: 'Pending' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FDFCF8] text-[#2C2621] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-light tracking-wide mb-2 text-[#2C2621]">Kitchen Display System</h1>
          <p className="text-[#59534E] text-sm tracking-widest uppercase">Live Orders Overview</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {columns.map((column) => (
            <div 
              key={column.id} 
              className="flex flex-col h-full bg-[#F5F4F0] rounded-2xl p-4 md:p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-[#EAE8E3]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium tracking-wide text-[#3E3430] uppercase text-sm">{column.label}</h2>
                <span className="bg-[#EAE8E3] text-[#2C2621] text-xs font-semibold px-3 py-1 rounded-full">
                  {orders.filter((o) => o.status === column.id).length}
                </span>
              </div>
              
              <div className="flex flex-col gap-4 flex-grow overflow-y-auto pb-4">
                {orders
                  .filter((order) => order.status === column.id)
                  .map((order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(44,38,33,0.04)] border border-[#EBEAE5] cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-bold tracking-widest uppercase text-[#8C847A] block mb-1">
                            {order.id}
                          </span>
                          <span className="font-medium text-lg text-[#2C2621]">{order.customerName}</span>
                        </div>
                        <span className="text-xs text-[#736B63] font-medium bg-[#F9F8F6] px-2 py-1 rounded border border-[#F0EFEA]">
                          {order.time}
                        </span>
                      </div>
                      
                      <ul className="space-y-3 mt-5 pt-5 border-t border-[#F0EFEA]/80">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span className="text-[#59534E]">{item.name}</span>
                            <span className="font-medium text-[#2C2621]">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Interactive area placeholder */}
                      <div className="mt-6 pt-4 border-t border-[#F0EFEA]/80 flex justify-end">
                        <button className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#8C847A] hover:text-[#2C2621] transition-colors">
                          {column.id === 'pending' ? 'Start Preparing →' : column.id === 'preparing' ? 'Mark Ready →' : 'Complete Order ✓'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
