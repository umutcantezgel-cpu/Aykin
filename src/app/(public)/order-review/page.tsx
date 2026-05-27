"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton } from "@/components/ui/Btn";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrderReviewPage() {
  const router = useRouter();
  const { cart, orderType, orderData, clearCart, clearOrderData } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discountValue, setDiscountValue] = useState(0); // Fixed € discount for now
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = cart.reduce((s, i) => s + i.quantity * (typeof i.price === 'number' ? i.price : parseFloat(i.price)), 0);
  const totalAfterDiscount = Math.max(0, subtotal - discountValue);
  const tax = totalAfterDiscount * 0.07;

  const isToday = orderData.pickupDate === new Date().toISOString().split('T')[0];
  const dateDisplay = isToday ? "Heute" : new Date(orderData.pickupDate || "").toLocaleDateString("de-DE", { weekday: 'short', day: '2-digit', month: '2-digit' });

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setIsApplyingPromo(true);
    setPromoError("");
    try {
      const docRef = doc(db, "promo_codes", promoCode.toUpperCase());
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.active !== false) {
          if (data.type === "fixed") {
            setDiscountValue(data.amount);
          } else if (data.type === "percent") {
            setDiscountValue(subtotal * (data.amount / 100));
          }
          setAppliedPromo(promoCode.toUpperCase());
        } else {
          setPromoError("Dieser Code ist nicht mehr gültig.");
        }
      } else {
        setPromoError("Ungültiger Gutscheincode.");
      }
    } catch (err) {
      console.error(err);
      setPromoError("Fehler bei der Prüfung.");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const orderNumber = `#AY-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const orderDoc = {
        orderNumber,
        type: orderType,
        items: cart.map(it => ({ 
          name: it.name, 
          variant: it.variant || (it as any).desc || "", 
          quantity: it.quantity, 
          price: typeof it.price === 'number' ? it.price : parseFloat(it.price as any) 
        })),
        subtotal,
        discount: discountValue,
        promoCode: appliedPromo,
        total: totalAfterDiscount,
        pickupDate: orderData.pickupDate,
        pickupTime: orderData.pickupTime,
        customerName: orderData.name,
        customerPhone: orderData.phone,
        customerEmail: orderData.email,
        customerNotes: orderData.notes || "",
        address: orderType === "delivery" ? orderData.address : null,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "orders"), orderDoc);
      clearCart();
      clearOrderData();
      router.push(`/order-status?orderId=${docRef.id}`);
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("Fehler bei der Bestellung. Bitte versuche es erneut.");
      setIsSubmitting(false); // only re-enable if failed
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      {/* Header */}
      <div className="bg-[#FAF8F5] sticky top-0 z-10 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
          <Icons.ArrowLeft size={20} color="#1A1A1A" />
        </button>
        <div className="text-center">
          <div className="font-calistoga text-lg text-[#1A1A1A] leading-tight">Übersicht</div>
          <div className="font-nunito text-[11px] font-bold text-[#7a5a52]">Schritt 3 von 3</div>
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="px-5 pb-4 flex gap-1.5">
        {[true, true, true].map((active, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${active ? 'bg-[#C41E3A]' : 'bg-[#F2E8E0]'}`} />
        ))}
      </div>

      <div className="px-5 flex-1 overflow-y-auto pb-6">
        {/* Time Card */}
        <FadeUp delay={0.1} className="bg-[#E8D5C4] rounded-[20px] p-[16px_18px] mb-3.5 relative overflow-hidden shadow-sm">
          <div className="absolute -top-5 -right-5 w-[90px] h-[90px] bg-[rgba(250,248,245,0.4)] rounded-full" />
          <div className="relative z-10">
            <div className="font-nunito text-[10px] font-black text-[#C41E3A] tracking-[1.4px] uppercase">
              {orderType === "delivery" ? "Lieferung" : "Abholung"}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <div className="font-calistoga text-[26px] text-[#1A1A1A] leading-none">{dateDisplay} · {orderData.pickupTime}</div>
            </div>
            <div className="font-nunito text-[11.5px] text-[#4A4A4A] mt-1.5 font-bold">
              {orderType === "delivery" ? `${orderData.address?.street}, ${orderData.address?.zip} ${orderData.address?.city}` : "Aykin Studio"}
            </div>
            <div className="font-nunito text-[11px] text-[#4A4A4A] mt-2 opacity-80">
              {orderData.name} · {orderData.phone}
            </div>
          </div>
        </FadeUp>

        {/* Items List */}
        <FadeUp delay={0.2} className="bg-white rounded-[18px] p-1 mb-3.5 shadow-sm">
          {cart.map((it, i, a) => (
            <div key={it.id} className={`p-3 flex justify-between gap-2.5 ${i < a.length - 1 ? 'border-b border-[#F2E8E0]' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 mb-0.5 items-baseline">
                  <span className="font-nunito font-extrabold text-[12.5px] text-[#7a5a52]">{it.quantity}×</span>
                  <span className="font-nunito font-extrabold text-[13px] text-[#1A1A1A]">{it.name}</span>
                </div>
                <div className="font-nunito text-[11px] text-[#7a5a52] ml-[23px]">{it.variant || (it as any).desc || ''}</div>
              </div>
              <span className="font-calistoga text-[14px] text-[#C41E3A]">{(it.quantity * (typeof it.price === 'number' ? it.price : parseFloat(it.price as any))).toFixed(2).replace('.', ',')} €</span>
            </div>
          ))}
        </FadeUp>

        {/* Promo Code Input */}
        <FadeUp delay={0.3} className="bg-white rounded-[18px] p-4 mb-3.5 shadow-sm border-2 border-transparent focus-within:border-[#C41E3A]">
          <div className="font-nunito text-[10px] font-extrabold text-[#7a5a52] uppercase tracking-[1px] mb-2">Gutscheincode</div>
          {appliedPromo ? (
            <div className="flex justify-between items-center bg-[#F2E8E0] p-3 rounded-[12px]">
              <div className="flex items-center gap-2 text-[#1A1A1A] font-bold text-sm">
                <Icons.Tag size={16} className="text-[#C41E3A]" />
                {appliedPromo}
              </div>
              <button onClick={() => { setAppliedPromo(null); setDiscountValue(0); }} className="text-[#C41E3A]">
                <Icons.X size={18} />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code eingeben"
                  className="font-nunito text-[14px] font-bold text-[#1A1A1A] bg-[#FAF8F5] rounded-[12px] px-3 py-2 outline-none flex-1 placeholder:opacity-50 uppercase"
                />
                <button 
                  onClick={handleApplyPromo}
                  disabled={!promoCode || isApplyingPromo}
                  className="bg-[#1A1A1A] text-white px-4 rounded-[12px] font-nunito text-[12px] font-bold disabled:opacity-50"
                >
                  {isApplyingPromo ? "..." : "Einlösen"}
                </button>
              </div>
              {promoError && <div className="text-red-500 font-nunito text-[11px] font-bold mt-2">{promoError}</div>}
            </div>
          )}
        </FadeUp>

        {/* Summary */}
        <FadeUp delay={0.4} className="bg-[#F2E8E0] rounded-[18px] p-[14px_16px] shadow-sm mb-3.5">
          <div className="flex justify-between font-nunito text-[12.5px] text-[#4A4A4A] mb-1.5">
            <span>Zwischensumme</span><span className="font-bold">{subtotal.toFixed(2).replace('.', ',')} €</span>
          </div>
          {discountValue > 0 && (
            <div className="flex justify-between font-nunito text-[12.5px] text-[#C41E3A] mb-1.5 font-bold">
              <span>Rabatt</span><span>– {discountValue.toFixed(2).replace('.', ',')} €</span>
            </div>
          )}
          {orderType === "delivery" && (
            <div className="flex justify-between font-nunito text-[12.5px] text-[#4A4A4A] mb-1.5">
              <span>Liefergebühr</span><span className="font-bold">0,00 €</span>
            </div>
          )}
          <div className="flex justify-between font-nunito text-[12.5px] text-[#4A4A4A] mb-2">
            <span>inkl. 7% MwSt.</span><span className="font-bold">{tax.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="h-[1px] bg-[#E8D5C4] my-1.5" />
          <div className="flex justify-between items-baseline mt-2">
            <span className="font-nunito font-black text-[13px] text-[#1A1A1A]">Vor Ort zahlen</span>
            <span className="font-calistoga text-[24px] text-[#C41E3A]">{totalAfterDiscount.toFixed(2).replace('.', ',')} €</span>
          </div>
        </FadeUp>
        
        {orderData.notes && (
          <FadeUp delay={0.5} className="font-nunito text-[12px] text-[#7a5a52] bg-white rounded-[14px] p-3 italic">
            "{orderData.notes}"
          </FadeUp>
        )}
      </div>

      <div className="p-[14px_20px_20px] bg-[#FAF8F5] border-t border-[#F2E8E0]">
        <div className="font-nunito text-[10.5px] text-[#7a5a52] text-center mb-2.5 leading-tight">
          Mit „Bestellung absenden" akzeptierst du unsere <span className="text-[#C41E3A] font-extrabold">AGB & Vorbestellbedingungen</span>
        </div>
        <PrimaryButton 
          className="w-full flex justify-center items-center gap-2"
          onClick={handleSubmit}
          disabled={isSubmitting || cart.length === 0}
        >
          {isSubmitting ? "Wird gesendet..." : <><Icons.Check size={18} /> Verbindlich vorbestellen</>}
        </PrimaryButton>
      </div>
    </div>
  );
}
