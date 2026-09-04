// ─────────────────────────────────────────────────────────────
// Database Types — Hand-written to match the Supabase schema
// defined in context/architecture.md. These provide immediate
// type safety before generated types are added.
// ─────────────────────────────────────────────────────────────

// ── ENUMs ──────────────────────────────────────────────────

/** Dashboard user roles mapped to the `user_role` PostgreSQL enum */
export type UserRole = 'admin' | 'hr' | 'security'

/** RFID card lifecycle states mapped to the `card_status` enum */
export type CardStatus = 'active' | 'inactive' | 'lost'

/** Attendance session states mapped to the `attendance_status` enum */
export type AttendanceStatus = 'active' | 'completed' | 'flagged'

// ── Table Row Types ────────────────────────────────────────

/** Row from `profiles` — auto-created via trigger on auth.users signup */
export interface Profile {
  id: string            // UUID, PK, references auth.users.id
  email: string
  role: UserRole
  created_at: string    // TIMESTAMPTZ serialised as ISO-8601 string
}

/** Row from `departments` */
export interface Department {
  id: string            // UUID, PK
  name: string          // UNIQUE
  created_at: string
}

/** Row from `employees` */
export interface Employee {
  id: string            // UUID, PK
  employee_number: string // UNIQUE, e.g. "EMP-001"
  first_name: string
  last_name: string
  department_id: string // FK → departments.id
  position: string
  avatar_url: string | null
  is_active: boolean
  created_at: string
}

/** Row from `rfid_cards` */
export interface RfidCard {
  id: string            // UUID, PK
  card_uid: string      // UNIQUE, indexed
  employee_id: string | null // FK → employees.id, UNIQUE, nullable
  status: CardStatus
  assigned_at: string | null
  created_at: string
}

/** Row from `attendance_logs` */
export interface AttendanceLog {
  id: string            // UUID, PK
  employee_id: string   // FK → employees.id, indexed
  check_in_time: string // TIMESTAMPTZ, NOT NULL
  check_out_time: string | null
  total_hours: number | null // NUMERIC(5,2)
  status: AttendanceStatus
  notes: string | null
  created_at: string
}

// ── Joined / Enriched Types ────────────────────────────────

/** Employee with their department name resolved */
export interface EmployeeWithDepartment extends Employee {
  department: Pick<Department, 'name'>
}

/** Attendance log with employee name resolved */
export interface AttendanceLogWithEmployee extends AttendanceLog {
  employee: Pick<Employee, 'first_name' | 'last_name' | 'employee_number' | 'avatar_url'>
}

/** RFID card with its assigned employee resolved */
export interface RfidCardWithEmployee extends RfidCard {
  employee: Pick<Employee, 'first_name' | 'last_name' | 'employee_number'> | null
}
