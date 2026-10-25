import type { FaqItem, RouteKey, ShowcaseKey } from '../types';

export interface HomeSection {
  id: string;
  showcase: ShowcaseKey;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  link: RouteKey;
  linkLabel: string;
}

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: 'self-hosted',
    showcase: 'self-hosted',
    eyebrow: 'Own your data',
    title: 'Self-host in one command. Keep every frame.',
    description:
      'Shumai runs on your own server, NAS, or cloud account. Footage, comments, and client links never leave infrastructure you control, and there are no seat limits or storage tiers to outgrow.',
    bullets: [
      'Docker Compose tiers from 2 GB RAM, plus NPM and Kubernetes',
      'Local disk, AWS S3, Cloudflare R2, MinIO, or any S3-compatible bucket',
      'GPU transcoding and extra workers that scale back to zero',
      'MIT licensed, no telemetry, no license server',
    ],
    link: 'self-hosted',
    linkLabel: 'How self-hosting works',
  },
  {
    id: 'review',
    showcase: 'video-review',
    eyebrow: 'Frame-accurate review',
    title: 'Feedback pinned to the exact frame',
    description:
      'Pause, draw on the frame, and comment. Every note carries its timecode and markup, so editors, clients, and teammates are always looking at the same moment.',
    bullets: [
      'Boxes, arrows, lines, and freehand drawing',
      'Threaded replies, @mentions, reactions, and resolve',
      'Version stacks with side-by-side compare',
      'Export to Premiere Pro, DaVinci Resolve, Final Cut Pro, and Avid',
    ],
    link: 'video-review',
    linkLabel: 'Explore video review',
  },
  {
    id: 'formats',
    showcase: 'file-formats',
    eyebrow: 'Every format',
    title: 'Video, stills, 3D, and documents in one viewer',
    description:
      'Review a cut, a layered PSD or camera RAW, a 3D model from any angle, or a script, all with the same comments and markup tools.',
    bullets: [
      'Video and audio proxies with frame stepping and hover scrubbing',
      'PSD and camera RAW previews at full resolution',
      '3D turntables with comments pinned to the viewing angle',
      'Office, Markdown, HTML, and CSV converted to PDF for page comments',
    ],
    link: 'file-formats',
    linkLabel: 'See all supported formats',
  },
  {
    id: 'metadata',
    showcase: 'metadata',
    eyebrow: 'Custom metadata',
    title: 'Your fields, your filters, live collections',
    description:
      'Add the metadata your pipeline needs, edit it inline, and slice the library by any combination of fields. Save a filter once and it becomes a collection that keeps itself up to date.',
    bullets: [
      'Ten field types including select, rating, date, and user',
      'AND / OR filters across every folder',
      'Optional AI autofill from the asset’s content',
    ],
    link: 'metadata',
    linkLabel: 'Learn about metadata',
  },
  {
    id: 'search',
    showcase: 'semantic-search',
    eyebrow: 'Semantic search',
    title: 'Describe the shot. Shumai finds it.',
    description:
      'Multimodal embeddings index your videos, images, and 3D models so you can search by meaning. Video results show the matching time range, and the embedding model can run entirely on your own hardware.',
    bullets: [
      'Search across video, images, and 3D turntables',
      'Matching seconds highlighted inside long clips',
      'Local EmbeddingGemma server, or Gemini if you prefer',
    ],
    link: 'semantic-search',
    linkLabel: 'How semantic search works',
  },
  {
    id: 'sharing',
    showcase: 'share-links',
    eyebrow: 'Secure sharing',
    title: 'Client links with watermarks that stay put',
    description:
      'Share a folder or a single cut with a password, an expiry date, and downloads switched off. Text and logo watermarks are rendered into the media on your server, not layered on top in the browser.',
    bullets: [
      'Passwords, expiry dates, and download control per link',
      'Unlimited reusable watermark templates',
      'Guests comment with timecodes, no account required',
    ],
    link: 'share-links',
    linkLabel: 'Explore share links',
  },
  {
    id: 'kanban',
    showcase: 'kanban',
    eyebrow: 'Kanban',
    title: 'Plan the production next to the footage',
    description:
      'A built-in board takes every task from To Do to Done. Group work under goals, set priorities and due dates, add dependencies, and link tasks to the exact files they are about.',
    bullets: [
      'Goals, priorities, start and due dates, assignees',
      'Parent and child dependencies, linked assets',
      'Full activity history with in-app and email notifications',
    ],
    link: 'kanban',
    linkLabel: 'See the kanban board',
  },
  {
    id: 'agent',
    showcase: 'ai-agent',
    eyebrow: 'Shumai Agent',
    title: 'An AI teammate that can see the work',
    description:
      'Mention the agent in a comment and it looks at the same frame, image, or 3D angle you are discussing, follows your markup, and replies in the thread. Or open a private chat and ask about a whole folder.',
    bullets: [
      'Understands video, images, and 3D turntables',
      'Bring your own model: OpenAI, Anthropic, Gemini, or OpenAI-compatible',
      'Skills, MCP tools, sandboxed scripts, quotas, and audit logs',
      'Completely optional: leave it off and nothing changes',
    ],
    link: 'ai-agent',
    linkLabel: 'Meet the Shumai Agent',
  },
];

export interface MoreFeature {
  icon:
    | 'layers'
    | 'shield'
    | 'film'
    | 'plug'
    | 'terminal'
    | 'bell'
    | 'activity'
    | 'gauge'
    | 'cpu'
    | 'radio'
    | 'languages'
    | 'workflow';
  title: string;
  body: string;
}

