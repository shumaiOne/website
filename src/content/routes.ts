import type { RouteKey, RouteMeta } from '../types';

export const ROUTES: RouteMeta[] = [
  {
    key: 'home',
    path: '/',
    outFile: 'index.html',
    label: 'Home',
    title: 'Shumai — Open-Source Frame.io Alternative',
    description:
      'Shumai is an open-source, self-hosted Frame.io alternative for creative teams: frame-accurate video review, 3D and document previews, semantic search, and an AI agent.',
    ogImage: '/og/home.jpg',
    ogImageAlt: 'Shumai frame-accurate video review with timecoded comments and on-frame markup',
  },
  {
    key: 'frame-io-alternative',
    path: '/frame-io-alternative',
    outFile: 'frame-io-alternative.html',
    label: 'Frame.io alternative',
    title: 'Self-Hosted, Open-Source Frame.io Alternative | Shumai',
    description:
      'Compare Shumai and Frame.io. Shumai is MIT-licensed, runs on your own servers and storage, has no per-seat fees, and adds 3D review, semantic search, and an AI agent.',
    ogImage: '/og/frame-io-alternative.jpg',
    ogImageAlt: 'Shumai versus Frame.io comparison for self-hosted media review',
  },
  {
    key: 'self-hosted',
    path: '/self-hosted',
    outFile: 'self-hosted.html',
    label: 'Self-hosting',
    title: 'Self-Hosted Video Review & Media Asset Management | Shumai',
    description:
      'Run Shumai on your own hardware with one Docker Compose command. Keep media on local disks or any S3-compatible bucket, use GPU transcoding, and scale workers out.',
    ogImage: '/og/self-hosted.jpg',
    ogImageAlt: 'Self-hosting Shumai with Docker Compose and S3-compatible storage',
  },
  {
    key: 'video-review',
    path: '/features/video-review',
    outFile: 'features/video-review.html',
    label: 'Video review',
    title: 'Frame-Accurate Video Review & Annotation | Shumai',
    description:
      'Leave timecoded comments, draw boxes, arrows, and freehand markup on any frame, compare versions side by side, and export notes to Premiere Pro, Resolve, FCP, or Avid.',
    ogImage: '/og/video-review.jpg',
    ogImageAlt: 'Timecoded video comments with arrow markup in Shumai',
  },
  {
    key: 'file-formats',
    path: '/features/file-formats',
    outFile: 'features/file-formats.html',
    label: 'File formats',
    title: 'Review Video, PSD, RAW, 3D Models & Documents | Shumai',
    description:
      'Preview and comment on video, audio, images, PSD and camera RAW, 3D models (GLB, FBX, OBJ, STL, USD, DAE), PDFs, and Office documents in one self-hosted workspace.',
    ogImage: '/og/file-formats.jpg',
    ogImageAlt: 'Shumai 3D turntable viewer with angle-pinned review comments',
  },
  {
    key: 'metadata',
    path: '/features/metadata',
    outFile: 'features/metadata.html',
    label: 'Metadata & collections',
    title: 'Custom Metadata Fields & Smart Collections | Shumai',
    description:
      'Add custom metadata fields to every asset, from status and ratings to owners and due dates, then filter by any field and save the result as a live smart collection.',
    ogImage: '/og/metadata.jpg',
    ogImageAlt: 'Filtering media assets by custom metadata fields in Shumai',
  },
  {
    key: 'semantic-search',
    path: '/features/semantic-search',
    outFile: 'features/semantic-search.html',
    label: 'Semantic search',
    title: 'Self-Hosted Semantic Search for Video & Images | Shumai',
    description:
      'Find footage by describing it. Shumai indexes video, images, and 3D models with multimodal embeddings that can run on your own server, and shows the matching time range.',
    ogImage: '/og/semantic-search.jpg',
    ogImageAlt: 'Semantic search results for video and images in Shumai',
  },
  {
    key: 'share-links',
    path: '/features/share-links',
    outFile: 'features/share-links.html',
    label: 'Share links',
    title: 'Watermarked, Password-Protected Share Links | Shumai',
    description:
      'Send clients share links with passwords, expiry dates, download control, and text or image watermarks burned into the video and image files they stream.',
    ogImage: '/og/share-links.jpg',
    ogImageAlt: 'Watermarked client review share link in Shumai',
  },
  {
    key: 'kanban',
    path: '/features/kanban',
    outFile: 'features/kanban.html',
    label: 'Kanban',
    title: 'Kanban Task Management for Creative Teams | Shumai',
    description:
      'Plan productions next to your media: a built-in kanban board with goals, priorities, due dates, dependencies, assignees, and tasks linked directly to assets.',
    ogImage: '/og/kanban.jpg',
    ogImageAlt: 'Shumai kanban board for creative production tasks',
  },
  {
    key: 'ai-agent',
    path: '/features/ai-agent',
    outFile: 'features/ai-agent.html',
    label: 'Shumai Agent',
    title: 'AI Agent for Video, Image & 3D Review | Shumai',
    description:
      'Mention the Shumai Agent in a comment or chat with it one-to-one. It watches video, reads images and 3D turntables, and answers with your choice of AI model.',
    ogImage: '/og/ai-agent.jpg',
    ogImageAlt: 'Shumai Agent replying to a 3D model review comment',
  },
];

export const ROUTE_BY_KEY = Object.fromEntries(ROUTES.map((r) => [r.key, r])) as Record<
  RouteKey,
  RouteMeta
>;

export const FEATURE_NAV: RouteKey[] = [
  'video-review',
  'file-formats',
  'metadata',
  'semantic-search',
  'share-links',
  'kanban',
  'ai-agent',
];

/** Resolve a browser pathname (with or without trailing slash / .html) to a route key. */
export function routeKeyFromPath(pathname: string): RouteKey | null {
  const clean = pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  const match = ROUTES.find((r) => r.path === clean);
  return match ? match.key : null;
}
