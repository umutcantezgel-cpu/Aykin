import React from "react";

interface StampBadgeProps {
  text: string;
  size?: number;
  rotate?: number;
  color?: string;
}

export function StampBadge({
  text,
  size = 88,
  rotate = -12,
  color = "#C41E3A",
}: StampBadgeProps) {
  const id = `sb-${text.replace(/\W/g, "")}-${size}`;
  const r = size / 2 - 10;
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            id={id}
            d={`M${size / 2},${size / 2} m-${r},0 a${r},${r} 0 1,1 ${
              r * 2
            },0 a${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 3}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3.5 2.5"
        />
        <text
          fontSize="9"
          fontFamily="Nunito,sans-serif"
          fontWeight="800"
          fill={color}
          letterSpacing="2"
        >
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
