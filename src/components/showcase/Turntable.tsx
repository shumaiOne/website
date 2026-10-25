import { Move3d } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar } from './Callout';

const FRAMES = 24;
const COLS = 6;
const ROWS = 4;
const STEP_DEG = 360 / FRAMES;
const PX_PER_FRAME = 14;

/** Comments pinned to turntable angles, mirroring the demo project. */
const PINS = [
  {
    frame: 3,
    name: 'Alex Rivera',
    tone: 'sky' as const,
    text: '@x1 How do the fur sculpt and silhouette read from this angle?',
  },
  {
    frame: 6,
    name: 'Jordan Taylor',
    tone: 'emerald' as const,
    text: 'Tail silhouette reads a bit flat from this side. Can we add more volume?',
  },
];

/**
 * Interactive 3D turntable built from the same 24-frame render Shumai generates for
 * GLB, FBX, OBJ, STL, USD, and DAE files. Drag, swipe, or use arrow keys to rotate.
 */
export function Turntable({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '300px' });
  const visible = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const drag = useRef<{ x: number; frame: number } | null>(null);

  // Auto-rotate until the visitor takes control.
  useEffect(() => {
    if (!visible || interacted || reduce) return;
    const timer = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES), 260);
    return () => window.clearInterval(timer);
  }, [visible, interacted, reduce]);

  const setWrapped = useCallback((f: number) => {
    setFrame(((Math.round(f) % FRAMES) + FRAMES) % FRAMES);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setInteracted(true);
    drag.current = { x: e.clientX, frame };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setWrapped(drag.current.frame - (e.clientX - drag.current.x) / PX_PER_FRAME);
  };
  const onPointerUp = () => {
    drag.current = null;
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setInteracted(true);
      setWrapped(frame + (e.key === 'ArrowRight' ? 1 : -1));
    }
  };

  const col = frame % COLS;
  const row = Math.floor(frame / COLS);
  const degrees = frame * STEP_DEG;
  const pin = PINS.find((p) => Math.abs(p.frame - frame) <= 1);

  return (
    <div ref={ref} className={`relative flex flex-col ${className}`}>
      <div
        role="slider"
        tabIndex={0}
        aria-label="3D model turntable. Use left and right arrow keys or drag to rotate."
        aria-valuemin={0}
        aria-valuemax={345}
        aria-valuenow={degrees}
        aria-valuetext={`${degrees} degrees`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative aspect-square w-full max-w-[420px] mx-auto cursor-grab active:cursor-grabbing touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-[#E6C280] rounded-xl"
      >
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: seen ? 'url(/screens/turntable-sprite.webp)' : undefined,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
          }}
        />
        <AnimatePresence>
          {pin && (
            <motion.div
              key={pin.frame}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-4 sm:-right-6 w-56 rounded-lg border border-[#E6C280]/25 bg-[#1A0609]/95 p-2.5 shadow-xl pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={pin.name} tone={pin.tone} className="w-5 h-5 text-[9px]" />
                <span className="text-[11px] font-bold text-white">{pin.name}</span>
                <span className="ml-auto rounded bg-blue-500/20 px-1.5 text-[10px] font-mono font-bold text-blue-300">
                  {pin.frame * STEP_DEG}°
                </span>
              </div>
              <p className="text-[11px] leading-snug text-gray-300">{pin.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center gap-3 px-2" aria-hidden="true">
        <span className="font-mono text-xs text-gray-300 w-20 tabular-nums">{degrees}° / 360°</span>
        <div className="relative flex-1 h-7 rounded-full border border-white/10 bg-black/40 overflow-hidden">
          {Array.from({ length: FRAMES }, (_, i) => (
            <span
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 w-px ${i % 6 === 0 ? 'h-3 bg-white/60' : 'h-1.5 bg-white/25'}`}
              style={{ left: `${4 + (i / (FRAMES - 1)) * 92}%` }}
            />
          ))}
          {PINS.map((p) => (
            <span
              key={p.frame}
              className="absolute top-1 w-1.5 h-1.5 -ml-[3px] rounded-full bg-[#E6C280]"
              style={{ left: `${4 + (p.frame / (FRAMES - 1)) * 92}%` }}
            />
          ))}
          <span
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 transition-[left] duration-150"
            style={{ left: `${4 + (frame / (FRAMES - 1)) * 92}%` }}
          />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-mono text-[#E6C280]/80">
          <Move3d className="w-3.5 h-3.5" /> drag
        </span>
      </div>
    </div>
  );
}
