import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { ScrollProgressBar } from "@/components/atoms/ScrollProgressBar";
import { TransitionCurtain } from "@/components/ui/TransitionCurtain";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BitemarkMaskDefs } from "@/components/atoms/BitemarkSystem";
import { PhysicsPlaygroundContainer } from "@/components/ui/PhysicsPlaygroundContainer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgressBar />
      <BitemarkMaskDefs />
      <SplashScreen />
      <TransitionCurtain />
      <Header />
      <main className="flex-grow pt-[68px]">
        {children}
        <SpeedInsights />
      </main>
      <Footer />
      <CartDrawer />
      <CookieBanner />
      <PhysicsPlaygroundContainer />
    </>
  );
}
