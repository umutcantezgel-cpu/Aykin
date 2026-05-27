export function BitemarkMaskDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        {/* Right-edge bite */}
        <mask id="bitemark-right" maskUnits="objectBoundingBox">
          <rect width="1" height="1" fill="white" />
          <circle cx="1" cy="0.5" r="0.08" fill="black" />
        </mask>
        {/* Top-right bite (für Cookies) */}
        <mask id="bitemark-top-right" maskUnits="objectBoundingBox">
          <rect width="1" height="1" fill="white" />
          <circle cx="0.85" cy="0.15" r="0.12" fill="black" />
        </mask>
        {/* Card-edge bite */}
        <mask id="bitemark-card" maskUnits="objectBoundingBox">
          <rect width="1" height="1" fill="white" />
          <circle cx="1" cy="0.5" r="0.04" fill="black" />
        </mask>
      </defs>
    </svg>
  );
}
