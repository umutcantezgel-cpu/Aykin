import { useReducedMotion, Variants } from 'framer-motion';

export function useReducedMotionVariants(variants: Variants, fallbackVariants?: Variants): Variants {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    if (fallbackVariants) return fallbackVariants;
    
    // Default fallback: strip transforms and use only opacity
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } }
    };
  }

  return variants;
}
