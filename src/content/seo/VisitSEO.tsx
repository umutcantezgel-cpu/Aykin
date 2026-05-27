import React from "react";

/* ──────────────────────────────────────────────────────────────────────
   VisitSEO — Long-form SEO content for /visit (Contact & Info)
   ~2 500 Wörter  ·  Neutral background  ·  Calistoga h2  ·  Nunito text
   ──────────────────────────────────────────────────────────────────── */

const seoSectionStyle: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  padding: "0 24px",
};

const h2Style: React.CSSProperties = {
  fontFamily: "Calistoga, serif",
  fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)",
  color: "#1A1A1A",
  lineHeight: 1.14,
  marginBottom: 18,
  marginTop: 0,
};

const h3Style: React.CSSProperties = {
  fontFamily: "Calistoga, serif",
  fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
  color: "#C41E3A",
  lineHeight: 1.2,
  marginBottom: 12,
  marginTop: 32,
};

const pStyle: React.CSSProperties = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.97rem",
  color: "#4A4A4A",
  lineHeight: 1.88,
  marginBottom: 18,
};

const dividerStyle: React.CSSProperties = {
  width: 60,
  height: 3,
  background: "linear-gradient(90deg, #C41E3A, #E8D5C4)",
  borderRadius: 2,
  margin: "48px auto",
  border: "none",
};

