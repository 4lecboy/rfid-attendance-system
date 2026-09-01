# System Architecture

## 1. Stack Table
| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS + Lucide Icons + `shadcn/ui` primitives |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email/Password with custom role metadata) |
| **Realtime** | Supabase Realtime (PostgreSQL Changes / Broadcast) |
| **File Storage** | Supabase Storage (Employee avatar bucket) |
| **Deployment** | Vercel (Frontend & Route Handlers) + Supabase Cloud |

## 2. Storage & Data Model

### Tables
- **`profiles`**
  - `id` (UUID, PK, references `auth.users.id`)
  - `email` (TEXT)
  - `role` (ENUM: `'admin'`, `'hr'`, `'security'`)
  - `created_at` (TIMESTAMPTZ)

- **`departments`**
  - `id` (UUID, PK)
  - `name` (TEXT, UNIQUE)
  - `created_at` (TIMESTAMPTZ)

- **`employees`**
  - `id` (UUID, PK)
  - `employee_number` (TEXT, UNIQUE)
  - `first_name` (TEXT)
  - `last_name` (TEXT)
  - `department_id` (UUID, FK -> `departments.id`)
  - `position` (TEXT)
  - `avatar_url` (TEXT, nullable)
  - `is_active` (BOOLEAN, default `true`)
  - `created_at` (TIMESTAMPTZ)

- **`rfid_cards`**
  - `id` (UUID, PK)
  - `card_uid` (TEXT, UNIQUE, indexed)
  - `employee_id` (UUID, FK -> `employees.id`, UNIQUE, nullable)
  - `status` (ENUM: `'active'`, `'inactive'`, `'lost'`)
  - `assigned_at` (TIMESTAMPTZ, nullable)

- **`attendance_logs`**
  - `id` (UUID, PK)
  - `employee_id` (UUID, FK -> `employees.id`, indexed)
  - `check_in_time` (TIMESTAMPTZ, NOT NULL)
  - `check_out_time` (TIMESTAMPTZ, nullable)
  - `total_hours` (NUMERIC(5, 2), nullable)
  - `status` (ENUM: `'active'`, `'completed'`, `'flagged'`)
  - `notes` (TEXT, nullable)
  - `created_at` (TIMESTAMPTZ)

## 3. System Invariants (Rules Never to Violate)
1. **Unbroken Session Integrity:** An employee cannot have two active (`check_out_time IS NULL`) attendance sessions at the same time.
2. **Debounce Shield:** Identical RFID scan payloads received within 120 seconds for the same employee are treated as duplicate noise and dropped with a `429 Cooldown` response.
3. **Zero-Block Door Policy:** A scan error or stale session must never crash the kiosk. If a previous checkout was missed (>16 hours), the system flags the old log and records the new check-in immediately.
4. **Card Exclusivity:** A `card_uid` can only be assigned to exactly one active employee at any given time.
5. **RLS Lockdown:** Public kiosk scans must execute through a secure Next.js Route Handler using Supabase Service Role key validations; direct client writes to `attendance_logs` from the browser are forbidden.