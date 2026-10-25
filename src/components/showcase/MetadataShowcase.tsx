import { BookmarkCheck, Filter, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useTimeline } from '../../hooks/useTimeline';
import { ScreenFrame } from '../ScreenFrame';
import { Callout } from './Callout';

const ROWS_Y = [12.7, 17.9, 23.1];

const CONDITIONS = [
  { field: 'Status', op: 'is', value: 'Approved', tone: 'text-emerald-300 bg-emerald-400/10' },
  { field: 'Shot Type', op: 'is', value: 'Hero', tone: 'text-orange-300 bg-orange-400/10' },
  { field: 'Rating', op: '≥', value: '★★★★', tone: 'text-yellow-300 bg-yellow-400/10' },
];

export function MetadataShowcase() {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(4200, { holdMs: 4500 });
  const activeRow = Math.min(2, Math.floor(elapsed / 900));

  return (
    <div ref={ref} className="relative">
      <ScreenFrame screen="filter">
        {elapsed < 2900 && (
          <motion.span
            className="absolute rounded-md border-2 border-[#E6C280] bg-[#E6C280]/10"
            style={{ left: '38.6%', width: '31.4%', height: '4.4%' }}
            initial={false}
            animate={{ top: `${ROWS_Y[activeRow] - 2.2}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          />
        )}
      </ScreenFrame>

      <div
        className="relative mt-3 sm:absolute sm:mt-0 sm:-bottom-10 sm:-right-6 sm:w-80"
        aria-hidden="true"
      >
        <Callout className="p-3.5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-white mb-2.5">
            <Filter className="w-3.5 h-3.5 text-[#E6C280]" /> Filter by any field
          </div>
          <div className="space-y-1.5">
            {CONDITIONS.map((c, i) => (
              <motion.div
                key={c.field}
                initial={false}
                animate={{ opacity: elapsed > i * 900 ? 1 : 0, x: elapsed > i * 900 ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 text-[11px]"
              >
                {i > 0 && <span className="text-[9px] font-mono text-gray-500 w-7">AND</span>}
                {i === 0 && <span className="w-7 text-[9px] font-mono text-gray-500">WHERE</span>}
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-gray-200">{c.field}</span>
                <span className="text-gray-400">{c.op}</span>
                <span className={`rounded px-1.5 py-0.5 font-bold ${c.tone}`}>
                  {c.field === 'Rating' ? (
                    <Star className="inline w-3 h-3 -mt-0.5 fill-current" />
                  ) : null}
                  {c.field === 'Rating' ? ' 4+' : c.value}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: elapsed > 3000 ? 1 : 0, y: elapsed > 3000 ? 0 : 6 }}
            transition={{ duration: 0.35 }}
            className="mt-3 flex items-center justify-between rounded-md border border-[#E6C280]/25 bg-[#5C1D24]/40 px-2.5 py-1.5"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#FADE9C]">
              <BookmarkCheck className="w-3.5 h-3.5" /> Saved as “Approved hero shots”
            </span>
            <span className="text-[10px] font-mono text-gray-300">15 assets</span>
          </motion.div>
        </Callout>
      </div>
    </div>
  );
}
