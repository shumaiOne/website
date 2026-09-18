export default function Footer() {
  return (
    <footer className="relative bg-[#1A0609]/95 border-t border-[#E6C280]/10 py-3 overflow-hidden px-4">
      {/* Decorative Traditional Grid Lattice overlay in the footer background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
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

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-gray-400 font-mono tracking-wide">
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

        <nav
          aria-label="Footer Navigation"
          className="flex items-center gap-4 text-xs font-mono text-gray-400"
        >
          <a
            href="https://docs.shumai.one"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shumai Documentation"
            className="hover:text-[#E6C280] transition-colors"
          >
            Documentation
          </a>
          <span className="text-[#E6C280]/20 select-none">•</span>
          <a
            href="https://github.com/shumaiOne/shumai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shumai GitHub Repository"
            className="hover:text-[#E6C280] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
