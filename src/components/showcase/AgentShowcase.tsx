import { AtSign, Bot, MessagesSquare } from 'lucide-react';
import { motion } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { segment, useTimeline } from '../../hooks/useTimeline';
import type { ScreenName } from '../../types';
import { ScreenFrame } from '../ScreenFrame';
import { Avatar, Callout } from './Callout';

interface Mode {
  id: 'mention' | 'chat';
  label: string;
  icon: React.ReactNode;
  screen: ScreenName;
  prompt: string;
  author: string;
  reply: string;
}

const MODES: Mode[] = [
  {
    id: 'mention',
    label: '@mention in comments',
    icon: <AtSign className="w-3.5 h-3.5" />,
    screen: 'model',
    author: 'Alex Rivera',
    prompt: '@x1 How do the fur sculpt and silhouette read from this angle?',
    reply:
      'At 45° the far ear reads flat and triangular, with little rim thickness. Breaking up its straight outer ridge will make it feel less rigid as the turntable rotates.',
  },
  {
    id: 'chat',
    label: 'One-to-one chat',
    icon: <MessagesSquare className="w-3.5 h-3.5" />,
    screen: 'chat-session',
    author: 'Alex Rivera',
    prompt: 'Which of these three clips should open our 15s culinary spot?',
    reply:
      'Open on Steak_Skillet_Hero_Cut3.mp4. The high-flame sear hooks viewers in the first two seconds, then cut to the olive oil pour and finish on the plating.',
  },
];

const TOTAL = 5200;
const HOLD = 3500;

export function AgentShowcase() {
  const [modeIdx, setModeIdx] = useState(0);
  const [pinned, setPinned] = useState(false);
  const mode = MODES[modeIdx];
  const advance = useCallback(() => setModeIdx((i) => (i + 1) % MODES.length), []);

  return (
    <div>
      <fieldset className="flex flex-wrap gap-2 mb-4 min-w-0">
        <legend className="sr-only">Agent modes</legend>
        {MODES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={i === modeIdx}
            onClick={() => {
              setPinned(true);
              setModeIdx(i);
            }}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
              i === modeIdx
                ? 'border-[#E6C280] bg-[#E6C280] text-[#5C1D24]'
                : 'border-[#E6C280]/25 text-[#E6C280] hover:bg-[#E6C280]/10'
            }`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </fieldset>

      <div className="relative">
        {MODES.map((m, i) => (
          <div key={m.id} hidden={i !== modeIdx}>
            <ScreenFrame screen={m.screen} />
          </div>
        ))}
        <Transcript key={mode.id} mode={mode} onFinished={pinned ? undefined : advance} />
      </div>
    </div>
  );
}

function Transcript({ mode, onFinished }: { mode: Mode; onFinished?: () => void }) {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(TOTAL, { holdMs: HOLD });
  const finished = elapsed >= TOTAL;

  useEffect(() => {
    if (!finished || !onFinished) return;
    const t = window.setTimeout(onFinished, HOLD - 300);
    return () => window.clearTimeout(t);
  }, [finished, onFinished]);

  const promptShown = elapsed > 200;
  const thinking = elapsed > 900 && elapsed < 1900;
  const reply = mode.reply.slice(0, Math.ceil(mode.reply.length * segment(elapsed, 1900, 3000)));

  return (
    <div
      ref={ref}
      className="relative mt-3 sm:absolute sm:mt-0 sm:-bottom-12 sm:-left-6 sm:w-[22rem]"
      aria-hidden="true"
    >
      <Callout className="p-3.5 space-y-2.5">
        <motion.div
          initial={false}
          animate={{ opacity: promptShown ? 1 : 0, y: promptShown ? 0 : 6 }}
          className="flex items-start gap-2"
        >
          <Avatar name={mode.author} tone="sky" className="w-5 h-5 text-[9px] mt-0.5" />
          <p className="text-[11px] leading-snug text-gray-200">
            {mode.prompt.startsWith('@x1') ? (
              <>
                <span className="text-orange-400">@x1</span>
                {mode.prompt.slice(3)}
              </>
            ) : (
              mode.prompt
            )}
          </p>
        </motion.div>
        <div className="flex items-start gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-400/90 text-violet-950 mt-0.5 shrink-0">
            <Bot className="w-3 h-3" />
          </span>
          <div className="min-h-[60px] flex-1">
            <span className="text-[11px] font-bold text-white mr-1.5">x1</span>
            {thinking && (
              <span className="inline-flex gap-1 align-middle">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1 h-1 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </span>
            )}
            <p className="text-[11px] leading-snug text-gray-300">{reply}</p>
          </div>
        </div>
      </Callout>
    </div>
  );
}
