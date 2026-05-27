"use client";

import React, { useEffect, useState, Suspense } from "react";
import * as Icons from "lucide-react";
import { TransitionLink } from '@/components/ui/TransitionLink';
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton } from "@/components/ui/Btn";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Icons.Loader2 className="animate-spin text-[#C41E3A]" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-5">
        <h1 className="font-calistoga text-2xl text-[#1A1A1A] mb-4">Bestellung nicht gefunden</h1>
        <TransitionLink href="/">
          <PrimaryButton>Zurück zur Startseite</PrimaryButton>
        </TransitionLink>
      </div>
    );
  }

  const itemCount = order.items?.reduce((acc: number, it: any) => acc + it.quantity, 0) || 0;
  const isToday = order.pickupDate === new Date().toISOString().split('T')[0];
  const dateDisplay = isToday ? "Heute" : new Date(order.pickupDate).toLocaleDateString("de-DE", { weekday: 'short', day: '2-digit', month: '2-digit' });

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      {/* Hero confetti area */}
      <div className="pt-8 px-6 text-center relative">
        <FadeUp delay={0.1} className="mx-auto mt-2.5 mb-4 w-[84px] h-[84px] rounded-full bg-[#C41E3A] flex items-center justify-center shadow-[0_12px_28px_rgba(196,30,58,0.32)] relative">
          <Icons.Check size={42} color="white" strokeWidth={2.5} />
          {/* sparkles */}
          <div className="absolute -top-2 -right-3">
            <Icons.Sparkles size={20} color="#C41E3A" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1.5 -left-3">
            <Icons.Sparkles size={14} color="#E8D5C4" strokeWidth={1.5} />
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="font-calistoga text-[26px] text-[#1A1A1A] leading-[1.1]">Bestellung bestätigt!</h1>
          <p className="font-nunito text-[13px] text-[#4A4A4A] mt-1.5 leading-relaxed max-w-[280px] mx-auto">
            Wir bereiten alles frisch vor. Bestätigung per SMS an deine Nummer.
          </p>
        </FadeUp>
      </div>

      {/* Ticket */}
      <div className="px-5 pt-6">
        <FadeUp delay={0.3} className="border-2 border-dashed border-[#C41E3A] rounded-[20px] bg-white relative shadow-sm">
          {/* Cutouts */}
          <div className="absolute -left-[13px] top-[42%] w-[26px] h-[26px] rounded-full bg-[#FAF8F5] border-2 border-dashed border-[#E8D5C4] border-l-transparent border-t-transparent -rotate-45" />
          <div className="absolute -right-[13px] top-[42%] w-[26px] h-[26px] rounded-full bg-[#FAF8F5] border-2 border-dashed border-[#E8D5C4] border-r-transparent border-b-transparent -rotate-45" />

          <div className="p-[18px_22px_14px] text-center border-b-2 border-dashed border-[#F2E8E0]">
            <div className="font-nunito text-[10px] font-black text-[#7a5a52] tracking-[1.4px] uppercase">Bestellnummer</div>
            <div className="font-calistoga text-[30px] text-[#C41E3A] mt-1 tracking-wide">{order.orderNumber || `#AY-XXXX`}</div>
          </div>

          <div className="p-[18px_22px] flex gap-3.5 items-center">
            <div className="w-[88px] h-[88px] bg-[#1A1A1A] rounded-[12px] p-[7px] shrink-0">
              <div className="w-full h-full bg-white rounded-[6px] flex flex-col items-center justify-center p-1">
                <Icons.QrCode size={40} color="#1A1A1A" strokeWidth={1.5} />
                <span className="font-nunito text-[10px] font-bold text-[#1A1A1A] mt-1">{order.orderNumber}</span>
              </div>
            </div>
            <div>
              <div className="font-nunito text-[10px] font-black text-[#C41E3A] tracking-[1.4px] uppercase">Abholung</div>
              <div className="font-calistoga text-[18px] text-[#1A1A1A] mt-1 leading-[1.1]">{dateDisplay} · {order.pickupTime}</div>
              <div className="font-nunito text-[11.5px] text-[#7a5a52] mt-1.5 leading-snug">
                Aykin Studio
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Summary mini */}
      <div className="p-[18px_20px]">
        <FadeUp delay={0.4} className="bg-[#F2E8E0] rounded-[14px] p-[10px_14px] flex justify-between items-center shadow-sm">
          <span className="font-nunito text-[12px] font-extrabold text-[#1A1A1A]">{itemCount} Artikel · vor Ort zu zahlen</span>
          <span className="font-calistoga text-[17px] text-[#C41E3A]">{(order.total || 0).toFixed(2).replace('.', ',')} €</span>
        </FadeUp>
      </div>

      <div className="mt-auto px-5 pb-8 pt-6">
        <FadeUp delay={0.5} className="flex flex-col gap-2.5">
          <TransitionLink href={`/order-status?orderId=${orderId}`} className="block w-full">
            <PrimaryButton className="w-full flex justify-center items-center gap-2">
              <Icons.Package size={18} />
              Status anzeigen
            </PrimaryButton>
          </TransitionLink>
          <TransitionLink href="/" className="block w-full">
            <button className="w-full py-3.5 rounded-[16px] border-2 border-[#E8D5C4] text-[#1A1A1A] font-extrabold font-nunito text-[15px] bg-transparent active:bg-[rgba(232,213,196,0.2)] transition-colors">
              Zur Startseite
            </button>
          </TransitionLink>
        </FadeUp>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center"><Icons.Loader2 className="animate-spin text-[#C41E3A]" size={32} /></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
