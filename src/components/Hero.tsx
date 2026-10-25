import { BookOpen, Box, Github, MessageSquare, Play, Server, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type React from 'react';
import { DEMO_URL, DOCS_URL, GITHUB_URL } from '../content/site';
import { OrnateFrame } from './OrnateFrame';

interface Highlight {
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    href: '#self-hosted',
    icon: <Server className="w-4 h-4" />,
    title: 'Self-host & own it',
    body: 'Your servers, your storage, your data',
  },
  {
    href: '#review',
    icon: <MessageSquare className="w-4 h-4" />,
    title: 'Frame-accurate review',
    body: 'Timecoded comments with on-frame markup',
  },
  {
    href: '#formats',
    icon: <Box className="w-4 h-4" />,
    title: 'Every format',
    body: 'Video, stills, RAW, 3D models, and documents',
  },
  {
    href: '#agent',
    icon: <Sparkles className="w-4 h-4" />,
    title: 'Shumai Agent',
    body: 'An AI teammate for video, images, and 3D',
  },
];

export function Hero() {
  return (
    <section className="min-h-svh w-full flex flex-col justify-between pt-24 pb-6 px-4 max-w-5xl mx-auto relative z-10">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center py-2 md:py-4">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 relative"
        >
          <OrnateFrame>
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg md:text-xl font-black text-[#E6C280] tracking-[0.25em] uppercase gold-glow">
                shumai
              </span>
              <span className="text-[10px] bg-red-950/80 text-[#E6C280] font-sans px-2 py-0.5 border border-[#E6C280]/40 rounded font-semibold uppercase tracking-wider">
                烧卖
              </span>
            </div>
          </OrnateFrame>
        </motion.div>

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

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-row items-center justify-center font-mono text-xs sm:text-sm uppercase tracking-widest text-[#E6C280] mb-2 select-none"
        >
          <a
            href={DEMO_URL}
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
            href={DOCS_URL}
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
            href={GITHUB_URL}
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

      <h2 className="sr-only">Key capabilities</h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#E6C280]/15 pt-4 pb-0 mb-0">
        {HIGHLIGHTS.map((h) => (
          <a
            key={h.href}
            href={h.href}
            className="flex flex-col items-center p-1 text-center group"
          >
            <div className="w-9 h-9 rounded-full bg-[#5C1D24] border border-[#E6C280]/30 text-[#E6C280] flex items-center justify-center mb-2 group-hover:bg-[#E6C280] group-hover:text-[#5C1D24] transition-all cursor-pointer">
              {h.icon}
            </div>
            <h3 className="text-[11px] font-bold text-gray-200 mb-0.5">{h.title}</h3>
            <p className="text-[9px] text-gray-400">{h.body}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
