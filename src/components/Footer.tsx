import { FEATURE_NAV, ROUTE_BY_KEY } from '../content/routes';
import {
  DEMO_URL,
  DISCORD_URL,
  DOCKER_HUB_URL,
  DOCS_URL,
  GITHUB_URL,
  RELEASES_URL,
} from '../content/site';
import { ShumaiLogo } from './ShumaiLogo';

const linkClass = 'text-gray-400 hover:text-[#E6C280] transition-colors';

export default function Footer() {
  return (
    <footer className="relative bg-[#1A0609]/95 border-t border-[#E6C280]/10 overflow-hidden px-4">
      {/* Decorative Traditional Grid Lattice overlay in the footer background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lattice" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M0 20 L40 20 M20 0 L20 40 M0 0 L40 40 M40 0 L0 40"
                stroke="#E6C280"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lattice)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        <div className="col-span-2 md:col-span-1">
          <a href="/" className="flex items-center gap-2.5 mb-3" aria-label="Shumai Homepage">
            <ShumaiLogo className="w-7 h-7" />
            <span className="font-serif font-bold tracking-widest uppercase text-white text-sm">
              shumai
            </span>
          </a>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            The open-source, self-hosted Frame.io alternative for creative teams.
          </p>
        </div>

        <nav aria-label="Features">
          <h2 className="font-mono uppercase tracking-[0.2em] text-[10px] text-[#E6C280] mb-3">
            Features
          </h2>
          <ul className="space-y-2">
            {FEATURE_NAV.map((key) => (
              <li key={key}>
                <a href={ROUTE_BY_KEY[key].path} className={linkClass}>
                  {ROUTE_BY_KEY[key].label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Why Shumai">
          <h2 className="font-mono uppercase tracking-[0.2em] text-[10px] text-[#E6C280] mb-3">
            Why Shumai
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={ROUTE_BY_KEY['self-hosted'].path} className={linkClass}>
                Self-hosting
              </a>
            </li>
            <li>
              <a href={ROUTE_BY_KEY['frame-io-alternative'].path} className={linkClass}>
                Frame.io alternative
              </a>
            </li>
            <li>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Live demo
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Resources">
          <h2 className="font-mono uppercase tracking-[0.2em] text-[10px] text-[#E6C280] mb-3">
            Resources
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Documentation
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </li>
            <li>
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Releases
              </a>
            </li>
            <li>
              <a
                href={DOCKER_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Docker Hub
              </a>
            </li>
            <li>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Discord
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 border-t border-[#E6C280]/10 py-4">
        <p className="text-xs text-gray-400 font-mono tracking-wide text-center sm:text-left">
          © {new Date().getFullYear()} shumai.one — Open-source creative workspace made by{' '}
          <a
            href="https://github.com/Yiling-J"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Yiling-J on GitHub"
            className="text-[#E6C280] hover:text-white underline decoration-[#E6C280]/30 transition-all font-bold"
          >
            Yiling-J
          </a>
        </p>
      </div>
    </footer>
  );
}
