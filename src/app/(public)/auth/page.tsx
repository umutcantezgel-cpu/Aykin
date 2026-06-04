'use client';

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { TransitionLink } from '@/components/ui/TransitionLink';
import { useRouter } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";
import { PrimaryCTA } from "@/components/atoms/buttons";

function AuthFlow() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // MOCK AUTH DELAY
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to profile or mock dashboard after "successful" login
      router.push("/profile");
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex w-full">
      
      {/* LEFT SIDE: Branding & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#1A1A1A] relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Abstract Background Animation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #C41E3A 0%, transparent 50%)',
            backgroundSize: '150% 150%',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px] z-0" />

        <div className="relative z-10">
          <TransitionLink href="/">
            <Logo variant="light" className="w-24 drop-shadow-lg" />
          </TransitionLink>
        </div>

        <div className="relative z-10 max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-calistoga text-5xl xl:text-6xl mb-6 leading-[1.1]"
          >
            Engineering <br/> Excellence.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-400 font-light leading-relaxed max-w-md"
          >
            Willkommen im Aykin Portal. Verwalte deine Projekte, Rechnungen und 3D-Modelle an einem zentralen Ort.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Aykin</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full" />
          <span>Custom 3D Druck</span>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 lg:hidden">
          <TransitionLink href="/">
            <Logo variant="primary" className="w-20" />
          </TransitionLink>
        </div>

        <div className="w-full max-w-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              variants={formVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mb-10">
                <h2 className="font-calistoga text-4xl text-[#1A1A1A] mb-3">
                  {isLogin ? "Willkommen zurück" : "Konto erstellen"}
                </h2>
                <p className="text-[#4A4A4A] font-medium">
                  {isLogin ? "Logge dich ein, um fortzufahren." : "Starte dein nächstes Projekt mit uns."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* NAME FIELD (Only for Register) */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-xs font-bold text-[#8A8A8A] uppercase tracking-wider mb-2 ml-1">Name</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] group-focus-within:text-[#C41E3A] transition-colors"><Icons.User size={18} /></div>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required={!isLogin}
                          className="w-full bg-white border border-gray-200 outline-none rounded-2xl py-4 pl-12 pr-4 font-bold text-[#1A1A1A] focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all shadow-sm" 
                          placeholder="Max Mustermann" 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EMAIL FIELD */}
                <div>
                  <label className="block text-xs font-bold text-[#8A8A8A] uppercase tracking-wider mb-2 ml-1">E-Mail</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] group-focus-within:text-[#C41E3A] transition-colors"><Icons.Mail size={18} /></div>
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

                {/* PASSWORD FIELD */}
                <div>
                  <label className="block text-xs font-bold text-[#8A8A8A] uppercase tracking-wider mb-2 ml-1">Passwort</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] group-focus-within:text-[#C41E3A] transition-colors"><Icons.Lock size={18} /></div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 outline-none rounded-2xl py-4 pl-12 pr-4 font-bold text-[#1A1A1A] focus:border-[#C41E3A] focus:ring-4 focus:ring-[#C41E3A]/10 transition-all shadow-sm" 
                      placeholder="••••••••" 
                    />
                  </div>
                  {isLogin && (
                    <div className="text-right mt-3">
                      <TransitionLink href="/password-reset" className="text-xs font-bold text-[#8A8A8A] hover:text-[#C41E3A] transition-colors">
                        Passwort vergessen?
                      </TransitionLink>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isLoading}
                    className="w-full bg-[#C41E3A] text-white rounded-2xl py-4 font-black text-lg shadow-[0_10px_30px_rgba(196,30,58,0.25)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(196,30,58,0.4)] transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
                  >
                    {isLoading ? <Icons.Loader2 className="animate-spin" size={24} /> : (isLogin ? "Anmelden" : "Konto erstellen")}
                  </button>
                </div>

              </form>

              <div className="mt-10 text-center text-sm font-bold text-[#4A4A4A]">
                {isLogin ? "Noch kein Konto? " : "Bereits ein Konto? "}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#C41E3A] hover:underline"
                >
                  {isLogin ? "Jetzt registrieren" : "Hier anmelden"}
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Icons.Loader2 className="animate-spin text-[#C41E3A]" size={32} />
      </div>
    }>
      <AuthFlow />
    </Suspense>
  );
}
