import React from 'react';
import * as Icons from 'lucide-react';

interface ValueCardProps {
  icon: keyof typeof Icons;
  title: string;
  text: string;
}

export function ValueCard({ icon, title, text }: ValueCardProps) {
  const IconComponent = (Icons[icon] as React.ElementType) || Icons.Sparkles;

  return (
    <div className="bg-[#FAF8F5] rounded-[22px] p-[30px_24px] shadow-[0_3px_14px_rgba(26,26,26,0.05)] transition-transform hover:-translate-y-1">
      <div className="relative w-12 h-12 mb-4.5">
        <div className="w-12 h-12 bg-[#E8D5C4] rounded-full flex items-center justify-center">
          <IconComponent size={22} strokeWidth={1.5} color="#C41E3A" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#F2E8E0] rounded-full border-2 border-[#FAF8F5]" />
      </div>
      <h3 className="font-calistoga text-[1.22rem] text-[#1A1A1A] mb-2.5">{title}</h3>
      <p className="font-nunito text-[0.86rem] text-[#7a5a52] leading-[1.7]">{text}</p>
    </div>
  );
}
