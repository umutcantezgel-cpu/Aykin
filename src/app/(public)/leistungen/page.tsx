'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Box, Droplets, PenTool, Cpu, ArrowRight, Zap, CheckCircle2, 
  Layers, Settings, Ruler, Wrench, ChevronRight, Activity, Crosshair, 
  Printer, Diamond, Gauge, Maximize
} from 'lucide-react';
import { TransitionLink } from '@/components/ui/TransitionLink';

// ==========================================
// UTILS & SMALL COMPONENTS
// ==========================================

const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const TiltCard = ({ children, className, glowColor = "rgba(196,30,58,0.5)" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-[40px] shadow-2xl ${className}`}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -inset-px rounded-[40px] opacity-0 transition duration-300"
            style={{
              background: `radial-gradient(800px circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])}, ${glowColor}, transparent 40%)`,
            }}
          />
        )}
      </AnimatePresence>
      <div
        style={{
          transform: "translateZ(60px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 z-10 p-10 flex flex-col justify-between"
      >
        {children}
      </div>
      
      {/* 3D Background Elements inside the card */}
      <div 
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} 
        className="absolute inset-0 rounded-[40px] overflow-hidden z-0"
      >
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-white/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-black/5 to-transparent blur-3xl rounded-full" />
      </div>
    </motion.div>
  );
};


// ==========================================
// SCROLL GALLERY COMPONENT
// ==========================================

const HorizontalScrollGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#0A0A0A]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-16 md:px-32 pb-16 pt-32">
          
          {/* Card 1: Intro / Call to Scroll */}
          <div className="w-[30vw] min-w-[400px] h-[70vh] flex flex-col justify-center shrink-0">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-calistoga text-white mb-6 leading-tight"
            >
              Unsere <br/>
              <span className="text-[#C41E3A]">Expertise.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-xl leading-relaxed mb-12"
            >
              Entdecke das volle Spektrum unserer additiven Fertigungstechnologien und Ingenieursdienstleistungen. Scrolle weiter, um in unsere Prozesse einzutauchen.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4 text-white/40"
            >
              <div className="w-16 h-[1px] bg-white/20" />
              <span className="text-sm uppercase tracking-widest">Swipe to explore</span>
              <div className="w-16 h-[1px] bg-white/20" />
            </motion.div>
          </div>

          {/* Card 2: FDM */}
          <TiltCard className="w-[60vw] min-w-[800px] h-[70vh] shrink-0 bg-[#141414] border border-white/10" glowColor="rgba(196,30,58,0.2)">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#C41E3A]/10 flex items-center justify-center border border-[#C41E3A]/30">
                  <Printer size={32} className="text-[#C41E3A]" />
                </div>
                <div>
                  <h3 className="font-calistoga text-4xl text-white">FDM-Druck</h3>
                  <p className="text-[#C41E3A] tracking-wider uppercase text-sm mt-1 font-bold">Fused Deposition Modeling</p>
                </div>
              </div>
              <span className="text-8xl font-black text-white/5 font-calistoga select-none">01</span>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-12 flex-grow">
              <div className="flex flex-col justify-center">
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Unser FDM-Verfahren bietet die ideale Balance aus Geschwindigkeit, Kosten und mechanischer Belastbarkeit. 
                  Wir verwenden modernste Hochtemperaturdrucker für technische Kunststoffe, die selbst extremen Anforderungen standhalten.
                  Perfekt für Prototypenbau, Vorrichtungen und Endanwendungsteile in Kleinserien.
                </p>
                <div className="space-y-4">
                  {[
                    "Großer Bauraum (bis 500x500x500mm)",
                    "Technische Thermoplaste (ABS, PC, Nylon, Carbon-filiert)",
                    "Hohe mechanische Belastbarkeit",
                    "Kosteneffiziente Kleinserienfertigung"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 size={20} className="text-[#C41E3A]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col justify-between group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                <div className="relative z-10 flex justify-between items-center text-white/50 mb-6">
                  <span className="text-xs tracking-widest uppercase">Technologien</span>
                  <Activity size={16} />
                </div>
                <div className="relative z-10 space-y-6">
                   <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform transition-transform group-hover:-translate-y-1">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold">Präzision</span>
                       <Crosshair size={16} className="text-[#C41E3A]" />
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-[#C41E3A] rounded-full" />
                     </div>
                   </div>
                   <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform transition-transform group-hover:-translate-y-1 delay-75">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold">Geschwindigkeit</span>
                       <Zap size={16} className="text-[#C41E3A]" />
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-[#C41E3A] rounded-full" />
                     </div>
                   </div>
                   <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform transition-transform group-hover:-translate-y-1 delay-150">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold">Belastbarkeit</span>
                       <Wrench size={16} className="text-[#C41E3A]" />
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-[#C41E3A] rounded-full" />
                     </div>
                   </div>
                </div>
                <div className="relative z-10 mt-8">
                  <TransitionLink href="/leistungen/fdm-druck">
                    <MagneticButton className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#C41E3A] hover:text-white transition-colors duration-300">
                      Mehr zu FDM <ArrowRight size={18} />
                    </MagneticButton>
                  </TransitionLink>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: SLA */}
          <TiltCard className="w-[60vw] min-w-[800px] h-[70vh] shrink-0 bg-[#141414] border border-white/10" glowColor="rgba(56,189,248,0.2)">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/30">
                  <Droplets size={32} className="text-sky-500" />
                </div>
                <div>
                  <h3 className="font-calistoga text-4xl text-white">SLA-Druck</h3>
                  <p className="text-sky-500 tracking-wider uppercase text-sm mt-1 font-bold">Stereolithografie</p>
                </div>
              </div>
              <span className="text-8xl font-black text-white/5 font-calistoga select-none">02</span>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-12 flex-grow">
              <div className="flex flex-col justify-center">
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Wenn absolute Detailtreue und makellose Oberflächen gefordert sind, ist SLA die Methode der Wahl. 
                  Durch die Aushärtung von flüssigem Harz mit einem hochpräzisen UV-Laser entstehen Bauteile mit einer 
                  Qualität, die dem Spritzguss in nichts nachsteht. Ideal für Schmuck, Dentaltechnik, Miniaturen und Design-Prototypen.
                </p>
                <div className="space-y-4">
                  {[
                    "Extreme Detailgenauigkeit (bis zu 25 Mikrometer)",
                    "Glatte, spritzgussähnliche Oberflächen",
                    "Breites Spektrum an Spezialharzen (flexibel, transparent, gießbar)",
                    "Perfekt für komplexe Geometrien und feine Strukturen"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <Diamond size={20} className="text-sky-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col justify-between group">
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent opacity-50" />
                
                {/* Simulated resin liquid effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-sky-500/10 blur-2xl transform translate-y-16 group-hover:translate-y-0 transition-transform duration-1000" />

                <div className="relative z-10 flex justify-between items-center text-white/50 mb-6">
                  <span className="text-xs tracking-widest uppercase">Eigenschaften</span>
                  <Layers size={16} />
                </div>
                <div className="relative z-10 space-y-6">
                   <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform transition-transform group-hover:-translate-y-1">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold">Auflösung</span>
                       <Maximize size={16} className="text-sky-500" />
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "99%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-sky-500 rounded-full" />
                     </div>
                   </div>
                   <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform transition-transform group-hover:-translate-y-1 delay-75">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold">Oberflächengüte</span>
                       <Droplets size={16} className="text-sky-500" />
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "98%" }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-sky-500 rounded-full" />
                     </div>
                   </div>
                   <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 transform transition-transform group-hover:-translate-y-1 delay-150">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold">Materialvielfalt</span>
                       <Layers size={16} className="text-sky-500" />
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-sky-500 rounded-full" />
                     </div>
                   </div>
                </div>
                <div className="relative z-10 mt-8">
                  <TransitionLink href="/leistungen/sla-druck">
                    <MagneticButton className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-sky-500 hover:text-white transition-colors duration-300">
                      Mehr zu SLA <ArrowRight size={18} />
                    </MagneticButton>
                  </TransitionLink>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 4: 3D-Modellierung */}
          <TiltCard className="w-[60vw] min-w-[800px] h-[70vh] shrink-0 bg-[#141414] border border-white/10" glowColor="rgba(168,85,247,0.2)">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30">
                  <PenTool size={32} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="font-calistoga text-4xl text-white">3D-Modellierung</h3>
                  <p className="text-purple-500 tracking-wider uppercase text-sm mt-1 font-bold">Digital Design & Sculpting</p>
                </div>
              </div>
              <span className="text-8xl font-black text-white/5 font-calistoga select-none">03</span>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-12 flex-grow">
              <div className="flex flex-col justify-center">
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Die perfekte Idee braucht das perfekte digitale Fundament. Unsere Experten verwandeln Ihre Skizzen, 
                  Konzepte oder physischen Objekte in hochpräzise 3D-Modelle. Ob organische Formen für Kunst und Design 
                  oder strikt parametrische Modelle für die Industrie – wir erschaffen digitale Realität, optimiert für den 3D-Druck.
                </p>
                <div className="space-y-4">
                  {[
                    "Parametrisches CAD-Design (Fusion 360, SolidWorks)",
                    "Organic Sculpting (Blender, ZBrush)",
                    "Reverse Engineering (Scan-to-CAD)",
                    "Design for Additive Manufacturing (DfAM)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <Settings size={20} className="text-purple-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col justify-between group">
                {/* Wireframe abstract background */}
                <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-1000" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,25 50,50 T100,50 M0,20 Q25,80 50,20 T100,80 M0,80 Q25,20 50,80 T100,20" fill="none" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                  <path d="M50,0 L50,100 M20,0 L20,100 M80,0 L80,100" fill="none" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke"/>
                </svg>

                <div className="relative z-10 flex justify-between items-center text-white/50 mb-6">
                  <span className="text-xs tracking-widest uppercase">Workflow</span>
                  <Cpu size={16} />
                </div>
                
                <div className="relative z-10 space-y-4 flex-grow flex flex-col justify-center">
                   <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                     <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 text-purple-400 font-bold">1</div>
                     <div>
                       <h4 className="text-white font-bold">Konzept & Analyse</h4>
                       <p className="text-white/50 text-sm">Machbarkeitsstudie & Planung</p>
                     </div>
                   </div>
                   <div className="ml-5 w-0.5 h-4 bg-gradient-to-b from-purple-500/50 to-purple-500/10" />
                   <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                     <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 text-purple-400 font-bold">2</div>
                     <div>
                       <h4 className="text-white font-bold">Digitaler Entwurf</h4>
                       <p className="text-white/50 text-sm">CAD / Polygon / Sculpting</p>
                     </div>
                   </div>
                   <div className="ml-5 w-0.5 h-4 bg-gradient-to-b from-purple-500/50 to-purple-500/10" />
                   <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                     <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 text-purple-400 font-bold">3</div>
                     <div>
                       <h4 className="text-white font-bold">Optimierung</h4>
                       <p className="text-white/50 text-sm">Druckvorbereitung & Toleranzen</p>
                     </div>
                   </div>
                </div>

                <div className="relative z-10 mt-8">
                  <TransitionLink href="/leistungen/3d-modellierung">
                    <MagneticButton className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-colors duration-300">
                      Modellierung anfragen <ArrowRight size={18} />
                    </MagneticButton>
                  </TransitionLink>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 5: Konstruktion */}
          <TiltCard className="w-[60vw] min-w-[800px] h-[70vh] shrink-0 bg-[#141414] border border-white/10" glowColor="rgba(16,185,129,0.2)">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                  <Ruler size={32} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-calistoga text-4xl text-white">Konstruktion</h3>
                  <p className="text-emerald-500 tracking-wider uppercase text-sm mt-1 font-bold">Engineering & Mechanik</p>
                </div>
              </div>
              <span className="text-8xl font-black text-white/5 font-calistoga select-none">04</span>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-12 flex-grow">
              <div className="flex flex-col justify-center">
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Mehr als nur Form: Funktion. Wir konstruieren Baugruppen, mechanische Systeme und Gehäuse, 
                  die nicht nur gut aussehen, sondern in der realen Welt funktionieren. Unter Berücksichtigung 
                  von Materialeigenschaften, Toleranzen und Fertigungsrestriktionen entwickeln wir Lösungen, 
                  die halten, was sie versprechen.
                </p>
                <div className="space-y-4">
                  {[
                    "Komplexe Baugruppen & Mechanismen",
                    "Gehäusekonstruktion (Snap-Fits, Schraubdome)",
                    "Topologieoptimierung für Leichtbau",
                    "Simulation & FEM-Analyse (Basics)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <Gauge size={20} className="text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col justify-between group">
                {/* Blueprint background */}
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>
                
                <div className="relative z-10 flex justify-between items-center text-white/50 mb-6">
                  <span className="text-xs tracking-widest uppercase">Fokus</span>
                  <Wrench size={16} />
                </div>
                
                <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-center">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center group-hover:border-emerald-500/30 transition-colors">
                       <Settings className="text-emerald-500 mb-3" size={24} />
                       <h4 className="text-white font-bold text-sm">Passungen</h4>
                       <p className="text-white/50 text-xs mt-1">Exakte Toleranzen</p>
                     </div>
                     <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center group-hover:border-emerald-500/30 transition-colors">
                       <Layers className="text-emerald-500 mb-3" size={24} />
                       <h4 className="text-white font-bold text-sm">Baugruppen</h4>
                       <p className="text-white/50 text-xs mt-1">Komplexe Systeme</p>
                     </div>
                     <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center group-hover:border-emerald-500/30 transition-colors">
                       <Zap className="text-emerald-500 mb-3" size={24} />
                       <h4 className="text-white font-bold text-sm">Leichtbau</h4>
                       <p className="text-white/50 text-xs mt-1">Topologie optimiert</p>
                     </div>
                     <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center group-hover:border-emerald-500/30 transition-colors">
                       <CheckCircle2 className="text-emerald-500 mb-3" size={24} />
                       <h4 className="text-white font-bold text-sm">Prüfung</h4>
                       <p className="text-white/50 text-xs mt-1">DfAM validiert</p>
                     </div>
                   </div>
                </div>

                <div className="relative z-10 mt-8">
                  <TransitionLink href="/leistungen/konstruktion">
                    <MagneticButton className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-colors duration-300">
                      Projekt besprechen <ArrowRight size={18} />
                    </MagneticButton>
                  </TransitionLink>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 6: Outro / Call to Action */}
          <div className="w-[30vw] min-w-[400px] h-[70vh] flex flex-col justify-center items-center shrink-0 pr-32">
            <div className="w-32 h-32 rounded-full bg-[#C41E3A]/20 flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-[#C41E3A] animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
              <Zap size={48} className="text-[#C41E3A]" />
            </div>
            <h2 className="text-5xl font-calistoga text-white mb-6 text-center">
              Bereit für<br/>den Start?
            </h2>
            <p className="text-white/60 text-center mb-12">
              Lass uns deine Vision in die Realität umsetzen. Lade deine 3D-Modelle hoch oder schreibe uns eine Nachricht.
            </p>
            <TransitionLink href="/anfrage">
              <MagneticButton className="px-12 py-5 bg-[#C41E3A] text-white font-bold text-lg rounded-full shadow-[0_0_40px_rgba(196,30,58,0.4)] hover:shadow-[0_0_60px_rgba(196,30,58,0.6)] transition-all">
                Jetzt anfragen
              </MagneticButton>
            </TransitionLink>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN PAGE EXPORT
// ==========================================

export default function ServicesPage() {
  return (
    <main className="bg-white selection:bg-[#C41E3A] selection:text-white">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#FAF8F5]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
          {/* Animated background blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#C41E3A]/5 blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#E8D5C4]/40 blur-[100px]" 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-[#C41E3A]/20 text-[#C41E3A] font-bold text-sm tracking-widest uppercase mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C41E3A] animate-pulse" />
              Unsere Leistungen
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[100px] font-calistoga text-[#1A1A1A] leading-[1.1] mb-8 tracking-tight"
          >
            Wir drucken<br/>
            <span className="relative">
              <span className="relative z-10 text-[#C41E3A]">die Zukunft.</span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                className="absolute bottom-2 left-0 h-4 bg-[#C41E3A]/20 -z-10 -rotate-2"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Vom hochpräzisen SLA-Druck für filigrane Details bis zum extrem belastbaren FDM-Druck für industrielle Anwendungen. Wir beherrschen das volle Spektrum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton 
              className="w-16 h-24 rounded-full border-2 border-[#C41E3A]/30 flex items-start justify-center p-2"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
            >
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 bg-[#C41E3A] rounded-full mt-2"
              />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Massive Scrollytelling Horizontal Gallery */}
      <HorizontalScrollGallery />

      {/* Additional SEO Content / Footer Transition Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-calistoga text-5xl text-[#1A1A1A] mb-8">Warum Aykin 3D?</h2>
            <div className="space-y-8">
              {[
                { title: "Höchste Qualität", desc: "Wir nutzen industrietaugliche Maschinen und premium Materialien für perfekte Ergebnisse." },
                { title: "Schnelle Lieferung", desc: "Durch optimierte Prozesse garantieren wir extrem kurze Durchlaufzeiten." },
                { title: "Persönliche Beratung", desc: "Wir analysieren dein Projekt und empfehlen das beste Verfahren." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 border border-[#E8D5C4]">
                    <CheckCircle2 size={24} className="text-[#C41E3A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                    <p className="text-[#4A4A4A] leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-[#1A1A1A]" />
            <img 
              src="https://images.unsplash.com/photo-1631541909061-71e34a34b22c?q=80&w=2940&auto=format&fit=crop" 
              alt="3D Drucker in Aktion"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                <Printer size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-calistoga text-white mb-4">State of the Art Maschinenpark</h3>
              <p className="text-white/80 text-lg">Unser Maschinenpark wächst stetig, um die neuesten Innovationen der additiven Fertigung für dich nutzbar zu machen.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
