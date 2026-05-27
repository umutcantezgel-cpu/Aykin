import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessSchema, websiteSchema, organizationSchema } from '@/lib/seo/schemas';
import { ToastContainer } from "@/components/molecules/feedback/Toast";
import { AchievementBanner } from "@/components/molecules/feedback/AchievementBanner";
import CookieConsentBanner from "@/components/legal/CookieConsent";
import CookieRevoke from "@/components/legal/CookieRevoke";
import ScriptManager from "@/components/legal/ScriptManager";
import { SyrupCursor } from "@/components/ui/SyrupCursor";
import "./globals.css";
import "@/styles/cookieconsent-theme.css";
import "@/styles/google-maps-overrides.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s · Aykin',
    default: 'Aykin · Custom 3D Druck — Präzision trifft Kreativität',
  },
  description: 'Aykin — Ihr Partner für individuellen 3D-Druck. Prototypen, Figuren, Architekturmodelle und Industrieteile in höchster Qualität.',
  metadataBase: new URL('https://aykin.de'),
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`h-full antialiased ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col m-0 p-0 overflow-x-hidden font-body bg-bg-primary text-primary">
        <ToastContainer />
        <JsonLd data={[localBusinessSchema, websiteSchema, organizationSchema]} />
        {children}
        <CookieConsentBanner />
        <CookieRevoke />
        <ScriptManager />
        <AchievementBanner />
        <SyrupCursor />
      </body>
    </html>
  );
}
