'use client';

import React from "react";
import { MapPin, Phone, Globe } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { WaveDivider } from "@/components/atoms/WaveDivider";
import { NewsletterInput } from "@/components/molecules/forms/NewsletterInput";

export function Footer() {
  return (
    <footer className="relative bg-sand pt-10">
      <div className="absolute top-0 left-0 w-full -translate-y-[99%]">
        <WaveDivider variant="long-curve" className="w-[150%] md:w-full h-auto text-sand" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & NAP */}
          <div className="flex flex-col items-start">
            <TransitionLink href="/" aria-label="Startseite">
              <Logo variant="primary" className="w-20 mb-4" />
            </TransitionLink>
            <p className="font-calistoga text-xl text-charcoal mb-4">Custom 3D Druck</p>
            
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <span className="font-bold text-sm text-charcoal">
                  Musterstraße 1<br />35578 Wetzlar
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-terracotta shrink-0" />
                <span className="font-bold text-sm text-charcoal">
                  06441 0000000
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <a 
                href="https://instagram.com/aykin3d" 
                target="_blank" 
                rel="noreferrer"
                className="bg-terracotta text-cream px-4 py-2 rounded-full font-bold text-[13px] hover:bg-[#A01830] transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" /> Instagram
              </a>
              <a 
                href="https://tiktok.com/@aykin3d" 
                target="_blank" 
                rel="noreferrer"
                className="bg-charcoal text-cream px-4 py-2 rounded-full font-bold text-xs hover:bg-brown transition-colors shadow-clay"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-calistoga text-xl text-terracotta mb-6">Aykin</h4>
            <nav className="flex flex-col gap-4">
              {[
                { href: '/', label: 'Startseite' },
                { href: '/menu', label: 'Produkte' },
                { href: '/about', label: 'Über Uns' },
                { href: '/visit', label: 'Standort & Kontakt' }
              ].map(link => (
                <TransitionLink 
                  key={link.href} 
                  href={link.href}
                  className="font-bold text-charcoal w-fit hover:text-terracotta transition-colors relative group"
                >
                  {link.label}
                  {/* Wavy hover underline */}
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{
                    maskImage: 'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'3\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 1.5 Q 2.5 0, 5 1.5 T 10 1.5\' fill=\'none\' stroke=\'black\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                    maskRepeat: 'repeat-x'
                  }} />
                </TransitionLink>
              ))}
            </nav>
          </div>

          {/* Column 3: Leistungen */}
          <div>
            <h4 className="font-calistoga text-xl text-terracotta mb-6">Leistungen</h4>
            <div className="flex flex-col gap-3 font-bold text-sm">
              <div className="flex justify-between p-2 rounded-xl text-charcoal">
                <span>FDM-Druck</span>
                <span>Auf Anfrage</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl text-charcoal">
                <span>SLA-Druck</span>
                <span>Auf Anfrage</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl text-charcoal">
                <span>3D-Modellierung</span>
                <span>Auf Anfrage</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-cream rounded-2xl border-2 border-peach text-xs font-bold text-terracotta text-center transform -rotate-2">
              ✓ Kostenlose Erstberatung
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-calistoga text-xl text-terracotta mb-6">Bleib informiert</h4>
            <p className="text-sm font-bold text-charcoal/80 mb-4">
              Abonniere unseren Newsletter für exklusive Angebote und die neuesten 3D-Druck Projekte.
            </p>
            <NewsletterInput />
          </div>

        </div>

        {/* Tagline Strip */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-12 border-t border-peach/50 relative">
          <span className="font-calistoga text-3xl md:text-5xl text-charcoal transform -rotate-3 hover:rotate-0 transition-transform">Präzise</span>
          <span className="text-terracotta font-calistoga text-2xl hidden md:block">·</span>
          <span className="font-calistoga text-3xl md:text-5xl text-charcoal transform rotate-2 hover:rotate-0 transition-transform">Individuell</span>
          <span className="text-terracotta font-calistoga text-2xl hidden md:block">·</span>
          <span className="font-calistoga text-3xl md:text-5xl text-terracotta transform -rotate-1 hover:rotate-0 transition-transform">Premium</span>
        </div>

        {/* Decorative Strip */}
        <div className="h-16 w-full rounded-full overflow-hidden relative mb-12 flex items-center justify-around opacity-60" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(196, 30, 58, 0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }}
        >
          {/* Sparse decorative icons */}
          <svg className="w-6 h-6 text-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <svg className="w-6 h-6 text-peach" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          <svg className="w-6 h-6 text-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/></svg>
          <svg className="w-6 h-6 text-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
          <svg className="w-6 h-6 text-charcoal" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 8l6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"/></svg>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-brown">
          <p>© {new Date().getFullYear()} Aykin · Custom 3D Druck</p>
          <div className="flex gap-6">
            <TransitionLink href="/legal#impressum" className="hover:text-terracotta transition-colors">Impressum</TransitionLink>
            <TransitionLink href="/legal#datenschutz" className="hover:text-terracotta transition-colors">Datenschutz</TransitionLink>
            <TransitionLink href="/legal#agb" className="hover:text-terracotta transition-colors">AGB</TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
