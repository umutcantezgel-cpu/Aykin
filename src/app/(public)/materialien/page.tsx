'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { SubpageHero } from '@/components/ui/SubpageHero';

interface MaterialProperty {
  label: string;
  value: number;
  color: string;
  description: string;
}

interface PrintParameter {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface MaterialData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  properties: MaterialProperty[];
  printParameters: PrintParameter[];
  pros: string[];
  cons: string[];
  applications: string[];
  gallery: string[];
  themeColor: string;
}

const ThermometerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 9v1"/></svg>
);

const SpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
);

const FanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/></svg>
);

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M3 7l9-4 9 4"/><path d="M12 3v18"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#81B29A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C41E3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const materials: MaterialData[] = [
  {
    id: "pla",
    name: "Polylactid (PLA)",
    tagline: "Der vielseitige Allrounder",
    description: "Das am häufigsten verwendete Material im 3D-Druck. PLA ist biologisch abbaubar, einfach zu drucken und bietet eine hervorragende Oberflächenqualität.",
    extendedDescription: "Polylactic Acid (PLA) ist ein bioaktiver und biologisch abbaubarer thermoplastischer aliphatischer Polyester, der aus erneuerbaren Ressourcen wie Maisstärke oder Zuckerrohr gewonnen wird. Es ist das Standardmaterial für den Desktop-3D-Druck geworden, da es bei relativ niedrigen Temperaturen schmilzt, kein beheiztes Druckbett erfordert und beim Drucken keine giftigen Dämpfe absondert. Die hervorragende Maßhaltigkeit macht es ideal für komplexe Geometrien und hochdetaillierte Prototypen.",
    themeColor: "#81B29A",
    properties: [
      { label: "Festigkeit", value: 65, color: "#81B29A", description: "Mittlere bis hohe Zugfestigkeit, jedoch spröde bei Überlastung." },
      { label: "Hitzebeständigkeit", value: 40, color: "#E07A5F", description: "Verformt sich ab ca. 55-60°C. Nicht für den Außeneinsatz oder Auto-Innenräume im Sommer geeignet." },
      { label: "Detailgenauigkeit", value: 95, color: "#3D5A80", description: "Hervorragende Auflösung und Maßhaltigkeit. Scharfe Kanten und feine Details sind problemlos möglich." },
      { label: "Flexibilität", value: 20, color: "#F2CC8F", description: "Sehr steif und kaum flexibel. Bricht eher als dass es sich biegt." },
      { label: "Schlagzähigkeit", value: 30, color: "#C41E3A", description: "Geringe Widerstandsfähigkeit gegen plötzliche Stöße." },
      { label: "UV-Beständigkeit", value: 45, color: "#E07A5F", description: "Zersetzt sich langsam unter anhaltender UV-Strahlung und Witterung." }
    ],
    printParameters: [
      { label: "Düsentemperatur", value: "190 - 220 °C", icon: <ThermometerIcon /> },
      { label: "Betttemperatur", value: "50 - 60 °C", icon: <BedIcon /> },
      { label: "Druckgeschwindigkeit", value: "40 - 150 mm/s", icon: <SpeedIcon /> },
      { label: "Bauteilkühlung", value: "100%", icon: <FanIcon /> }
    ],
    pros: ["Einfach zu drucken", "Kein Warping (Verzug)", "Geruchsneutral beim Druck", "Hervorragende Detailwiedergabe", "Biologisch abbaubar unter industriellen Bedingungen"],
    cons: ["Geringe Hitzebeständigkeit", "Spröde", "Nicht für den Außeneinsatz geeignet", "Schwer nachzubearbeiten (Schleifen)"],
    applications: ["Visuelle Prototypen", "Architekturmodelle", "Dekorative Objekte", "Spielzeug", "Figuren und Miniaturen"],
    gallery: ["/pla-1.jpg", "/pla-2.jpg", "/pla-3.jpg"]
  },
  {
    id: "abs",
    name: "Acrylnitril-Butadien-Styrol (ABS)",
    tagline: "Der Industriestandard für Belastbarkeit",
    description: "ABS ist ein extrem robustes und hitzebeständiges Material, das häufig in der Automobilindustrie und für Gehäuse verwendet wird.",
    extendedDescription: "ABS ist ein thermoplastisches Polymer, das für seine hohe Schlagfestigkeit und Zähigkeit bekannt ist. Es wird im Spritzgussverfahren für Lego-Steine und viele Haushaltsgeräte verwendet. Im 3D-Druck ist es anspruchsvoller zu verarbeiten als PLA, da es zum Schrumpfen und Verziehen (Warping) neigt, wenn es ungleichmäßig abkühlt. Ein geschlossener Bauraum ist oft zwingend erforderlich. Dafür belohnt ABS mit hervorragenden mechanischen Eigenschaften und der Möglichkeit, es mit Aceton zu glätten.",
    themeColor: "#C41E3A",
    properties: [
      { label: "Festigkeit", value: 80, color: "#81B29A", description: "Sehr gute Zugfestigkeit gepaart mit hoher Zähigkeit." },
      { label: "Hitzebeständigkeit", value: 85, color: "#E07A5F", description: "Formstabil bis ca. 95-100°C. Geeignet für warme Umgebungen." },
      { label: "Detailgenauigkeit", value: 75, color: "#3D5A80", description: "Gute Detailwiedergabe, aber anfällig für Warping bei großen, flachen Bauteilen." },
      { label: "Flexibilität", value: 40, color: "#F2CC8F", description: "Mäßig flexibel, biegt sich vor dem Bruch." },
      { label: "Schlagzähigkeit", value: 90, color: "#C41E3A", description: "Exzellente Stoßdämpfung und Bruchfestigkeit." },
      { label: "UV-Beständigkeit", value: 30, color: "#E07A5F", description: "Vergilbt und wird spröde unter intensiver UV-Strahlung." }
    ],
    printParameters: [
      { label: "Düsentemperatur", value: "230 - 250 °C", icon: <ThermometerIcon /> },
      { label: "Betttemperatur", value: "90 - 110 °C", icon: <BedIcon /> },
      { label: "Druckgeschwindigkeit", value: "40 - 80 mm/s", icon: <SpeedIcon /> },
      { label: "Bauteilkühlung", value: "0 - 20%", icon: <FanIcon /> }
    ],
    pros: ["Hohe Hitzebeständigkeit", "Sehr schlagfest", "Leicht nachzubearbeiten (Schleifen, Bohren)", "Glättbar mit Aceton", "Langlebig unter mechanischer Belastung"],
    cons: ["Schwer zu drucken (Warping-Gefahr)", "Erfordert ein geschlossenes Gehäuse", "Starke Geruchsentwicklung beim Drucken", "Schlechte UV-Beständigkeit"],
    applications: ["Gehäuse für Elektronik", "Funktionale Prototypen", "Mechanische Bauteile", "Automobil-Teile", "Werkzeuge"],
    gallery: ["/abs-1.jpg", "/abs-2.jpg", "/abs-3.jpg"]
  },
  {
    id: "carbon",
    name: "Carbonfaser (PA-CF / PETG-CF)",
    tagline: "Maximale Steifigkeit und Festigkeit",
    description: "Verbundwerkstoffe, die mit zerkleinerten Carbonfasern angereichert sind. Sie bieten extreme Steifigkeit und ein mattschwarzes Finish.",
    extendedDescription: "Carbonfaserverstärkte Filamente kombinieren ein Basispolymer (wie Nylon/PA oder PETG) mit kurzen Kohlenstofffasern. Diese Fasern erhöhen die Festigkeit und Steifigkeit des Materials drastisch und reduzieren gleichzeitig das Gewicht. Ein weiterer Vorteil ist die Reduzierung des Warping-Effekts während des Drucks, was die Maßhaltigkeit verbessert. Das Material ist extrem abrasiv und erfordert gehärtete Stahldüsen. Die gedruckten Teile zeichnen sich durch eine wunderschöne, matte Oberflächenbeschaffenheit aus, die Schichtlinien oft unsichtbar macht.",
    themeColor: "#1A1A1A",
    properties: [
      { label: "Festigkeit", value: 95, color: "#81B29A", description: "Extreme Zug- und Biegefestigkeit. Ideal für tragende Strukturen." },
      { label: "Hitzebeständigkeit", value: 85, color: "#E07A5F", description: "Stark abhängig vom Basismaterial, oft bis 100°C (bei PA-CF)." },
      { label: "Detailgenauigkeit", value: 80, color: "#3D5A80", description: "Gute Detailtreue, kaschiert Schichtlinien durch die matte Textur." },
      { label: "Flexibilität", value: 10, color: "#F2CC8F", description: "Sehr steif. Bricht abrupt bei Überlastung anstatt sich zu biegen." },
      { label: "Schlagzähigkeit", value: 70, color: "#C41E3A", description: "Besser als PLA, aber durch die Steifigkeit anfälliger für Splittern als reines Nylon." },
      { label: "UV-Beständigkeit", value: 80, color: "#E07A5F", description: "Sehr gut, besonders bei PETG-CF oder speziellen UV-stabilisierten Varianten." }
    ],
    printParameters: [
      { label: "Düsentemperatur", value: "240 - 280 °C", icon: <ThermometerIcon /> },
      { label: "Betttemperatur", value: "70 - 100 °C", icon: <BedIcon /> },
      { label: "Druckgeschwindigkeit", value: "30 - 60 mm/s", icon: <SpeedIcon /> },
      { label: "Bauteilkühlung", value: "10 - 30%", icon: <FanIcon /> }
    ],
    pros: ["Extreme Steifigkeit", "Wunderschönes mattes Finish", "Kaum Warping", "Hohe Maßhaltigkeit", "Gutes Verhältnis von Festigkeit zu Gewicht"],
    cons: ["Sehr abrasiv (zerstört Messingdüsen schnell)", "Teuer in der Anschaffung", "Spröde im Vergleich zum Basismaterial", "Trocknung zwingend erforderlich (besonders bei PA-CF)"],
    applications: ["Drohnenrahmen", "Fahrradkomponenten", "Roboterbauteile", "Leichtbau-Halterungen", "High-End Gehäuse"],
    gallery: ["/carbon-1.jpg", "/carbon-2.jpg", "/carbon-3.jpg"]
  },
  {
    id: "resin",
    name: "SLA / DLP Resin",
    tagline: "Unübertroffene Detailauflösung",
    description: "Flüssiges Kunstharz, das durch UV-Licht ausgehärtet wird. Perfekt für mikroskopische Details und extrem glatte Oberflächen.",
    extendedDescription: "Im Gegensatz zum FDM-Verfahren (Schmelzschichtung) verwendet der Harzdruck (SLA/DLP/LCD) einen Photopolymerharz, der durch eine UV-Lichtquelle Schicht für Schicht ausgehärtet wird. Diese Technologie ermöglicht Auflösungen im Mikrometerbereich. Die resultierenden Teile sind absolut glatt, isotrop (in allen Richtungen gleich stark) und weisen keine sichtbaren Schichtlinien auf. Standardharze sind oft spröde, aber es gibt technische Harze (Tough, Flexible, High-Temp), die für Ingenieursanwendungen entwickelt wurden.",
    themeColor: "#8E44AD",
    properties: [
      { label: "Festigkeit", value: 70, color: "#81B29A", description: "Stark abhängig vom Harztyp. Standardharze sind mäßig fest, Tough-Resins sehr stark." },
      { label: "Hitzebeständigkeit", value: 60, color: "#E07A5F", description: "Standardharze bis 60°C. Spezielle High-Temp Harze bis über 200°C." },
      { label: "Detailgenauigkeit", value: 100, color: "#3D5A80", description: "Unübertroffen. Auflösungen bis zu 0.01mm (10 Mikrometer) sind möglich." },
      { label: "Flexibilität", value: 15, color: "#F2CC8F", description: "Standardharze sind sehr spröde. Spezielle Flex-Harze verfügbar." },
      { label: "Schlagzähigkeit", value: 20, color: "#C41E3A", description: "Standardharz splittert leicht bei Fall oder Stoß." },
      { label: "UV-Beständigkeit", value: 20, color: "#E07A5F", description: "Härtet unter UV-Licht weiter aus und wird im Laufe der Zeit brüchig und verfärbt sich, wenn nicht geschützt." }
    ],
    printParameters: [
      { label: "Belichtungszeit", value: "1.5 - 3.0 s / Schicht", icon: <ThermometerIcon /> },
      { label: "Harz-Temperatur", value: "25 - 30 °C", icon: <BedIcon /> },
      { label: "Hubgeschwindigkeit", value: "40 - 60 mm/min", icon: <SpeedIcon /> },
      { label: "Schichthöhe", value: "0.02 - 0.05 mm", icon: <FanIcon /> }
    ],
    pros: ["Atemberaubende Detailgenauigkeit", "Absolut glatte Oberflächen", "Isotrope mechanische Eigenschaften", "Wasserfeste Bauteile", "Sehr präzise Toleranzen"],
    cons: ["Aufwendige Nachbearbeitung (Waschen & Aushärten)", "Harze sind oft giftig und erfordern Schutzausrüstung", "Sprödigkeit bei Standardharzen", "Druckbereich ist oft kleiner als bei FDM"],
    applications: ["Schmuckdesign", "Dental-Modelle", "Miniaturen und Tabletop", "Präzisionsbauteile", "Spritzguss-Prototypen"],
    gallery: ["/resin-1.jpg", "/resin-2.jpg", "/resin-3.jpg"]
  },
  {
    id: "flex",
    name: "Thermoplastisches Polyurethan (TPU / Flex)",
    tagline: "Elastizität trifft auf Widerstandsfähigkeit",
    description: "Flexible Filamente, die sich biegen, dehnen und komprimieren lassen, ohne ihre Form zu verlieren.",
    extendedDescription: "TPU ist das am weitesten verbreitete flexible Filament im FDM-3D-Druck. Es zeichnet sich durch seine gummiartigen Eigenschaften aus und ist in verschiedenen Härtegraden (Shore-Härte) erhältlich. Neben seiner außergewöhnlichen Flexibilität ist TPU extrem abriebfest, stoßdämpfend und beständig gegen viele Öle und Chemikalien. Der Druck erfordert oft einen Direct-Drive-Extruder und geringe Geschwindigkeiten, um zu verhindern, dass das Filament im Extruder einknickt oder sich staut.",
    themeColor: "#3498DB",
    properties: [
      { label: "Festigkeit", value: 50, color: "#81B29A", description: "Hohe Reißfestigkeit, gibt aber unter Last nach." },
      { label: "Hitzebeständigkeit", value: 65, color: "#E07A5F", description: "Bleibt stabil bis ca. 70°C. Wird bei Kälte steifer." },
      { label: "Detailgenauigkeit", value: 60, color: "#3D5A80", description: "Stringing (Fädenziehen) ist ein häufiges Problem. Schwierig, scharfe Details zu drucken." },
      { label: "Flexibilität", value: 100, color: "#F2CC8F", description: "Extreme Flexibilität, Dehnung oft über 300% vor Bruch." },
      { label: "Schlagzähigkeit", value: 100, color: "#C41E3A", description: "Perfekte Stoßdämpfung. Zersplittert niemals." },
      { label: "UV-Beständigkeit", value: 75, color: "#E07A5F", description: "Gute Beständigkeit gegen UV-Strahlung und Witterung." }
    ],
    printParameters: [
      { label: "Düsentemperatur", value: "210 - 230 °C", icon: <ThermometerIcon /> },
      { label: "Betttemperatur", value: "40 - 60 °C", icon: <BedIcon /> },
      { label: "Druckgeschwindigkeit", value: "15 - 30 mm/s", icon: <SpeedIcon /> },
      { label: "Bauteilkühlung", value: "40 - 100%", icon: <FanIcon /> }
    ],
    pros: ["Extrem flexibel und elastisch", "Hervorragende Stoßdämpfung", "Sehr abriebfest", "Chemikalienbeständig", "Exzellente Layerhaftung (bricht fast nie an Schichtlinien)"],
    cons: ["Sehr schwer zu drucken (besonders mit Bowden-Extrudern)", "Starkes Stringing und Oozing", "Unmöglich zu schleifen oder nachzubearbeiten", "Sehr langsam zu drucken"],
    applications: ["Dichtungen und O-Ringe", "Stoßdämpfer", "Reifen für RC-Autos", "Schutzhüllen", "Ergonomische Griffe"],
    gallery: ["/flex-1.jpg", "/flex-2.jpg", "/flex-3.jpg"]
  }
];

