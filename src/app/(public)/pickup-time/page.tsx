"use client";

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton } from "@/components/ui/Btn";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

function generateDays() {
  const days = [];
  const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let label = dayNames[d.getDay()];
    if (i === 0) label = "Heute";
    else if (i === 1) label = "Morgen";
    
    days.push({
      label,
      date: d.getDate(),
      fullDate: d.toISOString().split('T')[0]
    });
  }
  return days;
}

function generateTimes(selectedFullDate: string) {
  const times = [];
  let current = new Date(`2000-01-01T12:00:00`);
  const end = new Date(`2000-01-01T22:00:00`); // Fixed to 22:00

  const now = new Date();
  const isToday = selectedFullDate === now.toISOString().split('T')[0];

  while (current <= end) {
    const h = current.getHours().toString().padStart(2, "0");
    const m = current.getMinutes().toString().padStart(2, "0");
    const tStr = `${h}:${m}`;
    
    let isPast = false;
    if (isToday) {
      const slotTime = new Date();
      slotTime.setHours(current.getHours(), current.getMinutes(), 0, 0);
      // Disable times that are in the past or within next 15 mins
      if (slotTime.getTime() < now.getTime() + 15 * 60000) {
        isPast = true;
      }
    }
    
    times.push({ time: tStr, isPast });
    current.setMinutes(current.getMinutes() + 15);
  }
  return times;
}

export default function PickupTimePage() {
  const router = useRouter();
  const { updateOrderData, orderType } = useStore();
  
  const [days] = useState(() => generateDays());
  const [selectedDay, setSelectedDay] = useState(days[0].fullDate);
  const [selectedTime, setSelectedTime] = useState("");

  const times = generateTimes(selectedDay);

  const handleNext = () => {
    if (!selectedTime) {
      alert(`Bitte wähle eine ${orderType === 'delivery' ? 'Lieferzeit' : 'Abholzeit'} aus.`);
      return;
    }
    
    updateOrderData({
      pickupDate: selectedDay,
      pickupTime: selectedTime,
    });
    router.push("/order-review");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      {/* Header */}
      <div className="bg-[#FAF8F5] sticky top-0 z-10 px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
          <Icons.ArrowLeft size={20} color="#1A1A1A" />
        </button>
        <div className="text-center">
          <div className="font-calistoga text-lg text-[#1A1A1A] leading-tight">{orderType === "delivery" ? "Lieferzeit" : "Abholzeit"}</div>
          <div className="font-nunito text-[11px] font-bold text-[#7a5a52]">Schritt 2 von 3</div>
        </div>
        <div className="w-10 h-10" />
      </div>

      {/* Progress */}
      <div className="px-5 pb-4 flex gap-1.5">
        {[true, true, false].map((active, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${active ? 'bg-[#C41E3A]' : 'bg-[#F2E8E0]'}`} />
        ))}
      </div>

      <div className="px-5 flex-1 overflow-y-auto pb-6">
        {orderType !== "delivery" && (
          <FadeUp delay={0.1}>
            <div className="font-nunito text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-2.5">Ort</div>
            <div className="bg-white rounded-[18px] p-3.5 flex gap-3 items-start mb-5 shadow-sm">
              <div className="w-[42px] h-[42px] rounded-full bg-[#E8D5C4] flex items-center justify-center shrink-0">
                <Icons.MapPin size={20} color="#C41E3A" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="font-calistoga text-[15px] text-[#1A1A1A]">Aykin Studio</div>
                <div className="font-nunito text-[11.5px] text-[#7a5a52] mt-0.5">[Adresse eintragen]</div>
                <div className="inline-flex items-center gap-1.5 bg-[rgba(72,160,90,0.13)] px-2 py-1 rounded-full mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3a9d52]" />
                  <span className="font-nunito text-[10px] font-extrabold text-[#3a9d52]">Geöffnet · bis 22:00</span>
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        <FadeUp delay={0.2}>
          <div className="font-nunito text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-2.5">Welcher Tag?</div>
          <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar pb-2">
            {days.map((d) => (
              <button 
                key={d.fullDate}
                onClick={() => {
                  setSelectedDay(d.fullDate);
                  setSelectedTime(""); // Reset time on day change
                }}
                className={`shrink-0 w-[60px] py-2.5 rounded-[14px] text-center transition-all ${
                  selectedDay === d.fullDate ? 'bg-[#C41E3A] text-white shadow-md' : 'bg-white text-[#1A1A1A] shadow-sm'
                }`}
              >
                <div className={`font-nunito text-[10px] font-bold ${selectedDay === d.fullDate ? 'opacity-85' : 'opacity-60'}`}>{d.label}</div>
                <div className="font-calistoga text-lg mt-0.5">{d.date}</div>
              </button>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="font-nunito text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-2.5">Welche Uhrzeit?</div>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {times.map((t) => {
              const isSelected = selectedTime === t.time && !t.isPast;
              return (
                <button 
                  key={t.time}
                  disabled={t.isPast}
                  onClick={() => setSelectedTime(t.time)}
                  className={`rounded-[12px] py-2.5 text-center text-[13px] font-extrabold transition-all ${
                    t.isPast ? 'opacity-40 bg-white text-[#1A1A1A] line-through' :
                    isSelected ? 'bg-[#C41E3A] text-white shadow-md' : 'bg-white text-[#1A1A1A] shadow-sm'
                  }`}
                >
                  {t.time}
                </button>
              )
            })}
          </div>
        </FadeUp>
      </div>

      <div className="p-[14px_20px_20px] bg-[#FAF8F5] border-t border-[#F2E8E0]">
        <PrimaryButton onClick={handleNext} className="w-full flex justify-center items-center gap-2">
          Bestellung prüfen
          <Icons.ArrowRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
}
