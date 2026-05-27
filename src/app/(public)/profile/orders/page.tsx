"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOrders } from '@/hooks/useOrders';
import { useStore } from '@/store/useStore';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { FadeUp } from '@/components/ui/FadeUp';
import * as Icons from 'lucide-react';

export default function ProfileOrdersPage() {
  const { orders, loading } = useOrders();
  const router = useRouter();
  const { setCart, setOrderType } = useStore();

  const handleReorder = (order: any) => {
    // We recreate the cart items. We don't have exactly the same cart format maybe, but we can reconstruct it.
    // Order items look like: { name, variant, quantity, price }
    // Cart items look like: { id, name, price, quantity, v, desc }
    const cartItems = order.items.map((item: any, index: number) => ({
      id: `${item.name}-${index}`,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      v: item.variant || "",
      desc: item.variant || ""
    }));

    setCart(cartItems);
    setOrderType(order.type || "pickup");
    router.push("/checkout");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-[#3a9d52] text-white';
      case 'completed': return 'bg-[#1A1A1A] text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-[#C41E3A] text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ausstehend';
      case 'confirmed': return 'Bestätigt';
      case 'preparing': return 'In Zubereitung';
      case 'ready': return 'Abholbereit';
      case 'completed': return 'Abgeschlossen';
      case 'cancelled': return 'Storniert';
      default: return status;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        {/* Header */}
        <div className="bg-[#FAF8F5] sticky top-0 z-10 px-5 pt-4 pb-3 flex items-center justify-between">
          <button onClick={() => router.push('/profile')} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
            <Icons.ArrowLeft size={20} color="#1A1A1A" />
          </button>
          <div className="text-center">
            <div className="font-calistoga text-lg text-[#1A1A1A] leading-tight">Bestellungen</div>
          </div>
          <div className="w-10 h-10" />
        </div>

        <div className="px-5 flex-1 overflow-y-auto pb-10 pt-4">
          {loading ? (
            <div className="flex justify-center mt-10">
              <Icons.Loader2 className="animate-spin text-[#C41E3A]" size={32} />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center mt-20">
              <Icons.Package size={48} className="mx-auto text-[#F2E8E0] mb-4" />
              <div className="font-calistoga text-xl text-[#1A1A1A] mb-2">Noch keine Bestellungen</div>
              <div className="font-nunito text-[13px] text-[#7a5a52]">Zeit für ein paar süße Momente!</div>
              <button onClick={() => router.push('/menu')} className="mt-6 bg-[#C41E3A] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                Zu den Produkten
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => (
                <FadeUp key={order.id} delay={i * 0.1}>
                  <div className="bg-white rounded-[18px] p-4 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-nunito text-[10px] font-black text-[#C41E3A] tracking-widest uppercase mb-1">
                          {new Date(order.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </div>
                        <div className="font-calistoga text-[16px] text-[#1A1A1A]">
                          {order.total?.toFixed(2).replace('.', ',')} €
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </div>
                    </div>
                    
                    <div className="border-t border-dashed border-[#F2E8E0] pt-3 pb-4 mb-3 space-y-1.5">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <span className="font-nunito font-extrabold text-[12px] text-[#7a5a52]">{item.quantity}×</span>
                          <span className="font-nunito font-bold text-[13px] text-[#1A1A1A] flex-1">{item.name} <span className="text-[#7a5a52] font-normal text-[11px]">{item.variant ? `(${item.variant})` : ''}</span></span>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => handleReorder(order)}
                      className="w-full flex items-center justify-center gap-2 bg-[#FAF8F5] text-[#C41E3A] py-2.5 rounded-[12px] font-bold text-[13px] hover:bg-[#F2E8E0] transition-colors"
                    >
                      <Icons.RotateCcw size={16} />
                      Bestellung wiederholen
                    </button>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
