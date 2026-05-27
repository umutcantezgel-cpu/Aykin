'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TimeSlotPickerProps {
  slots: string[]; // e.g. ['12:00', '12:15', '12:30', ...]
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  className?: string;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelectSlot, className }: TimeSlotPickerProps) {
  return (
    <div 
      className={twMerge(
        "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4 px-4 gap-3",
        className
      )}
      role="listbox"
      aria-label="Abholzeit auswählen"
    >
      {slots.map((slot) => {
        const isSelected = slot === selectedSlot;
        return (
          <button
            key={slot}
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelectSlot(slot)}
            className={twMerge(
              "snap-center shrink-0 w-24 h-14 flex items-center justify-center rounded-2xl font-bold transition-all duration-300",
              isSelected 
                ? "bg-terracotta text-cream shadow-clay scale-110 border border-transparent" 
                : "bg-cream text-charcoal border-2 border-peach hover:border-terracotta"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
