"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, Database, Cookie as CookieIcon, Scale, Mail,
  AlertTriangle, ChevronDown, ExternalLink, CheckCircle2, Info, Building2, Phone } from "lucide-react";
import * as CookieConsentLib from "vanilla-cookieconsent";

/* ═══════════════════════════════════════════════════════════
   Utility Components
   ═══════════════════════════════════════════════════════════ */

function LegalIcon({ children, color = "#C41E3A" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", background: color,
      color: "#fefefe", display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

/** Collapsible accordion section */
function AccordionSection({
  icon, number, title, children, defaultOpen = false,
}: {
  icon: React.ReactNode; number: string; title: string;
  children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      layout
      style={{
        background: open ? "rgba(250,248,245,0.6)" : "transparent",
        borderRadius: 18,
        border: open ? "1px solid rgba(232,213,196,0.4)" : "1px solid transparent",
        marginBottom: 8,
        overflow: "hidden",
        transition: "background 0.3s, border 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <LegalIcon>{icon}</LegalIcon>
        <div style={{ flex: 1 }}>
          <span style={{
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "0.72rem",
            fontWeight: 800,
            color: "#C41E3A",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>{number}</span>
          <div style={{
            fontFamily: "var(--font-calistoga), serif",
            fontSize: "1.05rem",
            color: "#1A1A1A",
          }}>{title}</div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronDown size={20} color="#8A8A8A" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "0 20px 20px 64px",
              fontFamily: "var(--font-nunito), sans-serif",
              color: "#4A4A4A",
              fontSize: "0.9rem",
              lineHeight: 1.72,
            }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Cookie pill badge */
function CookieBadge({ category }: { category: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Notwendig: { bg: "#C41E3A", text: "#fefefe" },
    Funktional: { bg: "#E8D5C4", text: "#1A1A1A" },
    Statistik: { bg: "#8A8A8A", text: "#fefefe" },
    Marketing: { bg: "#4A4A4A", text: "#fefefe" },
  };
  const c = colors[category] || colors.Notwendig;
  return (
    <span style={{
      background: c.bg, color: c.text,
      padding: "3px 12px", borderRadius: 50,
      fontSize: "0.7rem", fontWeight: 800,
      letterSpacing: "0.03em",
    }}>{category}</span>
  );
}

/** Right card — one of the Betroffenenrechte */
function RightCard({ right, article }: { right: string; article: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(196,30,58,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: "rgba(242,232,224,0.5)",
        borderRadius: 14,
        padding: "14px 18px",
        cursor: "default",
        border: "1px solid rgba(232,213,196,0.3)",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 2,
      }}>
        <CheckCircle2 size={14} color="#C41E3A" />
        <span style={{ fontWeight: 800, color: "#1A1A1A", fontSize: "0.85rem" }}>{right}</span>
      </div>
      <span style={{ fontSize: "0.72rem", color: "#8A8A8A", fontWeight: 600 }}>{article}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Legal Page
   ═══════════════════════════════════════════════════════════ */
export default function LegalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeSection, setActiveSection] = useState("impressum");

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "impressum", label: "Impressum", icon: <Building2 size={14} /> },
    { id: "datenschutz", label: "Datenschutz", icon: <Shield size={14} /> },
    { id: "cookies", label: "Cookies", icon: <CookieIcon size={14} /> },
    { id: "agb", label: "AGB", icon: <FileText size={14} /> },
  ];

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: "#fefefe" }}>
      {/* Scroll progress bar */}
      <motion.div style={{
        position: "fixed", top: 68, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, #C41E3A, #E8D5C4)",
        transformOrigin: "left", scaleX, zIndex: 100,
      }} />

      {/* Hero Header */}
      <div style={{
        background: "linear-gradient(180deg, #F2E8E0 0%, #FAF8F5 100%)",
        paddingTop: 120, paddingBottom: 48, textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: 80, right: "10%", width: 120, height: 120,
          borderRadius: "50%", background: "rgba(196,30,58,0.06)",
          animation: "blobFloat 9s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: 20, left: "5%", width: 80, height: 80,
          borderRadius: "50%", background: "rgba(232,213,196,0.15)",
          animation: "blobFloat 12s ease-in-out infinite reverse",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(196,30,58,0.1)", padding: "6px 16px",
            borderRadius: 50, marginBottom: 16,
          }}>
            <Shield size={14} color="#C41E3A" />
            <span style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "0.75rem", fontWeight: 800, color: "#C41E3A",
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}>DSGVO · TDDDG · DDG konform</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-calistoga), serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#1A1A1A", margin: "0 0 8px",
          }}>Rechtliches</h1>
          <p style={{
            fontFamily: "var(--font-nunito), sans-serif",
            color: "#4A4A4A", fontSize: "1rem", margin: 0,
          }}>Transparenz & Vertrauen bei Aykin</p>
        </motion.div>

        {/* Sticky section nav */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex", gap: 6, justifyContent: "center",
            marginTop: 28, flexWrap: "wrap", padding: "0 16px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: activeSection === item.id
                  ? "#C41E3A"
                  : "rgba(250,248,245,0.8)",
                color: activeSection === item.id ? "#fefefe" : "#4A4A4A",
                padding: "8px 18px", borderRadius: 50,
                fontFamily: "var(--font-nunito), sans-serif",
                fontWeight: 800, fontSize: "0.8rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
                border: activeSection === item.id
                  ? "1px solid transparent"
                  : "1px solid rgba(232,213,196,0.3)",
              }}
            >
              {item.icon} {item.label}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 96px" }}>

        {/* ═══ IMPRESSUM ═══ */}
        <section id="impressum" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-calistoga), serif", fontSize: "1.8rem",
              color: "#1A1A1A", marginBottom: 28,
              borderBottom: "2px solid #F2E8E0", paddingBottom: 16,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <Building2 size={24} color="#C41E3A" /> Impressum
          </motion.h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}>
            {/* Anbieter Card */}
            <motion.div
              whileHover={{ y: -4 }}
              style={{
                background: "#FAF8F5", borderRadius: 20, padding: 24,
                border: "1px solid rgba(232,213,196,0.3)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
              }}>
                <Building2 size={16} color="#C41E3A" />
                <h3 style={{
                  fontFamily: "var(--font-calistoga), serif", color: "#1A1A1A",
                  fontSize: "0.95rem", margin: 0,
                }}>Anbieter</h3>
              </div>
              <p style={{
                fontFamily: "var(--font-nunito), sans-serif", color: "#4A4A4A",
                fontSize: "0.88rem", lineHeight: 1.7, margin: 0,
              }}>
                Aykin · Custom 3D Druck<br/>
                Inhaber: [Name eintragen]<br/>
                [Straße eintragen]<br/>
                [PLZ Ort eintragen]
              </p>
            </motion.div>

            {/* Kontakt Card */}
            <motion.div
              whileHover={{ y: -4 }}
              style={{
                background: "#FAF8F5", borderRadius: 20, padding: 24,
                border: "1px solid rgba(232,213,196,0.3)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
              }}>
                <Phone size={16} color="#C41E3A" />
                <h3 style={{
                  fontFamily: "var(--font-calistoga), serif", color: "#1A1A1A",
                  fontSize: "0.95rem", margin: 0,
                }}>Kontakt</h3>
              </div>
              <p style={{
                fontFamily: "var(--font-nunito), sans-serif", color: "#4A4A4A",
                fontSize: "0.88rem", lineHeight: 1.7, margin: 0,
              }}>
                Tel: [Telefonnummer eintragen]<br/>
                E-Mail: <span style={{ color: "#C41E3A", fontWeight: 700 }}>info@aykin3d.de</span>
              </p>
            </motion.div>

            {/* USt-ID Card */}
            <motion.div
              whileHover={{ y: -4 }}
              style={{
                background: "#FAF8F5", borderRadius: 20, padding: 24,
                border: "1px solid rgba(232,213,196,0.3)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
              }}>
                <FileText size={16} color="#C41E3A" />
                <h3 style={{
                  fontFamily: "var(--font-calistoga), serif", color: "#1A1A1A",
                  fontSize: "0.95rem", margin: 0,
                }}>Steuernummer</h3>
              </div>
              <p style={{
                fontFamily: "var(--font-nunito), sans-serif", color: "#4A4A4A",
                fontSize: "0.88rem", lineHeight: 1.7, margin: 0,
              }}>
                USt-IdNr. gem. § 27a UStG:<br/>
                <span style={{
                  display: "inline-block", background: "#F2E8E0", padding: "3px 10px",
                  borderRadius: 8, fontFamily: "monospace", fontSize: "0.85rem", marginTop: 6,
                }}>DE 312 456 789</span>
              </p>
            </motion.div>

            {/* Inhaltlich Verantwortlich */}
            <motion.div
              whileHover={{ y: -4 }}
              style={{
                background: "#FAF8F5", borderRadius: 20, padding: 24,
                border: "1px solid rgba(232,213,196,0.3)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
              }}>
                <Info size={16} color="#C41E3A" />
                <h3 style={{
                  fontFamily: "var(--font-calistoga), serif", color: "#1A1A1A",
                  fontSize: "0.95rem", margin: 0,
                }}>§ 18 MStV</h3>
              </div>
              <p style={{
                fontFamily: "var(--font-nunito), sans-serif", color: "#4A4A4A",
                fontSize: "0.88rem", lineHeight: 1.7, margin: 0,
              }}>
                Verantwortlich für den Inhalt:<br/>
                [Name eintragen]<br/>
                [Adresse eintragen]
              </p>
            </motion.div>
          </div>

          {/* EU Streitschlichtung */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, #F2E8E0 0%, #FAF8F5 100%)",
              padding: 20, borderRadius: 16, marginTop: 20,
              fontSize: "0.85rem", fontFamily: "var(--font-nunito), sans-serif",
              color: "#4A4A4A", border: "1px solid rgba(232,213,196,0.3)",
            }}
          >
            <strong style={{ color: "#1A1A1A" }}>EU-Streitschlichtung:</strong>{" "}
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
              style={{ color: "#C41E3A", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
              ec.europa.eu/consumers/odr <ExternalLink size={12} style={{ verticalAlign: "middle" }} />
            </a>.
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </motion.div>
        </section>

        {/* ═══ DATENSCHUTZ ═══ */}
        <section id="datenschutz" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-calistoga), serif", fontSize: "1.8rem",
              color: "#1A1A1A", marginBottom: 28,
              borderBottom: "2px solid #F2E8E0", paddingBottom: 16,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <Shield size={24} color="#C41E3A" /> Datenschutzerklärung
          </motion.h2>

          <AccordionSection icon={<Shield size={14} />} number="01" title="Verantwortlicher" defaultOpen>
            <p>
              [Name eintragen], Inhaber von Aykin · Custom 3D Druck<br/>
              [Adresse eintragen]<br/>
              E-Mail: <span style={{ fontWeight: 700, color: "#C41E3A" }}>datenschutz@aykin3d.de</span>
            </p>
          </AccordionSection>

          <AccordionSection icon={<Database size={14} />} number="02" title="Erhobene Daten">
            <p style={{ marginBottom: 12 }}>Für die Nutzung unserer Website und den Bestellservice erfassen wir:</p>
            <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
              <li>Name & Telefonnummer (für Rückfragen zum Auftrag)</li>
              <li>E-Mail-Adresse (für Auftragsbestätigung & Kontoanmeldung)</li>
              <li>Auftragsdaten (zur Bearbeitung deines 3D-Druck-Auftrags)</li>
              <li>Technische Daten: IP-Adresse, Browser-Typ, Gerät, Betriebssystem</li>
              <li>Nutzungsdaten: Aufgerufene Seiten, Verweildauer (nur bei Statistik-Consent)</li>
            </ul>
          </AccordionSection>

          <AccordionSection icon={<Scale size={14} />} number="03" title="Rechtsgrundlagen">
            <div style={{
              display: "grid", gap: 10,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}>
              {[
                { art: "Art. 6 Abs. 1 lit. a", title: "Einwilligung", desc: "Optionale Cookies (Statistik, Marketing)" },
                { art: "Art. 6 Abs. 1 lit. b", title: "Vertragserfüllung", desc: "Abwicklung deines Auftrags" },
                { art: "Art. 6 Abs. 1 lit. f", title: "Berechtigtes Interesse", desc: "Server-Logs, Website-Sicherheit" },
              ].map((r) => (
                <div key={r.art} style={{
                  background: "rgba(242,232,224,0.5)", borderRadius: 14, padding: 16,
                  border: "1px solid rgba(232,213,196,0.3)",
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#C41E3A", marginBottom: 4 }}>{r.art}</div>
                  <div style={{ fontWeight: 800, color: "#1A1A1A", fontSize: "0.88rem" }}>{r.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#8A8A8A", marginTop: 4 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection icon={<Eye size={14} />} number="04" title="Empfänger & Auftragsverarbeiter">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ background: "rgba(242,232,224,0.6)" }}>
                    {["Dienst", "Anbieter", "Zweck"].map((h) => (
                      <th key={h} style={{
                        padding: "10px 14px", fontWeight: 800, color: "#1A1A1A",
                        textAlign: "left", fontSize: "0.72rem", textTransform: "uppercase",
                        letterSpacing: "0.06em", borderBottom: "1px solid rgba(232,213,196,0.4)",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Firebase Auth", "Google Ireland Ltd", "Nutzer-Authentifizierung"],
                    ["Firebase Firestore", "Google Ireland Ltd", "Speicherung von Aufträgen"],
                    ["Vercel", "Vercel Inc., USA", "Website-Hosting & CDN"],
                    ["Google Maps", "Google Ireland Ltd", "Interaktive Karte (nach Einwilligung)"],
                  ].map(([d, a, z], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(232,213,196,0.25)" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 700 }}>{d}</td>
                      <td style={{ padding: "10px 14px" }}>{a}</td>
                      <td style={{ padding: "10px 14px" }}>{z}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionSection>

          <AccordionSection icon={<Server size={14} />} number="05" title="Drittlandtransfer (USA)">
            <p>
              Einige der eingesetzten Dienste (Google, Vercel) haben ihren Sitz in den USA.
              Die Datenübermittlung erfolgt auf Grundlage des{" "}
              <strong>EU-US Data Privacy Framework</strong> (Angemessenheitsbeschluss gem. Art. 45 DSGVO)
              sowie ergänzend auf Basis von EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
            </p>
          </AccordionSection>

          <AccordionSection icon={<FileText size={14} />} number="06" title="Speicherdauer">
            <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
              <li><strong>Auftragsdaten:</strong> 90 Tage nach Fertigstellung (automatische Löschung)</li>
              <li><strong>Kontodaten:</strong> Bis zur Löschung deines Kontos durch dich</li>
              <li><strong>Server-Logs:</strong> Maximal 30 Tage</li>
              <li><strong>Kontaktanfragen:</strong> 6 Monate nach Abschluss der Bearbeitung</li>
              <li><strong>Steuerrelevante Daten:</strong> 10 Jahre (gesetzliche Aufbewahrungspflicht)</li>
            </ul>
          </AccordionSection>

          <AccordionSection icon={<Lock size={14} />} number="07" title="Deine Rechte (Betroffenenrechte)">
            <p style={{ marginBottom: 12 }}>Nach der DSGVO stehen dir folgende Rechte zu:</p>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 8,
            }}>
              {[
                ["Auskunft", "Art. 15"], ["Berichtigung", "Art. 16"], ["Löschung", "Art. 17"],
                ["Einschränkung", "Art. 18"], ["Datenübertragbarkeit", "Art. 20"], ["Widerspruch", "Art. 21"],
              ].map(([r, a]) => (
                <RightCard key={r} right={r} article={a} />
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              Kontaktiere uns unter <span style={{ fontWeight: 700, color: "#C41E3A" }}>datenschutz@aykin3d.de</span>.
            </p>
          </AccordionSection>

          <AccordionSection icon={<Server size={14} />} number="08" title="Hosting & CDN">
            <p>
              Unsere Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA)
              gehostet. Beim Aufruf werden technische Daten (IP-Adresse, Browser, Zeitpunkt) automatisch erhoben.
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
          </AccordionSection>

          <AccordionSection icon={<Database size={14} />} number="09" title="Firebase (Google)">
            <p>
              Für die Nutzer-Authentifizierung und Datenspeicherung nutzen wir Firebase-Dienste von Google Ireland Limited
              (Gordon House, Barrow Street, Dublin 4, Irland). Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
              Datentransfer in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework.
            </p>
          </AccordionSection>

          <AccordionSection icon={<Mail size={14} />} number="10" title="Kontaktformular">
            <p>
              Wenn du uns kontaktierst, werden die angegebenen Daten (Name, E-Mail, Nachricht) zur Bearbeitung deiner
              Anfrage verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nach Abschluss
              der Bearbeitung und Ablauf steuerrechtlicher Aufbewahrungsfristen gelöscht.
            </p>
          </AccordionSection>

          <AccordionSection icon={<AlertTriangle size={14} />} number="11" title="Beschwerderecht">
            <p>
              Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
            </p>
            <div style={{
              background: "rgba(242,232,224,0.5)", borderRadius: 14, padding: 16, marginTop: 12,
              border: "1px solid rgba(232,213,196,0.3)",
            }}>
              <strong style={{ color: "#1A1A1A" }}>Zuständige Behörde:</strong><br/>
              Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)<br/>
              Postfach 3163, 65021 Wiesbaden<br/>
              <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer"
                style={{ color: "#C41E3A", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
                datenschutz.hessen.de <ExternalLink size={12} style={{ verticalAlign: "middle" }} />
              </a>
            </div>
          </AccordionSection>
        </section>

        {/* ═══ COOKIES (Interactive) ═══ */}
        <section id="cookies" style={{ marginBottom: 72, scrollMarginTop: 100 }}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-calistoga), serif", fontSize: "1.8rem",
              color: "#1A1A1A", marginBottom: 12,
              borderBottom: "2px solid #F2E8E0", paddingBottom: 16,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <CookieIcon size={24} color="#C41E3A" /> Cookies & Tracking
          </motion.h2>

          <p style={{
            fontFamily: "var(--font-nunito), sans-serif", fontSize: "0.9rem",
            color: "#4A4A4A", lineHeight: 1.72, marginBottom: 24,
          }}>
            Unsere Website verwendet Cookies. Die Rechtsgrundlage für technisch notwendige Cookies
            ist Art. 6 Abs. 1 lit. f DSGVO. Für alle anderen Cookies holen wir deine Einwilligung ein
            (Art. 6 Abs. 1 lit. a DSGVO, § 25 TDDDG).
          </p>

          {/* Interactive cookie cards */}
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { name: "cc_cookie", provider: "Aykin", purpose: "Cookie-Einstellungen speichern", duration: "6 Monate", category: "Notwendig" },
              { name: "__session", provider: "Firebase Auth", purpose: "Login-Session-Verwaltung", duration: "Sitzung", category: "Notwendig" },
              { name: "splash_shown", provider: "Aykin", purpose: "Splash-Screen nur 1× zeigen", duration: "Sitzung", category: "Notwendig" },
              { name: "ay_ach_*", provider: "Aykin", purpose: "Achievement-Fortschritt", duration: "Dauerhaft", category: "Funktional" },
              { name: "NID / 1P_JAR", provider: "Google Maps", purpose: "Interaktive Karte auf der Standort-Seite", duration: "6 Monate", category: "Funktional" },
            ].map((cookie) => (
              <motion.div
                key={cookie.name}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "#FAF8F5", borderRadius: 16, padding: "14px 20px",
                  border: "1px solid rgba(232,213,196,0.3)",
                  flexWrap: "wrap",
                }}
              >
                <span style={{
                  fontFamily: "monospace", fontWeight: 700, fontSize: "0.82rem",
                  color: "#1A1A1A", minWidth: 100,
                }}>{cookie.name}</span>
                <span style={{
                  flex: 1, fontSize: "0.82rem", color: "#4A4A4A", minWidth: 140,
                }}>{cookie.purpose}</span>
                <span style={{
                  fontSize: "0.75rem", color: "#8A8A8A", minWidth: 70,
                }}>{cookie.duration}</span>
                <CookieBadge category={cookie.category} />
              </motion.div>
            ))}
          </div>

          {/* CTA: manage cookies */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => CookieConsentLib.showPreferences()}
            style={{
              display: "flex", alignItems: "center", gap: 10, justifyContent: "center",
              width: "100%", marginTop: 24, padding: "14px 28px",
              background: "#C41E3A", color: "#fefefe", border: "none",
              borderRadius: 50, cursor: "pointer",
              fontFamily: "var(--font-nunito), sans-serif",
              fontWeight: 800, fontSize: "0.88rem",
              boxShadow: "0 6px 20px rgba(196,30,58,0.3)",
            }}
          >
            <CookieIcon size={18} /> Cookie-Einstellungen jetzt anpassen
          </motion.button>
        </section>

        {/* ═══ AGB ═══ */}
        <section id="agb" style={{ scrollMarginTop: 100 }}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-calistoga), serif", fontSize: "1.8rem",
              color: "#1A1A1A", marginBottom: 28,
              borderBottom: "2px solid #F2E8E0", paddingBottom: 16,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <FileText size={24} color="#C41E3A" /> AGB
          </motion.h2>

          {/* TL;DR Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, #E8D5C4 0%, #F2E8E0 100%)",
              padding: 24, borderRadius: 20, marginBottom: 32,
              fontFamily: "var(--font-nunito), sans-serif", fontSize: "0.88rem", color: "#4A4A4A",
              border: "1px solid rgba(232,213,196,0.3)",
            }}
          >
            <h3 style={{
              fontFamily: "var(--font-calistoga), serif", color: "#1A1A1A",
              fontSize: "1rem", margin: "0 0 14px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Info size={16} color="#C41E3A" /> Das Wichtigste in Kürze
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                "Anfrage ist kostenlos & unverbindlich",
                "Zahlung per Vorkasse oder PayPal",
                "Stornierung bis zum Produktionsstart möglich",
                "Individuelle Beratung für jedes Projekt",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle2 size={14} color="#C41E3A" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AGB Paragraphs as Accordions */}
          {[
            { n: "§ 1", t: "Geltungsbereich", c: "Diese AGB gelten für alle Aufträge über die Aykin Online-Plattform." },
            { n: "§ 2", t: "Vertragsschluss", c: "Der Vertrag kommt mit Bestätigung deines Auftrags per E-Mail zustande. Bis dahin gilt die Anfrage als unverbindlich." },
            { n: "§ 3", t: "Preise & Bezahlung", c: "Alle Preise inkl. gesetzl. MwSt. (19%). Bezahlung per Vorkasse, PayPal oder Überweisung." },
            { n: "§ 4", t: "Lieferung & Stornierung", c: "Stornierung kostenlos bis zum Produktionsstart. Nach Produktionsbeginn ist eine Stornierung nur in Ausnahmefällen möglich." },
            { n: "§ 5", t: "Haftung", c: "Aykin haftet nur bei Vorsatz und grober Fahrlässigkeit. Für leichte Fahrlässigkeit nur bei Verletzung wesentlicher Vertragspflichten." },
          ].map((s) => (
            <AccordionSection key={s.n} icon={<Scale size={14} />} number={s.n} title={s.t}>
              <p style={{ margin: 0 }}>{s.c}</p>
            </AccordionSection>
          ))}
        </section>

        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: 56, padding: "16px 24px",
            background: "linear-gradient(135deg, #F2E8E0 0%, #FAF8F5 100%)",
            borderRadius: 16,
            fontFamily: "var(--font-nunito), sans-serif",
            fontSize: "0.78rem", color: "#8A8A8A",
            textAlign: "center",
            border: "1px solid rgba(232,213,196,0.3)",
          }}
        >
          Stand: Mai 2026 · Diese Seite dient der Information und ersetzt keine Rechtsberatung.
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blobFloat { 0%,100%{transform:translate(0,0)} 33%{transform:translate(6px,-10px)} 66%{transform:translate(-5px,7px)} }
      `}} />
    </div>
  );
}
