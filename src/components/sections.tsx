import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Copy,
  Cpu,
  Film,
  Gauge,
  Github,
  Languages,
  Layers,
  Plug,
  Radio,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import type { ComparisonRow, MoreFeature } from '../content/home';
import { ROUTE_BY_KEY } from '../content/routes';
import { docsLink, GITHUB_URL, INSTALL_COMMAND, INSTALL_STEPS } from '../content/site';
import type { FaqItem, RouteKey } from '../types';
import { OrnateFrame } from './OrnateFrame';

/* ------------------------------------------------------------------ */
/* Headings                                                            */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#E6C280]">
      <span className="w-6 h-px bg-[#E6C280]/60" aria-hidden="true" />
      {children}
    </span>
  );
}

export function CenteredHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center mb-10 md:mb-14">
      <OrnateFrame size="sm" className="mb-5">
        <span className="font-serif text-xs font-black text-[#E6C280] tracking-[0.25em] uppercase gold-glow">
          {eyebrow}
        </span>
      </OrnateFrame>
      <h2
        id={id}
        className="font-serif font-black text-2xl md:text-4xl text-white leading-tight max-w-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature section: copy column + animated showcase                    */
/* ------------------------------------------------------------------ */

interface FeatureSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  link?: { href: string; label: string };
  visual: React.ReactNode;
  reverse?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function FeatureSection({
  id,
  eyebrow,
  title,
  description,
  bullets,
  link,
  visual,
  reverse = false,
  headingLevel = 'h2',
}: FeatureSectionProps) {
  const Heading = headingLevel;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative py-14 md:py-20 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading
            id={`${id}-title`}
            className="mt-4 font-serif font-black text-2xl md:text-[2.15rem] leading-tight text-white"
          >
            {title}
          </Heading>
          <p className="mt-4 text-sm md:text-[15px] text-gray-300 leading-relaxed">{description}</p>
          <ul className="mt-6 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm text-gray-200">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#E6C280]" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {link && (
            <a
              href={link.href}
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-[#E6C280] hover:text-white transition-colors"
            >
              {link.label}
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
        <div className={`relative lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
          <div
            className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(230,194,128,0.10),transparent_65%)] pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative">{visual}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Everything else grid                                                */
/* ------------------------------------------------------------------ */

const MORE_ICONS: Record<MoreFeature['icon'], React.ReactNode> = {
  layers: <Layers className="w-4 h-4" />,
  shield: <ShieldCheck className="w-4 h-4" />,
  film: <Film className="w-4 h-4" />,
  plug: <Plug className="w-4 h-4" />,
  terminal: <Terminal className="w-4 h-4" />,
  bell: <Bell className="w-4 h-4" />,
  activity: <Activity className="w-4 h-4" />,
  gauge: <Gauge className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
  radio: <Radio className="w-4 h-4" />,
  languages: <Languages className="w-4 h-4" />,
  workflow: <Workflow className="w-4 h-4" />,
};

export function MoreFeaturesGrid({ items }: { items: MoreFeature[] }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {items.map((f) => (
        <li
          key={f.title}
          className="group rounded-xl border border-[#E6C280]/12 bg-[#1A0609]/60 p-4 transition-all duration-300 hover:border-[#E6C280]/40 hover:bg-[#2a0b10]/70 hover:-translate-y-0.5"
        >
          <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] mb-3 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-colors">
            {MORE_ICONS[f.icon]}
          </span>
          <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison table                                                    */
/* ------------------------------------------------------------------ */

export function ComparisonTable({ rows, caption }: { rows: ComparisonRow[]; caption: string }) {
  return (
    <>
      <p className="sm:hidden mb-2 text-[11px] font-mono text-gray-500" aria-hidden="true">
        Swipe the table sideways to see Frame.io →
      </p>
      <div className="overflow-x-auto rounded-xl border border-[#E6C280]/15 bg-[#1A0609]/70">
        <table className="w-full min-w-[620px] text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-[#E6C280]/15">
              <th
                scope="col"
                className="p-4 w-[28%] font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 font-normal"
              >
                Feature
              </th>
              <th scope="col" className="p-4 w-[36%] bg-[#5C1D24]/40">
                <span className="font-serif font-black text-[#E6C280] tracking-widest uppercase text-xs">
                  Shumai
                </span>
              </th>
              <th
                scope="col"
                className="p-4 w-[36%] font-semibold text-gray-300 text-xs uppercase tracking-widest"
              >
                Frame.io
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-white/5 last:border-b-0">
                <th scope="row" className="p-4 font-semibold text-gray-200 text-[13px]">
                  {r.label}
                </th>
                <td className="p-4 bg-[#5C1D24]/25 text-[13px] text-white">
                  <span className="flex gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${r.win ? 'text-[#E6C280]' : 'text-gray-500'}`}
                      aria-hidden="true"
                    />
                    {r.shumai}
                  </span>
                </td>
                <td className="p-4 text-[13px] text-gray-400">{r.frameio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-[#E6C280]/10 rounded-xl border border-[#E6C280]/15 bg-[#1A0609]/60">
      {items.map((f) => (
        <details key={f.question} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
            <h3 className="text-sm md:text-[15px] font-bold text-white">{f.question}</h3>
            <ChevronRight
              className="w-4 h-4 shrink-0 text-[#E6C280] transition-transform duration-300 group-open:rotate-90"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Install call to action                                              */
/* ------------------------------------------------------------------ */

export function InstallCta() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section aria-labelledby="install-title" className="relative py-20 md:py-28 px-4">
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 bg-[#8B1C26]/25 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <OrnateFrame size="sm" className="inline-block mb-5">
          <span className="font-serif text-xs font-black text-[#E6C280] tracking-[0.25em] uppercase gold-glow">
            Get started
          </span>
        </OrnateFrame>
        <h2
          id="install-title"
          className="font-serif font-black text-3xl md:text-5xl text-white leading-tight"
        >
          Your review studio, running in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C280] via-[#FADE9C] to-[#E6C280]">
            one command.
          </span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-300">
          Free and open source. Run it on a spare machine today and invite your whole team.
        </p>

        <div className="mt-8 flex items-stretch rounded-xl border border-[#E6C280]/25 bg-black/50 text-left overflow-hidden">
          <pre className="flex-1 p-4 text-[11px] sm:text-xs font-mono text-gray-200 whitespace-pre-wrap break-all leading-relaxed">
            <code>
              {INSTALL_STEPS.map((step) => (
                <span key={step} className="block">
                  <span className="text-[#E6C280] select-none">$ </span>
                  {step}
                </span>
              ))}
            </code>
          </pre>
          <button
            type="button"
            onClick={copy}
            className="shrink-0 px-4 border-l border-[#E6C280]/20 text-[#E6C280] hover:bg-[#E6C280]/10 transition-colors cursor-pointer"
            aria-label="Copy install command"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="mt-2 text-[11px] text-gray-500 font-mono" aria-live="polite">
          {copied
            ? 'Copied to clipboard'
            : 'Full stack with semantic search, 3D, and document previews. Suggested 8 GB RAM.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={docsLink('getting-started/quickstart')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-bold text-[#5C1D24] bg-gradient-to-r from-[#E6C280] to-[#C59B27] rounded shadow hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Read the quickstart
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-bold text-[#E6C280] border border-[#E6C280]/40 rounded hover:bg-[#E6C280]/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs & related pages                                         */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ current }: { current: RouteKey }) {
  const route = ROUTE_BY_KEY[current];
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] font-mono text-gray-400">
      <ol className="flex items-center gap-1.5">
        <li>
          <a href="/" className="hover:text-[#E6C280] transition-colors">
            Home
          </a>
        </li>
        {route.path.startsWith('/features/') && (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/#features" className="hover:text-[#E6C280] transition-colors">
                Features
              </a>
            </li>
          </>
        )}
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-[#E6C280]">
          {route.label}
        </li>
      </ol>
    </nav>
  );
}

export function RelatedLinks({ keys }: { keys: RouteKey[] }) {
  return (
    <ul className="grid sm:grid-cols-3 gap-3">
      {keys.map((key) => {
        const r = ROUTE_BY_KEY[key];
        return (
          <li key={key}>
            <a
              href={r.path}
              className="group flex h-full flex-col rounded-xl border border-[#E6C280]/15 bg-[#1A0609]/60 p-4 transition-all duration-300 hover:border-[#E6C280]/45 hover:-translate-y-0.5"
            >
              <span className="text-sm font-bold text-white group-hover:text-[#E6C280] transition-colors flex items-center gap-1.5">
                {r.label}
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1.5 text-xs text-gray-400 leading-relaxed">{r.description}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
