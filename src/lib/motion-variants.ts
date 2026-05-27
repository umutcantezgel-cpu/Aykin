/**
 * Aykin — Reusable Framer Motion Variants
 * Source of Truth: MASTER_CONTEXT.md v2.0, §44
 * ─────────────────────────────────────────────
 * Usage:
 *   import { fadeUp, staggerContainer } from '@/lib/motion-variants';
 *   <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *     <motion.p variants={fadeUp}>…</motion.p>
 *   </motion.div>
 */

import type { Variants, Transition } from 'framer-motion';
import { SPRING } from './motion-springs';

/* ═══ Fade Variants ══════════════════════════════════════ */

/** Fade up from 24px below (default page/section entry) */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING.soft, duration: 0.5 },
  },
};

/** Fade in without vertical movement */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/** Scale up from 0.92 (modal, card pop) */
export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING.snappy,
  },
};

/** Slide in from right (cart drawer, drawers) */
export const slideRight: Variants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: SPRING.soft },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.3 } },
};

/** Slide in from left (mobile nav) */
export const slideLeft: Variants = {
  hidden:  { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: SPRING.soft },
  exit:    { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
};

/** Slide down from top (toast, achievement banner) */
export const slideDown: Variants = {
  hidden:  { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: SPRING.snappy },
  exit:    { y: '-100%', opacity: 0, transition: { duration: 0.25 } },
};

/* ═══ Container Variants (Stagger Children) ══════════════ */

/** Stagger children with 80ms delay */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Stagger children with 120ms delay (slower, for card grids) */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/* ═══ Interactive Variants ═══════════════════════════════ */

/** Card hover lift (4px up + shadow increase) */
export const cardHover = {
  rest:  { y: 0, scale: 1 },
  hover: { y: -4, scale: 1, transition: SPRING.soft },
  tap:   { scale: 0.97, transition: SPRING.snappy },
};

/** Button press (scale down + bounce back) */
export const buttonPress = {
  rest:  { scale: 1 },
  hover: { scale: 1.02, transition: SPRING.soft },
  tap:   { scale: 0.92, transition: SPRING.snappy },
};

/** Icon spin (for loading states) */
export const iconSpin = {
  animate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
};

/* ═══ Page Transition Variants ═══════════════════════════ */

/** TransitionCurtain sirup-drip (§27) */
export const curtainVariants: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scaleY: 0,
    transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
  },
};

/* ═══ Reduced Motion Helper ═════════════════════════════ */

/**
 * Returns static variants when user prefers reduced motion.
 * Usage: const v = useReducedMotion() ? reducedVariants : fadeUp;
 */
export const reducedVariants: Variants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1 },
};