export function VisitSEO() {
  return (
    <section
      aria-label="Aykin kontaktieren — Bestellung, Versand und Service"
      style={{ background: "#FAF8F5", padding: "72px 0 80px" }}
    >
      <div style={seoSectionStyle}>
        {/* ═══════════════════════════════════════════════════════════════
           A) SO ERREICHST DU AYKIN
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>
          So erreichst du Aykin — Kontakt &amp; Bestellung
        </h2>

        <p style={pStyle}>
          Du hast eine Idee, ein Projekt oder eine Frage? Bei Aykin ist der
          erste Schritt immer einfach: Schreib uns eine E-Mail an
          info@aykin.de oder nutze unser Kontaktformular auf der Website.
          Wir antworten in der Regel innerhalb von 24 Stunden und beraten
          dich gerne unverbindlich zu deinem Vorhaben. Ob es um einen
          einzelnen Prototyp, eine Kleinserie oder ein kreatives
          Geschenkprojekt geht — wir freuen uns auf deine Nachricht.
        </p>

        <h3 style={h3Style}>Per E-Mail</h3>

        <p style={pStyle}>
          Der einfachste Weg, dein Projekt bei uns einzureichen: Sende
          dein 3D-Modell (STL, OBJ, 3MF oder STEP) zusammen mit einer
          kurzen Beschreibung an info@aykin.de. Nenne uns das gewünschte
          Material, die Stückzahl und ob du Nachbearbeitung wünschst. Wir
          prüfen deine Datei, optimieren sie bei Bedarf und senden dir
          ein transparentes Angebot — meist noch am selben Tag.
        </p>

        <h3 style={h3Style}>Über das Kontaktformular</h3>

        <p style={pStyle}>
          Auf unserer Website findest du ein Kontaktformular, das dich
          Schritt für Schritt durch die wichtigsten Angaben führt: Projektart,
          Material, Größe, Stückzahl und besondere Anforderungen. So können
          wir dir schneller ein präzises Angebot erstellen. Das Formular
          eignet sich besonders, wenn du noch kein 3D-Modell hast und
          erstmal eine Beratung wünschst.
        </p>

        <h3 style={h3Style}>Telefonische Beratung</h3>

        <p style={pStyle}>
          Für komplexere Projekte oder wenn du lieber persönlich sprichst,
          bieten wir telefonische Beratung an. Vereinbare einfach einen
          Termin per E-Mail, und wir rufen dich zum vereinbarten Zeitpunkt
          an. In einem 30-minütigen Gespräch klären wir alle Details:
          Materialwahl, Druckverfahren, Zeitplan und Budget. Die Beratung
          ist kostenlos und unverbindlich.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           B) DER BESTELLABLAUF
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>
          Der Bestellablauf — Vom Modell zum fertigen Druck
        </h2>

        <p style={pStyle}>
          Bei Aykin ist der Bestellprozess transparent und unkompliziert.
          So läuft ein typischer Auftrag ab:
        </p>

        <p style={pStyle}>
          <strong style={{ color: "#1A1A1A" }}>1. Anfrage:</strong> Du sendest
          uns dein 3D-Modell oder beschreibst dein Projekt. Wenn du noch kein
          Modell hast, erstellen wir eines für dich.
          <br />
          <strong style={{ color: "#1A1A1A" }}>2. Prüfung &amp; Angebot:</strong> Wir
          prüfen dein Modell auf Druckbarkeit, beraten dich zu Material und
          Verfahren und erstellen ein transparentes Angebot.
          <br />
          <strong style={{ color: "#1A1A1A" }}>3. Freigabe:</strong> Du gibst
          den Auftrag frei und wir starten die Fertigung.
          <br />
          <strong style={{ color: "#1A1A1A" }}>4. Druck &amp; Qualitätskontrolle:</strong> Dein
          Teil wird gedruckt, nachbearbeitet (falls gewünscht) und einer
          Qualitätskontrolle unterzogen.
          <br />
          <strong style={{ color: "#1A1A1A" }}>5. Versand / Abholung:</strong> Das
          fertige Produkt wird sicher verpackt und versendet — oder zur
          Abholung bereitgestellt.
        </p>

        <p style={pStyle}>
          <strong style={{ color: "#C41E3A" }}>Tipp:</strong> Je
          detaillierter deine Anfrage, desto schneller können wir dir ein
          passendes Angebot machen. Ideal sind: 3D-Datei, gewünschtes
          Material, Stückzahl, Liefertermin und besondere Anforderungen
          (z.B. Farbe, Nachbearbeitung, enge Toleranzen).
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           C) VERSAND & LIEFERUNG
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>
          Versand &amp; Lieferung
        </h2>

        <p style={pStyle}>
          Wir versenden deutschlandweit — sicher verpackt und in der Regel
          innerhalb von 2–3 Werktagen nach Auftragsfreigabe. Für eilige
          Projekte bieten wir Express-Fertigung mit Versand am nächsten
          Werktag an.
        </p>

        <h3 style={h3Style}>Versandoptionen</h3>

        <p style={pStyle}>
          <strong style={{ color: "#1A1A1A" }}>Standardversand:</strong> DHL-Paket
          mit Tracking — Lieferung in 1–3 Werktagen nach Versand.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Express-Versand:</strong> DHL
          Express für Zustellung am nächsten Werktag — ideal, wenn es
          schnell gehen muss.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Abholung:</strong> Nach
          vorheriger Vereinbarung ist die Abholung vor Ort möglich.
        </p>

        <h3 style={h3Style}>Sichere Verpackung</h3>

        <p style={pStyle}>
          Jedes Teil wird individuell verpackt, um Transportschäden zu
          vermeiden. Filigrane Objekte wie Miniaturen oder Schmuck werden
          in Schaumstoff eingebettet. Größere Teile erhalten Polsterung
          und werden in stabilen Kartons versandt. Wir verwenden
          recycelbare Verpackungsmaterialien und verzichten auf unnötiges
          Füllmaterial.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           D) ZAHLUNGSMETHODEN
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Zahlungsmethoden</h2>

        <p style={pStyle}>
          Bei Aykin bezahlst du bequem und sicher. Wir akzeptieren folgende
          Zahlungsmethoden:
        </p>

        <p style={pStyle}>
          <strong style={{ color: "#1A1A1A" }}>Überweisung:</strong> Vorkasse
          per Banküberweisung — du erhältst die Rechnung per E-Mail.
          <br />
          <strong style={{ color: "#1A1A1A" }}>PayPal:</strong> Schnell und
          sicher bezahlen mit PayPal-Käuferschutz.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Kreditkarte:</strong> Visa und
          Mastercard über unseren sicheren Zahlungsdienstleister.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Barzahlung:</strong> Bei Abholung
          vor Ort.
        </p>

        <p style={pStyle}>
          Für Geschäftskunden bieten wir auf Anfrage auch Rechnungsstellung
          mit Zahlungsziel an. Sprich uns einfach an — wir finden die
          passende Lösung für dein Unternehmen.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           E) QUALITÄTSGARANTIE
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Qualitätsgarantie</h2>

        <p style={pStyle}>
          Qualität ist bei Aykin kein Zufall, sondern Ergebnis konsequenter
          Prozesse. Jedes Teil durchläuft vor dem Versand eine
          Qualitätskontrolle: Wir prüfen Maßhaltigkeit, Oberflächenqualität
          und strukturelle Integrität. Nur Teile, die unseren Standards
          entsprechen, verlassen unser Haus.
        </p>

        <p style={pStyle}>
          Sollte ein Druckergebnis einmal nicht deinen Erwartungen
          entsprechen, melde dich innerhalb von 14 Tagen nach Erhalt mit
          Fotos des Mangels. Wir drucken das Teil kostenlos nach — ohne
          Wenn und Aber. Denn unser Anspruch ist: Was von Aykin kommt,
          muss überzeugen.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           F) FÜR UNTERNEHMEN & B2B
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Für Unternehmen &amp; B2B</h2>

        <p style={pStyle}>
          Aykin ist nicht nur für Privatpersonen da — wir arbeiten
          regelmäßig mit Startups, Ingenieurbüros, Architekturfirmen und
          mittelständischen Unternehmen zusammen. Unser B2B-Service umfasst:
        </p>

        <p style={pStyle}>
          <strong style={{ color: "#1A1A1A" }}>Projektbegleitung:</strong> Von
          der Anforderungsanalyse über die Materialauswahl bis zur
          Serienoptimierung — wir begleiten dein Projekt von Anfang bis Ende.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Kleinserien:</strong> Ab 10 Stück
          mit optimierten Stückpreisen und garantierter Konsistenz.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Rechnungsstellung:</strong> Auf
          Anfrage mit Zahlungsziel — für eine unkomplizierte Buchhaltung.
          <br />
          <strong style={{ color: "#1A1A1A" }}>Vertraulichkeit:</strong> Deine
          CAD-Daten und Projektdetails werden vertraulich behandelt. Auf
          Wunsch unterzeichnen wir eine NDA.
        </p>

        <p style={pStyle}>
          Ob ein einzelner Prototyp für den nächsten Investoren-Pitch oder
          eine regelmäßige Zulieferung von Spezialteilen — Aykin ist dein
          zuverlässiger Partner für alle 3D-Druckanforderungen im
          geschäftlichen Umfeld.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           G) HÄUFIGE FRAGEN ZUM ABLAUF
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Häufige Fragen zum Ablauf</h2>

        <p style={pStyle}>
          <strong>Brauche ich ein fertiges 3D-Modell?</strong> Nein! Wenn du
          noch kein 3D-Modell hast, erstellen wir eines für dich — auf Basis
          von Skizzen, Fotos, Maßangaben oder Beschreibungen. Unser
          CAD-Design-Service ist der perfekte Einstieg für Kunden ohne
          3D-Erfahrung.
        </p>

        <p style={pStyle}>
          <strong>Wie schnell bekomme ich mein Teil?</strong> Standard: 2–3
          Werktage nach Auftragsfreigabe. Express: 24 Stunden. Die
          Versandzeit kommt noch dazu (1–3 Werktage innerhalb Deutschlands).
          Bei komplexen Projekten oder Kleinserien stimmen wir den Zeitplan
          individuell mit dir ab.
        </p>

        <p style={pStyle}>
          <strong>Was kostet ein 3D-Druck bei Aykin?</strong> Der Preis
          hängt von Material, Größe, Druckdauer und Nachbearbeitung ab. Du
          erhältst immer ein transparentes Angebot vor dem Start. Unsere
          Beratungsgespräche sind kostenlos. Für eine grobe Einschätzung
          schau dir unsere Leistungsübersicht mit Richtpreisen an.
        </p>

        <p style={pStyle}>
          <strong>Was passiert bei einem Fehldruck?</strong> Fehlerhafte
          Drucke werden kostenlos wiederholt. Unser Qualitätsversprechen gilt
          ohne Einschränkung. Melde dich einfach innerhalb von 14 Tagen nach
          Erhalt mit Fotos — wir kümmern uns sofort.
        </p>

        <p style={pStyle}>
          Du hast weitere Fragen? Schreib uns an info@aykin.de — wir
          helfen dir gerne weiter. Aykin steht für Transparenz, Qualität
          und persönlichen Service. Wir freuen uns auf dein Projekt!
        </p>
      </div>
    </section>
  );
}
