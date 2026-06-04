import {
  CheckCircle2,
  Clock,
  Cpu,
  Eye,
  FileVideo,
  Layers,
  LayoutGrid,
  Maximize2,
  MessageSquare,
  MonitorCheck,
  Play,
  Sparkles,
  Volume2,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import ChineseBorder from './ChineseBorder';

const SHOWCASE_TABS = [
  {
    id: 'files' as const,
    label: 'Files & Assets',
    icon: Layers,
    description:
      'A centralized creative repository designed to host and organize high-fidelity videography, brand guidelines, storyboards, and multi-layered design grids. Built with imperial metadata trackers and automatic feedback tags, this view organizes your complex digital assets into a beautifully structured catalog with unified state indicators.',
    badge: 'Imperial Cataloging',
    screenshotTitle: 'Asset Repository Viewport',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: 'Symmetric GRID layout', val: 'Active' },
      { label: 'Master files parsed', val: '12 assets' },
      { label: 'Auto-categorization', val: 'Enabled' },
    ],
  },
  {
    id: 'review' as const,
    label: 'Precise Annotator',
    icon: MessageSquare,
    description:
      'A frame-accurate visual review canvas that simplifies design feedback. Reviewers, designers, and directors can drop direct coordinate pin bubbles (e.g., X:54%, Y:42%) on precision lattices, linking high-fidelity visual notes to exact layout zones. Eliminates any ambiguity in creative direction.',
    badge: 'Coordinate Review',
    screenshotTitle: 'Precision Annotation Canvas',
    image:
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: 'Frame review speed', val: '0.00s latency' },
      { label: 'Coordinate pins', val: 'Active' },
      { label: 'Timeline alignment', val: 'Synced' },
    ],
  },
  {
    id: 'agent' as const,
    label: 'Agent',
    icon: Cpu,
    description:
      'A state-of-the-art AI creative co-production workspace. The agent automatically audits files for traditional Chinese symmetry guidelines, reviews layout spacing ratios, examines color palette balances, and returns actionable color correction and editing recommendations to streamline your creative pipeline.',
    badge: 'Cognitive Coproducer',
    screenshotTitle: 'AI Co-Production Hub',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: 'Symmetry analysis', val: 'Optimal 98.4%' },
      { label: 'Color grading audit', val: 'Complete' },
      { label: 'Active recommendations', val: '3 directives' },
    ],
  },
];

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<'files' | 'review' | 'agent'>('files');

  const currentTabData = SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0];

  const handleTabChange = (tabId: 'files' | 'review' | 'agent') => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full flex flex-col pt-4 pb-12" id="interactive-showcase-box">
      {/* Segmented controls tab navigation designed like a high-end web app titlebar */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-[#E6C280]/20 pb-5 mb-8 px-4">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-2 h-2 rounded-full bg-[#E54B4B] animate-pulse" />
          <span className="font-mono text-[10px] text-[#E6C280] tracking-widest uppercase">
            Platform Workflow Viewports • High-Fidelity Previews
          </span>
        </div>

        {/* Traditional segment bar */}
        <div className="flex bg-[#3D1418] p-1 rounded-lg border border-[#E6C280]/20 self-start md:self-auto shadow-inner">
          {SHOWCASE_TABS.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-2 tracking-wide ${
                  activeTab === tab.id
                    ? 'bg-[#E6C280] text-[#5C1D24] shadow-md font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-[#5C1D24]/40'
                }`}
                id={`tab-btn-${tab.id}`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Presentation Container */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="bg-[#1C080B]/90 border border-[#E6C280]/20 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-950/20 rounded-full filter blur-[100px] pointer-events-none" />

          {/* ANIMATED DESCRIPTION ABOVE THE SCREENSHOT IMAGE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
              id="tab-description-header"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-[#E6C280] bg-[#5C1D24] border border-[#E6C280]/30 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                  {currentTabData.badge}
                </span>
                <span className="text-gray-400 font-mono text-[10px]">
                  • Shumai Interface Element
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-black text-white mb-3">
                {currentTabData.label}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-4xl font-sans">
                {currentTabData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* SCREENSHOT IMAGE WORKSPACE (Mock Browser UI Container) */}
          <ChineseBorder
            padding="p-0.5"
            className="shadow-2xl overflow-hidden bg-[#2D0D11]/90 rounded-lg"
          >
            <div className="bg-[#130305] rounded overflow-hidden aspect-video relative flex flex-col group min-h-[350px] md:min-h-[480px]">
              {/* Mock Browser/App Chrome Header */}
              <div className="bg-[#1C0508]/95 border-b border-[#E6C280]/15 px-4 py-2.5 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E54B4B]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6C280]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-600/30" />
                  <span className="text-[10px] font-mono text-[#E6C280] ml-3 tracking-widest uppercase">
                    shumai-workspace // {currentTabData.screenshotTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[9px] text-[#E6C280]/80 bg-[#3D1418]/60 border border-[#E6C280]/20 px-2 py-0.5 rounded">
                  <MonitorCheck className="w-3 h-3 text-[#E6C280]" />
                  <span>PREVIEW MODE</span>
                </div>
              </div>

              {/* Dynamic Mockup Image Screenshot with Aesthetic Annotation Layers */}
              <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                {/* Simulated Webpage Screenshot */}
                <img
                  src={currentTabData.image}
                  alt={currentTabData.screenshotTitle}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                  id="screenshot-image-viewport"
                />

                {/* Royal dark fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#130305] via-transparent to-[#130305]/70 pointer-events-none" />

                {/* OVERLAYS CUSTOMIZED PER VIEWPORT TO DEFINE HIGH-FIDELITY SCREENSHOT AESTHETIC */}
                <AnimatePresence mode="wait">
                  {activeTab === 'files' && (
                    <motion.div
                      key="files-overlay"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between"
                      id="files-mockup-screenshot-content"
                    >
                      {/* Grid overlay */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
                        {[
                          {
                            title: 'shumai_cut_final.mp4',
                            size: '44.2 MB',
                            cat: 'Video Render',
                            status: 'Approved',
                            tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20',
                          },
                          {
                            title: 'royal_palette_spec_v2.png',
                            size: '12.8 MB',
                            cat: 'Art Guideline',
                            status: 'In Review',
                            tagColor: 'text-amber-300 bg-amber-950/60 border-amber-500/20',
                          },
                          {
                            title: 'branding_layout_lattice.ai',
                            size: '185.0 MB',
                            cat: 'Vector Master',
                            status: 'Approved',
                            tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/20',
                          },
                        ].map((mockFile, i) => (
                          <div
                            key={i}
                            className="bg-[#1C080B]/90 border border-[#E6C280]/20 rounded p-3 shadow-md backdrop-blur-md flex flex-col justify-between h-24 md:h-28"
                          >
                            <div>
                              <div className="flex items-center gap-1.5 text-[9px] text-[#E6C280] font-mono uppercase mb-1">
                                <FileVideo className="w-3 h-3" />
                                <span>{mockFile.cat}</span>
                              </div>
                              <h4 className="text-[10px] md:text-xs font-semibold text-white truncate">
                                {mockFile.title}
                              </h4>
                            </div>
                            <div className="flex items-center justify-between mt-2 border-t border-[#E6C280]/10 pt-1.5">
                              <span className="text-[9px] text-gray-400 font-mono">
                                {mockFile.size}
                              </span>
                              <span
                                className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${mockFile.tagColor}`}
                              >
                                {mockFile.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Control bar */}
                      <div className="w-full bg-[#1C0508]/90 border border-[#E6C280]/20 p-3 rounded flex items-center justify-between backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <LayoutGrid className="w-4 h-4 text-[#E6C280]" />
                          <span className="text-[10px] text-white font-mono">
                            12 Assets loaded in this project workspace
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono italic">
                          Viewing High Fidelity Mirror Screenshot
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'review' && (
                    <motion.div
                      key="review-overlay"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 flex flex-col justify-between p-4 md:p-8"
                      id="annotator-mockup-screenshot-content"
                    >
                      {/* Geometric crosshair annotations simulating director feedback */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Golden Target concentric circles */}
                        <div className="relative w-28 h-28 md:w-36 md:h-36 border border-dashed border-[#E6C280]/50 rounded-full flex items-center justify-center animate-spin-slow">
                          <div className="w-14 h-14 border border-solid border-[#E6C280]/30 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#E54B4B] rounded-full" />
                          </div>
                        </div>

                        {/* Coordinates lines decoration */}
                        <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#E6C280]/20 to-transparent" />
                        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E6C280]/20 to-transparent" />
                      </div>

                      {/* Drop Feedback pins simulations */}
                      <div className="absolute left-[54%] top-[42%] flex items-center gap-2">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-[#E6C280] bg-[#5C1D24] text-[#E6C280] shadow-[0_0_15px_rgba(230,194,128,0.5)]">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <div className="bg-[#1C080B]/95 border border-[#E6C280]/30 p-2 rounded backdrop-blur-md text-[9px] max-w-xs shadow-lg">
                          <div className="flex justify-between gap-2 font-mono font-bold text-[#E6C280] mb-0.5">
                            <span>MEI LIN • Art Director</span>
                            <span>#01 PIN</span>
                          </div>
                          <p className="text-white italic">
                            "Align ending golden logo 0.5s faster and sharpen lattice vectors."
                          </p>
                        </div>
                      </div>

                      {/* Video mockup playback timeline */}
                      <div className="mt-auto w-full bg-[#1C0508]/90 border border-[#E6C280]/20 p-3 rounded flex items-center gap-3 backdrop-blur-md">
                        <Play className="w-3.5 h-3.5 text-white fill-white" />
                        <div className="flex-1 h-1.5 bg-white/10 rounded overflow-hidden relative">
                          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-600 to-[#E6C280]" />
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-[10px] font-mono">
                          <Volume2 className="w-3.5 h-3.5" />
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'agent' && (
                    <motion.div
                      key="agent-overlay"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between"
                      id="agent-mockup-screenshot-content"
                    >
                      {/* Left: AI recommendations card overlay */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full items-end">
                        <div className="md:col-span-5 bg-[#1C080B]/95 border border-[#E6C280]/30 rounded-lg p-3.5 shadow-xl backdrop-blur-md flex flex-col gap-2.5 text-left">
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#E6C280] uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>CO-PRODUCTION ANALYSIS</span>
                          </div>

                          <div className="space-y-2">
                            <div className="p-1.5 rounded bg-white/5 border border-white/5">
                              <span className="text-[8px] font-bold text-[#E6C280] uppercase block mb-0.5">
                                Symmetry Evaluation
                              </span>
                              <p className="text-[9px] text-gray-300 leading-snug">
                                The lattice boundary aligns with traditional architectural symmetry
                                parameters (98.4% Match Score).
                              </p>
                            </div>
                            <div className="p-1.5 rounded bg-white/5 border border-white/5">
                              <span className="text-[8px] font-bold text-[#E54B4B] uppercase block mb-0.5">
                                Color Grading Tip
                              </span>
                              <p className="text-[9px] text-gray-300 leading-snug">
                                Boost Imperial Red highlights slightly by +4% during the storyboard
                                transitions.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Interactive metrics or visual status */}
                        <div className="md:col-span-7 flex flex-col items-end justify-between h-full py-2">
                          <div className="bg-[#1C0508]/90 border border-[#E6C280]/20 p-3 rounded-lg backdrop-blur-sm shadow-md text-right max-w-xs">
                            <span className="block text-[8px] font-mono text-gray-400 uppercase tracking-widest leading-none mb-1">
                              AUTOMATED DIRECTIVE
                            </span>
                            <h4 className="text-[10px] font-serif font-black text-[#E6C280]">
                              Color Tone Alignment Audited
                            </h4>
                            <p className="text-[9px] text-gray-300 mt-1">
                              Ready for transition exports with optimal gold gradients mapped.
                            </p>
                          </div>

                          <div className="w-full bg-[#1C0508]/90 border border-[#E6C280]/20 p-2.5 rounded-lg flex items-center justify-between backdrop-blur-md mt-4">
                            <div className="flex items-center gap-2">
                              <Zap className="w-3.5 h-3.5 text-[#E6C280] fill-[#E6C280]/25 text-amber-400" />
                              <span className="text-[10px] text-white font-mono">
                                Agent status: Awaiting next file upload
                              </span>
                            </div>
                            <span className="text-[8.5px] font-mono text-[#E6C280] uppercase tracking-wide">
                              ● SYNCED
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Decorative traditional corner ornaments indicating "Chinese precision layout design" */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#E6C280]/40 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#E6C280]/40 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#E6C280]/40 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#E6C280]/40 pointer-events-none" />
            </div>
          </ChineseBorder>

          {/* Quick specs section below */}
          <div className="mt-6 pt-4 border-t border-[#E6C280]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {currentTabData.features.map((feat, i) => (
              <div
                key={i}
                className="flex justify-between sm:justify-center sm:flex-col items-center p-2 rounded bg-white/5 border border-white/5 gap-0.5"
              >
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">
                  {feat.label}
                </span>
                <span className="text-xs font-serif font-bold text-[#E6C280]">{feat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
