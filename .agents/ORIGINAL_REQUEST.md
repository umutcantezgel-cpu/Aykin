# Original User Request

## Initial Request — 2026-06-07T15:17:19Z

# Teamwork Project Prompt

Das Multi-Agenten-Team wird beauftragt, sämtliche Layout- und Navigationsprobleme (Überlappungen, herausspringende Elemente) auf der Aykin-Webseite für alle Endgeräte (insbesondere Mobile) zu beheben. Dabei übernehmen dedizierte Agenten jeweils spezifische Seiten/Komponenten, während ein unabhängiger Audit-Agent die Qualitätssicherung durchführt.

Working directory: /Users/umurey/Downloads/Aykin
Integrity mode: development

## Requirements

### R1. Behebung von Layout-Brüchen
Alle Seiten (Startseite, Anfrage, Leistungen, Materialien, Showcase, Visit, Support, Produkte, Über Uns, Kontakt) müssen so überarbeitet werden, dass es auf keinen Bildschirmgrößen (Mobile, Tablet, Desktop) zu horizontalem Scrollen, überlappenden Texten oder abgeschnittenen Designelementen kommt. Insbesondere das Mobile Menü und die komplexe Framer Motion Navigation müssen bruchfrei funktionieren.

### R2. Einsatz eines Audit-Agenten
Das Team muss zwingend einen internen "Agent-as-Judge" (Audit-Agent) einsetzen, der die Änderungen der anderen Agenten verifiziert, bevor der Task als abgeschlossen gilt.

## Acceptance Criteria

### Objektive Verifikation
- [ ] **Build-Check:** Ein `npm run build` muss nach allen Änderungen ohne Fehler (0 Type Errors, 0 Lint Errors) durchlaufen.
- [ ] **Audit-Verifikation:** Der Audit-Agent bestätigt in seinem Report, dass alle Container mit potenzieller Überlappungsgefahr (insbesondere breite Hero-Sektionen und Framer Motion Divs) korrekt mit Wrappern (`overflow-hidden`, `max-w-full` etc.) abgesichert wurden.
- [ ] **Navigations-Check:** Das Hamburger-Menü und der Header lassen sich auf Mobile-Screens (<1024px) ohne Text-Überlappungen bedienen.
