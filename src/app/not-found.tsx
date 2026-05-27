import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-5 text-center relative overflow-hidden">
      
      {/* Background Blobs for friendly tone */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E8D5C4] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#C41E3A] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* 3D Print Illustration */}
        <div className="relative mb-8 group">
          <div className="w-40 h-40 bg-[#C41E3A] rounded-full flex items-center justify-center text-7xl shadow-clay transition-transform group-hover:scale-105">
            🔧
          </div>
        </div>

        <h1 className="font-calistoga text-5xl text-[#1A1A1A] mb-4">Ups! 404</h1>
        <p className="font-nunito text-lg text-[#7a5a52] max-w-sm mb-8">
          Diese Seite existiert leider nicht. Vielleicht wurde sie verschoben oder entfernt.
        </p>

        <Link 
          href="/"
          className="bg-[#C41E3A] text-[#FAF8F5] px-8 py-4 rounded-full font-bold text-lg shadow-clay hover:bg-[#A01830] transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
