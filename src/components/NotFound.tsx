import { ArrowLeft } from 'lucide-react';
import type React from 'react';
import { ShumaiLogo } from './ShumaiLogo';

export const NotFound: React.FC = () => {
  return (
    <div className="chinese-lattice min-h-screen w-full flex flex-col items-center justify-center text-gray-100 font-sans selection:bg-[#E6C280] selection:text-[#5C1D24] relative px-4 text-center">
      {/* Soft Ambient Light Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#8B1C26]/20 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#E6C280]/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        <ShumaiLogo className="w-16 h-16 shadow-xl mb-6" />

        <div className="relative px-6 py-1.5 rounded-xs select-none mb-6">
          <svg
            className="absolute -top-2 -left-2 w-5 h-5 text-[#E6C280]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M2.5 12V2.5H12" />
            <path d="M6.4 2.5V6.4H2.5" />
          </svg>
          <svg
            className="absolute -top-2 -right-2 w-5 h-5 text-[#E6C280] transform rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M2.5 12V2.5H12" />
            <path d="M6.4 2.5V6.4H2.5" />
          </svg>
          <svg
            className="absolute -bottom-2 -left-2 w-5 h-5 text-[#E6C280] transform -rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M2.5 12V2.5H12" />
            <path d="M6.4 2.5V6.4H2.5" />
          </svg>
          <svg
            className="absolute -bottom-2 -right-2 w-5 h-5 text-[#E6C280] transform rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M2.5 12V2.5H12" />
            <path d="M6.4 2.5V6.4H2.5" />
          </svg>

          <span className="font-serif text-3xl font-black text-[#E6C280] tracking-[0.2em] uppercase gold-glow">
            404
          </span>
        </div>

        <h1 className="text-xl md:text-2xl font-serif font-black tracking-normal text-white mb-3 font-display">
          Page Not Found
        </h1>

        <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6 font-sans max-w-sm">
          The page you are looking for does not exist, has been removed, or is temporarily
          unavailable.
        </p>

        <a
          href="/"
          className="px-5 py-2 text-xs font-bold text-[#5C1D24] bg-gradient-to-r from-[#E6C280] to-[#C59B27] rounded shadow hover:brightness-110 active:scale-95 transition-all text-center tracking-wide flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </a>
      </div>
    </div>
  );
};
