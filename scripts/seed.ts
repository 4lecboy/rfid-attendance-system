// ─────────────────────────────────────────────────────────────
// Seed Script — Unit 1
//
// Populates the database with:
//   • 5 BPO departments
//   • 25 employees with realistic Filipino names
//   • 25 RFID cards (1:1 mapped to employees)
//
// Run: npm run seed (or npx tsx scripts/seed.ts)
// Requires: SUPABASE_SERVICE_ROLE_KEY in .env
// ─────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  console.error('   Add them to your .env file. See .env.example for reference.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

// ── Department Data ──────────────────────────────────────────

const DEPARTMENTS = [
  'Customer Support',
  'Technical Support',
  'Quality Assurance',
  'Human Resources',
  'IT Operations',
] as const

// ── Employee Data ────────────────────────────────────────────
// Realistic Filipino names, distributed across 5 departments

interface SeedEmployee {
  employee_number: string
  first_name: string
  last_name: string
  department: (typeof DEPARTMENTS)[number]
  position: string
}

const EMPLOYEES: SeedEmployee[] = [
  // Customer Support (6 employees)
  { employee_number: 'EMP-001', first_name: 'Maria', last_name: 'Santos', department: 'Customer Support', position: 'Team Lead' },
  { employee_number: 'EMP-002', first_name: 'Juan', last_name: 'Dela Cruz', department: 'Customer Support', position: 'Senior Agent' },
  { employee_number: 'EMP-003', first_name: 'Ana', last_name: 'Reyes', department: 'Customer Support', position: 'Agent' },
  { employee_number: 'EMP-004', first_name: 'Carlos', last_name: 'Garcia', department: 'Customer Support', position: 'Agent' },
  { employee_number: 'EMP-005', first_name: 'Jasmine', last_name: 'Fernandez', department: 'Customer Support', position: 'Agent' },
  { employee_number: 'EMP-006', first_name: 'Miguel', last_name: 'Ramos', department: 'Customer Support', position: 'Agent' },

  // Technical Support (5 employees)
  { employee_number: 'EMP-007', first_name: 'Patricia', last_name: 'Villanueva', department: 'Technical Support', position: 'Team Lead' },
  { employee_number: 'EMP-008', first_name: 'Rafael', last_name: 'Mendoza', department: 'Technical Support', position: 'Senior Tech' },
  { employee_number: 'EMP-009', first_name: 'Angela', last_name: 'Torres', department: 'Technical Support', position: 'Tech Support' },
  { employee_number: 'EMP-010', first_name: 'Daniel', last_name: 'Aquino', department: 'Technical Support', position: 'Tech Support' },
  { employee_number: 'EMP-011', first_name: 'Christine', last_name: 'Bautista', department: 'Technical Support', position: 'Tech Support' },

  // Quality Assurance (5 employees)
  { employee_number: 'EMP-012', first_name: 'Ricardo', last_name: 'Navarro', department: 'Quality Assurance', position: 'QA Manager' },
  { employee_number: 'EMP-013', first_name: 'Sofia', last_name: 'Lim', department: 'Quality Assurance', position: 'Senior QA' },
  { employee_number: 'EMP-014', first_name: 'Mark', last_name: 'Gonzales', department: 'Quality Assurance', position: 'QA Analyst' },
  { employee_number: 'EMP-015', first_name: 'Isabella', last_name: 'Cruz', department: 'Quality Assurance', position: 'QA Analyst' },
  { employee_number: 'EMP-016', first_name: 'Jerome', last_name: 'Pascual', department: 'Quality Assurance', position: 'QA Analyst' },

  // Human Resources (4 employees)
  { employee_number: 'EMP-017', first_name: 'Carmen', last_name: 'Dizon', department: 'Human Resources', position: 'HR Director' },
  { employee_number: 'EMP-018', first_name: 'Benedict', last_name: 'Tan', department: 'Human Resources', position: 'HR Specialist' },
  { employee_number: 'EMP-019', first_name: 'Grace', last_name: 'Manalo', department: 'Human Resources', position: 'HR Coordinator' },
  { employee_number: 'EMP-020', first_name: 'Francis', last_name: 'Santiago', department: 'Human Resources', position: 'Payroll Officer' },

  // IT Operations (5 employees)
  { employee_number: 'EMP-021', first_name: 'Kenneth', last_name: 'Ocampo', department: 'IT Operations', position: 'IT Manager' },
  { employee_number: 'EMP-022', first_name: 'Trisha', last_name: 'Rivera', department: 'IT Operations', position: 'Systems Admin' },
  { employee_number: 'EMP-023', first_name: 'Paolo', last_name: 'Castillo', department: 'IT Operations', position: 'Network Engineer' },
  { employee_number: 'EMP-024', first_name: 'Denise', last_name: 'Flores', department: 'IT Operations', position: 'Help Desk Lead' },
  { employee_number: 'EMP-025', first_name: 'Aaron', last_name: 'De Leon', department: 'IT Operations', position: 'Help Desk Support' },
]