function ProgressRing({ value, color, label, description }: MaterialProperty) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  return (
    <div className="flex flex-col items-center gap-4 group" ref={ref}>
      <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
        {/* Hover Tooltip/Description */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center border shadow-xl">
          <p className="text-[10px] md:text-xs text-gray-700 leading-tight">{description}</p>
        </div>

        {/* Background Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Animated Ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="264"
            initial={{ strokeDashoffset: 264 }}
            animate={isInView ? { strokeDashoffset: 264 - (264 * value) / 100 } : { strokeDashoffset: 264 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            strokeLinecap="round"
            className="drop-shadow-sm"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="font-calistoga text-2xl md:text-3xl text-gray-800">
            {isInView ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{value}</motion.span> : "0"}
          </span>
          <span className="text-[10px] text-gray-400 font-medium tracking-wider">/ 100</span>
        </div>
      </div>
      <span className="font-semibold text-sm md:text-base text-gray-800 text-center">{label}</span>
    </div>
  );
}

function MaterialSection({ material, index }: { material: MaterialData, index: number }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.section 
      ref={sectionRef} 
      style={{ opacity }}
      className={`min-h-screen py-32 px-6 relative overflow-hidden flex items-center ${isEven ? 'bg-[#FAF8F5]' : 'bg-white'}`}
      id={material.id}
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [300, -300]) }}
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-5 blur-3xl pointer-events-none"
        // @ts-ignore
        style={{ backgroundColor: material.themeColor, y: useTransform(scrollYProgress, [0, 1], [300, -300]) }}
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        // @ts-ignore
        style={{ backgroundColor: material.themeColor, y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          style={{ y: contentY, scale }}
          className="flex flex-col gap-16"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xl font-bold tracking-widest" style={{ color: material.themeColor }}>
                  M{String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-[2px] w-16" style={{ backgroundColor: material.themeColor }} />
              </div>
              <h2 className="font-calistoga text-6xl md:text-8xl text-gray-900 mb-4 tracking-tight">
                {material.name.split(' ')[0]} <span className="text-gray-400">{material.name.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-2xl text-gray-600 font-medium mb-6">{material.tagline}</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{material.description}</p>
              <p className="text-base text-gray-500 leading-relaxed">{material.extendedDescription}</p>
            </div>

            {/* Print Parameters Card */}
            <div className="w-full md:w-auto bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 shrink-0">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: material.themeColor }}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Druckparameter
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {material.printParameters.map((param, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gray-50 text-gray-600">
                      {param.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{param.label}</p>
                      <p className="text-lg font-bold text-gray-900">{param.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Properties Rings */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold mb-10 text-gray-900">Physikalische Eigenschaften</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                {material.properties.map((prop, i) => (
                  <ProgressRing key={i} {...prop} />
                ))}
              </div>
            </div>

            {/* Pros/Cons & Applications */}
            <div className="lg:col-span-5 flex flex-col gap-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Pros */}
                <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
                  <h4 className="text-emerald-800 font-bold text-xl mb-6 flex items-center gap-3">
                    <CheckIcon /> Vorteile
                  </h4>
                  <ul className="space-y-4">
                    {material.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-emerald-900/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span className="leading-snug">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                  <h4 className="text-red-800 font-bold text-xl mb-6 flex items-center gap-3">
                    <XIcon /> Nachteile
                  </h4>
                  <ul className="space-y-4">
                    {material.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-red-900/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                        <span className="leading-snug">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Typische Anwendungen</h3>
                <div className="flex flex-wrap gap-3">
                  {material.applications.map((app, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function MaterialienLexikonPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeMaterial, setActiveMaterial] = useState(materials[0].id);

  // Intersection Observer for the navigation dot indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMaterial(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    materials.forEach((material) => {
      const el = document.getElementById(material.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#FAF8F5] min-h-screen relative">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C41E3A] via-[#E07A5F] to-[#81B29A] transform origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Floating Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
        {materials.map((m) => (
          <button
            key={m.id}
            onClick={() => document.getElementById(m.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="relative flex items-center justify-end group h-8"
          >
            <span className={`absolute right-10 mr-4 whitespace-nowrap text-sm font-medium transition-all duration-300 ${activeMaterial === m.id ? 'opacity-100 text-gray-900 translate-x-0' : 'opacity-0 translate-x-4 text-gray-400 group-hover:opacity-100 group-hover:translate-x-0'}`}>
              {m.name.split(' ')[0]}
            </span>
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeMaterial === m.id ? 'scale-150 ring-4 ring-offset-2' : 'scale-100 hover:scale-125'}`}
              style={{ 
                backgroundColor: m.themeColor,
                // @ts-ignore
                '--tw-ring-color': `${m.themeColor}40`
              }} 
            />
          </button>
        ))}
      </div>

      <SubpageHero 
        label="Das Ultimative Material Lexikon"
        title="Wähle deine Realität"
        subtitle="Entdecke unsere umfangreiche Auswahl an High-End Kunststoffen, Harzen und Verbundwerkstoffen. Jedes Material bietet einzigartige Eigenschaften für dein spezifisches Projekt."
      />

      <div className="relative">
        {materials.map((material, index) => (
          <MaterialSection key={material.id} material={material} index={index} />
        ))}
      </div>
    </main>
  );
}
