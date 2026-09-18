import {
  BookOpen,
  ExternalLink,
  FolderKanban,
  Github,
  MessageSquare,
  Play,
  Sparkles,
  Upload,
} from 'lucide-react';
import { motion } from 'motion/react';
import type React from 'react';
import Footer from './components/Footer';
import InteractiveShowcase from './components/InteractiveShowcase';
import { ShumaiLogo } from './components/ShumaiLogo';

export default function App() {
  // Scroll to workspace demo helper
  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('features-page');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="chinese-lattice h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth text-gray-100 font-sans selection:bg-[#E6C280] selection:text-[#5C1D24] relative">
      {/* Background Soft Ambient Light Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B1C26]/20 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-[800px] right-10 w-[600px] h-[600px] bg-[#E6C280]/5 rounded-full blur-[150px] pointer-events-none select-none" />

      {/* FIXED NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1A0609]/95 border-b border-[#E6C280]/15 backdrop-blur-md py-3.5 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo block with link */}
          <a href="/" aria-label="Shumai Homepage" className="flex items-center gap-3 group/logo">
            {/* Custom vector logo */}
            <ShumaiLogo className="w-8 h-8 shadow-md group-hover/logo:scale-105 transition-transform" />

            {/* App name with elegant Chinese Border styling (corners only) */}
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

          {/* Action trigger button */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/shumaiOne/shumai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Shumai open-source repository on GitHub"
              className="px-4 py-1.5 text-xs font-bold text-[#5C1D24] bg-gradient-to-r from-[#E6C280] to-[#C59B27] rounded shadow hover:brightness-110 active:scale-95 transition-all text-center tracking-wide flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Page 1) */}
      <section className="h-full w-full shrink-0 snap-start flex flex-col justify-between pt-24 pb-6 px-4 max-w-5xl mx-auto relative z-10">
        {/* Main Content Area: Centered layout */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center py-2 md:py-4">
          {/* Animated badge for app identity with yellow border */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 relative"
          >
            {/* Double Yellow/Gold Ornate frame precisely matching the user request (traditional style) */}
            <div className="relative px-6 py-2 rounded-xs select-none">
              {/* SVG Ornate custom corner widgets in all 4 vertex coordinates */}
              <svg
                className="absolute -top-2.5 -left-2.5 w-6 h-6 text-[#E6C280]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M6.4 2.5V6.4H2.5" />
              </svg>
              <svg
                className="absolute -top-2.5 -right-2.5 w-6 h-6 text-[#E6C280] transform rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M6.4 2.5V6.4H2.5" />
              </svg>
              <svg
                className="absolute -bottom-2.5 -left-2.5 w-6 h-6 text-[#E6C280] transform -rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M6.4 2.5V6.4H2.5" />
              </svg>
              <svg
                className="absolute -bottom-2.5 -right-2.5 w-6 h-6 text-[#E6C280] transform rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M6.4 2.5V6.4H2.5" />
              </svg>

              <div className="flex items-center gap-3">
                {/* App Category tag */}
                <span className="font-serif text-lg md:text-xl font-black text-[#E6C280] tracking-[0.25em] uppercase gold-glow">
                  shumai
                </span>
                <span className="text-[10px] bg-red-950/80 text-[#E6C280] font-sans px-2 py-0.5 border border-[#E6C280]/40 rounded font-semibold uppercase tracking-wider">
                  烧卖
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero title */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-black tracking-normal text-white leading-[1.3] md:leading-[1.4] max-w-3xl mb-6 font-display"
          >
            The open-source Frame.io alternative for all your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C280] via-[#FADE9C] to-[#E6C280] underline decoration-[#E6C280]/30 underline-offset-8">
              creative work.
            </span>
          </motion.h1>

          {/* Core positioning description */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed mb-6 font-sans"
          >
            Shumai is an open-source, self-hosted Frame.io alternative for creative teams. Manage
            assets, review media with frame-accurate feedback, and collaborate in one unified
            workspace.
          </motion.p>

          {/* REQUIRED TRIPLE ACTION BUTTON GROUP WITH SLASH-DIVIDED DESIGN */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-row items-center justify-center font-mono text-xs sm:text-sm uppercase tracking-widest text-[#E6C280] mb-2 select-none"
          >
            <a
              href="https://staging.shumai.one"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Try Shumai live demo"
              className="hover:text-white transition-all px-2.5 sm:px-3.5 flex items-center gap-1.5 cursor-pointer font-bold active:scale-95"
            >
              <Play className="w-3.5 h-3.5 stroke-current" />
              <span>Demo</span>
            </a>

            <span className="text-[#E6C280]/30 mx-1.5 sm:mx-2.5 font-normal select-none text-xs sm:text-sm">
              /
            </span>

            <a
              href="https://docs.shumai.one"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read Shumai documentation"
              className="hover:text-white transition-all px-2.5 sm:px-3.5 flex items-center gap-1.5 cursor-pointer font-bold active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs</span>
            </a>

            <span className="text-[#E6C280]/30 mx-1.5 sm:mx-2.5 font-normal select-none text-xs sm:text-sm">
              /
            </span>

            <a
              href="https://github.com/shumaiOne/shumai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Shumai open source repository on GitHub"
              className="hover:text-white transition-all px-2.5 sm:px-3.5 flex items-center gap-1.5 cursor-pointer font-bold active:scale-95"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Footer Area: Visual indicators for "Design Sense" detail */}
        <h2 className="sr-only">Key Creative Capabilities</h2>
        <div
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#E6C280]/15 pt-4 pb-0 mb-0"
          id="features-preview"
        >
          <button
            type="button"
            className="flex flex-col items-center p-1 text-center group"
            onClick={scrollToDemo}
          >
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all cursor-pointer">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Upload files</h3>
            <p className="text-[9px] text-gray-400">
              High-fidelity videography and creative templates
            </p>
          </button>

          <button
            type="button"
            className="flex flex-col items-center p-1 text-center group"
            onClick={scrollToDemo}
          >
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all cursor-pointer">
              <FolderKanban className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Manage projects</h3>
            <p className="text-[9px] text-gray-400">Unified repositories and asset organization</p>
          </button>

          <button
            type="button"
            className="flex flex-col items-center p-1 text-center group"
            onClick={scrollToDemo}
          >
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all cursor-pointer">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Agent Co-Production</h3>
            <p className="text-[9px] text-gray-400">
              Automated co-production guidance & layout audits
            </p>
          </button>

          <button
            type="button"
            className="flex flex-col items-center p-1 text-center group"
            onClick={scrollToDemo}
          >
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all cursor-pointer">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Precise feedback</h3>
            <p className="text-[9px] text-gray-400">
              Frame-accurate point coordinates pin annotation
            </p>
          </button>
        </div>
      </section>

      {/* WORKSPACE DEMO PREVIEW SECTION (Page 2) */}
      <div
        className="h-full w-full shrink-0 snap-start flex flex-col justify-between relative bg-black/20 border-t border-[#E6C280]/15 pt-20"
        id="features-page"
      >
        <section className="flex-1 flex flex-col justify-start py-2" id="demo-workspace">
          <div className="max-w-6xl mx-auto px-4 w-full">
            {/* Redesigned themed section header to match Hero badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative px-6 py-2 rounded-xs select-none">
                {/* SVG Ornate custom corner widgets in all 4 vertex coordinates */}
                <svg
                  className="absolute -top-2.5 -left-2.5 w-6 h-6 text-[#E6C280]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 12V2.5H12" />
                  <path d="M6.4 2.5V6.4H2.5" />
                </svg>
                <svg
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 text-[#E6C280] transform rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 12V2.5H12" />
                  <path d="M6.4 2.5V6.4H2.5" />
                </svg>
                <svg
                  className="absolute -bottom-2.5 -left-2.5 w-6 h-6 text-[#E6C280] transform -rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 12V2.5H12" />
                  <path d="M6.4 2.5V6.4H2.5" />
                </svg>
                <svg
                  className="absolute -bottom-2.5 -right-2.5 w-6 h-6 text-[#E6C280] transform rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.5 12V2.5H12" />
                  <path d="M6.4 2.5V6.4H2.5" />
                </svg>

                <h2 className="font-serif text-lg font-black text-[#E6C280] tracking-[0.25em] uppercase gold-glow">
                  shumai features
                </h2>
              </div>
            </div>
          </div>

          {/* Render interactive applet showcase simulator */}
          <InteractiveShowcase />
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
