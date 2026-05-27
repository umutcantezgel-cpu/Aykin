"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookieConsentBanner() {
  useEffect(() => {
    const initCC = () => {
      // Small extra delay after splash for smooth UX
      setTimeout(() => {
        CookieConsent.run({
          guiOptions: {
            consentModal: {
              layout: "box",
              position: "bottom left",
              equalWeightButtons: true,
            },
            preferencesModal: {
              layout: "box",
            },
          },

          categories: {
            necessary: {
              enabled: true,
              readOnly: true,
            },
            functional: {
              enabled: false,
            },
            analytics: {
              enabled: false,
            },
            marketing: {
              enabled: false,
            },
          },

          language: {
            default: "de",
            translations: {
              de: {
                consentModal: {
                  title: "🧇 Cookies & Datenschutz",
                  description:
                    'Hey! Wir verwenden Cookies, um dir das beste Erlebnis auf unserer Website zu bieten. Du entscheidest selbst, welche Kategorien du zulassen möchtest. Mehr dazu in unserer <a href="/legal#datenschutz" class="cc-link">Datenschutzerklärung</a>.',
                  acceptAllBtn: "Alle akzeptieren",
                  acceptNecessaryBtn: "Nur Notwendige",
                  showPreferencesBtn: "Einstellungen anpassen",
                },
                preferencesModal: {
                  title: "Cookie-Einstellungen",
                  acceptAllBtn: "Alle akzeptieren",
                  acceptNecessaryBtn: "Alle ablehnen",
                  savePreferencesBtn: "Auswahl speichern",
                  closeIconLabel: "Schließen",
                  sections: [
                    {
                      title: "Deine Cookie-Einstellungen",
                      description:
                        "Hier kannst du genau festlegen, welche Cookies wir setzen dürfen. Technisch notwendige Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.",
                    },
                    {
                      title: "Technisch Notwendige Cookies",
                      description:
                        "Diese Cookies sind für den Betrieb der Website unbedingt erforderlich. Sie ermöglichen grundlegende Funktionen wie die Anmeldung, den Warenkorb und die Seitennavigation.",
                      linkedCategory: "necessary",
                      cookieTable: {
                        headers: {
                          name: "Cookie",
                          domain: "Anbieter",
                          description: "Zweck",
                          expiration: "Laufzeit",
                        },
                        body: [
                          {
                            name: "cc_cookie",
                            domain: "aykin3d.de",
                            description: "Speichert deine Cookie-Einstellungen",
                            expiration: "6 Monate",
                          },
                          {
                            name: "__session",
                            domain: "Firebase Auth",
                            description: "Login-Session-Verwaltung",
                            expiration: "Sitzung",
                          },
                        ],
                      },
                    },
                    {
                      title: "Funktionale Cookies",
                      description:
                        "Diese Cookies ermöglichen erweiterte Funktionen wie das Speichern deiner Spracheinstellungen, Theme-Präferenzen und Gamification-Fortschritte (z.B. Achievements).",
                      linkedCategory: "functional",
                      cookieTable: {
                        headers: {
                          name: "Cookie",
                          domain: "Anbieter",
                          description: "Zweck",
                          expiration: "Laufzeit",
                        },
                        body: [
                          {
                            name: "hf_ach_*",
                            domain: "aykin3d.de",
                            description: "Achievement-Gamification-Fortschritt",
                            expiration: "Dauerhaft",
                          },
                        ],
                      },
                    },
                    {
                      title: "Statistik & Analyse",
                      description:
                        "Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen. Alle Daten werden anonymisiert erfasst.",
                      linkedCategory: "analytics",
                    },
                    {
                      title: "Marketing & Social Media",
                      description:
                        "Diese Cookies werden genutzt, um dir personalisierte Inhalte und Werbung anzuzeigen. Sie können auch von Drittanbietern gesetzt werden, deren Dienste wir auf unserer Website eingebunden haben.",
                      linkedCategory: "marketing",
                    },
                    {
                      title: "Weitere Informationen",
                      description:
                        'Bei Fragen zu unseren Cookies kontaktiere uns unter <a href="mailto:datenschutz@aykin3d.de" class="cc-link">datenschutz@aykin3d.de</a> oder lies unsere vollständige <a href="/legal#datenschutz" class="cc-link">Datenschutzerklärung</a>.',
                    },
                  ],
                },
              },
            },
          },
        });
      }, 500); // 500ms grace period after splash exits
    };

    // Wait for splash screen to finish before showing cookie banner
    const onSplashDone = () => {
      window.removeEventListener("splash:done", onSplashDone);
      clearTimeout(fallback);
      initCC();
    };

    window.addEventListener("splash:done", onSplashDone);

    // Hard fallback: if splash:done never fires (edge case), init after 4s
    const fallback = setTimeout(() => {
      window.removeEventListener("splash:done", onSplashDone);
      initCC();
    }, 4000);

    return () => {
      window.removeEventListener("splash:done", onSplashDone);
      clearTimeout(fallback);
    };
  }, []);

  return null;
}
