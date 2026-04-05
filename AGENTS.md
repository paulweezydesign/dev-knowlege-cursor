# AGENTS.md

## Project overview

Next.js 16 application with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (base-nova style). Uses pnpm as the package manager.

## Cursor Cloud specific instructions

### Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Language**: TypeScript 5
- **Package manager**: pnpm (lockfile: `pnpm-lock.yaml`)

### Common commands

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (runs on port 3000 with Turbopack) |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Production start | `pnpm start` |
| Add shadcn component | `pnpm dlx shadcn@latest add <component>` |

### Notes

- shadcn/ui config lives in `components.json` at the repo root. Components install to `src/components/ui/`.
- Tailwind v4 uses CSS-first configuration via `src/app/globals.css` — there is no `tailwind.config.ts`.
- Path alias `@/*` maps to `./src/*` (configured in `tsconfig.json`).
- The dev server uses Turbopack by default (via `next dev`). Hot reloading is fast; no restart needed for most source changes.
