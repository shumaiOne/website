import type React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
}

/** Floating glass card layered over a screenshot to narrate a feature. */
export function Callout({ children, className = '' }: CalloutProps) {
  return (
    <div
      className={`rounded-xl border border-[#E6C280]/25 bg-[#1A0609]/90 backdrop-blur-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] text-left ${className}`}
    >
      {children}
    </div>
  );
}

interface AvatarProps {
  name: string;
  tone?: 'gold' | 'rose' | 'sky' | 'emerald' | 'violet';
  className?: string;
}

const TONES: Record<NonNullable<AvatarProps['tone']>, string> = {
  gold: 'bg-[#E6C280] text-[#5C1D24]',
  rose: 'bg-rose-300 text-rose-950',
  sky: 'bg-sky-300 text-sky-950',
  emerald: 'bg-emerald-300 text-emerald-950',
  violet: 'bg-violet-300 text-violet-950',
};

/** Initials avatar used in animated callouts. */
export function Avatar({ name, tone = 'gold', className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-[10px] w-6 h-6 shrink-0 ${TONES[tone]} ${className}`}
    >
      {initials}
    </span>
  );
}
