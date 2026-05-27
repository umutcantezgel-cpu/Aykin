import React from "react";

interface TicketCardProps {
  children: React.ReactNode;
  sectionBg?: string;
  className?: string;
}

export function TicketCard({
  children,
  sectionBg = "#FAF8F5",
  className = "",
}: TicketCardProps) {
  return (
    <div
      className={`relative border-2 border-dashed border-[#C41E3A] rounded-2xl bg-white overflow-visible ${className}`}
      style={{ margin: "0 14px" }}
    >
      {/* Left perforation hole */}
      <div
        style={{
          position: "absolute",
          left: -13,
          top: "50%",
          transform: "translateY(-50%)",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: sectionBg,
          border: "2px dashed #E8D5C4",
        }}
      />
      {/* Right perforation hole */}
      <div
        style={{
          position: "absolute",
          right: -13,
          top: "50%",
          transform: "translateY(-50%)",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: sectionBg,
          border: "2px dashed #E8D5C4",
        }}
      />
      <div style={{ padding: "24px 28px" }}>{children}</div>
    </div>
  );
}