// ── Helpers ──────────────────────────────────────────────────

/** Generate a deterministic avatar URL using ui-avatars.com */
function avatarUrl(firstName: string, lastName: string): string {
  const name = encodeURIComponent(`${firstName} ${lastName}`)
  return `https://ui-avatars.com/api/?name=${name}&background=4f46e5&color=fff&size=128&bold=true`
}

/** Generate a deterministic RFID card UID from an index */
function cardUid(index: number): string {
  return `RFID-${String(index).padStart(4, '0')}`
}

// ── Main ─────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Starting seed...\n')

  // Step 1: Insert departments
  console.log('📁 Inserting departments...')
  const { data: departments, error: deptError } = await supabase
    .from('departments')
    .upsert(
      DEPARTMENTS.map((name) => ({ name })),
      { onConflict: 'name' }
    )
    .select('id, name')

  if (deptError) {
    console.error('❌ Department insert failed:', deptError.message)
    process.exit(1)
  }

  console.log(`   ✅ ${departments.length} departments ready`)

  // Build lookup map
  const deptMap = new Map(departments.map((d) => [d.name, d.id]))

  // Step 2: Insert employees
  console.log('👥 Inserting employees...')
  const employeeRows = EMPLOYEES.map((emp) => ({
    employee_number: emp.employee_number,
    first_name: emp.first_name,
    last_name: emp.last_name,
    department_id: deptMap.get(emp.department)!,
    position: emp.position,
    avatar_url: avatarUrl(emp.first_name, emp.last_name),
    is_active: true,
  }))

  const { data: employees, error: empError } = await supabase
    .from('employees')
    .upsert(employeeRows, { onConflict: 'employee_number' })
    .select('id, employee_number')

  if (empError) {
    console.error('❌ Employee insert failed:', empError.message)
    process.exit(1)
  }

  console.log(`   ✅ ${employees.length} employees ready`)

  // Step 3: Insert RFID cards (1:1 mapped)
  console.log('💳 Inserting RFID cards...')

  // Sort employees by number to ensure deterministic card mapping
  const sortedEmployees = [...employees].sort((a, b) =>
    a.employee_number.localeCompare(b.employee_number)
  )

  const cardRows = sortedEmployees.map((emp, idx) => ({
    card_uid: cardUid(idx + 1),
    employee_id: emp.id,
    status: 'active' as const,
    assigned_at: new Date().toISOString(),
  }))

  const { data: cards, error: cardError } = await supabase
    .from('rfid_cards')
    .upsert(cardRows, { onConflict: 'card_uid' })
    .select('id, card_uid')

  if (cardError) {
    console.error('❌ Card insert failed:', cardError.message)
    process.exit(1)
  }

  console.log(`   ✅ ${cards.length} RFID cards ready`)

  // Summary
  console.log('\n─────────────────────────────────────')
  console.log('🎉 Seed complete!')
  console.log(`   Departments: ${departments.length}`)
  console.log(`   Employees:   ${employees.length}`)
  console.log(`   RFID Cards:  ${cards.length}`)
  console.log('─────────────────────────────────────\n')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
