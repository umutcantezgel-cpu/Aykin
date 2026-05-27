import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ValueCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  className?: string;
}

export function ValueCard({ title, desc, icon, className }: ValueCardProps) {
  return (
    <div className={twMerge(
      "flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-sand",
      "transition-transform duration-300 hover:-translate-y-1 hover:shadow-clay",
      className
    )}>
      {/* Icon Circle with bite-mark notch bottom right via CSS mask */}
      <div 
        className="flex items-center justify-center w-16 h-16 rounded-full bg-peach text-terracotta mb-4"
        style={{
          // A custom radial-gradient mask to cut out a notch at bottom-right
          maskImage: 'radial-gradient(circle at 85% 85%, transparent 25%, black 26%)',
          WebkitMaskImage: 'radial-gradient(circle at 85% 85%, transparent 25%, black 26%)'
        }}
      >
        {icon}
      </div>
      
      <h3 className="font-calistoga text-xl text-charcoal mb-2">{title}</h3>
      <p className="text-charcoal/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
