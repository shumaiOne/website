import { Cpu, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { segment, useTimeline } from '../../hooks/useTimeline';
import { ScreenFrame } from '../ScreenFrame';
import { Callout } from './Callout';

const QUERY = 'chef plating food with fresh herbs';

export function SearchShowcase() {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(3600, { holdMs: 5000 });
  const typed = QUERY.slice(0, Math.ceil(QUERY.length * segment(elapsed, 200, 1700)));
  const done = elapsed > 2100;

  return (
    <div ref={ref} className="relative">
      <ScreenFrame screen="semantic">
        {/* Highlight the matched time range on a video result */}
        <motion.span
          className="absolute rounded border-2 border-[#FADE9C] shadow-[0_0_16px_rgba(250,222,156,0.6)]"
          style={{ left: '43.3%', top: '65.1%', width: '5.8%', height: '2.8%' }}
          initial={false}
          animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 1.3 }}
          transition={{ duration: 0.35, delay: 0.5 }}
        />
      </ScreenFrame>

      <div
        className="relative mt-3 sm:absolute sm:mt-0 sm:-top-6 sm:-right-6 sm:w-80"
        aria-hidden="true"
      >
        <Callout className="p-3.5">
          <div className="flex items-center gap-2 rounded-lg border border-[#E6C280]/30 bg-black/40 px-2.5 py-2">
            <Search className="w-3.5 h-3.5 text-[#E6C280] shrink-0" />
            <span className="text-[12px] text-gray-100 truncate">
              {typed}
              {!done && (
                <span className="inline-block w-px h-3.5 align-middle bg-gray-200 ml-px animate-pulse" />
              )}
            </span>
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
            transition={{ duration: 0.35 }}
            className="mt-2.5 space-y-1.5"
          >
            <div className="flex items-center gap-1.5 text-[11px] text-[#FADE9C] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Ranked by meaning, not file names
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <Cpu className="w-3 h-3" /> EmbeddingGemma on your own server
            </div>
          </motion.div>
        </Callout>
      </div>
    </div>
  );
}
