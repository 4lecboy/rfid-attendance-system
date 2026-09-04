# Project Progress Tracker

## Current Status
- **Current Phase:** Unit 1 Complete → Ready for Unit 2
- **Active Unit:** Unit 2 — Kiosk & RFID Scan Engine
- **Blockers:** None

---

## Roadmap & Units Checklist

- [x] **Unit 1: Foundation & Database Schema**
  - Setup Next.js 16+ App Router project with Tailwind CSS and Lucide icons.
  - Setup Supabase project, schema tables, RLS policies, and triggers.
  - Create seed script with 25 BPO employees, departments, and active RFID cards.

- [ ] **Unit 2: Kiosk & RFID Scan Engine**
  - Create `/kiosk` UI with full-screen clock and scanner visualizer.
  - Implement HID keyboard listener with buffer debounce.
  - Create `/api/scan` handler with session pairing, overnight shift logic, and 16h auto-flagging.
  - Build collapsible interactive Portfolio Badge Simulator.

- [ ] **Unit 3: Realtime Security Feed**
  - Setup Supabase Realtime channel subscription for `attendance_logs`.
  - Build `/dashboard/live` showing instant visual scan alerts and live active headcount.

- [ ] **Unit 4: Employee & Card Management (HR/Admin)**
  - Build `/dashboard/employees` with table, search, department filters, and create/edit modal.
  - Build `/dashboard/cards` for IT Admins to pair RFID card UIDs to employees.
  - Setup Supabase Storage bucket for avatar uploads.

- [ ] **Unit 5: Attendance Reports & CSV Export**
  - Build `/dashboard/attendance` historical log grid with date-range filters.
  - Add resolution modal for flagged/incomplete records.
  - Implement `/api/export` generating formatted CSV attendance summaries.

- [ ] **Unit 6: Auth, Permissions & Demo Polish**
  - Configure Supabase Auth middleware protecting `/dashboard/*` by user role.
  - Add quick-login demo accounts helper on `/login`.
  - Add Web Audio feedback chimes on scan events.

---

## Open Decisions & Notes
- *Overnight Shifts:* Handled via session pairing (`check_out_time IS NULL`) rather than strict calendar dates.
- *Stale Sessions:* Auto-flagged if session duration exceeds 16 hours upon the next tap.