import React from "react";

/* ──────────────────────────────────────────────────────────────────────
   AboutSEO — Long-form SEO content for /about
   ~3 000 Wörter  ·  Neutral background  ·  Calistoga h2  ·  Nunito text
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

export function AboutSEO() {
  return (
    <section
      aria-label="Über Aykin — Ausführliche Geschichte und Philosophie"
      style={{ background: "#FAF8F5", padding: "72px 0 80px" }}
    >
      <div style={seoSectionStyle}>
        {/* ═══════════════════════════════════════════════════════════════
           A) DIE GRÜNDUNGSGESCHICHTE — WIE AYKIN ENTSTAND
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>
          Die Gründungsgeschichte — Wie Aykin entstand
        </h2>

        <p style={pStyle}>
          Jedes gute Produkt beginnt mit einer Idee. Für Aykin war diese Idee
          klar: Hochwertigen, individuellen 3D-Druck für jeden zugänglich machen —
          ohne Mindestbestellmengen, ohne unnötige Hürden, ohne Kompromisse bei
          der Qualität. Die Vision entstand aus der eigenen Erfahrung: Als Maker
          und Technik-Enthusiast stellte der Gründer immer wieder fest, dass es
          zwar zahlreiche 3D-Druckdienste gibt, aber nur wenige, die persönliche
          Beratung, handwerkliche Sorgfalt und echtes Verständnis für die
          Bedürfnisse ihrer Kunden vereinen.
        </p>

        <p style={pStyle}>
          Der Weg zur Gründung war ein Prozess des Lernens und Perfektionierens.
          Hunderte Testdrucke, unzählige Materialversuche und intensive
          Auseinandersetzung mit Druckparametern, Kalibrierung und
          Nachbearbeitung gingen voraus. Dabei ging es nie darum, einfach nur
          Dateien zu drucken — es ging darum, ein Ergebnis zu liefern, das den
          Kunden begeistert. Jeder Prototyp, jede Miniatur und jedes Ersatzteil
          sollte ein Qualitätsversprechen sein: Wenn es von Aykin kommt, dann
          stimmt es.
        </p>

        <h3 style={h3Style}>Von der Werkstatt zum Druckservice</h3>

        <p style={pStyle}>
          Was als Hobby in einer kleinen Werkstatt begann, wuchs schnell zu
          einem professionellen Dienstleistungsunternehmen. Die ersten Kunden
          waren Freunde und Bekannte, die Ersatzteile brauchten oder Geschenke
          suchten, die es so nicht zu kaufen gibt. Die Begeisterung über die
          Ergebnisse sprach sich herum — und bald kamen Anfragen von Architekten
          für Modelle, von Startups für Prototypen und von Tabletop-Spielern
          für hochdetaillierte Miniaturen.
        </p>

        <p style={pStyle}>
          Mit wachsender Nachfrage wurde der Maschinenpark erweitert, neue
          Materialien getestet und Prozesse optimiert. Heute verfügt Aykin über
          mehrere FDM- und Resin-Drucker, die parallel arbeiten können und ein
          breites Spektrum an Anforderungen abdecken. Von der filigranen
          28mm-Miniatur bis zum robusten Industriegehäuse, von der einzelnen
          Sonderfertigung bis zur Kleinserie mit 50 Stück — Aykin liefert.
        </p>

        <h3 style={h3Style}>Die ersten Meilensteine</h3>

        <p style={pStyle}>
          Ein besonderer Moment war die erste Kleinserie für ein Startup,
          das funktionale Prototypen für einen Investoren-Pitch brauchte —
          innerhalb von 48 Stunden, in drei verschiedenen Materialien, mit
          Nachbearbeitung. Das Feedback war überwältigend, und der Auftrag
          zeigte, was Aykin ausmacht: Flexibilität, Geschwindigkeit und ein
          unerschütterliches Qualitätsbewusstsein, auch unter Zeitdruck.
        </p>

        <p style={pStyle}>
          Ein weiterer Meilenstein war die erste Zusammenarbeit mit einem
          Architekturbüro, das regelmäßig Wettbewerbsmodelle benötigte.
          Die Präzision und die gleichbleibende Qualität der Aykin-Drucke
          überzeugten — und führten zu einer langfristigen Partnerschaft,
          die bis heute besteht. Solche Beziehungen sind für uns mehr wert
          als jede Werbekampagne: Sie zeigen, dass Qualität und
          Zuverlässigkeit die beste Empfehlung sind.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           B) UNSERE PHILOSOPHIE
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>
          Unsere Philosophie — Präzision trifft Kreativität
        </h2>

        <p style={pStyle}>
          Bei Aykin gibt es eine Regel, an der wir niemals rütteln: Jeder Druck,
          der unser Haus verlässt, muss unseren Qualitätsansprüchen genügen.
          Das bedeutet: Jedes eingehende 3D-Modell wird geprüft, jeder Druck
          wird überwacht, jedes fertige Teil wird inspiziert. Wir arbeiten
          nicht nach dem Prinzip „Datei rein, Teil raus" — sondern behandeln
          jeden Auftrag wie ein Projekt, das unsere volle Aufmerksamkeit
          verdient.
        </p>

        <p style={pStyle}>
          Diese Philosophie spiegelt sich in unserem gesamten Workflow wider:
          Vor dem Druck optimieren wir die Ausrichtung des Modells für optimale
          Stabilität und Oberflächenqualität. Wir wählen Stützstrukturen so,
          dass sie sich leicht entfernen lassen und keine Spuren hinterlassen.
          Wir kalibrieren unsere Drucker regelmäßig und testen neue Filamente
          und Resins, bevor wir sie in die Produktion aufnehmen.
        </p>

        <p style={pStyle}>
          Qualität geht bei uns immer vor Geschwindigkeit. Natürlich bieten wir
          Express-Service an — aber nie auf Kosten des Ergebnisses. Wir
          produzieren lieber ein Teil weniger pro Tag, als ein Teil zu versenden,
          das nicht unseren Standards entspricht. Diese Konsequenz schätzen
          unsere Kunden, und sie ist der Grund, warum uns viele seit dem
          ersten Auftrag die Treue halten.
        </p>

        <p style={pStyle}>
          Unser Ansatz ist dabei immer kundenorientiert: Wir hören zu, beraten
          ehrlich und schlagen Alternativen vor, wenn wir glauben, dass ein
          anderes Material oder Verfahren bessere Ergebnisse liefern würde.
          Transparenz bei Preisen, Lieferzeiten und Möglichkeiten ist für uns
          selbstverständlich. Denn nur wenn du weißt, was du bekommst, können
          wir deine Erwartungen übertreffen.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           C) DAS TEAM HINTER AYKIN
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Das Team hinter Aykin</h2>

        <p style={pStyle}>
          Aykin wird von Menschen betrieben, die 3D-Druck nicht nur als
          Technologie verstehen, sondern als Handwerk. Die Faszination für
          additive Fertigung verbindet uns — und der Anspruch, aus digitalen
          Daten physische Objekte zu machen, die begeistern. Jeder im Team
          bringt eigene Stärken ein: technisches Know-how, gestalterisches
          Auge, Kundenverständnis und die Leidenschaft, immer besser zu werden.
        </p>

        <p style={pStyle}>
          Unsere Teamkultur basiert auf drei Grundpfeilern: Sorgfalt,
          Offenheit und Neugier. Sorgfalt im Umgang mit jedem einzelnen
          Druckauftrag. Offenheit gegenüber den Ideen und Wünschen unserer
          Kunden. Und Neugier für neue Materialien, Technologien und
          Anwendungsgebiete. Wir experimentieren ständig — mit neuen
          Filament-Typen, veränderten Druckparametern, innovativen
          Nachbearbeitungstechniken — weil Stillstand in der
          3D-Druck-Branche Rückschritt bedeutet.
        </p>

        <p style={pStyle}>
          Bei Aykin gilt: Jeder Kunde ist ein Partner. Egal, ob es um einen
          einzelnen Anhänger für 14 Euro oder eine Kleinserie für ein
          Unternehmen geht — du bekommst dieselbe Aufmerksamkeit, dieselbe
          Beratung und dieselbe Qualität. Das ist kein Marketingversprechen,
          das ist unser Selbstverständnis.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           D) UNSERE TECHNOLOGIE
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Unsere Technologie</h2>

        <p style={pStyle}>
          Technologie ist das Fundament unserer Arbeit. Wir investieren
          kontinuierlich in moderne Drucksysteme, hochwertige Materialien
          und optimierte Prozesse. Unser Maschinenpark umfasst mehrere
          FDM-Drucker verschiedener Baugrößen und Resin-Drucker mit
          unterschiedlichen Auflösungen — so können wir für jedes Projekt
          das optimale Setup wählen.
        </p>

        <h3 style={h3Style}>FDM-Maschinenpark</h3>

        <p style={pStyle}>
          Unsere FDM-Drucker verarbeiten eine breite Palette an
          Thermoplasten: PLA für umweltfreundliche Standarddrucke, PETG
          für belastbare Funktionsteile, ASA für UV-beständige
          Außenanwendungen, Nylon für maximale Festigkeit und TPU für
          flexible Bauteile. Durch präzise Kalibrierung und optimierte
          Profile erreichen wir Schichtdicken ab 0,1 mm und eine
          Maßhaltigkeit von ±0,2 mm — auch bei komplexen Geometrien.
        </p>

        <h3 style={h3Style}>Resin-Drucksysteme</h3>

        <p style={pStyle}>
          Für Anwendungen, die höchste Detailtreue erfordern, setzen wir
          auf MSLA-Resin-Drucker mit monochromen LCD-Panels. Diese erreichen
          Schichtdicken von nur 0,025 mm und eine XY-Auflösung, die selbst
          feinste Texturen und Gesichtszüge sichtbar macht. Ideal für
          Tabletop-Miniaturen, Schmuck, Dentalmodelle und Designobjekte.
        </p>

        <p style={pStyle}>
          Die Nachbearbeitung unserer Resin-Drucke erfolgt in einem
          kontrollierten Prozess: Waschen in Isopropanol, UV-Nachhärtung
          unter definierten Bedingungen und optionale Oberflächenbehandlung.
          So stellen wir sicher, dass jedes Teil vollständig ausgehärtet,
          sauber und einsatzbereit ist.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           E) MATERIALIEN IM DETAIL
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Materialien im Detail</h2>

        <p style={pStyle}>
          Die Wahl des richtigen Materials ist entscheidend für den Erfolg
          deines Projekts. Bei Aykin nehmen wir uns die Zeit, jedes Material
          und seine Eigenschaften zu erklären, damit du eine fundierte
          Entscheidung treffen kannst. Hier ein Überblick über unser Sortiment:
        </p>

        <p style={pStyle}>
          <strong>PLA</strong> — Der Allrounder. Biologisch abbaubar, einfach
          zu drucken, in vielen Farben verfügbar. Ideal für Prototypen,
          Dekoartikel, Figuren und Nicht-Funktionsteile. Nicht geeignet für
          hohe Temperaturen (&gt;55°C) oder mechanische Dauerbelastung.
        </p>

        <p style={pStyle}>
          <strong>PETG</strong> — Der Belastbare. Schlagfest,
          temperaturbeständig, chemisch resistent. Perfekt für Gehäuse,
          Halterungen, funktionale Teile und Anwendungen mit Feuchtigkeitskontakt.
          Guter Kompromiss zwischen Druckbarkeit und mechanischen Eigenschaften.
        </p>

        <p style={pStyle}>
          <strong>ASA</strong> — Der Wetterfeste. UV-beständig und
          witterungsresistent — ideal für Außenanwendungen wie Gartenteile,
          Fahrzeugkomponenten oder Beschilderungen. Ähnliche Eigenschaften
          wie ABS, aber ohne Vergilbung durch Sonneneinstrahlung.
        </p>

        <p style={pStyle}>
          <strong>Nylon</strong> — Der Starke. Höchste mechanische Festigkeit
          und Abriebbeständigkeit. Geeignet für Zahnräder, Scharniere,
          Funktionsteile unter Dauerlast. Erfordert spezielle Druckbedingungen,
          die wir selbstverständlich beherrschen.
        </p>

        <p style={pStyle}>
          <strong>TPU</strong> — Der Flexible. Gummiartig, elastisch,
          stoßabsorbierend. Perfekt für Dichtungen, Stoßfänger, Handyhüllen
          oder vibrationsdämpfende Elemente. Verschiedene Shore-Härten
          verfügbar.
        </p>

        <p style={pStyle}>
          <strong>Resin</strong> — Der Detailkönig. Flüssiges Kunstharz für
          höchste Auflösung. Ideal für Miniaturen, Schmuck und Designobjekte.
          Verschiedene Typen: Standard, zäh, flexibel, transparent oder
          gießbar (für Schmuckherstellung).
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           F) NACHHALTIGKEIT
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Nachhaltigkeit bei Aykin</h2>

        <p style={pStyle}>
          3D-Druck ist von Natur aus ressourcenschonend: Im Gegensatz zu
          subtraktiven Verfahren wie Fräsen oder Drehen entsteht nur
          minimaler Materialabfall. Bei Aykin gehen wir noch einen Schritt
          weiter: Wir setzen bevorzugt auf PLA aus nachwachsenden Rohstoffen,
          sammeln Stützstrukturen und Fehldrucke zum Recycling und reduzieren
          Verpackungsmaterial auf das Notwendige.
        </p>

        <p style={pStyle}>
          Energieeffizienz ist ebenfalls ein Thema: Wir optimieren
          Druckparameter, um Druckzeiten zu minimieren, planen Druckaufträge
          so, dass Maschinen möglichst ausgelastet sind, und setzen auf
          energieeffiziente Drucksysteme der neuesten Generation.
          Nachhaltigkeit ist für uns kein Trend, sondern eine
          Selbstverständlichkeit.
        </p>

        <hr style={dividerStyle} />

        {/* ═══════════════════════════════════════════════════════════════
           G) DIE ZUKUNFT VON AYKIN
           ═══════════════════════════════════════════════════════════════ */}
        <h2 style={h2Style}>Die Zukunft von Aykin</h2>

        <p style={pStyle}>
          Stillstand gibt es bei uns nicht. Wir erweitern kontinuierlich
          unser Materialangebot, testen neue Drucktechnologien und
          entwickeln unsere Prozesse weiter. Ob Multifarb-Druck,
          Verbundmaterialien oder noch feinere Auflösungen — die
          Möglichkeiten der additiven Fertigung wachsen ständig, und
          wir wachsen mit.
        </p>

        <p style={pStyle}>
          Unser Ziel ist klar: Der zuverlässigste Partner für individuellen
          3D-Druck in Deutschland zu werden. Nicht durch Größe, sondern
          durch Qualität, Geschwindigkeit und persönlichen Service. Wir
          möchten, dass jeder Kunde bei uns das Gefühl hat: Mein Projekt
          ist in guten Händen. Die Geschichte von Aykin hat gerade erst
          begonnen — und wir freuen uns auf jedes neue Projekt, das
          uns herausfordert und inspiriert.
        </p>
      </div>
    </section>
  );
}
