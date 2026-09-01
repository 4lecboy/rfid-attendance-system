# UI & Design System Context

## 1. Design Direction & Mood
- **Aesthetic:** Clean, high-tech industrial dashboard with dark-mode focus for the Kiosk screen and a crisp, modern operational theme for the Admin Dashboard.
- **Primary Color:** Deep Slate (`#0f172a`), Indigo Primary Accent (`#4f46e5`), Emerald Success (`#10b981`), Amber Warning (`#f59e0b`), Rose Destructive (`#f43f5e`).

## 2. Typography & Hierarchy
- **Font Family:** `Inter`, `Geist`, or system sans-serif.
- **Kiosk Display:**
  - Big Clock: `text-6xl` to `text-8xl`, `font-mono font-bold`.
  - Scan Banner: High-contrast state cards (Green for Check-In, Blue/Cyan for Check-Out, Red for Error).
  - Employee Greeting: `text-3xl font-semibold`.

## 3. Component Conventions
- Use `shadcn/ui` base primitives (Dialog, DropdownMenu, Table, Badge, Button, Input, Card).
- Data Tables must support responsive horizontal scroll, loading skeletons, and sticky headers.
- Badges:
  - Check-In: `bg-emerald-500/15 text-emerald-500 border-emerald-500/20`
  - Check-Out: `bg-blue-500/15 text-blue-500 border-blue-500/20`
  - Flagged/Missed: `bg-amber-500/15 text-amber-500 border-amber-500/20`

## 4. Kiosk Layout Specifications
- Centered real-time digital clock and status beacon ("Scanner Ready").
- Floating/Collapsible bottom drawer for the "Portfolio Card Simulator" containing 5–8 one-click test badges.
- 1.8-second toast/modal overlay upon scan displaying:
  - Employee photo avatar
  - Full name & employee ID
  - Action taken: `CHECKED IN` or `CHECKED OUT`
  - Calculated duration (if Check-Out)
  - Subtle audio chime (Web Audio API synthesis for zero asset dependency).