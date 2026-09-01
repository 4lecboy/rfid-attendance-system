# Code Standards & Conventions

## 1. TypeScript & Typing
- Strict mode enabled (`"strict": true` in `tsconfig.json`).
- Zero `any` types permitted. Use explicit interfaces or Supabase generated database types (`Database['public']['Tables']`).
- Place shared types in `/types/index.ts` or domain-specific files (`/types/attendance.ts`).

## 2. Next.js App Router Patterns
- **Server Components by Default:** Fetch data inside React Server Components (`RSC`) wherever interactivity is not required.
- **Client Components (`'use client'`):** Reserved strictly for user interactions (e.g., Kiosk HID input listeners, simulator state, modals, interactive data tables).
- **Route Handlers (`/app/api/...`):**
  - Must validate request schemas using `zod`.
  - Must return structured JSON responses: `{ success: boolean, data?: any, error?: string }`.
  - All scan logic lives in `/app/api/scan/route.ts`.

## 3. Directory Structure
```text
/app
  /(auth)
    /login/page.tsx
  /(dashboard)
    /dashboard
      /layout.tsx
      /live/page.tsx
      /attendance/page.tsx
      /employees/page.tsx
      /cards/page.tsx
  /kiosk
    /page.tsx
  /api
    /scan/route.ts
    /export/route.ts
/components
  /ui             # Reusable design primitives (shadcn/ui)
  /kiosk          # Kiosk screen, scanner visualizer, simulator tray
  /dashboard      # Table views, stats cards, realtime feed components
/lib
  /supabase       # Client, Server, and Middleware Supabase helpers
  /utils.ts       # Timestamp, duration, formatting utilities
/types            # TypeScript definitions
/context          # Six-File Context System specifications
```

## 4. HID Keyboard Listener Standard
- The kiosk screen listens for continuous standard keyboard input terminated by an `Enter` key (standard RFID scanner behavior).
- Buffer resets automatically after 100ms of inactivity to prevent partial/stale key accumulation.