export const MORE_FEATURES: MoreFeature[] = [
  {
    icon: 'layers',
    title: 'Version stacks',
    body: 'Keep every cut in one stack and compare any two versions side by side.',
  },
  {
    icon: 'shield',
    title: 'Roles & permissions',
    body: 'Owner, editor, and reviewer roles at team and project level, plus project-only guests.',
  },
  {
    icon: 'film',
    title: 'NLE comment export',
    body: 'Premiere Pro XML, Resolve EDL, Final Cut Pro, and Avid with drop-frame timecode.',
  },
  {
    icon: 'plug',
    title: 'Premiere Pro panel',
    body: 'Experimental UXP plugin to import media and sync comments to sequence markers.',
  },
  {
    icon: 'terminal',
    title: 'Command line',
    body: 'Upload folders, create versions, move, and rename assets from your terminal or scripts.',
  },
  {
    icon: 'bell',
    title: 'Notifications',
    body: 'In-app and batched email alerts for mentions, replies, uploads, and task changes.',
  },
  {
    icon: 'activity',
    title: 'Audit logs & dashboards',
    body: 'Every team and agent action logged, with workflow, quota, and AI usage dashboards.',
  },
  {
    icon: 'gauge',
    title: 'AI quotas',
    body: 'Cap tokens, cost, and tool calls per member, per role, or for the whole team.',
  },
  {
    icon: 'cpu',
    title: 'Hardware transcoding',
    body: 'NVIDIA NVENC, Intel QuickSync, VA-API, and Rockchip RKMPP acceleration.',
  },
  {
    icon: 'radio',
    title: 'Adaptive streaming',
    body: 'Optional HLS renditions, plus posters and hover-scrub sprites for instant previews.',
  },
  {
    icon: 'workflow',
    title: 'Durable workflows',
    body: 'Background jobs run on DBOS in PostgreSQL and resume automatically after restarts.',
  },
  {
    icon: 'languages',
    title: 'English & Chinese',
    body: 'A fully localized interface with light, dark, and system themes.',
  },
];

export interface ComparisonRow {
  label: string;
  shumai: string;
  frameio: string;
  /** Whether Shumai has a clear advantage on this row. */
  win?: boolean;
}

/** Frame.io details from frame.io/pricing, checked October 2026. */
export const COMPARISON: ComparisonRow[] = [
  {
    label: 'Where it runs',
    shumai: 'Your server, NAS, or cloud account',
    frameio: 'Adobe-hosted cloud only',
    win: true,
  },
  {
    label: 'Source code',
    shumai: 'Open source, MIT license',
    frameio: 'Proprietary',
    win: true,
  },
  {
    label: 'Pricing',
    shumai: 'Free, unlimited members and projects',
    frameio: 'Free for 2 members, then $15–$25 per member per month',
    win: true,
  },
  {
    label: 'Storage',
    shumai: 'As much as your disks or S3 bucket hold',
    frameio: 'Plan-based (2–3 TB plus 2 TB per member); own S3 on Enterprise',
    win: true,
  },
  {
    label: 'Password & expiring share links',
    shumai: 'Included',
    frameio: 'Pro plan and above',
    win: true,
  },
  {
    label: 'Watermarking',
    shumai: 'Text and image watermarks, unlimited templates',
    frameio: 'One static template on Pro; more on higher plans',
    win: true,
  },
  {
    label: 'Frame-accurate comments & markup',
    shumai: 'Included',
    frameio: 'Included',
  },
  {
    label: '3D model review',
    shumai: 'Turntables with angle-pinned comments',
    frameio: '3D asset viewer',
  },
  {
    label: 'Kanban task management',
    shumai: 'Built in',
    frameio: 'Separate tool needed',
    win: true,
  },
  {
    label: 'AI',
    shumai: 'Agent that reviews video, images, and 3D, with your choice of model',
    frameio: 'Transcription and captions',
    win: true,
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'Is Shumai really free?',
    answer:
      'Yes. Shumai is open source under the MIT license. Self-host it with unlimited members, projects, and storage. You only pay for the server and storage you run it on.',
  },
  {
    question: 'How do I self-host Shumai?',
    answer:
      'Download one of the Docker Compose files (Lite, with Embedding Server, or Full) and run docker compose up -d. Shumai is also available as an NPM package and includes a Kubernetes example for AWS EKS.',
  },
  {
    question: 'Where are my files stored?',
    answer:
      'On storage you choose: the bundled local storage or any S3-compatible service such as AWS S3, Cloudflare R2, or MinIO. Shumai always keeps your original file and has no telemetry.',
  },
  {
    question: 'Can clients review work without an account?',
    answer:
      'Yes. Share links let clients watch, browse, and leave timecoded comments as guests. You can add a password, an expiry date, a watermark, and turn off downloads.',
  },
  {
    question: 'Do I have to use the AI features?',
    answer:
      'No. AI is optional. Shumai is a complete review and asset management tool without it. If you do enable it, you choose the model provider, including local OpenAI-compatible servers.',
  },
  {
    question: 'Which file types can I review?',
    answer:
      'Video and audio, images including PSD and camera RAW, 3D models (GLB, FBX, OBJ, STL, USD, DAE), PDFs, and Office, Markdown, HTML, and CSV documents. Any other file type can be uploaded and stored.',
  },
  {
    question: 'How does Shumai compare to Frame.io?',
    answer:
      'Shumai covers frame-accurate review, version stacks, share links, and NLE export, and adds self-hosting, 3D turntables, semantic search, kanban, and an AI agent. Frame.io is a managed cloud service with features like Camera to Cloud and native mobile apps.',
  },
];
