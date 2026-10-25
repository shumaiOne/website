export type FeatureSlug =
  | 'video-review'
  | 'file-formats'
  | 'metadata'
  | 'semantic-search'
  | 'share-links'
  | 'kanban'
  | 'ai-agent';

export type RouteKey = 'home' | 'frame-io-alternative' | 'self-hosted' | FeatureSlug;

export interface RouteMeta {
  key: RouteKey;
  /** Canonical path without trailing slash (except the homepage). */
  path: string;
  /** Output file relative to dist/. */
  outFile: string;
  title: string;
  description: string;
  /** Short label used in breadcrumbs and navigation. */
  label: string;
  /** Absolute path (from site root) of the 1200x630 social preview image. */
  ogImage: string;
  ogImageAlt: string;
}

export interface FaqItem {
  question: string;
  /** Plain-text answer. Also used verbatim in FAQPage structured data. */
  answer: string;
}

export type ScreenName =
  | 'review'
  | 'export'
  | 'image'
  | 'model'
  | 'pdf'
  | 'list'
  | 'filter'
  | 'semantic'
  | 'share-security'
  | 'watermark-editor'
  | 'public-share'
  | 'public-share-file'
  | 'kanban'
  | 'chat-session'
  | 'agents'
  | 'dashboard';

export interface ScreenInfo {
  name: ScreenName;
  alt: string;
  /** Intrinsic aspect ratio of the capture (width / height). */
  width: number;
  height: number;
  /** Path shown in the fake browser address bar. */
  urlPath: string;
}

export type ShowcaseKey =
  | 'self-hosted'
  | 'video-review'
  | 'file-formats'
  | 'metadata'
  | 'semantic-search'
  | 'share-links'
  | 'kanban'
  | 'ai-agent';

export interface DetailBlock {
  title: string;
  body: string;
  bullets?: string[];
  screen?: ScreenName;
  docs?: { label: string; href: string };
}

export interface FeaturePageContent {
  key: Exclude<RouteKey, 'home'>;
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: string[];
  showcase: ShowcaseKey;
  details: DetailBlock[];
  faqs: FaqItem[];
  related: RouteKey[];
}
