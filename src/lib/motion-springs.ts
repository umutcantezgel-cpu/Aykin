/**
 * Aykin — Spring Physics Configurations
 * Source of Truth: MASTER_CONTEXT.md v2.0, §9.2
 * ─────────────────────────────────────────────
 * Import these everywhere instead of hardcoding spring values.
 * Usage: <motion.div transition={SPRING.soft} />
 */

export const SPRING = {
  /** Soft — Card-Hover, Layout-Transitions */
  soft:   { type: 'spring' as const, stiffness: 200, damping: 20 },

  /** Snappy — Tab-Switches, Tap-Feedback */
  snappy: { type: 'spring' as const, stiffness: 400, damping: 25 },

  /** Floaty — Blobs, Decorative Elements */
  floaty: { type: 'spring' as const, stiffness: 60,  damping: 18 },

  /** Coin — Loyalty-Coin 3D Rotation, Bounce */
  coin:   { type: 'spring' as const, stiffness: 500, damping: 15 },

  /** Cursor — SyrupCursor Trailer */
  cursor: { type: 'spring' as const, stiffness: 150, damping: 18, mass: 0.5 },
} as const;

/** Shorthand for Framer Motion transition prop with spring type */
export type SpringConfig = typeof SPRING[keyof typeof SPRING];
