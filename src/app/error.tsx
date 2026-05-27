'use client';

import React, { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-5 text-center">
      
      {/* Error Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-[#E8D5C4] rounded-full flex items-center justify-center text-6xl shadow-inner relative z-10">
          ⚠️
        </div>
        {/* Puddle */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#E8D5C4] rounded-[50%] blur-sm opacity-60"></div>
        {/* Drops */}
        <div className="absolute -bottom-8 left-1/3 w-4 h-6 bg-[#E8D5C4] rounded-full blur-[2px]"></div>
        <div className="absolute -bottom-6 right-1/4 w-3 h-4 bg-[#E8D5C4] rounded-full blur-[1px]"></div>
      </div>

      <h1 className="font-calistoga text-4xl text-[#1A1A1A] mb-4">Etwas ist schiefgelaufen!</h1>
      <p className="font-nunito text-[#7a5a52] max-w-sm mb-8">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-[#C41E3A] text-[#FAF8F5] px-6 py-3 rounded-xl font-bold shadow-clay hover:bg-[#A01830] transition-colors"
        >
          <RefreshCcw size={18} />
          Nochmal versuchen
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 bg-white text-[#1A1A1A] px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 border border-[#F2E8E0] transition-colors"
        >
          <Home size={18} />
          Startseite
        </Link>
      </div>
      
      {/* Dev only info, could be hidden in prod */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-red-50 text-red-500 text-left rounded-xl max-w-lg w-full overflow-auto text-xs font-mono">
          {error.message}
        </div>
      )}
    </div>
  );
}
