import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

const SHOWCASE_TABS = [
  {
    id: 'files' as const,
    label: 'Files & Assets',
    description:
      'Centralized asset management for organizing high-fidelity media, brand guidelines, and storyboards.',
    image: '/list-example.webp',
  },
  {
    id: 'review' as const,
    label: 'Precise feedback',
    description:
      'Frame-accurate visual review canvas with coordinate-based annotations for clear creative direction.',
    image: '/comment-example.webp',
  },
  {
    id: 'agent' as const,
    label: 'Shumai Agent',
    description:
      'AI-powered co-production assistant for automated layout auditing and creative recommendations.',
    image: '/agent-example.webp',
  },
];

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<'files' | 'review' | 'agent'>('files');

  const currentIndex = SHOWCASE_TABS.findIndex((t) => t.id === activeTab);
  const currentTabData = SHOWCASE_TABS[currentIndex];

  const handleTabChange = (tabId: 'files' | 'review' | 'agent') => {
    setActiveTab(tabId);
  };

  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length;
    setActiveTab(SHOWCASE_TABS[nextIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % SHOWCASE_TABS.length;
    setActiveTab(SHOWCASE_TABS[nextIndex].id);
  };

  return (
    <div className="w-full flex flex-col" id="interactive-showcase-box">
      {/* Main Presentation Container */}
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        {/* CAROUSEL VIEWPORT WITH NAVIGATION ARROWS */}
        <div className="relative group mb-12">
          {/* Navigation Arrows - Flanking the image */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-[-120px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E6C280]/20 border border-white/10 flex items-center justify-center text-white hover:text-black hover:bg-white hover:border-white/20 transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-[-20px] md:right-[-120px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E6C280]/20 border border-white/10 flex items-center justify-center text-white hover:text-black hover:bg-white hover:border-white/20 transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* IMAGE VIEWPORT */}
          <div className="bg-[#1C080B]/40 border border-[#E6C280]/15 rounded-2xl overflow-hidden aspect-video relative shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={currentTabData.image}
                alt={currentTabData.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* TEXT-BASED TABS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {SHOWCASE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="flex flex-col items-start text-left group transition-all cursor-pointer"
              >
                <h3
                  className={`text-base md:text-lg font-serif font-bold mb-2 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                  }`}
                >
                  {tab.label}
                </h3>
                <p
                  className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                    isActive ? 'text-gray-300' : 'text-gray-300/20 group-hover:text-gray-300/50'
                  }`}
                >
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
