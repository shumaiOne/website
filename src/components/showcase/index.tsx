import type React from 'react';
import type { ShowcaseKey } from '../../types';
import { AgentShowcase } from './AgentShowcase';
import { FormatsShowcase } from './FormatsShowcase';
import { InfraDiagram } from './InfraDiagram';
import { KanbanShowcase } from './KanbanShowcase';
import { MetadataShowcase } from './MetadataShowcase';
import { ReviewShowcase } from './ReviewShowcase';
import { SearchShowcase } from './SearchShowcase';
import { SharingShowcase } from './SharingShowcase';
import { TerminalDemo } from './TerminalDemo';

export function SelfHostShowcase() {
  return (
    <div className="relative">
      <TerminalDemo />
      <InfraDiagram className="relative mt-4 sm:-mt-6 sm:ml-12 lg:ml-16 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]" />
    </div>
  );
}

const SHOWCASES: Record<ShowcaseKey, () => React.JSX.Element> = {
  'self-hosted': SelfHostShowcase,
  'video-review': ReviewShowcase,
  'file-formats': FormatsShowcase,
  metadata: MetadataShowcase,
  'semantic-search': SearchShowcase,
  'share-links': SharingShowcase,
  kanban: KanbanShowcase,
  'ai-agent': AgentShowcase,
};

export function Showcase({ name }: { name: ShowcaseKey }) {
  const Component = SHOWCASES[name];
  return <Component />;
}
