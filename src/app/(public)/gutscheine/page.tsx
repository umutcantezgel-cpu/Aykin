"use client";

import React, { useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { PrimaryButton } from "@/components/ui/Btn";
import * as Icons from "lucide-react";

export default function GutscheinePage() {
  const [amount, setAmount] = useState<number | "Frei">(50);
  const [delivery, setDelivery] = useState<"mail" | "mail_physical">("mail");
  const [message, setMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const amounts: (number | "Frei")[] = [10, 25, 50, 75, 100, "Frei"];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="bg-[#E8D5C4] pt-[110px] px-6 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3] dot-bg" />
        <div className="relative z-10">
          <h1 className="font-calistoga text-[2.2rem] text-[#1A1A1A] mb-3">Gutscheine</h1>
          <p className="font-nunito text-[#4A4A4A] max-w-sm mx-auto text-sm">Verschenke individuelle 3D-Drucke</p>
        </div>
      </div>

      <div className="max-w-[500px] mx-auto pb-24 -mt-10">
        <FadeUp>
          {/* Hero Ticket */}
          <div className="px-6 mb-8 relative z-20">
            <div className="relative bg-[#C41E3A] rounded-[22px] p-6 text-white overflow-hidden shadow-[0_12px_30px_rgba(196,30,58,0.30)]">
              <div className="absolute -top-8 -right-5 w-[130px] h-[130px] bg-[rgba(255,248,241,0.12)] rounded-full" />
              <div className="absolute top-1/2 -left-3 w-[26px] h-[26px] rounded-full bg-[#FAF8F5] -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 w-[26px] h-[26px] rounded-full bg-[#FAF8F5] -translate-y-1/2" />
              <div className="relative">
                <div className="text-[10px] font-black tracking-[1.4px] uppercase opacity-85">Aykin Gutschein</div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-calistoga text-5xl leading-none">{amount === "Frei" ? "??" : amount}</span>
                  <span className="font-calistoga text-[22px] opacity-90">€</span>
                </div>
                <div className="text-[11.5px] mt-2 opacity-90 font-semibold">Einlösbar für alle Produkte · 36 Monate gültig</div>
              </div>
            </div>
          </div>

          <div className="px-6 space-y-8">
            {/* Amount Selector */}
            <div>
              <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Betrag wählen</div>
              <div className="grid grid-cols-3 gap-2">
                {amounts.map(v => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`rounded-2xl py-3.5 text-center font-calistoga text-lg transition-colors border-2 ${
                      amount === v 
                      ? 'bg-[#C41E3A] text-white border-[#C41E3A]' 
                      : 'bg-white text-[#1A1A1A] border-[#F2E8E0] hover:border-[#C41E3A]'
                    }`}
                  >
                    {typeof v === 'number' ? `${v} €` : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div>
              <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Zustellung</div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setDelivery("mail")}
                  className={`bg-white rounded-2xl p-3 flex gap-3 items-center border-2 transition-colors ${delivery === "mail" ? 'border-[#C41E3A]' : 'border-transparent'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F2E8E0] flex items-center justify-center shrink-0">
                    <Icons.Mail size={18} className="text-[#C41E3A]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-extrabold text-[13px] text-[#1A1A1A]">Per E-Mail</div>
                    <div className="text-[11px] text-[#8A8A8A] mt-0.5">Sofort verfügbar · PDF-Download</div>
                  </div>
                  {delivery === "mail" ? (
                    <div className="w-6 h-6 rounded-full bg-[#C41E3A] flex items-center justify-center">
                      <Icons.Check size={14} color="#fff" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#F2E8E0]" />
                  )}
                </button>
                <button 
                  onClick={() => setDelivery("mail_physical")}
                  className={`bg-white rounded-2xl p-3 flex gap-3 items-center border-2 transition-colors ${delivery === "mail_physical" ? 'border-[#C41E3A]' : 'border-transparent'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F2E8E0] flex items-center justify-center shrink-0">
                    <Icons.ShoppingBag size={18} className="text-[#C41E3A]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-extrabold text-[13px] text-[#1A1A1A]">Premium Geschenkbox</div>
                    <div className="text-[11px] text-[#8A8A8A] mt-0.5">+ 3,90 € · mit Aykin-Branding</div>
                  </div>
                  {delivery === "mail_physical" ? (
                    <div className="w-6 h-6 rounded-full bg-[#C41E3A] flex items-center justify-center">
                      <Icons.Check size={14} color="#fff" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#F2E8E0]" />
                  )}
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Persönliche Nachricht (optional)</div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="z.B. „Alles Liebe zum Geburtstag, viel Spaß mit deinem Custom Print!“"
                className="w-full bg-white rounded-2xl p-4 min-h-[80px] font-nunito text-sm text-[#4A4A4A] outline-none border-2 border-transparent focus:border-[#C41E3A] resize-none italic"
              />
            </div>

            {/* Recipient */}
            <div>
              <div className="text-[11px] font-black text-[#C41E3A] tracking-[1.4px] uppercase mb-3">Empfänger</div>
              <div className="space-y-2">
                <div className="bg-white rounded-xl p-3 flex items-center border-2 border-transparent focus-within:border-[#C41E3A]">
                  <div className="flex-1">
                    <label className="block text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-[0.8px]">Name</label>
                    <input 
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Lisa Schmidt"
                      className="w-full bg-transparent border-none outline-none font-bold text-[13px] text-[#1A1A1A] mt-0.5"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 flex items-center border-2 border-transparent focus-within:border-[#C41E3A]">
                  <div className="flex-1">
                    <label className="block text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-[0.8px]">E-Mail des Empfängers</label>
                    <input 
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="lisa.schmidt@example.de"
                      className="w-full bg-transparent border-none outline-none font-bold text-[13px] text-[#1A1A1A] mt-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#fef8f5] border-t border-[#F2E8E0] p-4 z-50">
        <div className="max-w-[500px] mx-auto">
          <PrimaryButton large className="w-full" sectionBg="#fef8f5">
            <Icons.Gift size={18} /> Gutschein verschenken · {amount === "Frei" ? "??" : amount} €
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
