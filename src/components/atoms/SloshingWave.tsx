'use client';
import { useScroll, useTransform, useVelocity, useSpring, motion } from 'framer-motion';

export function SloshingWave({ height = 120 }: { height?: number }) {
  const { scrollY } = useScroll();
  const velocity    = useVelocity(scrollY);
  const smoothVel   = useSpring(velocity, { stiffness: 100, damping: 15 });
  const amplitude   = useTransform(smoothVel, [-3000, 0, 3000], [60, 20, 60]);

  return (
    <motion.svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height }}
      aria-hidden="true"
    >
      <motion.path
        d={useTransform(amplitude, (a) =>
          `M 0,60 C 360,${60 - a} 720,${60 + a} 1080,${60 - a/2} C 1320,${60 + a/3} 1440,60 1440,120 L 0,120 Z`
        )}
        className="fill-terracotta/30"
      />
    </motion.svg>
  );
}
