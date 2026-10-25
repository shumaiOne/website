import { Github, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DOCS_URL, GITHUB_URL } from '../content/site';
import type { RouteKey } from '../types';
import { ShumaiLogo } from './ShumaiLogo';

interface NavItem {
  label: string;
  href: string;
  key?: RouteKey;
  external?: boolean;
}

const NAV: NavItem[] = [
  { label: 'Features', href: '/#features' },
  { label: 'Self-hosting', href: '/self-hosted', key: 'self-hosted' },
  { label: 'AI Agent', href: '/features/ai-agent', key: 'ai-agent' },
  { label: 'vs Frame.io', href: '/frame-io-alternative', key: 'frame-io-alternative' },
  { label: 'Docs', href: DOCS_URL, external: true },
];

export function SiteHeader({ current }: { current: RouteKey }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1A0609]/95 border-b border-[#E6C280]/15 backdrop-blur-md py-3.5 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        <a href="/" aria-label="Shumai Homepage" className="flex items-center gap-3 group/logo">
          <ShumaiLogo className="w-8 h-8 shadow-md group-hover/logo:scale-105 transition-transform" />
          <div className="relative group h-[28.8px] flex items-center">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#E6C280]" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#E6C280]" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#E6C280]" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#E6C280]" />
            <span className="px-3 block text-sm font-serif font-bold text-white tracking-widest uppercase truncate max-w-[124px]">
              shumai
            </span>
          </div>
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-current={item.key === current ? 'page' : undefined}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded transition-colors ${
                item.key === current ? 'text-[#E6C280]' : 'text-gray-300 hover:text-[#E6C280]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Shumai open-source repository on GitHub"
            className="px-4 py-1.5 text-xs font-bold text-[#5C1D24] bg-gradient-to-r from-[#E6C280] to-[#C59B27] rounded shadow hover:brightness-110 active:scale-95 transition-all text-center tracking-wide flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View on GitHub</span>
          </a>
          <button
            type="button"
            className="md:hidden p-1.5 rounded text-[#E6C280] hover:bg-[#E6C280]/10 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="md:hidden border-t border-[#E6C280]/10 mt-3 px-4 pt-2 pb-1"
      >
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="block py-2 text-sm font-semibold text-gray-200 hover:text-[#E6C280]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
