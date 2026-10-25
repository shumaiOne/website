import type { ScreenInfo, ScreenName } from '../types';

const W = 1600;
const H = 1000;

export const SCREENS: Record<ScreenName, ScreenInfo> = {
  review: {
    name: 'review',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/files/steak-skillet-hero-cut3?start=6.2',
    alt: 'Shumai video review player showing a timecoded client comment at 00:06 with a yellow arrow drawn on the frame and threaded replies in the comment sidebar',
  },
  export: {
    name: 'export',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/files/steak-skillet-hero-cut3',
    alt: 'Export comments menu in Shumai with Final Cut Pro, Avid Media Composer, Premiere Pro XML, and DaVinci Resolve EDL options',
  },
  image: {
    name: 'image',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/files/ribeye-steak-searing.jpg',
    alt: 'Image review in Shumai with a highlighted box annotation and the Shumai Agent comparing the image grade with the hero video',
  },
  model: {
    name: 'model',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/files/kitten-sculpt.glb',
    alt: 'Shumai 3D turntable viewer showing a GLB model at 45 degrees with a box annotation and comments pinned to rotation angles',
  },
  pdf: {
    name: 'pdf',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/files/script-draft.pdf',
    alt: 'PDF document review in Shumai with a page-pinned comment and a highlighted paragraph',
  },
  list: {
    name: 'list',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/folders/videos',
    alt: 'Shumai list view of video assets with custom metadata columns for status, shot type, deliverables, rating, and owner',
  },
  filter: {
    name: 'filter',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/collections/approved-hero-shots',
    alt: 'Smart collection in Shumai filtered by Status is Approved, Shot Type is Hero, and Rating of at least four stars',
  },
  semantic: {
    name: 'semantic',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign',
    alt: 'Semantic search in Shumai returning images and video clips for the query chef plating food with fresh herbs',
  },
  'share-security': {
    name: 'share-security',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/shares/client-review',
    alt: 'Share link security settings in Shumai with expiration date, downloads disabled, and watermark enabled',
  },
  'watermark-editor': {
    name: 'watermark-editor',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/shares/client-review',
    alt: 'Shumai watermark editor with a rotated text watermark and a logo image block',
  },
  'public-share': {
    name: 'public-share',
    width: W,
    height: H,
    urlPath: '/share/client-review',
    alt: 'Public share link page in Shumai showing three video assets shared with a client',
  },
  'public-share-file': {
    name: 'public-share-file',
    width: W,
    height: H,
    urlPath: '/share/client-review/files/stirring-soup.mp4',
    alt: 'Client view of a shared video in Shumai with a studio watermark burned into the frame',
  },
  kanban: {
    name: 'kanban',
    width: 1920,
    height: 1080,
    urlPath: '/teams/nova-studio/kanban',
    alt: 'Shumai kanban board with To Do, Ready, In Progress, Blocked, In Review, and Done columns for a production campaign',
  },
  'chat-session': {
    name: 'chat-session',
    width: W,
    height: H,
    urlPath: '/projects/brand-campaign/folders/videos',
    alt: 'One-to-one chat with the Shumai Agent recommending an opening clip and shot order for a 15 second spot',
  },
  agents: {
    name: 'agents',
    width: W,
    height: H,
    urlPath: '/teams/nova-studio/settings#agents',
    alt: 'Shumai agent settings with chat, autofill, and embedding agents',
  },
  dashboard: {
    name: 'dashboard',
    width: W,
    height: H,
    urlPath: '/teams/nova-studio/dashboard',
    alt: 'Shumai team dashboard with audit logs of every team action',
  },
};

export const screenSrc = (name: ScreenName, width: 960 | 1600 | 2400): string =>
  `/screens/${name}-${width}.webp`;
