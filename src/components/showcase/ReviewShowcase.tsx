import { Film, StepBack, StepForward } from 'lucide-react';
import { motion } from 'motion/react';
import { useTimeline } from '../../hooks/useTimeline';
import { ScreenFrame } from '../ScreenFrame';
import { Callout } from './Callout';

const EXPORTS = ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'Avid'];

export function ReviewShowcase() {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(3600, { holdMs: 5000 });

  return (
    <div ref={ref} className="relative">
      <ScreenFrame screen="review">
        {/* Pulse at the tip of the client's arrow annotation */}
        <span className="absolute" style={{ left: '47.8%', top: '49.2%' }}>
          <span className="absolute -left-4 -top-4 w-8 h-8 rounded-full border-2 border-[#FADE9C] animate-ping opacity-60" />
        </span>

        {/* Highlight on the selected comment card */}
        <motion.span
          className="absolute rounded-lg border-2 border-[#E6C280] shadow-[0_0_24px_rgba(230,194,128,0.45)]"
          style={{ left: '77.8%', top: '42.8%', width: '21.2%', height: '20.6%' }}
          initial={false}
          animate={{ opacity: elapsed > 800 ? 1 : 0, scale: elapsed > 800 ? 1 : 1.04 }}
          transition={{ duration: 0.4 }}
        />

        {/* Timecode badge on the comment */}
        <motion.span
          className="absolute rounded-md bg-[#E6C280] px-2 py-0.5 font-mono text-[10px] font-bold text-[#5C1D24] shadow-lg"
          style={{ left: '62%', top: '45%' }}
          initial={false}
          animate={{ opacity: elapsed > 1400 ? 1 : 0, x: elapsed > 1400 ? 0 : 10 }}
          transition={{ duration: 0.35 }}
        >
          pinned at 00:06
        </motion.span>
      </ScreenFrame>

      <motion.div
        initial={false}
        animate={{ opacity: elapsed > 2000 ? 1 : 0, y: elapsed > 2000 ? 0 : 12 }}
        transition={{ duration: 0.45 }}
        className="relative mt-3 sm:absolute sm:mt-0 sm:-bottom-10 sm:-left-6 sm:w-72"
        aria-hidden="true"
      >
        <Callout className="p-3 space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] text-gray-300">
            <span className="flex gap-1">
              <kbd className="flex items-center justify-center w-5 h-5 rounded border border-white/15 bg-white/5">
                <StepBack className="w-3 h-3" />
              </kbd>
              <kbd className="flex items-center justify-center w-5 h-5 rounded border border-white/15 bg-white/5">
                <StepForward className="w-3 h-3" />
              </kbd>
            </span>
            Step one frame at a time
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-white mb-1.5">
              <Film className="w-3.5 h-3.5 text-[#E6C280]" />
              Export notes to your NLE
            </div>
            <div className="flex flex-wrap gap-1.5">
              {EXPORTS.map((name, i) => (
                <motion.span
                  key={name}
                  initial={false}
                  animate={{ opacity: elapsed > 2300 + i * 220 ? 1 : 0.15 }}
                  className="rounded border border-[#E6C280]/30 bg-[#5C1D24]/50 px-1.5 py-0.5 text-[10px] font-mono text-[#FADE9C]"
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </div>
        </Callout>
      </motion.div>
    </div>
  );
}
