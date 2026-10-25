import { COMPOSE_FULL_URL } from '../../content/site';
import { segment, useTimeline } from '../../hooks/useTimeline';

type Line =
  | { kind: 'cmd'; text: string; start: number; duration: number }
  | { kind: 'out'; text: string; start: number; tone?: 'ok' | 'muted' | 'gold' };

const CMD_1 = `curl -o docker-compose.yaml ${COMPOSE_FULL_URL}`;
const CMD_2 = 'docker compose up -d';

const LINES: Line[] = [
  { kind: 'cmd', text: CMD_1, start: 300, duration: 1800 },
  { kind: 'out', text: '  % Total    % Received   100  3.1k', start: 2300, tone: 'muted' },
  { kind: 'cmd', text: CMD_2, start: 2900, duration: 700 },
  { kind: 'out', text: '✔ Container shumai_postgres    Started', start: 4000, tone: 'ok' },
  { kind: 'out', text: '✔ Container shumai_embedding   Started', start: 4400, tone: 'ok' },
  { kind: 'out', text: '✔ Container shumai_turntable   Started', start: 4800, tone: 'ok' },
  { kind: 'out', text: '✔ Container shumai_gotenberg   Started', start: 5200, tone: 'ok' },
  { kind: 'out', text: '✔ Container shumai_app         Started', start: 5600, tone: 'ok' },
  { kind: 'out', text: '→ Shumai is running at http://localhost:3000', start: 6300, tone: 'gold' },
];

const TOTAL = 6600;

const TONE_CLASS = {
  ok: 'text-emerald-300',
  muted: 'text-gray-500',
  gold: 'text-[#E6C280] font-bold',
} as const;

/** An animated terminal that "runs" the one-command Docker Compose install. */
export function TerminalDemo({ className = '' }: { className?: string }) {
  const { ref, elapsed } = useTimeline<HTMLDivElement>(TOTAL, { holdMs: 4000 });
  const activeCmd = [...LINES].reverse().find((l) => l.kind === 'cmd' && elapsed >= l.start);

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[#E6C280]/20 bg-[#0d0304]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-[#1A0609]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 text-[11px] font-mono text-gray-500">you@your-server: ~/shumai</span>
      </div>
      <div
        className="p-4 font-mono text-[11px] sm:text-xs leading-relaxed min-h-[260px] sm:min-h-[248px]"
        role="img"
        aria-label={`Terminal running: ${CMD_1} and then ${CMD_2}. All Shumai containers start and Shumai runs at http://localhost:3000.`}
      >
        {LINES.map((line) => {
          if (elapsed < line.start) return null;
          if (line.kind === 'cmd') {
            const p = segment(elapsed, line.start, line.duration);
            const shown = line.text.slice(0, Math.ceil(line.text.length * p));
            const typing = p < 1 && activeCmd === line;
            return (
              <div key={line.text} className="break-all text-gray-100" aria-hidden="true">
                <span className="text-[#E6C280] select-none">$ </span>
                {shown}
                {typing && (
                  <span className="inline-block w-1.5 h-3.5 align-middle bg-gray-200 animate-pulse" />
                )}
              </div>
            );
          }
          return (
            <div key={line.text} className={TONE_CLASS[line.tone ?? 'muted']} aria-hidden="true">
              {line.text}
            </div>
          );
        })}
        {elapsed >= TOTAL && (
          <div className="text-gray-100" aria-hidden="true">
            <span className="text-[#E6C280]">$ </span>
            <span className="inline-block w-1.5 h-3.5 align-middle bg-gray-200 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
