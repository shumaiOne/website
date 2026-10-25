import { CalendarClock, Download, KeyRound, Link2, Stamp } from 'lucide-react';
import { motion } from 'motion/react';
import type React from 'react';
import { useTimeline } from '../../hooks/useTimeline';
import { ScreenFrame } from '../ScreenFrame';
import { Callout } from './Callout';

interface Setting {
  icon: React.ReactNode;
  label: string;
  detail: string;
  /** Whether the switch ends up on (downloads are switched off). */
  on: boolean;
}

const SETTINGS: Setting[] = [
  { icon: <KeyRound className="w-3.5 h-3.5" />, label: 'Password', detail: 'required', on: true },
  {
    icon: <CalendarClock className="w-3.5 h-3.5" />,
    label: 'Expires',
    detail: 'Nov 15, 6:00 PM',
    on: true,
  },
  { icon: <Download className="w-3.5 h-3.5" />, label: 'Downloads', detail: 'disabled', on: false },
  {
    icon: <Stamp className="w-3.5 h-3.5" />,
    label: 'Watermark',
    detail: 'burned into pixels',
    on: true,
  },
];

export function SharingShowcase() {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(3400, { holdMs: 5000 });

  return (
    <div ref={ref} className="relative">
      <ScreenFrame screen="public-share-file" />

      <div
        className="relative mt-3 sm:absolute sm:mt-0 sm:-bottom-10 sm:-left-6 sm:w-72"
        aria-hidden="true"
      >
        <Callout className="p-3.5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-white mb-2.5">
            <Link2 className="w-3.5 h-3.5 text-[#E6C280]" /> Client Review: Culinary Cut
          </div>
          <ul className="space-y-2">
            {SETTINGS.map((s, i) => {
              const applied = elapsed > 400 + i * 600;
              const isOn = applied ? s.on : !s.on;
              return (
                <li key={s.label} className="flex items-center gap-2 text-[11px]">
                  <span className="text-[#E6C280]">{s.icon}</span>
                  <span className="text-gray-200">{s.label}</span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: applied ? 1 : 0 }}
                    className="text-[10px] font-mono text-gray-400 truncate"
                  >
                    {s.detail}
                  </motion.span>
                  <span
                    className={`ml-auto relative w-7 h-4 rounded-full transition-colors duration-300 ${isOn ? 'bg-[#C2410C]' : 'bg-white/15'}`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 ${isOn ? 'left-[14px]' : 'left-0.5'}`}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </Callout>
      </div>
    </div>
  );
}
