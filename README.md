# ☕ Java Quest

A daily Java learning game. Each topic = 1 concept + 3 exercises (easy → medium → hard) + 3 review questions. Built for streaks.

- **Stack:** Next.js 15 · TypeScript · Tailwind · Monaco editor · Framer Motion
- **Code execution:** Judge0 (preferred) → public Codex → public Piston (with manual-output fallback)
- **Storage:** localStorage only — no backend, no signup

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, accept the default Next.js settings.
3. (Recommended) Add a code-runner key for in-browser Java execution:
   - Sign up at [rapidapi.com/judge0-official/api/judge0-ce](https://rapidapi.com/judge0-official/api/judge0-ce) (free tier).
   - In Vercel → Project → Settings → Environment Variables, add:
     - `JUDGE0_API_KEY` = your RapidAPI key
     - `JUDGE0_API_HOST` = `judge0-ce.p.rapidapi.com` *(optional — already the default)*
   - Redeploy. The "▶ Run" button on exercises will now hit a real JDK.

Without a key, exercises still work — the runner falls back to public APIs, and if those are down, users can paste their output manually to verify.

## Adding a new topic

1. Create `src/content/topics/NN-slug.ts` with a `Topic` export ([see examples](src/content/topics/01-variables.ts)).
2. Append it to the `TOPICS` array in [`src/content/topics/index.ts`](src/content/topics/index.ts).
3. Done — the route, grid card, and progress tracking pick it up automatically.

Each topic needs:
- Concept markdown (and optional YouTube embed URL)
- 3 exercises: one **predict**, one **write**, one **debug** (easy / medium / hard difficulties)
- 3 review questions (multiple choice, easy / medium / hard)

## Project layout

```
src/
  app/                  Routes
    page.tsx            home / topic grid
    topics/[slug]/      individual topic page
    api/run/            code-runner proxy (Judge0 → Codex → Piston)
  components/           Nav, TopicGrid, TopicView, CodeEditor, ExerciseCard, ReviewCard, Markdown
  content/topics/       The 10 starter topics + index
  lib/
    types.ts            Topic / Exercise / ReviewQuestion shapes
    progress.ts         localStorage-backed XP, streak, completion tracking
```
