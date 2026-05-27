import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  sub?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionTitle({
  children,
  sub,
  center = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? "text-center" : ""}`}>
      <h2
        style={{
          fontFamily: "Calistoga,serif",
          fontSize: "clamp(1.7rem,4vw,2.8rem)",
          color: light ? "#FAF8F5" : "#1A1A1A",
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p
          style={{
            fontSize: "0.92rem",
            color: light ? "rgba(250,248,245,0.75)" : "#8A8A8A",
            maxWidth: 440,
            margin: center ? "0 auto" : 0,
            lineHeight: 1.65,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
