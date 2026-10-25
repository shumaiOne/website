import { Cpu, Database, HardDrive, Server, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useTimeline } from '../../hooks/useTimeline';

const STORAGE = ['Local disk', 'AWS S3', 'Cloudflare R2', 'MinIO'];
const LOOP = 9000;

/** Number of transcode workers over the loop: scale out under load, back to zero when idle. */
function workersAt(t: number): number {
  if (t < 1200) return 0;
  if (t < 2200) return 1;
  if (t < 3200) return 2;
  if (t < 5600) return 4;
  if (t < 6800) return 2;
  if (t < 7800) return 1;
  return 0;
}

function queueAt(t: number): number {
  if (t < 1200) return 0.9;
  if (t < 5600) return Math.max(0.08, 0.9 - ((t - 1200) / 4400) * 0.82);
  return 0.04;
}

/** Animated self-hosting topology: app, Postgres, your storage, and elastic workers. */
export function InfraDiagram({ className = '' }: { className?: string }) {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(LOOP, { holdMs: 0 });
  const workers = workersAt(elapsed);
  const storage = STORAGE[Math.floor(elapsed / (LOOP / STORAGE.length)) % STORAGE.length];
  const queue = queueAt(elapsed);

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[#E6C280]/20 bg-[#1A0609]/80 backdrop-blur p-4 sm:p-5 ${className}`}
      role="img"
      aria-label="Diagram: the Shumai app and PostgreSQL run on your server, media lives on your local disk or S3-compatible storage, and transcode workers scale out under load and back to zero when idle."
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E6C280]/80">
          Your infrastructure
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300/90">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          100% on your hardware
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 items-stretch" aria-hidden="true">
        <Node icon={<Server className="w-4 h-4" />} title="Shumai" sub="app + API" />
        <Node icon={<Database className="w-4 h-4" />} title="PostgreSQL" sub="pgvector + DBOS" />
        <div className="rounded-lg border border-[#E6C280]/25 bg-black/30 p-2.5 flex flex-col items-center text-center">
          <HardDrive className="w-4 h-4 text-[#E6C280] mb-1" />
          <span className="text-[11px] font-bold text-white">Storage</span>
          <span className="relative h-4 w-full overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={storage}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 text-[10px] text-[#E6C280]/90 font-mono"
              >
                {storage}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>

      <div className="relative my-3 h-6" aria-hidden="true">
        <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-gradient-to-r from-[#E6C280]/0 via-[#E6C280]/40 to-[#E6C280]/0" />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute top-1/2 -mt-[3px] w-1.5 h-1.5 rounded-full bg-[#FADE9C] shadow-[0_0_8px_#FADE9C] animate-[flow_2.4s_linear_infinite]"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-black/30 p-3" aria-hidden="true">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-white">
            <Cpu className="w-3.5 h-3.5 text-[#E6C280]" /> Transcode workers
          </span>
          <span className="text-[10px] font-mono text-gray-400">
            {workers === 0 ? 'scaled to zero' : `${workers} running`}
          </span>
        </div>
        <div className="flex gap-1.5 h-7 items-center">
          <AnimatePresence initial={false}>
            {Array.from({ length: workers }, (_, i) => (
              <motion.span
                key={`w${i}`}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                className="flex items-center gap-1 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] font-mono text-emerald-200"
              >
                <Zap className="w-3 h-3" />
                worker-{i + 1}
              </motion.span>
            ))}
          </AnimatePresence>
          {workers === 0 && (
            <span className="text-[10px] font-mono text-gray-500">idle, no compute cost</span>
          )}
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500 w-14">queue</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#E6C280] to-[#C59B27] transition-[width] duration-300"
              style={{ width: `${Math.round(queue * 100)}%` }}
            />
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {['NVENC', 'QuickSync', 'VA-API', 'RKMPP'].map((gpu) => (
            <span
              key={gpu}
              className="rounded border border-[#E6C280]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#E6C280]/80"
            >
              {gpu}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Node({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="rounded-lg border border-[#E6C280]/25 bg-black/30 p-2.5 flex flex-col items-center text-center">
      <span className="text-[#E6C280] mb-1">{icon}</span>
      <span className="text-[11px] font-bold text-white">{title}</span>
      <span className="text-[10px] text-gray-400 font-mono">{sub}</span>
    </div>
  );
}
