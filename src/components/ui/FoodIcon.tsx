import React from "react";
import * as Icons from "lucide-react";

export function FoodIcon({ icon = 'Sparkles', label, size = 'md', shape = 'rounded-2xl', className = '' }: { icon?: string, label?: string, size?: string, shape?: string, className?: string }) {
  const LIcon = (Icons as any)[icon] || Icons.Sparkles;
  const s: any = {
    xs:   { cls: 'w-16 h-16',           px: 22 },
    sm:   { cls: 'w-20 h-20',           px: 28 },
    md:   { cls: 'w-full h-44',         px: 40 },
    lg:   { cls: 'w-full h-64',         px: 52 },
    xl:   { cls: 'w-full h-80',         px: 64 },
    sq:   { cls: 'w-full aspect-square', px: 44 },
    circ: { cls: 'w-[72px] h-[72px]',   px: 28 },
  }[size] || { cls: 'w-full h-44', px: 40 };

  const radius = shape === 'circle' ? 'rounded-full' : shape;

  return (
    <div className={`bg-[#E8D5C4] flex flex-col items-center justify-center gap-2 overflow-hidden flex-shrink-0 ${s.cls} ${radius} ${className}`}>
      <LIcon size={s.px} strokeWidth={1.4} color="#C41E3A" style={{ opacity: 0.65 }} />
      {label && (
        <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#C41E3A', opacity: 0.8, textAlign: 'center', lineHeight: 1.4, padding: '0 8px', whiteSpace: 'pre-line' }}>
          {label.replace(/\\n/g, '\\n')}
        </span>
      )}
    </div>
  );
}
