@AGENTS.md

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