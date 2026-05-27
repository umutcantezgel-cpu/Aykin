'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useReducedMotion } from 'framer-motion';
import { useAchievements } from '@/store/useAchievements';

export default function PhysicsPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeBodies = useRef<Matter.Body[]>([]);
  const spawnCountRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies;

    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    });
    const world = engine.world;

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const wallOptions = { isStatic: true, render: { visible: false } };
    Composite.add(world, [
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, wallOptions),
      Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, wallOptions),
      Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, wallOptions),
    ]);

    const handleClick = (e: MouseEvent) => {
      const sprites = ['/sprites/waffle.png', '/sprites/strawberry.png', '/sprites/cookie.png'];
      const randomSprite = sprites[Math.floor(Math.random() * sprites.length)];
      
      const body = Bodies.circle(e.clientX, e.clientY, 24, {
        restitution: 0.6,
        friction: 0.1,
        density: 0.001,
        render: {
          sprite: {
            texture: randomSprite,
            xScale: 1,
            yScale: 1
          },
          // Fallback if sprite fails to load
          fillStyle: '#C41E3A'
        }
      });

      Composite.add(world, body);
      activeBodies.current.push(body);
      spawnCountRef.current++;

      if (spawnCountRef.current === 50) {
        useAchievements.getState().unlock('waffle-master');
      }

      if (activeBodies.current.length > 50) {
        const oldest = activeBodies.current.shift();
        if (oldest) Composite.remove(world, oldest);
      }
    };

    window.addEventListener('mousedown', handleClick);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <div ref={containerRef} className="fixed inset-0 z-[9000] pointer-events-none" />;
}
