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

export function MenuSEO() {
  return (
    <section
      aria-label="Aykin Leistungen — Ausführliche Beschreibungen"
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
      {/* ——— 1) Prototypen ——— */}
      <h2 style={h2Style}>
        Prototypen — Vom Konzept zum greifbaren Objekt
      </h2>
      <p style={pStyle}>
        Rapid Prototyping ist eine der größten Stärken des 3D-Drucks — und
        bei Aykin haben wir diesen Prozess perfektioniert. Ob du ein
        Startup bist, das einen Investor überzeugen muss, ein Ingenieur,
        der eine Designidee validieren will, oder ein Produktdesigner, der
        Form und Haptik testen möchte — wir drucken dein CAD-Modell in
        wenigen Tagen zu einem greifbaren Prototyp, den du in der Hand
        halten, testen und präsentieren kannst.
      </p>
      <p style={pStyle}>
        Unser Prototyping-Service deckt verschiedene Anforderungsstufen ab:
        Der Standard-Prototyp in PLA oder PETG liefert dir schnell und
        kosteneffizient ein physisches Modell für Design-Reviews. Der
        Feindetail-Prototyp in Resin bietet glasklare Oberflächen und
        feinste Details für Kundenpräsentationen. Und der Funktionsprototyp
        in belastbaren Materialien wie Nylon oder ASA ermöglicht echte
        mechanische Tests unter realistischen Bedingungen.
      </p>
      <p style={pStyle}>
        Was Aykin beim Prototyping besonders macht: Wir denken mit. Bevor
        wir drucken, prüfen wir dein Modell auf Druckbarkeit, identifizieren
        potenzielle Schwachstellen und schlagen Optimierungen vor. Durch
        unsere kurzen Durchlaufzeiten von 2–3 Werktagen (Express in 24h)
        wird iteratives Prototyping besonders effizient: Anpassung am CAD,
        Neudruck, Test — und das alles innerhalb einer Woche. So kommst du
        schneller zum optimalen Produkt.
      </p>

      {/* ——— 2) Figuren & Modelle ——— */}
      <h2 style={h2Style}>
        Figuren &amp; Modelle — Detailtreue, die begeistert
      </h2>
      <p style={pStyle}>
        Von der 28mm-Tabletop-Miniatur bis zur 40cm-Sammlerfigur — bei
        Aykin drucken wir Figuren, die durch ihre außergewöhnliche
        Detailtreue begeistern. Unser Resin-Druck erreicht Schichtdicken
        von nur 0,05 mm, wodurch feinste Texturen, Gesichtszüge, Rüstungen
        und Waffen gestochen scharf abgebildet werden. Ob Dungeons &amp;
        Dragons, Warhammer, Anime oder individuelle Charaktere — wir
        bringen deine Vorstellungen in die physische Welt.
      </p>
      <p style={pStyle}>
        Für Tabletop-Spieler bieten wir einzelne Heldenfiguren ebenso wie
        komplette Armeen. Jede Figur wird sorgfältig gedruckt, Stützstrukturen
        werden präzise entfernt und die Oberfläche so vorbereitet, dass sie
        sich ideal bemalen lässt. Auf Wunsch bieten wir auch Grundierung an,
        damit du direkt mit dem Bemalen starten kannst.
      </p>
      <p style={pStyle}>
        Unser Custom-Design-Service ermöglicht es dir, eine völlig
        individuelle Figur nach deinen Vorstellungen fertigen zu lassen.
        Anhand von Referenzbildern, Beschreibungen oder 3D-Scans erstellen
        wir ein druckfertiges Modell und fertigen es in der gewünschten
        Größe und Auflösung. Ob Hochzeitstopper, personalisierte
        Spielfigur oder einzigartiges Sammlerstück — bei Aykin wird
        jede Figur zum Unikat.
      </p>

      {/* ——— 3) Architekturmodelle ——— */}
      <h2 style={h2Style}>Architekturmodelle — Präzision im Maßstab</h2>
      <p style={pStyle}>
        Für Architekten, Studierende und Immobilienentwickler fertigen wir
        maßstabsgetreue Modelle, die bei Wettbewerben, Präsentationen und
        Entwurfsdiskussionen überzeugen. Vom einzelnen Gebäude über
        Fassadendetails bis hin zu kompletten Quartiersmodellen mit
        Umgebung — die Präzision und Detailtreue unserer 3D-Drucke
        sprechen für sich.
      </p>
      <p style={pStyle}>
        Wir arbeiten in gängigen Maßstäben von 1:100 bis 1:500 und
        beraten dich gerne zur optimalen Darstellung. Unsere Modelle
        können einfarbig (klassisch weiß) oder mehrfarbig gefertigt
        werden. Fassadenstrukturen, Fensteröffnungen, Dachformen und
        Umgebungselemente werden mit hoher Genauigkeit umgesetzt. Für
        Wettbewerbsmodelle bieten wir auch beschleunigte Fertigung an,
        damit du auch bei engen Deadlines ein überzeugendes Modell
        präsentieren kannst.
      </p>
      <p style={pStyle}>
        Ein Architekturmodell von Aykin ist mehr als ein Ausdruck — es ist
        ein Kommunikationsmittel, das deine Entwurfsidee greifbar macht.
        Investoren, Bauherren und Jurymitglieder können Proportionen,
        Materialität und räumliche Wirkung beurteilen, bevor ein
        einziger Stein gesetzt wird. Das macht 3D-gedruckte
        Architekturmodelle zu einem unverzichtbaren Werkzeug in der
        modernen Planungspraxis.
      </p>

      {/* ——— 4) Industrieteile ——— */}
      <h2 style={h2Style}>Industrieteile — Funktional und belastbar</h2>
      <p style={pStyle}>
        Nicht jedes 3D-Druckobjekt ist zum Anschauen gedacht — manche müssen
        arbeiten. Bei Aykin drucken wir funktionale Industrieteile, die
        mechanischen Anforderungen standhalten: Gehäuse, Halterungen,
        Zahnräder, Adapter, Verkleidungen und Spezialkomponenten. Mit
        Materialien wie PETG, ASA und Nylon erreichen wir die nötige
        Festigkeit, Temperaturbeständigkeit und chemische Resistenz.
      </p>
      <p style={pStyle}>
        Besonders gefragt ist unser Service für Einzelanfertigungen und
        Kleinserien: Wenn ein Standardteil nicht mehr lieferbar ist, die
        Spritzgussform zu teuer wäre oder eine individuelle Lösung benötigt
        wird, ist 3D-Druck die effizienteste Alternative. Wir fertigen
        nach technischer Zeichnung oder 3D-Modell und halten Toleranzen
        von ±0,1 bis ±0,2 mm ein.
      </p>
      <p style={pStyle}>
        Für B2B-Kunden bieten wir Projektbegleitung von der Anforderungsanalyse
        über die Materialauswahl bis zur Qualitätskontrolle des fertigen Teils.
        Bei Kleinserien ab 50 Stück optimieren wir den Prozess für konsistente
        Qualität und wettbewerbsfähige Stückpreise. Aykin ist dein Partner
        für alle industriellen 3D-Druckanforderungen — flexibel, zuverlässig
        und qualitätsbewusst.
      </p>

      {/* ——— 5) Personalisierte Geschenke ——— */}
      <h2 style={h2Style}>Personalisierte Geschenke — Einzigartig wie der Empfänger</h2>
      <p style={pStyle}>
        Manchmal sagt ein Geschenk mehr, wenn es einzigartig ist. Bei Aykin
        fertigen wir personalisierte Geschenke, die es so nicht zu kaufen
        gibt: Lithophane aus deinem Lieblingsfoto, die ein Bild durch
        unterschiedliche Materialdicken sichtbar machen, wenn man sie
        beleuchtet. Personalisierte Namensschilder für die Tür, den
        Schreibtisch oder das Kinderzimmer. Individuelle Figuren, die
        nach einem Foto modelliert werden.
      </p>
      <p style={pStyle}>
        Unsere Lithophane sind der absolute Bestseller im Geschenkbereich.
        Die Technik ist faszinierend: Ein normales Foto wird in ein
        3D-Relief umgewandelt, bei dem dickere Bereiche dunkler und
        dünnere Bereiche heller erscheinen. Vor einer LED-Lichtquelle
        entsteht ein verblüffend detailliertes Bild, das Gäste immer
        wieder zum Staunen bringt. Perfekt für Geburtstage, Hochzeiten,
        Jubiläen oder als Erinnerungsstück.
      </p>
      <p style={pStyle}>
        Darüber hinaus bieten wir maßgefertigte Geschenkboxen mit Relief
        oder Gravur, personalisierte Schlüsselanhänger, individuelle
        Smartphone-Halterungen und vieles mehr. Deiner Kreativität sind
        kaum Grenzen gesetzt — und wenn du eine Idee hast, die du hier
        nicht findest, sprich uns einfach an. Wir finden eine Lösung.
      </p>

      {/* ——— 6) Schmuck & Accessoires ——— */}
      <h2 style={h2Style}>Schmuck &amp; Accessoires — Individuell und filigran</h2>
      <p style={pStyle}>
        Mit unserem Resin-Druck entstehen filigrane Schmuckstücke, die
        durch ihre Einzigartigkeit bestechen. Ringe, Anhänger, Ohrringe
        und Armbänder — jedes Stück wird individuell gestaltet und kann
        mit Texten, Motiven, geometrischen Mustern oder organischen Formen
        personalisiert werden.
      </p>
      <p style={pStyle}>
        3D-gedruckter Schmuck von Aykin ist leicht, hypoallergen und in
        verschiedenen Farben und Finishes erhältlich. Durch die hohe
        Auflösung des Resin-Drucks sind selbst feinste Details sichtbar —
        filigrane Muster, die mit traditionellen Methoden kaum herstellbar
        wären. Ob als Geschenk, als Statement-Piece oder als individueller
        Alltagsbegleiter — unser Schmuck ist modern, nachhaltig und
        unverwechselbar.
      </p>

      {/* ——— 7) Ersatzteile ——— */}
      <h2 style={h2Style}>Ersatzteile — Wenn das Original nicht mehr lieferbar ist</h2>
      <p style={pStyle}>
        Ein defektes Bauteil, das nicht mehr hergestellt wird. Ein
        Haushaltgerät, das wegen eines kleinen Plastikteils entsorgt werden
        müsste. Ein Oldtimer, für den es keine Ersatzteile mehr gibt. In
        all diesen Fällen bietet 3D-Druck eine elegante Lösung — und Aykin
        ist dein Partner dafür.
      </p>
      <p style={pStyle}>
        Unser Ersatzteil-Service funktioniert unkompliziert: Sende uns das
        defekte Teil, eine technische Zeichnung oder Maßangaben. Wir
        erstellen ein 3D-Modell, wählen das passende Material und drucken
        ein Ersatzteil, das passt und funktioniert. Von Geräteknöpfen
        über Scharniere bis zu Maschinenbauteilen — wir haben schon alles
        gedruckt. Und oft ist das 3D-gedruckte Teil sogar belastbarer als
        das Original.
      </p>

      {/* ——— 8) Nachbearbeitung ——— */}
      <h2 style={h2Style}>Nachbearbeitung — Vom Rohling zum Designstück</h2>
      <p style={pStyle}>
        Ein 3D-Druck direkt aus dem Drucker hat sichtbare Schichtlinien
        und eine raue Oberfläche — das ist bei additiver Fertigung normal.
        Aber manchmal reicht „roh" nicht aus: Wenn das Objekt für eine
        Präsentation, als Geschenk oder für die Vitrine bestimmt ist,
        bieten wir professionelle Nachbearbeitung an.
      </p>
      <p style={pStyle}>
        Unser Nachbearbeitungsservice umfasst: Schleifen für glatte
        Oberflächen, Grundieren als Vorbereitung zum Bemalen oder
        Lackieren, Lackieren in Wunschfarben für ein professionelles
        Finish, Glätten durch chemische oder thermische Verfahren und
        das Zusammenfügen mehrteiliger Drucke zu einem nahtlosen Objekt.
        So wird aus einem Rohling ein fertiges Designstück — bereit für
        den Einsatz, die Vitrine oder die Geschenkverpackung.
      </p>
    </section>
  );
}
