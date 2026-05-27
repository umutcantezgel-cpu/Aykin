import React from 'react';

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-calistoga), serif',
  fontSize: '1.4rem',
  color: '#1A1A1A',
  marginTop: 40,
  marginBottom: 12,
};

const pStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  marginBottom: 16,
};

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-calistoga), serif',
  fontSize: '1.15rem',
  color: '#2D2D2D',
  marginTop: 24,
  marginBottom: 8,
};

export function HomeSEO() {
  return (
    <section
      aria-label="Über Aykin — Hintergrundinformationen"
      style={{
        background: '#FAF8F5',
        borderTop: '1px solid rgba(232,213,196,0.3)',
        padding: '60px 20px',
        fontFamily: 'var(--font-nunito), sans-serif',
        color: '#4A4A4A',
        lineHeight: 1.8,
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      {/* ——— A) Aykin — Dein Partner für individuellen 3D-Druck ——— */}
      <h2 style={h2Style}>
        Aykin — Dein Partner für individuellen 3D-Druck
      </h2>
      <p style={pStyle}>
        Willkommen bei Aykin — deinem Spezialisten für Custom 3D-Druck in
        Deutschland. Wir verbinden modernste additive Fertigungstechnologie mit
        handwerklicher Sorgfalt, um deine Ideen in greifbare Objekte zu
        verwandeln. Ob du einen Prototyp für dein Startup brauchst,
        detailgetreue Tabletop-Figuren suchst oder ein personalisiertes
        Geschenk verschenken möchtest — bei Aykin bist du richtig. Unser
        Motto: Präzision trifft Kreativität.
      </p>
      <p style={pStyle}>
        Wir haben Aykin mit einer klaren Vision gegründet: Jedem Zugang zu
        hochwertigem 3D-Druck zu ermöglichen — ohne Mindestbestellmengen, ohne
        unnötige Komplexität. Bei uns kann jeder bestellen: Privatpersonen,
        die ein Unikat suchen, Maker und Bastler, die technische Teile
        benötigen, Architekten, die Modelle für Wettbewerbe brauchen, und
        Unternehmen, die schnelle Prototypen oder Kleinserien fertigen lassen
        wollen. Aykin steht für individuelle Lösungen, persönliche Beratung
        und Ergebnisse, die überzeugen.
      </p>
      <p style={pStyle}>
        Was uns antreibt, ist die Faszination für die Möglichkeiten des
        3D-Drucks. Jedes Projekt ist einzigartig — und genau so behandeln wir
        es. Von der ersten Beratung über die Materialauswahl bis zum fertigen
        Objekt begleiten wir dich persönlich. Dabei setzen wir auf moderne
        FDM- und Resin-Druckverfahren, die je nach Anforderung
        unterschiedliche Stärken ausspielen: FDM für robuste, funktionale
        Teile und Resin für filigrane Details und glatte Oberflächen.
      </p>

      {/* ——— B) Was uns besonders macht ——— */}
      <h2 style={h2Style}>Was Aykin besonders macht</h2>
      <p style={pStyle}>
        Bei Aykin steht Qualität an erster Stelle — und das beginnt lange vor
        dem eigentlichen Druck. Jedes eingehende Modell wird von uns geprüft,
        optimiert und für den Druck vorbereitet. Wir erkennen potenzielle
        Problemstellen, bevor sie entstehen, und beraten dich proaktiv zu
        Materialwahl, Ausrichtung und Stützstrukturen. So stellen wir sicher,
        dass dein Druckergebnis nicht nur gut aussieht, sondern auch funktional
        überzeugt.
      </p>
      <p style={pStyle}>
        Unsere Materialauswahl deckt ein breites Spektrum ab: PLA für
        umweltfreundliche Standarddrucke, PETG für mechanische Belastbarkeit
        und Temperaturbeständigkeit, ASA für UV-beständige Außenanwendungen,
        Nylon für maximale Festigkeit, TPU für flexible Bauteile und
        hochauflösendes Resin für Miniaturmodelle und Schmuck. Für jedes
        Projekt finden wir das optimale Material — und erklären dir gerne,
        warum.
      </p>
      <p style={pStyle}>
        Hinter Aykin steht ein Team, das 3D-Druck nicht nur als Dienstleistung
        versteht, sondern als Handwerk. Jeder Druck wird überwacht, jedes
        fertige Teil inspiziert. Wir arbeiten nicht nach dem Prinzip „Datei
        rein, Teil raus" — sondern begleiten jedes Projekt mit der
        Aufmerksamkeit, die es verdient. Diese Sorgfalt ist es, die unsere
        Kunden schätzen und die uns von automatisierten Druckfabriken
        unterscheidet.
      </p>

      {/* ——— C) Unsere Leistungen im Überblick ——— */}
      <h2 style={h2Style}>Unsere Leistungen im Überblick</h2>
      <p style={pStyle}>
        Bei Aykin bieten wir ein umfassendes Leistungsspektrum rund um den
        individuellen 3D-Druck. Von der ersten Idee bis zum fertigen Produkt
        — wir begleiten dich durch jeden Schritt. Hier ein Überblick über
        unsere Kernbereiche:
      </p>

      <h3 style={h3Style}>Prototypen & Produktentwicklung</h3>
      <p style={pStyle}>
        Rapid Prototyping ist eine unserer Kernkompetenzen. Wir drucken dein
        CAD-Modell in wenigen Tagen zu einem greifbaren Prototyp — ideal für
        Design-Reviews, Funktionstests oder Investoren-Präsentationen. Durch
        den Einsatz verschiedener Materialien können wir sowohl optische als
        auch funktionale Prototypen fertigen. Iteratives Prototyping wird durch
        unsere kurzen Durchlaufzeiten besonders effizient: Anpassung, Neudruck,
        Test — und das innerhalb weniger Tage.
      </p>

      <h3 style={h3Style}>Figuren & Modelle</h3>
      <p style={pStyle}>
        Von 28mm-Tabletop-Miniaturen bis zu 40cm-Sammlerfiguren — unsere
        Figuren begeistern durch ihre Detailtreue. Im Resin-Druck erreichen wir
        Schichtdicken von nur 0,05 mm, was feinste Texturen und Gesichtszüge
        ermöglicht. Ob Dungeons-and-Dragons-Charaktere, Anime-Figuren,
        Gaming-Modelle oder individuelle Büsten — wir drucken, was du dir
        vorstellst. Auf Wunsch bieten wir auch Nachbearbeitung und
        Grundierung an.
      </p>

      <h3 style={h3Style}>Architekturmodelle</h3>
      <p style={pStyle}>
        Für Architekten, Studierende und Immobilienentwickler fertigen wir
        maßstabsgetreue Modelle, die bei Wettbewerben und Präsentationen
        überzeugen. Von einzelnen Gebäuden bis hin zu kompletten
        Quartiermodellen mit Umgebung — die Detailtreue und Präzision unserer
        Drucke sprechen für sich. Wir arbeiten in gängigen Maßstäben von
        1:100 bis 1:500 und beraten dich gerne zur optimalen Darstellung.
      </p>

      <h3 style={h3Style}>Industrieteile & Ersatzteile</h3>
      <p style={pStyle}>
        Ob Gehäuse, Halterungen, Zahnräder oder Spezialadapter — wir drucken
        funktionale Industrieteile, die mechanischen Anforderungen standhalten.
        Besonders beliebt: unser Ersatzteil-Service für Bauteile, die vom
        Hersteller nicht mehr lieferbar sind. Anhand einer Zeichnung, eines
        3D-Scans oder auch eines defekten Originals fertigen wir passgenau
        Ersatz — schnell und kosteneffizient.
      </p>

      <h3 style={h3Style}>Personalisierte Geschenke</h3>
      <p style={pStyle}>
        Einzigartige Geschenke, die es so nicht zu kaufen gibt: Lithophane
        aus deinem Lieblingsfoto, personalisierte Namensschilder, individuelle
        Figuren nach Fotovorlage oder maßgefertigte Geschenkboxen. Bei Aykin
        wird jedes Geschenk zum Unikat — perfekt für Geburtstage, Hochzeiten,
        Jubiläen oder einfach, um jemandem eine Freude zu machen.
      </p>

      <h3 style={h3Style}>Schmuck & Accessoires</h3>
      <p style={pStyle}>
        Mit Resin-Druck entstehen filigrane Ringe, Anhänger und Ohrringe, die
        durch ihre Einzigartigkeit bestechen. Jedes Stück wird individuell
        gestaltet und kann mit Texten, Motiven oder geometrischen Mustern
        personalisiert werden. Leicht, hypoallergen und in verschiedenen
        Farben verfügbar — 3D-gedruckter Schmuck von Aykin ist modern,
        nachhaltig und unverwechselbar.
      </p>

      {/* ——— D) Für wen ist Aykin? ——— */}
      <h2 style={h2Style}>Für wen ist Aykin?</h2>
      <p style={pStyle}>
        Unser 3D-Druck-Service richtet sich an ein breites Spektrum von Kunden.
        Hier sind einige der häufigsten Anwendungsfälle:
      </p>
      <ul style={{ ...pStyle, paddingLeft: 24 }}>
        <li style={{ marginBottom: 10 }}>
          <strong>Startups & Produktentwickler:</strong> Schnelle Prototypen
          für Design-Reviews und Investoren-Pitches. Iteration in Tagen statt
          Wochen — perfekt für agile Entwicklungsprozesse.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Architekten & Studierende:</strong> Maßstabsgetreue
          Gebäudemodelle für Wettbewerbe, Präsentationen und Abschlussarbeiten.
          Professionelle Qualität zu fairen Preisen.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Maker & Bastler:</strong> Technische Bauteile,
          Robotik-Komponenten, Gehäuse und Adapter — individuell nach deinen
          Maßen gefertigt. Perfekt für Projekte, die Standardteile nicht
          abdecken.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Tabletop-Spieler & Sammler:</strong> Hochdetaillierte
          Miniaturen und Sammlerfiguren im Resin-Druck. Von D&D über
          Warhammer bis zu individuellen Charakteren.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Privatpersonen:</strong> Personalisierte Geschenke,
          Ersatzteile für den Haushalt, Dekoartikel oder einfach ein
          kreatives Projekt umsetzen — bei Aykin gibt es keine
          Mindestbestellmenge.
        </li>
      </ul>

      {/* ——— E) Unsere Druckverfahren ——— */}
      <h2 style={h2Style}>
        Unsere Druckverfahren — FDM und Resin im Detail
      </h2>
      <p style={pStyle}>
        Bei Aykin setzen wir auf zwei bewährte 3D-Druckverfahren, die
        unterschiedliche Stärken haben und sich optimal ergänzen. Je nach
        deinem Projekt empfehlen wir das passende Verfahren — oder eine
        Kombination aus beiden.
      </p>

      <h3 style={h3Style}>FDM-Druck (Fused Deposition Modeling)</h3>
      <p style={pStyle}>
        Beim FDM-Druck wird ein thermoplastischer Kunststoff schichtweise
        aufgetragen und verschmolzen. Dieses Verfahren ist ideal für
        funktionale Bauteile, Gehäuse, Prototypen und größere Objekte.
        Die verfügbaren Materialien — PLA, PETG, ASA, Nylon, TPU und ABS —
        bieten jeweils spezifische Vorteile: von Biokompatibilität über
        Witterungsbeständigkeit bis hin zu Flexibilität. FDM-Drucke
        überzeugen durch ihre mechanische Belastbarkeit und ihr
        hervorragendes Preis-Leistungs-Verhältnis.
      </p>

      <h3 style={h3Style}>Resin-Druck (SLA/MSLA)</h3>
      <p style={pStyle}>
        Beim Resin-Druck wird flüssiges Kunstharz durch UV-Licht
        schichtweise ausgehärtet. Das Ergebnis: extrem feine Details,
        glatte Oberflächen und eine Auflösung, die FDM nicht erreichen kann.
        Ideal für Miniaturfiguren, Schmuck, Zahnmedizin-Modelle und
        Designobjekte, bei denen jedes Detail zählt. Unsere Resin-Drucker
        erreichen Schichtdicken von nur 0,025 mm — damit werden selbst
        feinste Texturen sichtbar.
      </p>

      {/* ——— F) Materialien & Qualität ——— */}
      <h2 style={h2Style}>Materialien &amp; Qualitätsversprechen</h2>
      <p style={pStyle}>
        Die Wahl des richtigen Materials ist entscheidend für das Ergebnis
        deines 3D-Drucks. Bei Aykin beraten wir dich ausführlich und
        empfehlen das Material, das am besten zu deinem Anwendungsfall passt.
        Wir verwenden ausschließlich hochwertige Filamente und Resins von
        etablierten Herstellern — denn die Materialqualität bestimmt
        maßgeblich die Festigkeit, Optik und Langlebigkeit des fertigen
        Objekts.
      </p>
      <p style={pStyle}>
        Jeder Druck durchläuft bei uns eine Qualitätskontrolle: Wir prüfen
        Maßhaltigkeit, Oberflächenqualität und strukturelle Integrität, bevor
        ein Teil unser Haus verlässt. Sollte ein Druck nicht unseren
        Standards entsprechen, wird er wiederholt — ohne Aufpreis für dich.
        Denn unser Anspruch ist klar: Was von Aykin kommt, muss überzeugen.
        Präzision trifft Kreativität — bei jedem einzelnen Druckauftrag.
      </p>

      {/* ——— G) Nachhaltigkeit ——— */}
      <h2 style={h2Style}>Nachhaltigkeit im 3D-Druck</h2>
      <p style={pStyle}>
        Nachhaltigkeit ist für uns nicht nur ein Schlagwort, sondern Teil
        unserer täglichen Arbeit. 3D-Druck ist von Natur aus
        ressourcenschonend: Im Gegensatz zu subtraktiven Verfahren wie
        Fräsen entsteht kaum Materialabfall, da nur das Material verwendet
        wird, das tatsächlich benötigt wird. Stützstrukturen und Fehldrucke
        sammeln wir getrennt und führen sie dem Recycling zu.
      </p>
      <p style={pStyle}>
        Wo möglich, setzen wir auf PLA — ein Biokunststoff, der aus
        nachwachsenden Rohstoffen wie Maisstärke hergestellt wird. Unsere
        Verpackungen sind recycelbar und auf das Nötigste reduziert. Wir
        optimieren Druckprozesse kontinuierlich, um Energieverbrauch und
        Materialverschnitt zu minimieren. Denn wir glauben: Hochwertige
        Produkte und verantwortungsvoller Umgang mit Ressourcen schließen
        sich nicht aus — sie bedingen einander.
      </p>
    </section>
  );
}
