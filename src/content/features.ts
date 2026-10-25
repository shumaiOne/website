import type { FeaturePageContent, RouteKey } from '../types';
import { docsLink } from './site';

export const FEATURE_PAGES: Record<Exclude<RouteKey, 'home'>, FeaturePageContent> = {
  'self-hosted': {
    key: 'self-hosted',
    eyebrow: 'Self-hosting',
    h1: 'Self-hosted media review that runs on your hardware',
    intro:
      'Shumai is a single open-source app you deploy yourself. Your footage, comments, and client links stay on servers and storage you control, with no seat limits, no storage tiers, and nothing phoning home.',
    highlights: [
      'One Docker Compose command to install',
      'Local disk or any S3-compatible storage',
      'GPU transcoding with NVENC, QuickSync, VA-API, or RKMPP',
      'Add transcode workers on demand, scale back to zero',
    ],
    showcase: 'self-hosted',
    details: [
      {
        title: 'Pick a deployment that fits your machine',
        body: 'Start with the Lite Compose file on a 2 GB box, add the local embedding server for semantic search on 4 GB, or run the Full stack with 3D turntables and document previews on 8 GB. Prefer bare metal? Install from NPM. Running a fleet? Use the Kubernetes example.',
        bullets: [
          'Lite: Shumai + PostgreSQL (2 GB RAM suggested)',
          'Embedding: adds local multimodal semantic search (4 GB RAM)',
          'Full: adds 3D turntable rendering and Gotenberg document previews (8 GB RAM)',
        ],
        docs: { label: 'Quickstart guide', href: docsLink('getting-started/quickstart') },
      },
      {
        title: 'Keep media where you want it',
        body: 'Store originals on the bundled local storage or point Shumai at AWS S3, Cloudflare R2, MinIO, or any S3-compatible service. Shumai always preserves the original file and generates its own proxies, posters, and sprites next to it.',
        docs: { label: 'S3 storage setup', href: docsLink('getting-started/s3-storage') },
      },
      {
        title: 'Scale transcoding without downtime',
        body: 'Large batches and raw camera files no longer block the queue. Start extra shumai-transcode workers on any machine that can reach your database and storage, and stop them when the backlog clears. Background jobs run on DBOS durable workflows in your existing PostgreSQL, so they recover automatically after a restart.',
        bullets: [
          'Dedicated shumaione/shumai-transcode Docker image',
          'AWS EKS example with KEDA queue-driven autoscaling and scale to zero',
          'Hardware decode and GPU scaling for NVIDIA, Intel, AMD, and Rockchip',
        ],
        docs: { label: 'Distributed workers', href: docsLink('configuration/distributed') },
      },
      {
        title: 'Own the whole stack',
        body: 'Shumai is MIT licensed. Read the code, fork it, and run it behind your own firewall or VPN. There is no telemetry and no license server, and AI features stay off unless you connect a model provider yourself.',
        screen: 'dashboard',
      },
    ],
    faqs: [
      {
        question: 'What are the minimum requirements to self-host Shumai?',
        answer:
          'The Lite Docker Compose setup runs Shumai and PostgreSQL and is suggested for machines with 2 GB of RAM or more. Semantic search needs about 4 GB, and the Full setup with 3D and document previews needs about 8 GB.',
      },
      {
        question: 'Does Shumai send any data to third parties?',
        answer:
          'No. Shumai has no telemetry. Your media stays on your own disks or S3 bucket. The only outbound calls are to services you configure yourself, such as an AI model provider.',
      },
      {
        question: 'Can Shumai use GPU hardware transcoding?',
        answer:
          'Yes. Shumai supports hardware decoding and GPU scaling with NVIDIA NVENC, Intel QuickSync, VA-API on Intel and AMD GPUs, and Rockchip RKMPP. CPU software transcoding is the default.',
      },
      {
        question: 'How do I scale Shumai for large uploads?',
        answer:
          'Run additional shumai-transcode worker containers that connect to the same database and storage. They pick up queued jobs automatically. On Kubernetes, the EKS example autoscales workers with KEDA and scales to zero when idle.',
      },
    ],
    related: ['frame-io-alternative', 'video-review', 'semantic-search'],
  },

  'frame-io-alternative': {
    key: 'frame-io-alternative',
    eyebrow: 'Compare',
    h1: 'The open-source Frame.io alternative you host yourself',
    intro:
      'Shumai covers the review workflow creative teams rely on in Frame.io, including timecoded comments, annotations, version stacks, share links, and NLE export. It runs on your own infrastructure under the MIT license, so you are not paying per seat or renting storage.',
    highlights: [
      'MIT licensed and free to self-host',
      'No per-seat pricing or storage caps',
      'Frame-accurate comments and NLE export',
      '3D, semantic search, kanban, and an AI agent built in',
    ],
    showcase: 'video-review',
    details: [
      {
        title: 'Everything you use for review, without the subscription',
        body: 'Upload video, stills, and documents, leave frame-accurate comments with on-frame drawings, stack versions and compare them side by side, then export the notes to your editor. Clients review through share links without creating an account.',
        screen: 'export',
        docs: { label: 'Comments documentation', href: docsLink('using-shumai/comments') },
      },
      {
        title: 'Client sharing with real protection',
        body: 'Password-protected, expiring share links with downloads switched off are available on every install. Watermarks with text and logo blocks are burned into the files your client streams, and you can save as many watermark templates as you need.',
        screen: 'watermark-editor',
        docs: { label: 'Share links documentation', href: docsLink('using-shumai/share-links') },
      },
      {
        title: 'More than review',
        body: 'Shumai adds tools you would otherwise buy separately: a production kanban board, custom metadata with smart collections, semantic search that runs on your own server, and an optional AI agent you can @mention like a teammate.',
        screen: 'kanban',
      },
      {
        title: 'Where Frame.io may still be the better fit',
        body: 'Frame.io is a managed cloud service with features Shumai does not offer today, such as Camera to Cloud, native iOS and tvOS apps, SAML single sign-on, and range-based comments. If you need those, or you do not want to run your own server, Frame.io is a reasonable choice.',
      },
    ],
    faqs: [
      {
        question: 'Is Shumai a free alternative to Frame.io?',
        answer:
          'Yes. Shumai is open source under the MIT license and free to self-host with unlimited users and projects. You only pay for the server and storage you choose to run it on.',
      },
      {
        question: 'Can I migrate my team from Frame.io to Shumai?',
        answer:
          'Download your media from Frame.io and upload it to Shumai through the web app or the Shumai CLI, which can upload whole folders and create new versions from the terminal.',
      },
      {
        question: 'Does Shumai export comments to Premiere Pro and DaVinci Resolve?',
        answer:
          'Yes. Comments export as Premiere Pro XML, DaVinci Resolve EDL, Final Cut Pro 10.4+ files, and Avid Media Composer XML. An experimental Premiere Pro panel can also sync comments to sequence markers.',
      },
    ],
    related: ['self-hosted', 'video-review', 'share-links'],
  },

  'video-review': {
    key: 'video-review',
    eyebrow: 'Review & approval',
    h1: 'Frame-accurate video review with on-frame markup',
    intro:
      'Pause on the exact frame, draw what you mean, and leave a comment that is pinned to that timecode. Everyone on the thread, including clients on a share link, sees the same frame and the same markup.',
    highlights: [
      'Timecoded comments with frame stepping',
      'Boxes, arrows, lines, and freehand drawing',
      'Replies, @mentions, reactions, and resolve',
      'Export to Premiere Pro, Resolve, FCP, and Avid',
    ],
    showcase: 'video-review',
    details: [
      {
        title: 'Comments that land on the right frame',
        body: 'Every comment captures the playhead position automatically. Step frame by frame with the arrow keys, and select a comment to bring back its frame and markup.',
        bullets: [
          'Draw boxes, arrows, lines, or freehand in nine colors',
          'Threaded replies with @mentions and emoji reactions',
          'Mark comments complete as fixes land',
          'Attach reference files to any comment',
        ],
        docs: { label: 'Comments documentation', href: docsLink('using-shumai/comments') },
      },
      {
        title: 'Hand notes straight to the edit',
        body: 'Export a cut’s comments as Premiere Pro XML, DaVinci Resolve EDL, Final Cut Pro 10.4+ (.fiojson), or Avid Media Composer XML with correct timecode, including drop-frame rates. The experimental Premiere Pro panel imports media and syncs comments to sequence markers.',
        screen: 'export',
        docs: {
          label: 'NLE export & Premiere panel',
          href: docsLink('using-shumai/nle-and-premiere'),
        },
      },
      {
        title: 'Version stacks and side-by-side compare',
        body: 'Stack new cuts on top of old ones so feedback history stays in one place, then open any two versions side by side to check exactly what changed.',
        docs: { label: 'Version stacks', href: docsLink('using-shumai/version-stack') },
      },
      {
        title: 'Built for real footage',
        body: 'Shumai keeps your original file and creates streaming proxies, hover-scrub sprites, and a poster for each video, plus an optional adaptive HLS rendition. Hardware transcoding keeps large camera files moving.',
        docs: { label: 'Transcode settings', href: docsLink('using-shumai/transcode-settings') },
      },
    ],
    faqs: [
      {
        question: 'Can clients comment on videos without a Shumai account?',
        answer:
          'Yes. Anyone with a share link can watch and leave timecoded comments as a guest by entering their name. You can protect the link with a password and an expiry date.',
      },
      {
        question: 'Which drawing tools are available on video frames?',
        answer:
          'Shumai supports boxes, arrows, straight lines, and freehand drawing in nine colors, with undo and redo. The same tools work on images, PDF pages, and 3D turntables.',
      },
      {
        question: 'Can I compare two versions of a video?',
        answer:
          'Yes. Group cuts into a version stack and open any two video or image versions side by side in the compare viewer.',
      },
    ],
    related: ['file-formats', 'share-links', 'ai-agent'],
  },

  'file-formats': {
    key: 'file-formats',
    eyebrow: 'File formats',
    h1: 'Review video, stills, 3D models, and documents in one place',
    intro:
      'Creative work is not only video. Shumai previews and accepts comments on images, Photoshop files, camera RAW, audio, 3D models, PDFs, and Office documents, and stores any other file type you upload.',
    highlights: [
      'Video and audio with browser-ready streaming proxies',
      'PSD and camera RAW previews at full resolution',
      '3D turntables for GLB, FBX, OBJ, STL, USD, and DAE',
      'Office, Markdown, HTML, and CSV converted to PDF',
    ],
    showcase: 'file-formats',
    details: [
      {
        title: 'Video and audio, ready to review',
        body: 'Upload MP4, MOV, MKV, or WebM video, or audio such as MP3, WAV, FLAC, and AAC. Shumai keeps the original and transcodes a browser-ready proxy. Videos also get hover-scrub sprites, a poster, and an optional adaptive HLS rendition, so long camera files play smoothly with frame-accurate comments.',
        docs: { label: 'Transcode settings', href: docsLink('using-shumai/transcode-settings') },
      },
      {
        title: 'Stills, PSD, and camera RAW',
        body: 'Shumai generates a full-resolution WebP proxy for every image, including layered Photoshop files and RAW formats from Canon, Nikon, Sony, Fujifilm, and more, so reviewers never need the original software.',
        screen: 'image',
      },
      {
        title: '3D models with angle-pinned feedback',
        body: 'Upload a model and Shumai renders a 360° turntable you can drag to rotate. Comments and markup are pinned to the viewing angle, so “the tail looks flat at 90°” means the same thing to everyone.',
        bullets: [
          'GLB, FBX, OBJ, STL, DAE',
          'USD, USDA, USDC, and USDZ',
          'Hover scrubbing in the file browser',
        ],
        screen: 'model',
        docs: { label: '3D asset support', href: docsLink('using-shumai/3d-asset-support') },
      },
      {
        title: 'Scripts, decks, and briefs',
        body: 'Word, Excel, PowerPoint, OpenDocument, RTF, Markdown, HTML, and CSV files are converted to PDF through Gotenberg. Reviewers comment and draw on individual pages with the same tools used for video.',
        screen: 'pdf',
        docs: {
          label: 'Document previews with Gotenberg',
          href: docsLink('using-shumai/gotenberg'),
        },
      },
    ],
    faqs: [
      {
        question: 'Which 3D formats does Shumai support?',
        answer:
          'Shumai renders turntable previews for GLB, FBX, OBJ, STL, DAE, and USD files including USDA, USDC, and USDZ.',
      },
      {
        question: 'Can I upload file types Shumai cannot preview?',
        answer:
          'Yes. Any file type can be uploaded, organized, versioned, and shared. Previews are generated for supported video, audio, image, 3D, and document formats.',
      },
      {
        question: 'Does Shumai support camera RAW files?',
        answer:
          'Yes. Shumai decodes common RAW formats such as CR2, CR3, NEF, ARW, RAF, ORF, RW2, and DNG and creates full-resolution previews.',
      },
    ],
    related: ['video-review', 'semantic-search', 'metadata'],
  },

  metadata: {
    key: 'metadata',
    eyebrow: 'Metadata & collections',
    h1: 'Custom metadata fields and smart collections for every asset',
    intro:
      'Shape Shumai around your pipeline. Add the fields your team actually tracks, edit them inline in the grid or list view, and filter the whole project by any combination of values.',
    highlights: [
      'Ten field types, from select to user',
      'Inline editing in grid and list views',
      'AND / OR filters on any field',
      'Save filters as live smart collections',
    ],
    showcase: 'metadata',
    details: [
      {
        title: 'Fields that match your workflow',
        body: 'Create team-wide or project-specific fields and choose from text, long text, number, rating, single select, multi-select, date, toggle, user, and multi-user. Built-in status and rating fields are ready to use, and technical metadata such as codec, resolution, frame rate, and duration is filled in automatically.',
        screen: 'list',
        docs: { label: 'Metadata documentation', href: docsLink('using-shumai/metadata') },
      },
      {
        title: 'Filter, then save as a collection',
        body: 'Combine conditions like “Status is Approved and Shot Type is Hero and Rating is at least four stars”, search recursively through every folder, and save the result as a collection that updates as assets change.',
        docs: { label: 'Collections documentation', href: docsLink('using-shumai/collections') },
      },
      {
        title: 'Let AI fill in the blanks (optional)',
        body: 'Mark a field for autofill and an autofill agent can populate it from the asset’s content or from the task it was uploaded for. Share links can show or hide each field for clients.',
      },
    ],
    faqs: [
      {
        question: 'What custom field types does Shumai support?',
        answer:
          'Text, long text, number, rating, single select, multi-select, date, toggle, user, and multi-user fields. Select options can be color coded.',
      },
      {
        question: 'Can I filter assets by custom metadata?',
        answer:
          'Yes. Build filters with AND or OR logic on any built-in or custom field, using operators such as is, contains, greater than, has any, and is within a date range, then save them as collections.',
      },
    ],
    related: ['semantic-search', 'kanban', 'share-links'],
  },

  'semantic-search': {
    key: 'semantic-search',
    eyebrow: 'Semantic search',
    h1: 'Find any shot by describing it',
    intro:
      'Type what you remember, not what the file was called. Shumai indexes your video, images, and 3D models with multimodal embeddings and returns the closest matches, including the time range inside each video.',
    highlights: [
      'Search by meaning across video, images, and 3D',
      'Matching time ranges inside long clips',
      'Runs locally with the bundled embedding server',
      'Combine with metadata filters',
    ],
    showcase: 'semantic-search',
    details: [
      {
        title: 'Private by design',
        body: 'The embedding Docker Compose tier ships a local embedding server built on EmbeddingGemma, so your footage is indexed on your own hardware. Teams that prefer a hosted model can switch to Gemini embeddings instead.',
        docs: { label: 'Embedding server', href: docsLink('using-shumai/embedding-server') },
      },
      {
        title: 'Video-aware results',
        body: 'Long clips are embedded in chunks, so a search for “chef plating food with fresh herbs” jumps to the seconds where it happens. Results show hover-scrub previews and open in a new tab.',
        docs: {
          label: 'Semantic search documentation',
          href: docsLink('using-shumai/semantic-search'),
        },
      },
      {
        title: 'Search plus structure',
        body: 'Semantic queries can be combined with metadata conditions and saved as collections, so “approved hero shots that look like golden hour” is one click away next time.',
        screen: 'filter',
      },
    ],
    faqs: [
      {
        question: 'Does semantic search send my media to the cloud?',
        answer:
          'Not if you use the local embedding server included in the embedding and full Docker Compose setups. Embeddings are generated and stored on your own infrastructure with pgvector.',
      },
      {
        question: 'Which file types are indexed for semantic search?',
        answer:
          'Images, video (in time-based chunks), and 3D models through their turntable views are embedded. Existing libraries can be re-indexed with the shumai regenerate-embeddings command.',
      },
    ],
    related: ['metadata', 'file-formats', 'ai-agent'],
  },

  'share-links': {
    key: 'share-links',
    eyebrow: 'Secure sharing',
    h1: 'Watermarked, password-protected share links for clients',
    intro:
      'Send work for review without sending files. Share links give clients a clean viewer with commenting, while you decide who can open it, for how long, and whether anything can be downloaded.',
    highlights: [
      'Passwords and expiry dates',
      'Turn downloads off per link',
      'Text and logo watermarks burned into the media',
      'Unlimited reusable watermark templates',
    ],
    showcase: 'share-links',
    details: [
      {
        title: 'Control every link',
        body: 'Toggle a link on or off, protect it with a password, set an expiration date, disable downloads, pick card or list layout, set the default sort, and choose which metadata fields guests can see.',
        screen: 'share-security',
        docs: { label: 'Share links documentation', href: docsLink('using-shumai/share-links') },
      },
      {
        title: 'Watermarks that cannot be stripped in the browser',
        body: 'Design watermarks from text and image blocks with position, size, rotation, and opacity controls. Shumai renders the watermark into new video and image files on the server, so the client streams pixels that already carry your mark.',
        screen: 'watermark-editor',
      },
      {
        title: 'A review page clients understand',
        body: 'Guests browse the shared folder, play media in the full Shumai viewer, and leave timecoded comments with markup after entering their name. No account or app install is required.',
        screen: 'public-share',
      },
    ],
    faqs: [
      {
        question: 'How do Shumai watermarks work?',
        answer:
          'Watermarks are rendered into new video and image renditions on your server, and share link viewers are served those renditions, so the watermark is part of the media rather than a removable overlay.',
      },
      {
        question: 'Can I stop clients from downloading files?',
        answer:
          'Yes. Each share link has an allow-download switch. Turn it off and the download buttons are removed for that link.',
      },
    ],
    related: ['video-review', 'metadata', 'frame-io-alternative'],
  },

  kanban: {
    key: 'kanban',
    eyebrow: 'Kanban',
    h1: 'Kanban task management next to your media',
    intro:
      'Plan the production where the work lives. Shumai’s built-in board tracks every task from to-do to done, links tasks to the exact assets they are about, and keeps a full activity history.',
    highlights: [
      'Six stages from To Do to Done',
      'Goals, priorities, and due dates',
      'Task dependencies and linked assets',
      'Activity history and notifications',
    ],
    showcase: 'kanban',
    details: [
      {
        title: 'One board for the whole team',
        body: 'Organize tasks under goals such as a campaign or a deliverable set, move them through To Do, Ready, In Progress, Blocked, In Review, and Done, and switch between team tasks and your own.',
      },
      {
        title: 'Tasks that point at the work',
        body: 'Link tasks to files or folders, set a target folder, add parent and child dependencies, and comment on the task itself. Linked assets open directly in the viewer.',
      },
      {
        title: 'Know what changed',
        body: 'Every status change, assignment, priority update, and comment is recorded in the task history, and teammates get in-app and email notifications when something needs them.',
        docs: { label: 'Notifications', href: docsLink('using-shumai/notifications') },
      },
    ],
    faqs: [
      {
        question: 'Does Shumai include project management?',
        answer:
          'Yes. Every team has a kanban board with goals, priorities (low to urgent), start and due dates, assignees, dependencies, linked assets, task comments, and an activity history.',
      },
      {
        question: 'Can kanban tasks be linked to videos and images?',
        answer:
          'Yes. Link any number of files or folders to a task, and open them from the task or see linked tasks from the asset.',
      },
    ],
    related: ['metadata', 'video-review', 'ai-agent'],
  },

  'ai-agent': {
    key: 'ai-agent',
    eyebrow: 'Shumai Agent',
    h1: 'An AI teammate that can see your video, images, and 3D',
    intro:
      'Mention the Shumai Agent in any comment thread or chat with it one-to-one. It looks at the frame, image, or turntable angle you are discussing, follows your markup, and answers in the thread. AI is optional: if you do not need it, leave it off.',
    highlights: [
      '@mention it in comments like a teammate',
      'Private one-to-one chat with file context',
      'Bring your own model provider',
      'Skills, MCP servers, sandbox, and quotas',
    ],
    showcase: 'ai-agent',
    details: [
      {
        title: 'Ask about the exact frame',
        body: 'When you @mention an agent, it receives the asset, the timecode or angle, and your drawn annotations, then replies in the thread. Mention it again in the same thread and it continues the conversation with full context.',
        docs: { label: 'Agents documentation', href: docsLink('using-shumai/agents') },
      },
      {
        title: 'Chat one-to-one about your project',
        body: 'Open the agent sidebar from any folder or file, drop in assets for context, and ask for cut suggestions, shot lists, or a summary of feedback. Tool calls such as listing and reading assets are shown in the conversation.',
      },
      {
        title: 'Your models, your rules',
        body: 'Connect OpenAI, Anthropic, Gemini, or any OpenAI-compatible endpoint, including a local model server. Give each agent a persona, skills, and remote MCP tools, run scripts in an isolated sandbox, and set token, cost, and tool-call quotas per member or role.',
        screen: 'agents',
        docs: { label: 'AI providers', href: docsLink('using-shumai/agent-providers') },
      },
      {
        title: 'Accountable by default',
        body: 'You choose which roles can invoke each agent and which tools it may not use (deleting assets is denied by default). Every agent action is written to the audit log, and the dashboard tracks AI token usage and cost per member.',
        screen: 'dashboard',
        docs: { label: 'Quotas', href: docsLink('using-shumai/quotas-settings') },
      },
    ],
    faqs: [
      {
        question: 'Is the AI agent required to use Shumai?',
        answer:
          'No. Shumai works as a complete review and asset management tool without AI. Agents only run if a team owner configures a model provider.',
      },
      {
        question: 'Which AI models can the Shumai Agent use?',
        answer:
          'Any model available through OpenAI, Anthropic, Gemini, or an OpenAI-compatible API such as a local Ollama server. Vision-capable models can analyze video frames, images, and 3D turntable views.',
      },
      {
        question: 'Can I limit how much my team spends on AI?',
        answer:
          'Yes. Quota rules cap tokens, cost, and tool, MCP, or sandbox calls per member, per role, or team-wide over 1-hour to 7-day windows, with usage shown in the dashboard.',
      },
    ],
    related: ['video-review', 'semantic-search', 'self-hosted'],
  },
};
