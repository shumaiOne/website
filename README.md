# shumai-web

This is the website of [shumai.one](https://shumai.one).

## Development

This project is built using React 19, Vite, Tailwind CSS, and TypeScript, running on the **Bun** runtime.

### Setup & Local Run

1. **Install dependencies**:
   ```bash
   bun install
   ```
2. **Configure environment**:
   Set `GEMINI_API_KEY` in `.env.local`
3. **Start local development server**:
   ```bash
   bun run dev
   ```

### Quality Assurance

This repository uses **Biome** for formatting, linting, and import organization.
Before committing changes, make sure all validations pass:
```bash
bun run validate
```
