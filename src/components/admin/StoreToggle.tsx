"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function StoreToggle() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-md px-6 py-4 rounded-pill border border-bark/10 shadow-sm">
      <span className={`text-sm font-medium transition-colors ${!isOnline ? "text-bark" : "text-bark/40"}`}>
        Offline
      </span>
      
      <button
        type="button"
        role="switch"
        aria-checked={isOnline}
        onClick={() => setIsOnline(!isOnline)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 ${
          isOnline ? "bg-mint" : "bg-bark/20"
        }`}
      >
        <span className="sr-only">Store Status Toggle</span>
        <motion.span
          layout
          initial={false}
          animate={{
            x: isOnline ? 28 : 4,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="inline-block h-6 w-6 rounded-full bg-cream shadow-md"
        />
      </button>

      <span className={`text-sm font-medium transition-colors ${isOnline ? "text-bark" : "text-bark/40"}`}>
        Online
      </span>
    </div>
  );
}
