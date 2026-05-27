import React from 'react';
import { twMerge } from 'tailwind-merge';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready';

interface OrderProgressBarProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig = {
  pending: { width: '25%', label: 'Ausstehend', color: 'bg-sand' },
  confirmed: { width: '50%', label: 'Bestätigt', color: 'bg-peach' },
  preparing: { width: '75%', label: 'In Zubereitung', color: 'bg-terracotta' },
  ready: { width: '100%', label: 'Abholbereit', color: 'bg-[#2ECC71]' }, // Mint green
};

export function OrderProgressBar({ status, className }: OrderProgressBarProps) {
  const config = statusConfig[status];

  return (
    <div className={twMerge("w-full flex flex-col gap-2", className)} aria-label={`Bestellstatus: ${config.label}`}>
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-bold text-charcoal">{config.label}</span>
        {status === 'ready' && (
          <span className="text-xs font-bold text-[#2ECC71] uppercase tracking-wider animate-pulse">
            Jetzt abholen!
          </span>
        )}
      </div>
      
      <div className="relative h-3 w-full bg-sand/30 rounded-full overflow-hidden">
        <div 
          className={twMerge(
            "absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-in-out",
            config.color,
            status === 'ready' && "shadow-[0_0_15px_rgba(46,204,113,0.6)] animate-aykin-pulse"
          )}
          style={{ width: config.width }}
        />
      </div>
      
      {/* 4 Stage Markers */}
      <div className="flex justify-between px-1 mt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
      </div>
    </div>
  );
}
