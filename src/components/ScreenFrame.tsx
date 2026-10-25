import { Lock } from 'lucide-react';
import type React from 'react';
import { SCREENS, screenSrc } from '../content/screens';
import type { ScreenName } from '../types';

interface ScreenFrameProps {
  screen: ScreenName;
  /** Overlay layers positioned in percentages of the screenshot box. */
  children?: React.ReactNode;
  className?: string;
  /** Responsive `sizes` hint for the browser's srcset selection. */
  sizes?: string;
  /** Load eagerly (only for above-the-fold images). */
  priority?: boolean;
  /** Hide the browser chrome for compact insets. */
  bare?: boolean;
}

/**
 * A product screenshot rendered inside a minimal browser window. The address bar
 * shows a self-hosted domain to reinforce that Shumai runs on your own servers.
 */
export function ScreenFrame({
  screen,
  children,
  className = '',
  sizes = '(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw',
  priority = false,
  bare = false,
}: ScreenFrameProps) {
  const info = SCREENS[screen];
  return (
    <figure
      className={`relative rounded-xl border border-[#E6C280]/20 bg-[#120406] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-[#E6C280]/45 hover:scale-[1.01] ${className}`}
    >
      {!bare && (
        <div
          className="flex items-center gap-3 px-3 py-2 border-b border-white/5 bg-[#1A0609]"
          aria-hidden="true"
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="flex-1 min-w-0 flex items-center gap-1.5 rounded-md bg-black/40 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-gray-400">
            <Lock className="w-3 h-3 shrink-0 text-emerald-400/80" />
            <span className="truncate">
              <span className="text-[#E6C280]">media.yourstudio.com</span>
              {info.urlPath}
            </span>
          </div>
        </div>
      )}
      <div className="relative" style={{ aspectRatio: `${info.width} / ${info.height}` }}>
        <picture>
          <source
            type="image/webp"
            srcSet={`${screenSrc(screen, 960)} 960w, ${screenSrc(screen, 1600)} 1600w, ${screenSrc(screen, 2400)} 2400w`}
            sizes={sizes}
          />
          <img
            src={screenSrc(screen, 1600)}
            alt={info.alt}
            width={info.width}
            height={info.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        {children && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {children}
          </div>
        )}
      </div>
    </figure>
  );
}
