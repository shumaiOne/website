import { useInView, useReducedMotion } from 'motion/react';
import { type RefObject, useEffect, useRef, useState } from 'react';

/**
 * Returns the elapsed time (ms) of a looping timeline that only advances while the
 * referenced element is visible. Reduced-motion users get a static final frame.
 */
export function useTimeline<T extends Element>(
  totalMs: number,
  { loop = true, holdMs = 2500 }: { loop?: boolean; holdMs?: number } = {},
): { ref: RefObject<T | null>; elapsed: number } {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  // Progress carried across pauses so the sequence resumes where it left off.
  const progress = useRef(0);

  useEffect(() => {
    if (reduce) {
      setElapsed(totalMs);
      return;
    }
    if (!inView) return;

    let frame = 0;
    let origin = performance.now() - progress.current;

    const tick = (now: number) => {
      let t = now - origin;
      if (t > totalMs + holdMs) {
        if (!loop) {
          progress.current = totalMs;
          setElapsed(totalMs);
          return;
        }
        origin = now;
        t = 0;
      }
      progress.current = t;
      setElapsed(Math.min(t, totalMs));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, totalMs, holdMs, loop]);

  return { ref, elapsed };
}

/** Normalised progress (0..1) of a segment [start, start + duration] on a timeline. */
export function segment(elapsed: number, start: number, duration: number): number {
  if (elapsed <= start) return 0;
  if (elapsed >= start + duration) return 1;
  return (elapsed - start) / duration;
}
