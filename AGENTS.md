<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CLAUDE.md — Project Guide & Agent Instructions

## 1. Project Overview
RFID Attendance System: A full-stack Next.js and Supabase web app for high-volume employee attendance tracking via physical USB RFID scanners (HID emulation) and an on-screen portfolio simulator.

## 2. Commands Cheat Sheet
- `npm run dev` — Start development server (port 3000)
- `npm run build` — Verify production build
- `npm run lint` — Run ESLint check
- `npx tsc --noEmit` — Run TypeScript compiler verification

## 3. Strict Operating Rules
1. **Context-Driven:** Always inspect files in `/context` before planning code edits.
2. **One Unit at a Time:** Build according to the ordered units in `context/progress-tracker.md`.
3. **Preserve Database Invariants:** No duplicate active shifts, enforce 120s debounce on identical RFID scans, and handle overnight shifts gracefully.
4. **No Placeholders:** Write full, production-ready TypeScript code with proper error handling and Zod validation.

## 4. Key Paths
- Kiosk & Scanner Page: `/app/kiosk/page.tsx`
- Scan Processing Endpoint: `/app/api/scan/route.ts`
- Live Dashboard Feed: `/app/(dashboard)/dashboard/live/page.tsx`
- Supabase Server Helpers: `/lib/supabase/`

Do not use Single barrel file for importing types across the codebase
