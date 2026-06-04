'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { TransitionLink } from '@/components/ui/TransitionLink';
import { Logo } from "@/components/atoms/Logo";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // MOCK DELAY
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#C41E3A] selection:text-white">
      
      {/* Decorative BG */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[rgba(196,30,58,0.05)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[rgba(26,26,26,0.03)] rounded-full blur-3xl pointer-events-none" />

      {/* Header Logo */}
      <div className="absolute top-8 left-8">
        <TransitionLink href="/">
          <Logo variant="primary" className="w-24" />
        </TransitionLink>
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        <AnimatePresence mode="wait">
          
          {!isSuccess ? (
            <motion.div
              key="form"
              variants={formVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(26,26,26,0.05)]"
            >
              <div className="w-16 h-16 bg-[#C41E3A]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#C41E3A]/20">
                <Icons.KeyRound size={28} className="text-[#C41E3A]" />
              </div>
              
              <h1 className="font-calistoga text-3xl sm:text-4xl text-[#1A1A1A] mb-3 leading-[1.2]">
                Passwort <br/> zurücksetzen.
              </h1>
              <p className="text-[#4A4A4A] font-medium mb-10 text-sm sm:text-base leading-relaxed">
                Gib deine E-Mail-Adresse ein und wir senden dir einen Link, um dein Passwort zurückzusetzen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#8A8A8A] uppercase tracking-wider mb-2 ml-1">E-Mail Adresse</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] group-focus-within:text-[#C41E3A] transition-colors">
                      <Icons.Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 outline-none rounded-2xl py-4 pl-12 pr-4 font-bold text-[#1A1A1A] focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all shadow-sm" 
                      placeholder="hallo@unternehmen.de" 
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    disabled={isLoading}
                    className="w-full bg-[#1A1A1A] text-white rounded-2xl py-4 font-black text-lg shadow-[0_10px_30px_rgba(26,26,26,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(26,26,26,0.3)] transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
                  >
                    {isLoading ? <Icons.Loader2 className="animate-spin" size={24} /> : "Link senden"}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <TransitionLink href="/auth" className="text-sm font-bold text-[#8A8A8A] hover:text-[#C41E3A] transition-colors flex items-center justify-center gap-2">
                  <Icons.ArrowLeft size={16} />
                  Zurück zum Login
                </TransitionLink>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              variants={formVariants as any}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(26,26,26,0.05)] text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-100 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Icons.Check size={32} className="text-green-500" strokeWidth={3} />
                </motion.div>
              </div>
              
              <h1 className="font-calistoga text-3xl sm:text-4xl text-[#1A1A1A] mb-4">
                E-Mail gesendet!
              </h1>
              <p className="text-[#4A4A4A] font-medium mb-10 text-sm sm:text-base leading-relaxed">
                Wir haben einen Link zum Zurücksetzen deines Passworts an <strong className="text-[#1A1A1A]">{email}</strong> gesendet. Bitte prüfe auch deinen Spam-Ordner.
              </p>

              <TransitionLink href="/auth" className="w-full">
                <button className="w-full bg-[#1A1A1A] text-white rounded-2xl py-4 font-black text-lg shadow-[0_10px_30px_rgba(26,26,26,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(26,26,26,0.3)] transition-all">
                  Zurück zum Login
                </button>
              </TransitionLink>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
