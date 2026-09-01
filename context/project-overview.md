# Project Overview: RFID Attendance System

## 1. Product Summary
The **RFID Attendance System** is a full-stack, enterprise-grade attendance management application designed for high-volume, 24/7 environments (e.g., BPO centers). It captures employee check-ins and check-outs via physical USB RFID readers (HID keyboard emulation mode) or an on-screen interactive portfolio simulator, pairing timestamps into completed shift sessions with overnight shift support and sub-second queue feedback.

## 2. Core Objectives
- Process rapid check-in/out lines for 1,000+ employees with zero UI lag and duplicate tap prevention.
- Seamlessly support overnight shifts (e.g., 10 PM to 7 AM) without breaking calendar-day boundaries.
- Provide role-specific workspaces for IT Administrators, HR Specialists, and Security Personnel.
- Showcase production-grade full-stack engineering in a portfolio environment via a built-in virtual badge simulator.

## 3. User Personas & Permissions
| Role | Access Level | Responsibilities |
|---|---|---|
| **Public / Kiosk** | Public screen (`/kiosk`) | Displays scanner ready-state, processes HID card input, runs card simulator |
| **Security** | Read-Only Authenticated | Monitors `/dashboard/live` stream of incoming/outgoing personnel |
| **HR** | Management Authenticated | Manages employee records, resolves incomplete sessions, exports CSV logs |
| **IT Admin** | Full System Control | All HR permissions + assigns/revokes RFID cards and configures system settings |

## 4. Key Workflows
### A. Scan Processing Flow
1. Employee taps physical RFID card or clicks a card in the demo simulator.
2. System intercepts the card UID and checks cooldown (2-minute debounce for same UID).
3. System searches for an open attendance session (`check_out_time IS NULL` within the last 16 hours).
   - If **no open session**: Creates new session with `check_in_time = NOW()`.
   - If **open session exists**: Updates session with `check_out_time = NOW()`, calculating `total_hours`.
   - If **stale open session (>16 hours)**: Marks old session as `missed_checkout = true` and opens a new session.
4. Kiosk triggers green audio chime, displays employee name/photo for 1.8 seconds, and returns to ready state.
5. Realtime event broadcasts to all active security and HR dashboard monitors.

### B. Portfolio Sandbox Flow
1. Public visitors access `/kiosk` with a collapsible demo tray of pre-seeded test employees.
2. Clicking any test badge fires the same scan API route handler, demonstrating live updates on `/dashboard/live`.

## 5. Scope
- **In Scope (V1):** Next.js App Router, Supabase (PostgreSQL, Auth, Realtime, Storage), HID keyboard listener, virtual simulator, role-based access control, CSV export, overnight shift pairing, missed-scan flagging.
- **Out of Scope (Post-V1):** Hardware gate relays, payroll tax engine integration, biometric facial recognition, multi-tenant SaaS billing.