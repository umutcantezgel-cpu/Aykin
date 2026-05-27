"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

/**
 * ScriptManager — Consent-gated script loader
 * 
 * Loads third-party scripts ONLY after the user has given consent 
 * for the respective category. This is required by TDDDG § 25.
 * 
 * Currently no analytics/marketing scripts are active.
 * When adding new scripts, register them here under the appropriate category.
 */
export default function ScriptManager() {
  useEffect(() => {
    const handleConsent = () => {
      // ── Analytics Category ──
      if (CookieConsent.acceptedCategory("analytics")) {
        // Future: Load Vercel Analytics
        // import("@vercel/analytics").then(({ inject }) => inject());
        
        // Future: Load Firebase Analytics  
        // import("firebase/analytics").then(({ getAnalytics }) => getAnalytics(app));
      }

      // ── Marketing Category ──
      if (CookieConsent.acceptedCategory("marketing")) {
        // Future: Load social media embeds, tracking pixels etc.
      }

      // ── Functional Category ──
      if (CookieConsent.acceptedCategory("functional")) {
        // Achievements and gamification already use localStorage
        // which is handled client-side without this manager
      }
    };

    // Run on initial consent and on any changes
    window.addEventListener("cc:onConsent", handleConsent);
    window.addEventListener("cc:onChange", handleConsent);

    // Check immediately in case consent was already given
    handleConsent();

    return () => {
      window.removeEventListener("cc:onConsent", handleConsent);
      window.removeEventListener("cc:onChange", handleConsent);
    };
  }, []);

  return null;
}
