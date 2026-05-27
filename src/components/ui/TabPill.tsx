'use client';

import { motion } from 'framer-motion';

export function TabPill({
  id,
  label,
  activeTab,
  onClick,
}: {
  id: string;
  label: string;
  activeTab: string;
  onClick: (id: string) => void;
}) {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => onClick(id)}
      className={`
        relative px-5 py-2 rounded-pill-tab text-sm font-bold transition-colors
        outline-none focus-visible:ring-2 focus-visible:ring-terracotta
        ${isActive ? 'text-cream-pure' : 'text-brown-muted hover:text-brown'}
      `}
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {isActive && (
        <motion.div
          layoutId="tab-pill-active-bg"
          className="absolute inset-0 bg-terracotta rounded-pill-tab"
          initial={false}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 block whitespace-nowrap">{label}</span>
    </button>
  );
}
