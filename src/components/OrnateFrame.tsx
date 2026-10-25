import type React from 'react';

interface OrnateFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Corner glyph size in Tailwind units, matches the hero badge by default. */
  size?: 'sm' | 'md';
}

const CORNERS = [
  'absolute -top-2.5 -left-2.5',
  'absolute -top-2.5 -right-2.5 rotate-90',
  'absolute -bottom-2.5 -left-2.5 -rotate-90',
  'absolute -bottom-2.5 -right-2.5 rotate-180',
];

/** The traditional gold corner frame used around the hero badge and section labels. */
export function OrnateFrame({ children, className = '', size = 'md' }: OrnateFrameProps) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div className={`relative px-6 py-2 rounded-xs select-none ${className}`}>
      {CORNERS.map((pos) => (
        <svg
          key={pos}
          className={`${pos} ${dim} text-[#E6C280]`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M2.5 12V2.5H12" />
          <path d="M6.4 2.5V6.4H2.5" />
        </svg>
      ))}
      {children}
    </div>
  );
}
