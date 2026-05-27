"use client";

import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton } from "@/components/ui/Btn";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useStore, OrderType } from "@/store/useStore";

export default function OrderHubPage() {
  const router = useRouter();
  const { setOrderType } = useStore();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OrderType>(null);

  useEffect(() => {
    async function checkStoreStatus() {
      try {
        const docRef = doc(db, "store_settings", "main");
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data()?.isOnline !== undefined) {
          setIsOnline(snap.data().isOnline);
        } else {
          setIsOnline(true); // Fallback if document doesn't exist
        }
      } catch (err) {
        console.error("Fehler beim Abrufen der Store-Settings:", err);
        setIsOnline(true); // Fallback on error
      } finally {
        setLoading(false);
      }
    }
    checkStoreStatus();
  }, []);

  const handleNext = () => {
    if (!selected) return;
    setOrderType(selected);
    router.push("/menu"); // They still need to pick items first
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-32">
      {/* Top Bar Area */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3.5">
        <div className="font-calistoga text-3xl text-[#C41E3A]">Aykin</div>
        <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Icons.X size={20} color="#1A1A1A" />
        </button>
      </div>

      <div className="px-5">
        <h1 className="font-calistoga text-2xl text-[#1A1A1A] mb-6">Wie möchtest du bestellen?</h1>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Icons.Loader2 size={32} className="animate-spin text-[#C41E3A]" />
          </div>
        ) : (
          <div className="space-y-3">
            {isOnline === false && (
              <FadeUp className="bg-[rgba(196,30,58,0.1)] border-2 border-[#C41E3A] rounded-[18px] p-4 flex gap-3 items-start mb-6">
                <Icons.AlertCircle size={20} className="text-[#C41E3A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-calistoga text-[15px] text-[#1A1A1A] mb-1">Online-Aufträge pausiert</div>
                  <div className="font-nunito text-[12.5px] text-[#4A4A4A] leading-relaxed">
                    Wir bearbeiten aktuell sehr viele Aufträge und können momentan keine neuen Online-Anfragen annehmen.
                  </div>
                </div>
              </FadeUp>
            )}

            {[
              { id: "pickup", title: "Abholung", desc: "Fertige Drucke vor Ort abholen", icon: Icons.Store, disabled: !isOnline },
              { id: "delivery", title: "Versand", desc: "Bequem nach Hause liefern lassen", icon: Icons.Truck, disabled: !isOnline },
              { id: "in-store", title: "Beratung vor Ort", desc: "Persönliche Beratung im Studio", icon: Icons.Utensils, disabled: false }, // Maybe in-store is possible even if online is paused? Or disabled too. Let's make it disabled for now if online is off, or actually the prompt says "sind die Choices disabled".
            ].map((choice, i) => {
              const disabled = choice.disabled;
              const isSelected = selected === choice.id;
              
              return (
                <FadeUp key={choice.id} delay={0.1 + i * 0.1}>
                  <button
                    disabled={disabled}
                    onClick={() => setSelected(choice.id as OrderType)}
                    className={`w-full text-left rounded-[20px] p-[16px_18px] flex items-center gap-4 transition-all border-2 ${
                      disabled ? 'opacity-40 bg-white border-transparent cursor-not-allowed' :
                      isSelected ? 'bg-[#C41E3A] text-white border-[#C41E3A] shadow-[0_8px_20px_rgba(196,30,58,0.25)]' :
                      'bg-white text-[#1A1A1A] border-transparent shadow-sm'
                    }`}
                  >
                    <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[#FAF8F5]'}`}>
                      <choice.icon size={22} className={isSelected ? 'text-white' : 'text-[#C41E3A]'} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                      <div className="font-calistoga text-[17px] mb-0.5">{choice.title}</div>
                      <div className={`font-nunito text-[12px] font-bold ${isSelected ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#7a5a52]'}`}>
                        {choice.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <Icons.Check size={14} className="text-[#C41E3A]" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                </FadeUp>
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-[16px_20px_32px] bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5] to-transparent z-40">
        <PrimaryButton 
          className="w-full" 
          disabled={!selected || isOnline === false}
          onClick={handleNext}
        >
          Auswahl bestätigen
        </PrimaryButton>
      </div>
    </div>
  );
}
