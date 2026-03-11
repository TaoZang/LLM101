# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LLM 101 — a bilingual (zh/en) knowledge base website for developers learning AI/LLM concepts. Built with Next.js (App Router) + Tailwind CSS, deployed on Vercel.

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — serve production build

## Architecture

### Routing & i18n

Uses `next-intl` with `[locale]` dynamic segment. Default locale is `zh`. Routes:

- `/[locale]` — homepage with track overview
- `/[locale]/tracks` — all learning tracks
- `/[locale]/tracks/[slug]` — track detail with lesson list
- `/[locale]/tracks/[slug]/[lesson]` — lesson page (MDX rendered)
- `/[locale]/glossary` — terminology reference
- `/[locale]/about` — about page

i18n config lives in `src/i18n/` (routing, request, navigation). UI strings are in `messages/{locale}.json`.

### Content System

Content is MDX files under `content/{locale}/tracks/{track-slug}/`. Each MDX file has frontmatter:

```yaml
title: "Lesson Title"
order: 1
tags: ["tag1"]
prerequisites: ["other-lesson-slug"]
```

File naming: `{order}-{slug}.mdx` (e.g., `01-what-is-llm.mdx`). The slug used in URLs is derived by stripping the numeric prefix.

Content loading: `src/lib/content.ts` reads the filesystem at build time. `src/lib/tracks.ts` defines track metadata (titles, descriptions) for both locales.

### Learning Tracks

1. `foundations` — LLM core concepts
2. `local-models` — running models locally (Ollama, llama.cpp)
3. `prompt-engineering` — prompting techniques
4. `rag` — retrieval-augmented generation
5. `fine-tuning` — model fine-tuning
6. `agents` — AI agents and tool use

### Adding Content

To add a new lesson: create `content/{zh,en}/tracks/{track}/NN-slug.mdx` with frontmatter. It will appear automatically — no code changes needed.

### Key Directories

- `src/app/[locale]/` — Next.js pages
- `src/components/` — shared UI components
- `src/lib/` — content loading, track definitions
- `content/` — all MDX content, organized by locale and track
- `messages/` — UI translation strings

### Design

Light theme: `stone-50` background, `stone-900` text, `white` cards with `stone-200` borders. Each track has an assigned accent color defined in `src/lib/tracks.ts`.
