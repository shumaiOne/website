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
    const element = document.getElementById('demo-workspace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="chinese-lattice min-h-screen text-gray-100 font-sans selection:bg-[#E6C280] selection:text-[#5C1D24] relative overflow-x-hidden">
      {/* Background Soft Ambient Light Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B1C26]/20 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-[800px] right-10 w-[600px] h-[600px] bg-[#E6C280]/5 rounded-full blur-[150px] pointer-events-none select-none" />

      {/* FIXED NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1A0609]/95 border-b border-[#E6C280]/15 backdrop-blur-md py-3.5 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo block */}
          <div className="flex items-center gap-3">
            {/* Custom vector logo */}
            <ShumaiLogo className="w-8 h-8 shadow-md" />

            {/* App name with elegant Chinese Border styling (corners only) */}
            <div className="relative group">
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#E6C280] rounded-xs" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[#E6C280] rounded-xs" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[#E6C280] rounded-xs" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#E6C280] rounded-xs" />

              <span className="px-3 py-1 block text-sm font-serif font-bold text-white tracking-widest uppercase truncate max-w-[124px]">
                shumai
              </span>
            </div>
          </div>

          {/* Center text tag */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-gray-300">
            <a href="#features-preview" className="hover:text-[#E6C280] transition-colors">
              Workspace Capabilities
            </a>
            <span>•</span>
            <a
              href="#demo-workspace"
              onClick={scrollToDemo}
              className="hover:text-[#E6C280] transition-colors"
            >
              Interactive Demo
            </a>
            <span>•</span>
            <a
              href="https://github.com/shumaiOne/shumai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E6C280] transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action trigger button */}
          <div className="flex items-center gap-3">
            <a
              href="#demo-workspace"
              onClick={scrollToDemo}
              className="px-4 py-1.5 text-xs font-bold text-[#5C1D24] bg-gradient-to-r from-[#E6C280] to-[#C59B27] rounded shadow hover:brightness-110 active:scale-95 transition-all text-center tracking-wide"
            >
              Launch Demo
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="min-h-screen lg:h-screen flex flex-col justify-between pt-24 pb-6 px-4 max-w-5xl mx-auto relative z-10">
        {/* Main Content Area: Centered layout */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center py-2 md:py-4">
          {/* Animated badge for app identity with yellow border */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 relative"
          >
            {/* Double Yellow/Gold Ornate frame precisely matching the user request (traditional style) */}
            <div className="relative bg-[#51161C]/80 px-6 py-2 rounded-xs select-none">
              {/* SVG Ornate custom corner widgets in all 4 vertex coordinates */}
              <svg
                className="absolute -top-2.5 -left-2.5 w-6 h-6 text-[#E6C280]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M5.5 2.5V5.5H2.5" />
              </svg>
              <svg
                className="absolute -top-2.5 -right-2.5 w-6 h-6 text-[#E6C280] transform rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M5.5 2.5V5.5H2.5" />
              </svg>
              <svg
                className="absolute -bottom-2.5 -left-2.5 w-6 h-6 text-[#E6C280] transform -rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M5.5 2.5V5.5H2.5" />
              </svg>
              <svg
                className="absolute -bottom-2.5 -right-2.5 w-6 h-6 text-[#E6C280] transform rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 12V2.5H12" />
                <path d="M5.5 2.5V5.5H2.5" />
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

          {/* Hero title from request */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-black tracking-normal text-white leading-[1.3] md:leading-[1.4] max-w-3xl mb-6 font-display"
          >
            One platform for all your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C280] via-[#FADE9C] to-[#E6C280] underline decoration-[#E6C280]/30 underline-offset-8">
              creative work.
            </span>
          </motion.h1>

          {/* Description from request */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed mb-6 font-sans"
          >
            Upload creative files, manage projects, collaborate with our layout Agent, and get
            precise coordinate feedback — all in one unified Eastern symmetry-inspired workspace.
          </motion.p>

          {/* REQUIRED TRIPLE ACTION BUTTON GROUP WITH SLASH-DIVIDED DESIGN */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-row items-center justify-center font-mono text-xs sm:text-sm uppercase tracking-widest text-[#E6C280] mb-2 select-none"
          >
            <a
              href="https://staging.shumai.one"
              target="_blank"
              rel="noopener noreferrer"
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
              className="hover:text-white transition-all px-2.5 sm:px-3.5 flex items-center gap-1.5 cursor-pointer font-bold active:scale-95"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Footer Area: Visual indicators for "Design Sense" detail */}
        <div
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#E6C280]/15 pt-4 pb-0 mb-0"
          id="features-preview"
        >
          <div className="flex flex-col items-center p-1 text-center group">
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Upload files</h3>
            <p className="text-[9px] text-gray-400">
              High-fidelity videography and creative templates
            </p>
          </div>

          <div className="flex flex-col items-center p-1 text-center group">
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all">
              <FolderKanban className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Manage projects</h3>
            <p className="text-[9px] text-gray-400">Unified repositories and asset organization</p>
          </div>

          <div className="flex flex-col items-center p-1 text-center group">
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Agent Co-Production</h3>
            <p className="text-[9px] text-gray-400">
              Automated co-production guidance & layout audits
            </p>
          </div>

          <div className="flex flex-col items-center p-1 text-center group">
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">Precise feedback</h3>
            <p className="text-[9px] text-gray-400">
              Frame-accurate point coordinates pin annotation
            </p>
          </div>
        </div>
      </section>

      {/* WORKSPACE DEMO PREVIEW SECTION */}
      <section
        className="py-16 bg-black/40 border-t border-[#E6C280]/15 relative"
        id="demo-workspace"
      >
        <div className="max-w-6xl mx-auto px-4 mb-2">
          {/* Section banner */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 p-1 px-3 mb-3 rounded-full bg-[#5C1D24]/80 border border-[#E6C280]/40 text-[#E6C280] font-mono text-[9px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#E6C280]" />
              <span>Symmetric Space Live</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-white font-black mb-3">
              Experience shumai in Action
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Explore shumai's high-fidelity creative workflow, precise coordinate-based designer
              annotations, and advanced AI agent coordination layouts.
            </p>
          </div>
        </div>

        {/* Render interactive applet showcase simulator */}
        <InteractiveShowcase />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
