# Original User Request

## Initial Request — 2026-06-04T18:34:14Z

# Teamwork Project Prompt — Draft

Das Multi-Agenten-Team wird beauftragt, 10 individuelle Agenten einzusetzen, um die 10 Hauptseiten (Startseite, Anfrage, Leistungen, Materialien, Showcase, Visit, Support, Produkte, Über Uns, Kontakt) zu analysieren und zu refaktorieren. Das Ziel ist es, jegliche Responsive-Layout-Brüche (herausspringende Elemente) zu beheben, die Symmetrie und Lesbarkeit zu optimieren und die visuellen Proportionen (Goldener Schnitt) zu perfektionieren.

Working directory: /Users/umurey/Downloads/Aykin
Integrity mode: development

## Requirements

### R1. Responsive Layout Fixes
Jeder der 10 Agenten nimmt sich eine spezifische Seite vor. Alle 10 Seiten müssen auf allen Bildschirmgrößen bruchfrei dargestellt werden. Herausspringende Designelemente müssen durch korrekte Nutzung von `overflow-hidden` oder `max-w-full` Wrappern (insbesondere bei Framer Motion Animationen) eingefangen werden.

### R2. Goldener Schnitt & Symmetrie
Verwende existierende Tailwind-Klassen, um asymmetrische Layouts und Textabstände anzugleichen. Nutze proportionale Verhältnisse (z.B. `w-2/3` zu `w-1/3`, `py-16` / `py-24`) für den Goldenen Schnitt. Verbessere die Lesbarkeit durch optimale Zeilenabstände (`leading-relaxed` / `leading-loose`) und sauberes Padding.

## Acceptance Criteria

### Objektive Verifikation (Agent-as-Judge & Programmatic)
- [ ] Ein unabhängiger "Agent-as-Judge" durchsucht den Code der 10 Seiten und verifiziert, dass alle Container mit Überlappungsgefahr (Framer Motion divs, breite Hero-Sektionen) sicher in `overflow-hidden` oder entsprechenden Schutz-Containern liegen.
- [ ] Es werden keine hardgecodeten Custom-Konstanten in `tailwind.config.ts` eingefügt; der Goldene Schnitt wird rein durch das orchestrierte Anwenden von Tailwind-Utility-Klassen gelöst.
- [ ] Am Ende aller Anpassungen muss `npm run build` absolut fehlerfrei durchlaufen.
