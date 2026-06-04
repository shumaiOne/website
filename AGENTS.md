# Project Guidelines & Rules (`AGENTS.md`)

This document defines the architecture, design patterns, coding standards, and submission guidelines for all developers and AI agents working on the **shumai-web** repository.

---

## 🎨 Design & Coding Rules

### 1. Technology Stack & Directory Structure
* **Runtime & Package Manager**: Bun is the standard runtime and package manager. Use `bun` commands instead of `npm`.
* **Framework**: React 19 (Functional Components, Hooks).
* **Styling**: Tailwind CSS. Keep styles clean, modern, and aligned with modern web standards (e.g., tailored color palettes, subtle shadows, transition effects, responsive design).
* **Directory Layout**:
  * `src/components/`: Reusable, modular UI components.
  * `src/App.tsx`: Main page layout and primary React component.
  * `src/main.tsx`: React DOM mounting.
  * `src/types.ts`: Shared TypeScript types.
  * `assets/`: Static image/media files.

### 2. TypeScript & Code Standards
* **Strict Typing**: Avoid using `any`. Explicitly type function parameters, return values, and component props.
* **Imports**: Use ES Modules. Keep imports clean and organized. Imports are automatically structured and cleaned via Biome (`biome check`).
* **Linter & Formatter**: Biome is used for code quality, styling, and formatting. Do not use ESLint or Prettier.
* **Component Patterns**:
  * Prefer functional components with Arrow Functions: `const MyComponent: React.FC<Props> = (...) => { ... }` or standard functions: `export function MyComponent(props: Props) { ... }`.
  * Define props interface/type right above the component.
  * Use proper React hook dependencies (no missing values, no stale closures).

### 3. Styling & Aesthetics
* **Rich UX**: Use smooth hover states (`hover:scale-[1.02]`, `transition-all duration-300`).
* **Consistent Colors**: Use curated, harmonic Tailwind color schemes. Avoid plain primary colors.
* **No Placeholders**: Use working assets, actual SVGs, or Lucide icons instead of layout placeholders.

---

## 🚀 Submit & Git Rules

### 1. Pre-Submit Checks
Before pushing any commit or submitting a pull request, you **MUST** run the validation suite locally. If any check fails, do not commit.
```bash
bun run validate
```
This script runs:
1. **Biome check**: Lints and formats all files (`biome check .`).
2. **Typecheck**: Checks TypeScript compilation (`tsc --noEmit`).
3. **Build**: Ensures the project builds successfully (`vite build`).

### 2. Commit Message Conventions
Commits must follow the **Conventional Commits** standard:
* `feat`: A new feature (e.g., `feat: add model selector dropdown`)
* `fix`: A bug fix (e.g., `fix: resolve mobile navigation overflow`)
* `chore`: Maintenance tasks (e.g., `chore: update biome dependencies`)
* `docs`: Documentation updates (e.g., `docs: update agents.md guidelines`)
* `style`: Styling or formatting changes (e.g., `style: run biome check --write`)
* `refactor`: Code restructuring without behavior changes
* `ci`: GitHub Actions configuration changes

### 3. Pull Request Requirements
* Every PR must pass the GitHub CI validation suite.
* Ensure code is clean, debug `console.log` statements are removed, and unused imports are cleaned up.
