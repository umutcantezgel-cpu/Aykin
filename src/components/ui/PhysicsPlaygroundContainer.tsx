'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PhysicsPlayground = dynamic(() => import('./PhysicsPlayground'), { ssr: false });

export function PhysicsPlaygroundContainer() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleAchievement = (e: CustomEvent | Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === 'sweet-tooth') {
        setIsActive(true);
        
        // Disable after 60 seconds
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsActive(false);
        }, 60000);
      }
    };

    window.addEventListener('achievementUnlocked', handleAchievement);

    return () => {
      window.removeEventListener('achievementUnlocked', handleAchievement);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!isActive) return null;

  return <PhysicsPlayground />;
}
