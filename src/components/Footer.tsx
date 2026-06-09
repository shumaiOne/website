export default function Footer() {
  return (
    <footer className="relative bg-[#1A0609]/95 border-t border-[#E6C280]/10 py-4 overflow-hidden px-4">
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

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-xs text-gray-400 font-mono tracking-wide">
          © {new Date().getFullYear()} shumai.io — Made by{' '}
          <a
            href="https://github.com/Yiling-J"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E6C280] hover:text-white underline decoration-[#E6C280]/30 transition-all font-bold"
          >
            Yiling-J
          </a>
        </p>
      </div>
    </footer>
  );
}
