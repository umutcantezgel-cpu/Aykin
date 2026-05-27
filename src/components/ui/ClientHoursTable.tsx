'use client';

import React from 'react';

const DAYS = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];

export function ClientHoursTable() {
  const todayIdx = (() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; })();

  return (
    <div className="bg-[#F2E8E0] rounded-[18px] overflow-hidden">
      {DAYS.map((day, i) => {
        const isToday = i === todayIdx;
        const hours = i <= 1 ? 'Geschlossen' : i === 6 ? '13:00 – 19:00 Uhr' : '12:00 – 19:00 Uhr';
        const isClosed = i <= 1;
        return (
          <div key={day} className={`flex justify-between items-center p-[13px_19px] ${isToday ? 'bg-[#C41E3A]' : 'bg-transparent border-b border-[rgba(232,213,196,0.45)] last:border-b-0'}`}>
            <div className="flex items-center gap-2">
              {isToday && <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0" />}
              <span className={`font-nunito text-[0.87rem] ${isToday ? 'font-black text-white' : 'font-semibold text-[#1A1A1A]'}`}>{day}</span>
            </div>
            <div className="flex items-center gap-[9px]">
              <span className={`font-nunito text-[0.87rem] ${isToday ? 'text-white font-bold' : isClosed ? 'text-[#8A8A8A] font-normal' : 'text-[#4A4A4A] font-normal'}`}>
                {hours}
              </span>
              {isToday && (
                <span className="bg-white/20 text-white font-nunito font-black text-[0.63rem] px-2.5 py-0.5 rounded-full">Heute</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
