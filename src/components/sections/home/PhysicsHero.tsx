'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Box, Layers, Zap, Gift } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function PhysicsHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  
  const [isBroken, setIsBroken] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // DOM Refs for synchronization
  const centerBoxRef = useRef<HTMLDivElement>(null);
  const ball1Ref = useRef<HTMLDivElement>(null);
  const ball2Ref = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Body = Matter.Body,
          Constraint = Matter.Constraint,
          Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // Zero gravity for floating effect initially
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create Central Box (Glassmorphism Cube)
    const boxSize = 256; // 64 * 4 (Tailwind w-64 = 256px)
    const centerBox = Bodies.rectangle(width / 2, height / 2, boxSize, boxSize, {
      restitution: 0.8,
      frictionAir: 0.05,
      density: 0.002,
      label: 'glassBox'
    });

    // Spring constraint to hold the box in the center loosely
    const centerConstraint = Constraint.create({
      pointA: { x: width / 2, y: height / 2 },
      bodyB: centerBox,
      pointB: { x: 0, y: 0 },
      stiffness: 0.005,
      damping: 0.1,
    });

    // Create Ball 1 (Layers)
    const ball1Size = 96; // w-24
    const ball1 = Bodies.circle(width / 2 + 300, height / 2 - 100, ball1Size / 2, {
      restitution: 0.9,
      frictionAir: 0.01,
      density: 0.005,
      label: 'ball1'
    });

    // Create Ball 2 (Zap)
    const ball2Size = 80; // w-20
    const ball2 = Bodies.circle(width / 2 - 300, height / 2 + 150, ball2Size / 2, {
      restitution: 0.9,
      frictionAir: 0.01,
      density: 0.005,
      label: 'ball2'
    });

    // Add boundaries (walls) so balls don't float away indefinitely
    const wallOptions = { isStatic: true, restitution: 1 };
    const ground = Bodies.rectangle(width / 2, height + 1000, width * 3, 2000, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -1000, width * 3, 2000, wallOptions);
    const leftWall = Bodies.rectangle(-1000, height / 2, 2000, height * 3, wallOptions);
    const rightWall = Bodies.rectangle(width + 1000, height / 2, 2000, height * 3, wallOptions);

    World.add(engine.world, [centerBox, centerConstraint, ball1, ball2, ground, ceiling, leftWall, rightWall]);

    // Add mouse control
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    World.add(engine.world, mouseConstraint);

    // Collision Event to break glass
    let broken = false;
    Events.on(engine, 'collisionStart', (event) => {
      if (broken) return;
      const pairs = event.pairs;
      
      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        
        // Calculate impact speed
        const velocityA = Matter.Vector.magnitude(bodyA.velocity);
        const velocityB = Matter.Vector.magnitude(bodyB.velocity);
        const relativeVelocity = Math.abs(velocityA + velocityB);
        
        // If one of the bodies is the glass box and hit is hard enough
        if ((bodyA.label === 'glassBox' || bodyB.label === 'glassBox') && relativeVelocity > 15) {
          triggerBreak();
          break;
        }
      }
    });

    const shards: Matter.Body[] = [];
    
    const triggerBreak = () => {
      broken = true;
      setIsBroken(true);
      setTimeout(() => setShowEasterEgg(true), 1500);

      // Turn on gravity!
      engine.world.gravity.y = 1;

      // Remove the main box and its constraint
      World.remove(engine.world, centerBox);
      World.remove(engine.world, centerConstraint);

      // Create 8 small triangular shards in place of the box
      const pos = centerBox.position;
      const shardSize = boxSize / 2;
      
      for (let i = 0; i < 8; i++) {
        const shard = Bodies.polygon(
          pos.x + (Math.random() - 0.5) * boxSize,
          pos.y + (Math.random() - 0.5) * boxSize,
          3, // triangle
          shardSize * (0.5 + Math.random() * 0.5),
          {
            restitution: 0.4,
            friction: 0.1,
            density: 0.002,
            angle: Math.random() * Math.PI * 2
          }
        );
        
        // Apply explosive force
        const forceMagnitude = 0.05 + Math.random() * 0.05;
        Body.applyForce(shard, shard.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: (Math.random() - 0.5) * forceMagnitude - 0.05 // Upward bias
        });
        
        shards.push(shard);
      }
      
      World.add(engine.world, shards);
    };

    // DOM Sync Loop
    Events.on(engine, 'afterUpdate', () => {
      // Sync Ball 1
      if (ball1Ref.current) {
        ball1Ref.current.style.transform = `translate(${ball1.position.x - ball1Size/2}px, ${ball1.position.y - ball1Size/2}px) rotate(${ball1.angle}rad)`;
      }
      // Sync Ball 2
      if (ball2Ref.current) {
        ball2Ref.current.style.transform = `translate(${ball2.position.x - ball2Size/2}px, ${ball2.position.y - ball2Size/2}px) rotate(${ball2.angle}rad)`;
      }
      // Sync Center Box
      if (!broken && centerBoxRef.current) {
        centerBoxRef.current.style.transform = `translate(${centerBox.position.x - boxSize/2}px, ${centerBox.position.y - boxSize/2}px) rotate(${centerBox.angle}rad)`;
      }
      
      // Sync Shards
      if (broken && shardsRef.current.length > 0) {
        shards.forEach((shard, index) => {
          if (shardsRef.current[index]) {
            // center the shard div visually based on polygon bounds
            shardsRef.current[index].style.transform = `translate(${shard.position.x - 50}px, ${shard.position.y - 50}px) rotate(${shard.angle}rad)`;
          }
        });
      }
    });

    // Random floating movement
    Events.on(engine, 'beforeUpdate', () => {
      if (broken) return;
      // Add slight turbulence
      [ball1, ball2].forEach(body => {
        if (Math.random() < 0.02) {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.002
          });
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Runner.stop(runner);
      Engine.clear(engine);
      if (mouseConstraint) {
         World.remove(engine.world, mouseConstraint);
      }
    };
  }, []);

  return (
    <div ref={sceneRef} className="absolute inset-0 w-full h-full overflow-hidden touch-none select-none z-30">
      
      {/* Easter Egg Background (Revealed when broken) */}
      <div 
        className={twMerge(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-1000",
          showEasterEgg ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )}
      >
        <div className="bg-[#FAF8F5]/80 backdrop-blur-md border-2 border-[#C41E3A] p-8 rounded-3xl shadow-[0_10px_50px_rgba(196,30,58,0.3)] text-center pointer-events-auto">
          <Gift className="text-[#C41E3A] mx-auto mb-4" size={48} />
          <h3 className="font-calistoga text-3xl text-[#1A1A1A] mb-2">Secret Unlocked!</h3>
          <p className="text-[#2D2D2D] mb-4">Verwende diesen Code bei deiner Anfrage für 20% Rabatt:</p>
          <div className="bg-[#C41E3A]/10 text-[#C41E3A] font-mono font-bold text-2xl py-3 px-6 rounded-xl tracking-wider">
            SMASH20
          </div>
        </div>
      </div>

      {/* Main Glass Cube */}
      {!isBroken && (
        <div 
          ref={centerBoxRef}
          className="absolute top-0 left-0 w-64 h-64 flex items-center justify-center rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(196,30,58,0.1)] cursor-grab active:cursor-grabbing will-change-transform"
        >
          <Box size={80} className="text-[#C41E3A] pointer-events-none" strokeWidth={1} />
        </div>
      )}

      {/* Shards (Rendered only after breaking) */}
      {isBroken && Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if(el) shardsRef.current[i] = el; }}
          className="absolute top-0 left-0 w-[100px] h-[100px] bg-white/40 backdrop-blur-md border border-white/60 shadow-lg will-change-transform pointer-events-none"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      ))}

      {/* Ball 1 */}
      <div 
        ref={ball1Ref}
        className="absolute top-0 left-0 flex items-center justify-center w-24 h-24 rounded-2xl bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(26,26,26,0.05)] cursor-grab active:cursor-grabbing will-change-transform"
      >
        <Layers size={32} className="text-[#1A1A1A] pointer-events-none" strokeWidth={1.5} />
      </div>

      {/* Ball 2 */}
      <div 
        ref={ball2Ref}
        className="absolute top-0 left-0 flex items-center justify-center w-20 h-20 rounded-full bg-[#C41E3A]/90 backdrop-blur-md border border-[#C41E3A] shadow-[0_8px_24px_rgba(196,30,58,0.3)] cursor-grab active:cursor-grabbing will-change-transform"
      >
        <Zap size={28} className="text-[#FAF8F5] pointer-events-none" strokeWidth={2} />
      </div>

    </div>
  );
}
