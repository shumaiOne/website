import { Box, FileText, Image as ImageIcon, Video } from 'lucide-react';
import type React from 'react';
import { useId, useState } from 'react';
import type { ScreenName } from '../../types';
import { ScreenFrame } from '../ScreenFrame';
import { Turntable } from './Turntable';

interface FormatTab {
  id: 'video' | 'image' | '3d' | 'docs';
  label: string;
  icon: React.ReactNode;
  formats: string[];
  caption: string;
  screen?: ScreenName;
}

export const FORMAT_TABS: FormatTab[] = [
  {
    id: 'video',
    label: 'Video & audio',
    icon: <Video className="w-4 h-4" />,
    formats: ['MP4', 'MOV', 'MKV', 'WebM', 'MP3', 'WAV', 'FLAC', 'AAC'],
    caption:
      'Browser-ready proxies, frame stepping, hover scrubbing, and optional adaptive HLS, with timecoded comments on every cut.',
    screen: 'review',
  },
  {
    id: 'image',
    label: 'Images, PSD & RAW',
    icon: <ImageIcon className="w-4 h-4" />,
    formats: ['JPG', 'PNG', 'WebP', 'PSD', 'CR3', 'NEF', 'ARW', 'DNG'],
    caption:
      'Full-resolution proxies for stills, Photoshop files, and camera RAW, with pan, zoom, and on-image markup.',
    screen: 'image',
  },
  {
    id: '3d',
    label: '3D models',
    icon: <Box className="w-4 h-4" />,
    formats: ['GLB', 'FBX', 'OBJ', 'STL', 'USD / USDZ', 'DAE'],
    caption:
      'Shumai renders a 360° turntable for every model. Drag to rotate, then pin comments and markup to an exact angle.',
  },
  {
    id: 'docs',
    label: 'Documents',
    icon: <FileText className="w-4 h-4" />,
    formats: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'ODT', 'Markdown', 'HTML', 'CSV'],
    caption:
      'Office files, Markdown, HTML, and CSV are converted to PDF so scripts, decks, and briefs get page-pinned comments too.',
    screen: 'pdf',
  },
];

/** Tabbed tour of the file types Shumai can preview and review. */
export function FormatsShowcase() {
  const [active, setActive] = useState<FormatTab['id']>('video');
  const baseId = useId();

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const idx = FORMAT_TABS.findIndex((t) => t.id === active);
    const next =
      (idx + (e.key === 'ArrowRight' ? 1 : -1) + FORMAT_TABS.length) % FORMAT_TABS.length;
    setActive(FORMAT_TABS[next].id);
    document.getElementById(`${baseId}-tab-${FORMAT_TABS[next].id}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="File types"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 mb-5"
      >
        {FORMAT_TABS.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                selected
                  ? 'border-[#E6C280] bg-[#E6C280] text-[#5C1D24] shadow-[0_0_20px_rgba(230,194,128,0.3)]'
                  : 'border-[#E6C280]/25 text-[#E6C280] hover:border-[#E6C280]/60 hover:bg-[#E6C280]/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {FORMAT_TABS.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {tab.screen ? (
            <ScreenFrame screen={tab.screen} />
          ) : (
            <div className="rounded-xl border border-[#E6C280]/20 bg-gradient-to-b from-[#120406] to-black p-5 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <Turntable />
            </div>
          )}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-3">
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed flex-1">{tab.caption}</p>
            <ul
              className="flex flex-wrap gap-1.5 sm:max-w-[50%] sm:justify-end"
              aria-label={`${tab.label} formats`}
            >
              {tab.formats.map((f) => (
                <li
                  key={f}
                  className="rounded border border-[#E6C280]/20 bg-black/30 px-2 py-0.5 text-[10px] font-mono text-[#E6C280]/90"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
