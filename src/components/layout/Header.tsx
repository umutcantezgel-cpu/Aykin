'use client';

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { User, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { HamburgerIcon } from "@/components/atoms/icons";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { PrimaryCTA } from "@/components/atoms/buttons";
import { useStore } from "@/store/useStore";
import { useStoreSettings } from "@/hooks/useStoreSettings";
import { MobileMenu } from "./MobileMenu";
import { PromoBanner } from "./PromoBanner";
import { ScrollProgressBar } from "@/components/atoms/ScrollProgressBar";
import { twMerge } from "tailwind-merge";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart, toggleCart } = useStore();
  const { settings } = useStoreSettings();
  const prefersReducedMotion = useReducedMotion();

  // Scroll interpolation (0 to 120px) for the floating island effect
  const { scrollY } = useScroll();
  
  // Interpolations for Floating Island
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 120], [0, 16]);
  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 0.15]);
  
  // Floating dynamics
  const headerTop = useTransform(scrollY, [0, 120], [0, 24]);
  const headerWidth = useTransform(scrollY, [0, 120], ["100%", "90%"]);
  const headerMaxWidth = useTransform(scrollY, [0, 120], ["100%", "1000px"]);
  const headerRadius = useTransform(scrollY, [0, 120], [0, 100]);
  const headerBorder = useTransform(scrollY, [0, 120], ["rgba(250,248,245, 0)", "rgba(196,30,58, 0.1)"]); // subtle terracotta border
  
  // Shrink height slightly when floating
  const headerHeightDesktop = useTransform(scrollY, [0, 120], [88, 72]);
  const headerHeightMobile = useTransform(scrollY, [0, 120], [72, 64]);

  const links = [
    { id: "produkte", href: "/produkte", label: "Produkte" },
    { id: "leistungen", href: "/leistungen", label: "Leistungen" },
    { id: "materialien", href: "/materialien", label: "Materialien" },
    { id: "showcase", href: "/showcase", label: "Showcase" },
    { id: "faq", href: "/faq", label: "FAQ" },
    { id: "ueber-uns", href: "/ueber-uns", label: "Über Uns" },
    { id: "kontakt", href: "/kontakt", label: "Standort & Kontakt" },
  ];

  return (
    <>
      <ScrollProgressBar />
      
      {/* Wrapper fixed to top, acts as bounds for the floating island */}
      <div className="fixed top-0 left-0 right-0 z-[900] flex flex-col items-center pointer-events-none">
        {settings?.bannerText && (
          <div className="w-full pointer-events-auto">
            <PromoBanner text={settings.bannerText} />
          </div>
        )}
        
        <motion.header 
          style={prefersReducedMotion ? {
            backgroundColor: 'rgba(250,248,245, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(196,30,58, 0.1)',
            boxShadow: '0 10px 40px -10px rgba(196,30,58, 0.15)',
            marginTop: '24px',
            width: '90%',
            maxWidth: '1000px',
            borderRadius: '100px',
          } : {
            marginTop: headerTop,
            width: headerWidth,
            maxWidth: headerMaxWidth,
            borderRadius: headerRadius,
            backgroundColor: useTransform(bgOpacity, v => `rgba(250,248,245, ${v})`),
            backdropFilter: useTransform(blur, v => `blur(${v}px)`),
            border: useTransform(headerBorder, v => `1px solid ${v}`),
            boxShadow: useTransform(shadowOpacity, v => `0 10px 40px -10px rgba(196,30,58, ${v})`)
          }}
          className="pointer-events-auto flex items-center transition-all duration-300 overflow-hidden"
        >
          <motion.div 
            style={{ height: headerHeightDesktop }}
            className="w-full px-4 md:px-8 flex items-center justify-between gap-2 md:gap-4 hidden md:flex"
          >
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <TransitionLink href="/" aria-label="Aykin Startseite" className="block">
                <Logo variant="primary" className="w-[60px]" />
              </TransitionLink>
            </div>

            {/* Middle: Navigation with Magnetic Hover Effects */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map(({ id, href, label }) => {
                const active = pathname === href;
                return (
                  <TransitionLink 
                    key={id} 
                    href={href}
                    className="relative group px-4 py-2"
                  >
                    <span className={twMerge(
                      "relative z-10 font-bold text-sm transition-colors duration-300",
                      active ? "text-terracotta" : "text-charcoal group-hover:text-terracotta"
                    )}>
                      {label}
                    </span>
                    {/* Magnetic hover pill */}
                    <div className={twMerge(
                      "absolute inset-0 rounded-full transition-all duration-300 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-sand/50 -z-0",
                      active && "scale-100 opacity-100 bg-sand"
                    )} />
                  </TransitionLink>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* PrimaryCTA Desktop */}
              <div className="hidden lg:block">
                <TransitionLink href="/menu" tabIndex={-1}>
                  <PrimaryCTA className="py-2.5 px-6 text-sm" showArrow>
                    Anfrage starten
                  </PrimaryCTA>
                </TransitionLink>
              </div>

              {/* Profile */}
              <TransitionLink href="/auth" aria-label="Profil">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta hover:bg-sand hover:scale-105 transition-all border-2 border-peach cursor-pointer">
                  <User size={18} strokeWidth={2.5} />
                </div>
              </TransitionLink>

              {/* Cart */}
              <button 
                onClick={toggleCart}
                className="relative w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta hover:bg-sand hover:scale-105 transition-all border-2 border-peach cursor-pointer"
                aria-label="Warenkorb"
              >
                <ShoppingBag size={18} strokeWidth={2.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-cream text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-cream">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Mobile Layout */}
          <motion.div 
            style={{ height: headerHeightMobile }}
            className="w-full px-4 flex items-center justify-between gap-2 md:hidden"
          >
            <TransitionLink href="/" aria-label="Aykin Startseite" className="block">
              <Logo variant="primary" className="w-[50px]" />
            </TransitionLink>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleCart}
                className="relative w-9 h-9 rounded-full bg-cream flex items-center justify-center text-terracotta hover:bg-sand transition-all border-2 border-peach cursor-pointer"
              >
                <ShoppingBag size={16} strokeWidth={2.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta text-cream text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-cream">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                className="w-10 h-10 flex items-center justify-center bg-transparent border-none text-charcoal"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menü öffnen"
              >
                <HamburgerIcon className="w-7 h-7" />
              </button>
            </div>
          </motion.div>
        </motion.header>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        pathname={pathname} 
      />
    </>
  );
}
