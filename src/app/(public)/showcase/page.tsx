'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation, useSpring, useMotionValue } from 'framer-motion';
import { SubpageHero } from '@/components/ui/SubpageHero';

// --- Types & Interfaces ---
interface ExplodedPart {
  id: string;
  name: string;
  description: string;
  color: string;
  svg: React.ReactNode;
  defaultZ: number;
  explodedZ: number;
}

interface EngineeringMarvel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technicalDetails: string[];
  themeColor: string;
  parts: ExplodedPart[];
}

// --- Icons ---
const ArrowsOut = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
);

const ArrowsIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6"/><path d="M20 10h-6V4"/><path d="M14 10l7-7"/><path d="M3 21l7-7"/></svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

// --- Data ---
const marvels: EngineeringMarvel[] = [
  {
    id: "snap-fit",
    title: "Cantilever Snap-Fit",
    subtitle: "Montage ohne Werkzeug",
    description: "Ein klassischer Schnapphaken (Cantilever Snap-Fit). Diese Konstruktion nutzt die Elastizität des Materials, um eine dauerhafte oder lösbare Verbindung zwischen zwei Bauteilen herzustellen. Komplett werkzeuglos und ideal für den 3D-Druck, da wir die Layer-Richtung optimal an die Belastungsachse anpassen können.",
    themeColor: "#3B82F6", // Blue
    technicalDetails: [
      "Winkel der Einführschräge: typischerweise 30°-45°",
      "Winkel der Halteschräge: 90° (dauerhaft) oder 45° (lösbar)",
      "Biegeradius an der Basis zur Vermeidung von Kerbwirkung",
      "Druckorientierung: Z-Achse parallel zur Biegeachse für maximale Festigkeit"
    ],
    parts: [
      {
        id: "top-cap",
        name: "Abdeckplatte (Gehäuse)",
        description: "Das obere Gehäuseteil mit der Aussparung (Führungsloch) für den Schnapphaken.",
        color: "rgba(59, 130, 246, 0.8)", // Blue
        defaultZ: 40,
        explodedZ: 180,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <path d="M10 20 L90 20 L90 80 L10 80 Z" fill="currentColor" stroke="white" strokeWidth="2" />
            <path d="M40 40 L60 40 L60 60 L40 60 Z" fill="transparent" stroke="white" strokeWidth="2" />
            <circle cx="20" cy="30" r="3" fill="white" />
            <circle cx="80" cy="30" r="3" fill="white" />
            <circle cx="20" cy="70" r="3" fill="white" />
            <circle cx="80" cy="70" r="3" fill="white" />
          </svg>
        )
      },
      {
        id: "snap-hook",
        name: "Flexibler Schnapphaken",
        description: "Der Cantilever-Arm. Die Dicke an der Basis bestimmt die Biegesteifigkeit. Der Überhang greift in die Abdeckplatte ein.",
        color: "rgba(16, 185, 129, 0.9)", // Emerald
        defaultZ: 0,
        explodedZ: 60,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* The hook base */}
            <path d="M40 30 L60 30 L60 70 L40 70 Z" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* The actual hook protruding up */}
            <path d="M45 10 L55 10 L55 30 L45 30 Z" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1" />
            <path d="M55 10 L62 18 L55 18 Z" fill="currentColor" />
          </svg>
        )
      },
      {
        id: "bottom-base",
        name: "Basisgehäuse",
        description: "Der untere Teil des Modells, fest verbunden mit dem Schnapphaken. Enthält Versteifungsrippen.",
        color: "rgba(245, 158, 11, 0.8)", // Amber
        defaultZ: -40,
        explodedZ: -60,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <path d="M10 20 L90 20 L90 80 L10 80 Z" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* Ribs */}
            <line x1="25" y1="20" x2="25" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="75" y1="20" x2="75" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
          </svg>
        )
      }
    ]
  },
  {
    id: "hinge",
    title: "Print-in-Place Hinge",
    subtitle: "Bewegung aus einem Guss",
    description: "Ein Scharnier, das in einem einzigen Durchgang gedruckt wird, ohne dass es später zusammengebaut werden muss. Möglich wird dies durch genau kalibrierte Toleranzen zwischen Welle und Hülse.",
    themeColor: "#EC4899", // Pink
    technicalDetails: [
      "Spaltmaß (Clearance): 0.2mm bis 0.3mm (druckerabhängig)",
      "45° Fasen an den Überhängen (kein Stützmaterial nötig)",
      "Zylindrische Formgebung für reibungslose Rotation",
      "Horizontale Druckorientierung für maximale Stabilität der Achse"
    ],
    parts: [
      {
        id: "hinge-wing-left",
        name: "Linker Flügel (Hülse)",
        description: "Der bewegliche Teil des Scharniers, der die äußere Hülse umschließt.",
        color: "rgba(236, 72, 153, 0.8)", // Pink
        defaultZ: 20,
        explodedZ: 100,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <path d="M10 30 L45 30 L45 70 L10 70 Z" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* Sleeves */}
            <rect x="45" y="30" width="15" height="15" rx="5" fill="currentColor" stroke="white" strokeWidth="2" />
            <rect x="45" y="55" width="15" height="15" rx="5" fill="currentColor" stroke="white" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: "hinge-pin",
        name: "Zentrale Achse (Pin)",
        description: "Die Welle, um die sich alles dreht. Gedruckt mit mikroskopischem Abstand zur Hülse.",
        color: "rgba(139, 92, 246, 0.9)", // Purple
        defaultZ: 0,
        explodedZ: 0,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="48" y="25" width="4" height="50" rx="2" fill="currentColor" stroke="white" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: "hinge-wing-right",
        name: "Rechter Flügel (Kern)",
        description: "Der feststehende Teil, der fest mit der zentralen Achse verbunden ist.",
        color: "rgba(14, 165, 233, 0.8)", // Sky
        defaultZ: -20,
        explodedZ: -100,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <path d="M55 30 L90 30 L90 70 L55 70 Z" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* Core block that connects to the pin */}
            <rect x="40" y="42" width="15" height="16" rx="3" fill="currentColor" stroke="white" strokeWidth="2" />
          </svg>
        )
      }
    ]
  },
  {
    id: "thread",
    title: "Trapezgewinde",
    subtitle: "Hochfeste Schraubverbindungen",
    description: "Normale metrische Gewinde sind im FDM-Druck oft zu spitz und brechen leicht ab. Wir konstruieren optimierte Trapezgewinde oder spezielle Kugelgewinde für maximale Zugfestigkeit und reibungslose Gängigkeit.",
    themeColor: "#14B8A6", // Teal
    technicalDetails: [
      "Gewindeprofil: Trapezförmig (ACME) statt dreieckig",
      "Flankenwinkel: 30° bis 45° optimiert für schichtweisen Aufbau",
      "Toleranz im Flankendurchmesser: 0.15mm pro Seite",
      "Verringerte Steigung für höhere Selbsthemmung"
    ],
    parts: [
      {
        id: "nut",
        name: "Gewindemutter (Innengewinde)",
        description: "Das Außenteil. Die inneren Gewindegänge sind für den Überhangdruck optimiert.",
        color: "rgba(20, 184, 166, 0.8)", // Teal
        defaultZ: 40,
        explodedZ: 150,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            {/* Hex nut outline */}
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* Hole */}
            <circle cx="50" cy="50" r="25" fill="transparent" stroke="white" strokeWidth="4" strokeDasharray="4 4" />
          </svg>
        )
      },
      {
        id: "thread-body",
        name: "Gewindeschaft",
        description: "Der Bolzen mit dem maßgeschneiderten Trapezprofil. Kräftige Layerhaftung erforderlich.",
        color: "rgba(244, 63, 94, 0.9)", // Rose
        defaultZ: -10,
        explodedZ: 0,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="35" y="20" width="30" height="60" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* Abstract thread lines */}
            <line x1="35" y1="30" x2="65" y2="35" stroke="white" strokeWidth="3" />
            <line x1="35" y1="45" x2="65" y2="50" stroke="white" strokeWidth="3" />
            <line x1="35" y1="60" x2="65" y2="65" stroke="white" strokeWidth="3" />
          </svg>
        )
      },
      {
        id: "bolt-head",
        name: "Schraubenkopf",
        description: "Basis des Bolzens mit integriertem Antrieb (z.B. Innensechskant oder Rändelung).",
        color: "rgba(99, 102, 241, 0.8)", // Indigo
        defaultZ: -40,
        explodedZ: -100,
        svg: (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <rect x="25" y="20" width="50" height="60" rx="10" fill="currentColor" stroke="white" strokeWidth="2" />
            {/* Knurling pattern abstract */}
            <line x1="30" y1="20" x2="30" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="40" y1="20" x2="40" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="20" x2="60" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="70" y1="20" x2="70" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
          </svg>
        )
      }
    ]
  }
];

