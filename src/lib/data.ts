import { AppData } from "../types";

export const AYKIN_DATA: AppData = {
  config: {
    name: "Aykin",
    tagline: "Custom 3D Druck",
    address: "Platzhalter Adresse, Deutschland",
    phone: "Platzhalter",
    whatsapp: "Platzhalter",
    instagram: "aykin_3ddruck",
    rating: 4.9,
    reviewCount: 127,
  },
  categories: [
    { id: "prototypen", label: "Prototypen", icon: "Box" },
    { id: "figuren", label: "Figuren & Modelle", icon: "Layers" },
    { id: "architektur", label: "Architekturmodelle", icon: "Building" },
    { id: "industrie", label: "Industrieteile", icon: "Cog" },
    { id: "schmuck", label: "Schmuck & Accessoires", icon: "Gem" },
    { id: "geschenke", label: "Personalisierte Geschenke", icon: "Gift" },
    { id: "ersatzteile", label: "Ersatzteile", icon: "Wrench" },
    { id: "kunst", label: "Kunst & Deko", icon: "Palette" },
    { id: "technik", label: "Technische Bauteile", icon: "Cpu" },
    { id: "sonstiges", label: "Sonstiges", icon: "Package" },
  ],
  menu: {
    prototypen: {
      desc: "Vom Konzept zum greifbaren Prototyp — schnell, präzise, iterativ.",
      items: [
        {
          id: "proto-standard",
          name: "Standard-Prototyp",
          price: "ab 49,00 €",
          tag: "Beliebt",
          ticket: true,
          desc: "FDM-Druck bis 20 cm · PLA/PETG · Schichtdicke 0,2 mm · 2–3 Werktage Lieferzeit",
        },
        {
          id: "proto-fein",
          name: "Feindetail-Prototyp",
          price: "ab 89,00 €",
          tag: "Präzision",
          ticket: true,
          desc: "Resin-Druck · Schichtdicke 0,05 mm · Hohe Oberflächenqualität · Ideal für Präsentationen",
        },
        {
          id: "proto-funktional",
          name: "Funktionsprototyp",
          price: "ab 129,00 €",
          tag: "",
          ticket: true,
          desc: "Belastbare Materialien · PETG/ASA/Nylon · Mechanische Tests möglich · Individuelle Beratung",
        },
        {
          id: "proto-serie",
          name: "Kleinserie (10–50 Stk.)",
          price: "auf Anfrage",
          tag: "Skalierbar",
          ticket: true,
          desc: "Optimierter Stückpreis · Konsistente Qualität · Verschiedene Materialien · Projektbegleitung",
        },
      ],
    },
    figuren: {
      desc: "Detailgetreue Figuren und Modelle — vom Tabletop bis zur Vitrine.",
      note: "Alle Figuren können nachbearbeitet und bemalt werden.",
      items: [
        { id: "fig-mini", name: "Miniaturfigur (28mm)", price: "ab 8,00 €", desc: "Resin-Druck · Hohe Detailtreue · Ideal für Tabletop-Spiele" },
        { id: "fig-standard", name: "Standardfigur (10–15 cm)", price: "ab 25,00 €", desc: "FDM oder Resin · Individuelle Skalierung · Nachbearbeitung optional" },
        { id: "fig-gross", name: "Großfigur (20–40 cm)", price: "ab 69,00 €", tag: "Beliebt", desc: "Mehrteiliger Druck · Hochauflösend · Perfekt als Sammlerstück oder Geschenk" },
        { id: "fig-custom", name: "Custom-Design", price: "auf Anfrage", desc: "Individuelle Modellierung nach deinen Vorstellungen · 3D-Scan oder Referenzbilder" },
      ],
    },
    architektur: {
      desc: "Maßstabsgetreue Architekturmodelle für Präsentationen und Wettbewerbe.",
      items: [
        { id: "arch-einzel", name: "Einzelgebäude", price: "ab 149,00 €", tag: "Präzision", desc: "Maßstab 1:100 bis 1:500 · Hohe Detailtreue · Weiß oder mehrfarbig" },
        { id: "arch-komplex", name: "Gebäudekomplex", price: "ab 349,00 €", desc: "Mehrere Gebäude · Umgebungsmodell · Maßstabsgetreu · Projektberatung inklusive" },
        { id: "arch-detail", name: "Fassadendetail", price: "ab 79,00 €", desc: "Ausschnittmodell · Materialstudien · Ideal für Designentscheidungen" },
      ],
    },
    industrie: {
      desc: "Funktionale Industrieteile — belastbar, maßhaltig, einsatzbereit.",
      items: [
        { id: "ind-gehaeuse", name: "Gehäuse & Verkleidungen", price: "ab 39,00 €", desc: "Maßgefertigt · ASA/PETG · UV- und wetterbeständig auf Anfrage" },
        { id: "ind-halterung", name: "Halterungen & Adapter", price: "ab 19,00 €", tag: "Schnell", desc: "Individuelle Passform · Verschiedene Materialien · Express in 24h möglich" },
        { id: "ind-zahnrad", name: "Zahnräder & Mechanik", price: "ab 29,00 €", desc: "Präzisionsdruck · Nylon/POM · Mechanisch belastbar · Toleranz ±0,1 mm" },
        { id: "ind-serie", name: "Kleinserie Industrieteile", price: "auf Anfrage", tag: "B2B", desc: "Ab 50 Stück · Projektbegleitung · Qualitätskontrolle · Materialzertifikate" },
      ],
    },
    schmuck: {
      desc: "Einzigartiger Schmuck aus dem 3D-Drucker — individuell und filigran.",
      items: [
        { id: "schm-ring", name: "Designring", price: "ab 19,00 €", desc: "Resin-Druck · Filigrane Details · Verschiedene Farben · Individuelle Größe" },
        { id: "schm-anhaenger", name: "Anhänger", price: "ab 14,00 €", tag: "Geschenkidee", desc: "Personalisierbar · Mit Text oder Motiv · Leichtgewicht · Hypoallergen" },
        { id: "schm-set", name: "Schmuck-Set", price: "ab 39,00 €", desc: "Ring + Anhänger + Ohrringe · Einheitliches Design · Geschenkverpackung" },
      ],
    },
    geschenke: {
      desc: "Personalisierte Geschenke — einzigartig wie der Empfänger.",
      items: [
        { id: "gesch-lithophane", name: "Lithophane (Fotodruck)", price: "ab 24,00 €", tag: "Bestseller", desc: "Dein Foto als 3D-Druck · LED-Beleuchtung optional · Verschiedene Größen" },
        { id: "gesch-namensschild", name: "Namensschild / Türschild", price: "ab 15,00 €", desc: "Personalisiert · Verschiedene Schriften und Farben · Inkl. Befestigung" },
        { id: "gesch-box", name: "Geschenkbox individuell", price: "ab 34,00 €", desc: "Maßgefertigte Box · Mit Gravur oder Relief · Perfekt für besondere Anlässe" },
        { id: "gesch-figur", name: "Personalisierte Figur", price: "ab 49,00 €", tag: "Unikat", desc: "Nach Foto modelliert · Hochdetailliert · Einzigartige Erinnerung" },
      ],
    },
    ersatzteile: {
      desc: "Ersatzteile auf Abruf — wenn das Original nicht mehr lieferbar ist.",
      items: [
        { id: "ers-standard", name: "Standardteil-Nachbau", price: "ab 14,00 €", desc: "Nach Vorlage oder Maßskizze · FDM-Druck · Schnelle Lieferung" },
        { id: "ers-praezision", name: "Präzisions-Ersatzteil", price: "ab 29,00 €", desc: "Enge Toleranzen · Technische Zeichnung empfohlen · Materialberatung inklusive" },
      ],
    },
    kunst: {
      desc: "Kunstobjekte und Dekoartikel — von der Idee zum Designstück.",
      items: [
        { id: "kunst-skulptur", name: "Skulptur / Kunstobjekt", price: "ab 59,00 €", tag: "Kreativ", desc: "Individuelle Gestaltung · Bis 50 cm Höhe · Nachbearbeitung und Lackierung optional" },
        { id: "kunst-vase", name: "Designer-Vase", price: "ab 29,00 €", desc: "Einzigartige Formen · Verschiedene Farben · Wasserdicht auf Anfrage" },
        { id: "kunst-lampe", name: "Designlampe", price: "ab 44,00 €", desc: "Organische Formen · LED-kompatibel · Individuelle Lichtmuster" },
      ],
    },
    technik: {
      desc: "Technische Bauteile nach Maß — für Maker, Ingenieure und Tüftler.",
      items: [
        { id: "tech-platine", name: "Platinengehäuse", price: "ab 19,00 €", desc: "Exakt nach PCB-Maßen · Belüftungsschlitze · Montagepunkte integriert" },
        { id: "tech-adapter", name: "Kabelführungen & Adapter", price: "ab 9,00 €", desc: "Individuelle Passform · Verschiedene Materialien · Schnelle Fertigung" },
        { id: "tech-robotik", name: "Robotik-Komponenten", price: "ab 34,00 €", tag: "Maker", desc: "Servo-Halterungen · Chassis-Teile · Greifer · Individuelle Konstruktion" },
      ],
    },
    sonstiges: {
      desc: "Alles, was sonst noch gedruckt werden kann — sprich uns an!",
      items: [
        { id: "sonst-beratung", name: "Beratungsgespräch", price: "Kostenlos", tag: "Start hier", desc: "30 Min. · Projektbesprechung · Materialberatung · Unverbindlich" },
        { id: "sonst-3dscan", name: "3D-Scan-Service", price: "ab 39,00 €", desc: "Digitalisierung vorhandener Objekte · Für Nachbau oder Modifikation" },
        { id: "sonst-nachbearbeitung", name: "Nachbearbeitung", price: "ab 19,00 €", desc: "Schleifen · Grundieren · Lackieren · Glätten · Professionelles Finish" },
      ],
    },
  },
  bestsellers: [
    { id: "bs1", name: "Lithophane Fotodruck", desc: "Dein Lieblingsfoto als beleuchteter 3D-Druck", price: "ab 24,00 €", tag: "Bestseller", icon: "Image" },
    { id: "bs2", name: "Custom Prototyp", desc: "Vom CAD-Modell zum greifbaren Objekt in 48h", price: "ab 49,00 €", tag: "Beliebt", icon: "Box" },
    { id: "bs3", name: "Tabletop-Miniaturen", desc: "Hochdetaillierte Figuren im Resin-Druck", price: "ab 8,00 €", tag: "Detailreich", icon: "Layers" },
    { id: "bs4", name: "Ersatzteil-Nachbau", desc: "Wenn das Original nicht mehr lieferbar ist", price: "ab 14,00 €", tag: "Praktisch", icon: "Wrench" },
  ],
  reviews: [
    { id: "r1", name: "Markus T.", stars: 5, text: "Die Qualität der Prototypen ist hervorragend. Schnelle Lieferung und super Kommunikation. Kann Aykin nur weiterempfehlen!" },
    { id: "r2", name: "Sandra K.", stars: 5, text: "Mein Lithophane-Geschenk war der absolute Hit! Die Details sind unglaublich. Werde definitiv wieder bestellen." },
    { id: "r3", name: "Felix R.", stars: 5, text: "Endlich jemand, der Ersatzteile drucken kann, die es nirgends mehr gibt. Perfekte Passform, fairer Preis." },
    { id: "r4", name: "Anna W.", stars: 4, text: "Die Architekturmodelle für mein Studium waren top. Gute Beratung und pünktliche Lieferung." },
    { id: "r5", name: "Jonas H.", stars: 5, text: "Als Tabletop-Spieler bin ich begeistert von der Detailtreue der Miniaturen. Besser als viele Großhersteller!" },
  ],
};

export const { CATEGORIES, MENU, BESTSELLERS, REVIEWS } = {
  CATEGORIES: AYKIN_DATA.categories,
  MENU: AYKIN_DATA.menu,
  BESTSELLERS: AYKIN_DATA.bestsellers,
  REVIEWS: AYKIN_DATA.reviews,
};
