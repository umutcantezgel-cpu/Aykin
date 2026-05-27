"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export function PhysicsPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !sceneRef.current) return;

    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 300,
        wireframes: false,
        background: 'transparent'
      }
    });

    const ground = Matter.Bodies.rectangle(sceneRef.current.clientWidth / 2, 310, sceneRef.current.clientWidth + 100, 40, { isStatic: true });
    const wallLeft = Matter.Bodies.rectangle(-20, 150, 40, 300, { isStatic: true });
    const wallRight = Matter.Bodies.rectangle(sceneRef.current.clientWidth + 20, 150, 40, 300, { isStatic: true });

    Matter.Composite.add(engine.world, [ground, wallLeft, wallRight]);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const handleClick = () => {
      const x = Math.random() * (sceneRef.current?.clientWidth || 300);
      const isCircle = Math.random() > 0.5;
      const body = isCircle 
        ? Matter.Bodies.circle(x, -30, 20 + Math.random() * 10, {
            render: { fillStyle: '#E8D5C4' },
            restitution: 0.6
          })
        : Matter.Bodies.rectangle(x, -30, 30 + Math.random() * 20, 30 + Math.random() * 20, {
            render: { fillStyle: '#C41E3A' },
            restitution: 0.4
          });
      Matter.Composite.add(engine.world, body);
    };

    sceneRef.current.addEventListener('click', handleClick);

    // Initial drop
    for(let i = 0; i < 5; i++) {
      setTimeout(handleClick, i * 200);
    }

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (sceneRef.current) {
        sceneRef.current.removeEventListener('click', handleClick);
      }
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, [isMounted]);

  if (!isMounted) return <div style={{ height: 300, width: '100%' }} />;

  return (
    <div 
      ref={sceneRef} 
      style={{ width: '100%', height: 300, position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
      title="Click to drop treats!"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', fontFamily: 'var(--font-calistoga), serif', fontSize: '1.5rem', color: '#C41E3A', opacity: 0.5 }}>
        Klicken für mehr!
      </div>
    </div>
  );
}
