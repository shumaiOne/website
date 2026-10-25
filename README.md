# shumai-web

This is the website of [shumai.one](https://shumai.one).

## Development

This project is built using React 19, Vite, Tailwind CSS, and TypeScript, running on the **Bun** runtime.

### Setup & Local Run

1. **Install dependencies**:
   ```bash
   bun install
   ```
2. **Start local development server**:
   ```bash
   bun run dev
   ```

### Pages

All pages are prerendered to static HTML at build time (`scripts/prerender.tsx`). Page
routes, titles, and descriptions live in `src/content/routes.ts`; feature page copy lives in
`src/content/`. Product screenshots are stored in `public/screens/` as WebP at 960, 1600,
and 2400 px widths.

### Quality Assurance

This repository uses **Biome** for formatting, linting, and import organization.
Before committing changes, make sure all validations pass:
```bash
bun run validate
```
