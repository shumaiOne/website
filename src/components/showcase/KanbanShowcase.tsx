import { Activity } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTimeline } from '../../hooks/useTimeline';
import { ScreenFrame } from '../ScreenFrame';
import { Avatar, Callout } from './Callout';

const EVENTS = [
  {
    who: 'Maya Lin',
    tone: 'rose' as const,
    text: 'moved “Color grade hero skillet” to',
    tag: 'In Review',
    tagClass: 'text-violet-300 bg-violet-400/10',
  },
  {
    who: 'Sam Carter',
    tone: 'gold' as const,
    text: 'approved “Client review & share link sign-off”',
    tag: 'Done',
    tagClass: 'text-emerald-300 bg-emerald-400/10',
  },
  {
    who: 'Leo Martins',
    tone: 'sky' as const,
    text: 'flagged “License final music track”',
    tag: 'Blocked',
    tagClass: 'text-red-300 bg-red-400/10',
  },
  {
    who: 'Priya Nair',
    tone: 'emerald' as const,
    text: 'linked 2 assets to “Conform final edit”',
    tag: 'High',
    tagClass: 'text-orange-300 bg-orange-400/10',
  },
];

export function KanbanShowcase() {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(EVENTS.length * 1100, { holdMs: 4000 });
  const count = Math.min(EVENTS.length, Math.floor(elapsed / 1100) + 1);
  const shown = EVENTS.slice(0, count).reverse();

  return (
    <div ref={ref} className="relative">
      <ScreenFrame screen="kanban" />
      <div
        className="relative mt-3 sm:absolute sm:mt-0 sm:-bottom-10 sm:-right-6 sm:w-80"
        aria-hidden="true"
      >
        <Callout className="p-3.5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-white mb-2.5">
            <Activity className="w-3.5 h-3.5 text-[#E6C280]" /> Task activity
          </div>
          <ul className="space-y-2 min-h-[148px]">
            <AnimatePresence initial={false}>
              {shown.map((e) => (
                <motion.li
                  key={e.who}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2 text-[11px] leading-snug"
                >
                  <Avatar name={e.who} tone={e.tone} className="w-5 h-5 text-[9px] mt-0.5" />
                  <span className="text-gray-300">
                    <span className="font-bold text-white">{e.who}</span> {e.text}{' '}
                    <span
                      className={`inline-block whitespace-nowrap rounded px-1 py-px text-[10px] font-bold ${e.tagClass}`}
                    >
                      {e.tag}
                    </span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Callout>
      </div>
    </div>
  );
}
