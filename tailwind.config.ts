import type { Config } from 'tailwindcss';

/**
 * Aykin — Tailwind Design System
 * Source of Truth: MASTER_CONTEXT.md v2.0, §5–§9
 * ─────────────────────────────────────────────────
 * Token naming is FINAL. Do NOT add aliases.
 * Every token maps 1:1 to a MASTER_CONTEXT reference.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)', // Main background
        cream: {
          DEFAULT: 'var(--color-bg-primary)', // Fallback for existing components
          pure: '#fefefe',
        },
        'bg-secondary': {
          DEFAULT: 'var(--color-bg-secondary)',
        },
        'bg-accent': {
          DEFAULT: 'var(--color-bg-accent)',
          soft: 'var(--color-bg-accent)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          deep: 'var(--color-primary-deep)',
        },
        neutral: {
          DEFAULT: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        },
        // System Feedback — NEVER as brand accent
        mint:  '#25D366',       // WhatsApp, Success
        ruby:  '#ff4d4d',       // Errors, Destructive
        // Loyalty Coin
        coin: {
          light: '#F5D77B',     // Gold Highlight
          dark:  '#D4A93D',     // Gold Shadow
        },
        // ── Backward compat (TODO: migrate to canonical tokens) ──
        terra: { DEFAULT: '#C41E3A', dark: '#A01830' },
        bark:  { DEFAULT: '#1A1A1A', mid: '#4A4A4A', soft: '#8A8A8A' },
        // Legacy aliases for components still using old token names
        'bg-creme': 'var(--color-bg-primary)',
        beige: { DEFAULT: 'var(--color-bg-secondary)' },
        peach: { DEFAULT: 'var(--color-bg-accent)', soft: 'var(--color-bg-accent)' },
        terracotta: { DEFAULT: 'var(--color-primary)', deep: 'var(--color-primary-deep)' },
        brown: {
          DEFAULT: 'var(--color-text-primary)',
          bark: 'var(--color-text-secondary)',
          mid: 'var(--color-text-muted)',
          muted: 'var(--color-text-subtle)',
        },
      },

      /* ═══ §6 · TYPOGRAPHY ══════════════════════════════════ */
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'], // Backward compat
        sans:    ['var(--font-body)', 'sans-serif'],     // Backward compat
      },
      fontWeight: {
        light:    '300',
        regular:  '500',
        semibold: '700',
        bold:     '800',
        black:    '900',
      },
      letterSpacing: {
        eyebrow: '0.07em',      // ~1.4px @ 20px
        stamp:   '0.10em',      // UPPERCASE Stamp Labels
        wide:    '0.25em',      // PromoBanner Marquee
      },

      /* ═══ §7 · BORDER-RADII, SHADOWS, BLURS ═══════════════ */
      borderRadius: {
        'card-xs':  '14px',     // Mini-Info-Cards, Tooltips
        'card':     '22px',     // ProductCard, BoxCard, ReviewBubble
        'card-lg':  '24px',     // Hero Containers, Modals
        'pill':     '100px',    // Primary CTAs — ALWAYS
        'pill-tab': '50px',     // Tab Pills
        'icon-btn': '9999px',   // FAB, Circle Buttons
      },
      boxShadow: {
        // Shadow Family — NEVER rgba(0,0,0,*)
        'clay-sm':   '0 2px 8px  0 rgba(196, 30, 58, 0.08)',   // Card Rest
        'clay':      '0 8px 24px 0 rgba(196, 30, 58, 0.12)',   // Card Hover, FAB
        'clay-lg':   '0 16px 40px 0 rgba(196, 30, 58, 0.18)',  // Floating Modal, Header
        'clay-cta':  '0 6px 20px 0 rgba(196, 30, 58, 0.30)',   // Primary CTA Glow
        'clay-deep': '0 12px 32px 0 rgba(26, 26, 26, 0.06)',   // Soft Card Glow
        // Glass
        'frosted':   'inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
        // Loyalty
        'coin':      '0 0 24px rgba(245, 215, 123, 0.5)',
      },
      backdropBlur: {
        'frosted-soft': '8px',
        'frosted':      '10px',
        'frosted-deep': '16px',
      },

      /* ═══ §8 · SPACING & SIZING ═══════════════════════════ */
      spacing: {
        // Section Rhythms (responsive)
        'hero-y':    'clamp(4rem, 10vw, 8rem)',
        'section-y': 'clamp(3rem, 7vw, 6rem)',
        'section-x': 'clamp(1rem, 4vw, 2rem)',
        // Component Heights
        'header':        '68px',
        'header-mobile': '60px',
        'fab':           '60px',
        'fab-lg':        '72px',
        'cta-h':         '48px',
        'cta-lg-h':      '60px',
      },
      maxWidth: {
        'prose':     '65ch',
        'container': '1280px',
        'narrow':    '960px',
      },

      /* ═══ §9 · MOTION TOKENS ═══════════════════════════════ */
      transitionTimingFunction: {
        'aykin':     'cubic-bezier(0.22, 1, 0.36, 1)',    // Standard Spring-like
        'aykin-out': 'cubic-bezier(0.16, 1, 0.3, 1)',     // Exit
        'aykin-in':  'cubic-bezier(0.7, 0, 0.84, 0)',     // Enter
        'bounce':    'cubic-bezier(0.34, 1.56, 0.64, 1)', // Snap-Back
      },
      transitionDuration: {
        '250':   '250ms',     // Hover State
        '450':   '450ms',     // Card Reveal
        '700':   '700ms',     // Blob Float Start
        '1200':  '1200ms',    // Transition Curtain
        '2500':  '2500ms',    // Blob Loop, Logo Pulse
        '12000': '12000ms',   // Marquee Full Cycle
      },
    },
  },
  plugins: [],
};

export default config;
