import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TicketPerforation } from '@/components/atoms/TicketPerforation';
import { EyebrowPill } from '@/components/atoms/EyebrowPill';

interface BoxCardProps {
  title: string;
  desc?: string;
  price?: string;
  icon?: React.ReactNode;
  isNew?: boolean;
  className?: string;
  onClick?: () => void;
}

export function BoxCard({ title, desc, price, icon, isNew, className, onClick }: BoxCardProps) {
  return (
    <div 
      onClick={onClick}
      className={twMerge(
        "relative flex items-center p-4 bg-cream rounded-xl border-2 border-dashed border-terracotta/40 cursor-pointer",
        "transition-all duration-300 hover:border-terracotta hover:shadow-clay",
        className
      )}
    >
      <TicketPerforation position="left" fillClass="text-sand" />
      <TicketPerforation position="right" fillClass="text-sand" />
      
      {icon && (
        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-terracotta mr-4">
          {icon}
        </div>
      )}

      <div className="flex-grow flex flex-col justify-center py-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-calistoga text-xl text-charcoal">{title}</h3>
          {isNew && <EyebrowPill label="NEU" statusColor="bg-peach" />}
        </div>
        {desc && <p className="text-sm text-charcoal/70 line-clamp-2">{desc}</p>}
      </div>

      {price && (
        <div className="flex-shrink-0 ml-4 font-bold text-lg text-terracotta whitespace-nowrap">
          {price}
        </div>
      )}
    </div>
  );
}
