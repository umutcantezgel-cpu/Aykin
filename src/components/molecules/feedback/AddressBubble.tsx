import React from 'react';
import { twMerge } from 'tailwind-merge';
import { PrimaryCTA } from '@/components/atoms/buttons';
import { MapPin } from 'lucide-react'; // utilitarische UI icon

interface AddressBubbleProps {
  className?: string;
}

export function AddressBubble({ className }: AddressBubbleProps) {
  const address = "[Adresse eintragen]";
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className={twMerge(
      "flex flex-col p-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-clay border border-white/50 max-w-sm",
      className
    )}>
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-peach flex items-center justify-center text-terracotta mt-1">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-calistoga text-2xl text-charcoal mb-1">Aykin</h3>
          <p className="text-charcoal/80 font-medium leading-relaxed">
            Obertorplatz 2<br />
            [PLZ Stadt]
          </p>
        </div>
      </div>
      
      <a 
        href={mapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full"
        tabIndex={-1}
      >
        <PrimaryCTA className="w-full justify-center text-sm" showArrow>
          Route planen
        </PrimaryCTA>
      </a>
    </div>
  );
}
