import type React from 'react';

interface ChineseBorderProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  padding?: string;
  title?: string;
}

export default function ChineseBorder({
  children,
  className = '',
  borderColor = 'border-[#E6C280]/40',
  padding = 'p-4',
  title,
}: ChineseBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer border */}
      <div className={`absolute inset-0 border-2 ${borderColor} rounded-sm pointer-events-none`} />

      {/* Inner thin accent line */}
      <div className="absolute inset-1.5 border border-[#E6C280]/20 rounded-xs pointer-events-none" />

      {/* Traditional Ornate Corners */}
      {/* Top-Left Corner */}
      <svg
        className="absolute top-0 left-0 w-8 h-8 pointer-events-none text-[#E6C280]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 12V2h10M4 2v6h4" />
        <path d="M2 2l4 4" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>

      {/* Top-Right Corner */}
      <svg
        className="absolute top-0 right-0 w-8 h-8 pointer-events-none text-[#E6C280] transform rotate-90"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 12V2h10M4 2v6h4" />
        <path d="M2 2l4 4" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>

      {/* Bottom-Left Corner */}
      <svg
        className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none text-[#E6C280] transform -rotate-90"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 12V2h10M4 2v6h4" />
        <path d="M2 2l4 4" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>

      {/* Bottom-Right Corner */}
      <svg
        className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none text-[#E6C280] transform rotate-180"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 12V2h10M4 2v6h4" />
        <path d="M2 2l4 4" strokeWidth="1" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>

      {/* Optional Top Title Accent */}
      {title && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#5C1D24] px-4 py-0.5 border border-[#E6C280]/50 rounded-full text-xs font-mono text-[#E6C280] tracking-widest whitespace-nowrap uppercase">
          {title}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 h-full ${padding}`}>{children}</div>
    </div>
  );
}
