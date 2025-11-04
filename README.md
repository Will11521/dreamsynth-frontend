# DreamSynth Waitlist

DreamSynth’s landing experience rebuilt as a waitlist-first funnel. The stack pairs Next.js App Router + TypeScript with Tailwind, shadcn/ui primitives, Framer Motion, next-seo, and Vercel Analytics.

## Quick Start
- Install dependencies: `npm install`
- Local development: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Production build: `npm run build && npm run start`

## Environment & Backend
1. Copy `.env.example` to `.env.local` (development template included in repo).
2. Fill `.env.local` (defaults assume localhost):
   ```bash
   SUPABASE_URL=
   SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE=
   FORMSPREE_URL=
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   For production, use `.env.production` (included) with `NEXT_PUBLIC_SITE_URL=https://dreamsynth.app` and add whichever backend values you deploy with.
3. Choose a submission backend:
   - **Supabase (primary)** – set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` (server-only). `SUPABASE_ANON_KEY` is optional for future client features. The waitlist API uses the service role to upsert `email`, tag `source: "web"`, and refresh timestamps server-side.
   - **Formspree (fallback)** – leave Supabase variables empty and set `FORMSPREE_URL` to your Formspree endpoint (e.g. `https://formspree.io/f/xxxxxx`). The API will forward the payload with the same success shape as Supabase.
4. Lock requests to your production origin by setting `NEXT_PUBLIC_SITE_URL=https://your-domain.tld`. When unset, local development accepts any origin.

Switching between Supabase and Formspree only requires toggling environment variables—no code edits.

## Supabase SQL
```sql
create extension if not exists pgcrypto;
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'web',
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
create policy "block_all" on public.waitlist for all using (false) with check (false);
```
> Note: the API uses the Supabase service-role key server-side, so row level security stays strict.

## Security & Reliability
- Zod validation normalises and checks the incoming `{ email, token }` payload before any persistence.
- Honeypot field short-circuits obvious bots without punishing real visitors.
- Per-IP token bucket (5 requests / 60 seconds) returns a 429 when callers misbehave.
- Optional origin allowlist keyed by `NEXT_PUBLIC_SITE_URL` blocks cross-site requests.
- All failures return `{ ok: false, message: "Please try again later." }`, avoiding information leaks.

## Design System & Experience
- Inter (body) and Playfair Display (serif headings) arrive via `next/font` CSS variables applied at the root.
- Tailwind exposes semantic tokens: `bg`, `ink`, `muted`, `accent`, plus the soft radial background + subtle noise texture.
- shadcn/ui-inspired primitives live in `components/ui/*`, using `class-variance-authority` + `tailwind-merge`.
- Sections animate with Framer Motion while respecting `prefers-reduced-motion`.
- `next-seo` default configuration and `metadata` ensure OG/Twitter tags with explicit og:image sizing; Vercel Analytics is injected in `app/layout.tsx`.

## Deployment (Vercel)
- Import the repo into Vercel and configure environment variables for Production/Preview:
  - Supabase keys **or** Formspree URL
  - Optional `NEXT_PUBLIC_SITE_URL`
- Keep the Supabase Service Role key scoped to Server and never expose the Anon/Service Role on the client.
- The build stays under the 250 KB JS budget (fonts excluded) and has no blocking network calls; Vercel Analytics is ready out-of-the-box.

## shadcn/ui Workflow
1. Initialise the CLI once: `npx shadcn-ui@latest init`.
2. Generate additional components as needed, e.g. `npx shadcn-ui@latest add alert`.
3. Drop generated files into `components/ui/`; Tailwind tokens and fonts already align.

## Project Structure
- `app/` – App Router routes, API handler, global layout.
- `components/` – layout primitives and composed UI.
- `components/ui/` – shadcn-style Button/Input/Card primitives.
- `lib/` – shared helpers (Supabase client, utilities).
- `public/` – static assets (favicon, OG image, noise texture, icons).
- `styles/` – Tailwind + global styles.

## Implementation Notes
- Kept from the original site: philosophy, promise line, Dreampool concept, roadmap framing.
- Changed: single primary CTA, tighter copy, accessible primitives, hardened API, and production-ready DX for scale.
