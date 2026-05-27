import React from "react";

export function Logo({ size = 52 }: { size?: number }) {
  return (
    <div style={{ cursor: 'pointer', flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,2 C38,2 45,5 49,11 C54,16 57,22 57,29 C57,37 53,44 48,48 C43,53 36,58 29,57 C22,57 15,53 10,48 C4,43 2,36 2,29 C2,21 6,14 12,9 C17,3 23,2 30,2 Z"
          fill="#C41E3A" />
        <text x="50%" y="44%" textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-calistoga), serif', fontSize: 10.5, fill: '#fefefe' }}>
          <tspan x="50%" dy="-4.5">AY</tspan>
          <tspan x="50%" dy="13">KIN</tspan>
        </text>
      </svg>
    </div>
  );
}
