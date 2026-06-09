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
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import ChineseBorder from "./ChineseBorder";

const SHOWCASE_TABS = [
  {
    id: "files" as const,
    label: "Files & Assets",
    icon: Layers,
    description:
      "Centralized asset management for organizing high-fidelity media, brand guidelines, and storyboards.",
    badge: "Asset Management",
    screenshotTitle: "Asset Repository",
    image: "/list-example.webp",
  },
  {
    id: "review" as const,
    label: "Precise feedback",
    icon: MessageSquare,
    description:
      "Frame-accurate visual review canvas with coordinate-based annotations for clear creative direction.",
    badge: "Visual Review",
    screenshotTitle: "Precision Annotation",
    image: "/comment-example.webp",
  },
  {
    id: "agent" as const,
    label: "Shumai Agent",
    icon: Cpu,
    description:
      "AI-powered co-production assistant for automated layout auditing and creative recommendations.",
    badge: "AI Assistant",
    screenshotTitle: "AI Co-Production",
    image: "/agent-example.webp",
  },
];

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"files" | "review" | "agent">(
    "files",
  );

  const currentTabData =
    SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0];

  const handleTabChange = (tabId: "files" | "review" | "agent") => {
    setActiveTab(tabId);
  };

  return (
    <div
      className="w-full flex flex-col pt-4 pb-12"
      id="interactive-showcase-box"
    >
      {/* Segmented controls tab navigation designed like a high-end web app titlebar */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-[#E6C280]/20 pb-5 mb-8 px-4">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-2 h-2 rounded-full bg-[#E54B4B] animate-pulse" />
          <span className="font-mono text-[10px] text-[#E6C280] tracking-widest uppercase">
            Feature Previews
          </span>
        </div>

        {/* Workspace segment bar */}
        <div className="flex bg-[#3D1418] p-1 rounded-lg border border-[#E6C280]/20 self-start md:self-auto shadow-inner">
          {SHOWCASE_TABS.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-2 tracking-wide ${
                  activeTab === tab.id
                    ? "bg-[#E6C280] text-[#5C1D24] shadow-md font-bold"
                    : "text-gray-300 hover:text-white hover:bg-[#5C1D24]/40"
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
        <div className="bg-[#1C080B]/90 border border-[#E6C280]/20 rounded-xl p-2 md:p-4 shadow-2xl relative overflow-hidden !pt-8">
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
              <h3 className="text-xl md:text-2xl font-serif font-black text-[#E6C280] mb-3">
                {currentTabData.label}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-4xl font-sans">
                {currentTabData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* SCREENSHOT IMAGE WORKSPACE */}
          <ChineseBorder
            padding="p-0.5"
            className="shadow-2xl overflow-hidden bg-[#2D0D11]/90 rounded-lg"
          >
            <div className="bg-[#130305] rounded overflow-hidden aspect-video relative flex flex-col group min-h-[350px] md:min-h-[480px]">
              {/* Dynamic Mockup Image Screenshot */}
              <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={currentTabData.image}
                    alt={currentTabData.screenshotTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 select-none"
                    id="screenshot-image-viewport"
                  />
                </AnimatePresence>
              </div>
            </div>
          </ChineseBorder>
        </div>
      </div>
    </div>
  );
}
