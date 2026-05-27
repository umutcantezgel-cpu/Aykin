"use client";

import React, { useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton } from "@/components/ui/Btn";
import * as Icons from "lucide-react";

export default function ReservierungPage() {
  const [guests, setGuests] = useState(4);
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedTime, setSelectedTime] = useState("15:30");
  const [selectedArea, setSelectedArea] = useState("Innen · Lounge");
  const [specialRequest, setSpecialRequest] = useState("Geburtstag");

  const dates = [
    { w: 'Heute', d: 24, disabled: false },
    { w: 'Fr', d: 25, disabled: false },
    { w: 'Sa', d: 26, disabled: false },
    { w: 'So', d: 27, disabled: false },
    { w: 'Mo', d: 28, disabled: false },
  ];

  const times = ['12:00','12:30','13:00','13:30','15:00','15:30','17:00','17:30','18:00','18:30','19:00','19:30'];
  const areas = [
    { ic: Icons.Heart, t: 'Online · Video' },
    { ic: Icons.Sparkles, t: 'Vor Ort · Studio' },
    { ic: Icons.Users, t: 'Projektberatung' },
    { ic: Icons.Coffee, t: 'Design-Review' },
  ];
  const requests = ['Prototyp','Serienfertigung','Designberatung','Sonstiges'];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="bg-[#E8D5C4] pt-[110px] px-6 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3] dot-bg" />
        <div className="relative z-10">
          <h1 className="font-calistoga text-[2.2rem] text-[#1A1A1A] mb-3">Beratungstermin</h1>
          <p className="font-nunito text-[#4A4A4A] max-w-sm mx-auto text-sm">Plane deine Beratung</p>
        </div>
      </div>

      <div className="max-w-[500px] mx-auto px-6 py-10 pb-32">
        <FadeUp className="space-y-8">
          {/* Guests */}
          <div>
            <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Anzahl Teilnehmer</div>
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icons.Users size={22} className="text-[#C41E3A]" strokeWidth={1.8} />
                <span className="font-calistoga text-xl text-[#1A1A1A]">{guests} Personen</span>
              </div>
              <div className="flex items-center bg-[#F2E8E0] rounded-full p-1 gap-1">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
                >
                  <Icons.Minus size={16} className="text-[#1A1A1A]" strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => setGuests(guests + 1)}
                  className="w-8 h-8 rounded-full bg-[#C41E3A] flex items-center justify-center shadow-sm"
                >
                  <Icons.Plus size={16} className="text-white" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Datum</div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
              {dates.map(d => (
                <button
                  key={d.d}
                  onClick={() => setSelectedDate(d.d)}
                  className={`shrink-0 w-[70px] py-3 rounded-2xl text-center transition-colors border-2 ${
                    selectedDate === d.d 
                    ? 'bg-[#C41E3A] text-white border-[#C41E3A]' 
                    : 'bg-white text-[#1A1A1A] border-[#F2E8E0]'
                  }`}
                >
                  <div className={`text-[11px] font-bold ${selectedDate === d.d ? 'opacity-85' : 'opacity-60'}`}>{d.w}</div>
                  <div className="font-calistoga text-xl mt-1 leading-none">{d.d}</div>
                  <div className={`text-[10px] font-bold mt-1 ${selectedDate === d.d ? 'opacity-80' : 'opacity-50'}`}>JAN</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">
              Uhrzeit · Fr 25.01
            </div>
            <div className="grid grid-cols-4 gap-2">
              {times.map((t, i) => {
                const disabled = i === 2;
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    disabled={disabled}
                    onClick={() => setSelectedTime(t)}
                    className={`rounded-xl py-2.5 text-center text-sm font-extrabold transition-colors border-2 ${
                      disabled 
                      ? 'bg-white text-[#1A1A1A] opacity-40 line-through border-[#F2E8E0]' 
                      : isSelected 
                        ? 'bg-[#C41E3A] text-white border-[#C41E3A]' 
                        : 'bg-white text-[#1A1A1A] border-transparent'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area */}
          <div>
            <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Beratungsart (optional)</div>
            <div className="grid grid-cols-2 gap-2">
              {areas.map(a => {
                const isSelected = selectedArea === a.t;
                const Icon = a.ic;
                return (
                  <button
                    key={a.t}
                    onClick={() => setSelectedArea(a.t)}
                    className={`rounded-2xl p-3 flex items-center gap-2.5 transition-colors ${
                      isSelected 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'bg-white text-[#1A1A1A]'
                    }`}
                  >
                    <Icon size={16} className={isSelected ? 'text-[#E8D5C4]' : 'text-[#C41E3A]'} strokeWidth={1.8} />
                    <span className="text-xs font-extrabold">{a.t}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Projekttyp?</div>
            <div className="flex flex-wrap gap-2">
              {requests.map(r => {
                const isSelected = specialRequest === r;
                return (
                  <button
                    key={r}
                    onClick={() => setSpecialRequest(r)}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold transition-colors border-2 ${
                      isSelected 
                      ? 'bg-[#C41E3A] text-white border-[#C41E3A]' 
                      : 'bg-white text-[#1A1A1A] border-[#F2E8E0]'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#fef8f5] border-t border-[#F2E8E0] p-4 z-50">
        <div className="max-w-[500px] mx-auto">
          <div className="bg-[#F2E8E0] rounded-xl p-3 mb-3 flex justify-between items-center text-xs">
            <span className="font-bold text-[#4A4A4A]">Fr 25.01 · {selectedTime} · {guests} Personen</span>
            <span className="font-black text-[#C41E3A] text-[11px]">BEARBEITEN</span>
          </div>
          <PrimaryButton large className="w-full" sectionBg="#fef8f5">
            <Icons.Calendar size={18} /> Termin buchen
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