function InteractiveExplodedView({ marvel }: { marvel: EngineeringMarvel }) {
  const [isExploded, setIsExploded] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Rotation state for the whole assembly
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [60, -60]);
  const rotateY = useTransform(x, [-300, 300], [-60, 60]);

  // Spring animations for a smoother feel
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const toggleExplode = () => setIsExploded(!isExploded);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[600px] w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 mb-24 overflow-hidden relative">
      
      {/* Dynamic Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${marvel.themeColor} 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Left Content Column */}
      <div className="lg:w-1/3 flex flex-col justify-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-bold text-sm w-fit mb-6">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: marvel.themeColor }} />
          Interactive 3D
        </div>
        
        <h2 className="font-calistoga text-4xl md:text-5xl text-gray-900 mb-4">{marvel.title}</h2>
        <h3 className="font-bold text-xl mb-6" style={{ color: marvel.themeColor }}>{marvel.subtitle}</h3>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {marvel.description}
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <InfoIcon /> Technische Spezifikationen
          </h4>
          <ul className="space-y-3">
            {marvel.technicalDetails.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: marvel.themeColor }} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={toggleExplode}
          className="group flex items-center justify-center gap-3 w-full py-4 px-8 rounded-2xl font-bold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{ backgroundColor: marvel.themeColor }}
        >
          {isExploded ? <ArrowsIn /> : <ArrowsOut />}
          {isExploded ? "Zusammensetzen" : "Explosionszeichnung"}
        </button>
      </div>

      {/* Right Interactive 3D Canvas Column */}
      <div className="lg:w-2/3 relative rounded-3xl bg-gray-900 overflow-hidden min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing border-4 border-gray-100 shadow-inner">
        
        {/* Helper text overlay */}
        <div className="absolute top-6 left-6 text-white/50 text-sm font-mono flex items-center gap-2 pointer-events-none z-20">
          <ArrowsOut /> Ziehen zum Rotieren • Teile sind interaktiv
        </div>

        {/* Info panel for hovered part */}
        <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 transform z-20 ${hoveredPart ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          {hoveredPart && (
            <div>
              <h4 className="font-bold text-lg mb-1">{marvel.parts.find(p => p.id === hoveredPart)?.name}</h4>
              <p className="text-sm text-white/80">{marvel.parts.find(p => p.id === hoveredPart)?.description}</p>
            </div>
          )}
        </div>

        {/* Drag Surface for Rotation */}
        <motion.div 
          ref={containerRef}
          className="absolute inset-0 z-10"
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          onDrag={(e, info) => {
            x.set(x.get() + info.delta.x);
            y.set(y.get() + info.delta.y);
          }}
          onDragEnd={() => {
            // Optional: auto-return to center, but leaving it rotated is cooler
          }}
        />

        {/* 3D Scene */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ perspective: "1200px" }}>
          <motion.div 
            className="relative w-64 h-64 pointer-events-auto"
            style={{
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* The Parts */}
            {marvel.parts.map((part, index) => {
              // Calculate dynamic Z position based on state
              const targetZ = isExploded ? part.explodedZ : part.defaultZ;
              
              return (
                <motion.div
                  key={part.id}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer transition-colors duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    z: targetZ,
                  }}
                  animate={{ z: targetZ }}
                  transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1 }}
                  onMouseEnter={() => setHoveredPart(part.id)}
                  onMouseLeave={() => setHoveredPart(null)}
                  whileHover={{ scale: 1.05 }}
                  drag="y"
                  dragConstraints={{ top: -200, bottom: 200 }} // Simple drag constraint simulation
                >
                  <div className="w-48 h-48 relative">
                    {/* Render the SVG passed in data */}
                    {React.cloneElement(part.svg as any, {
                      style: { 
                        color: part.color,
                        filter: hoveredPart === part.id ? 'brightness(1.2)' : 'none'
                      }
                    })}
                  </div>
                </motion.div>
              );
            })}
            
            {/* Central Axis Line (visible only when exploded) */}
            <motion.div 
              className="absolute left-1/2 top-1/2 w-0.5 bg-white/20 rounded-full"
              style={{
                height: 400,
                x: "-50%",
                y: "-50%",
                rotateX: 90,
                transformStyle: "preserve-3d",
              }}
              animate={{ opacity: isExploded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-[#FAF8F5] min-h-screen relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#1A1A1A] transform origin-left z-50"
        style={{ scaleX }}
      />

      <SubpageHero 
        label="Engineering Masterclass"
        title="Interaktiver Showcase"
        subtitle="Erlebe die Magie des 3D-Drucks hautnah. Ziehe die Modelle auseinander, studiere die Mechanik und verstehe, warum unsere Konstruktionen halten, was sie versprechen."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-calistoga text-4xl text-gray-900 mb-6">Jedes Detail durchdacht</h2>
          <p className="text-lg text-gray-600">
            Ein gutes 3D-Druckteil beginnt lange vor dem Slicer. Die richtige Orientierung der Layer, Toleranzberechnungen für Schrumpfung und die Berücksichtigung von Überhängen machen den Unterschied zwischen einem Hobby-Druck und einem industrietauglichen Bauteil.
          </p>
        </div>

        {marvels.map((marvel) => (
          <InteractiveExplodedView key={marvel.id} marvel={marvel} />
        ))}
      </div>
    </main>
  );
}
