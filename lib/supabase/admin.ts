import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────
// Supabase Admin Client (Service Role)
//
// This client bypasses Row Level Security and is used exclusively
// in server-side contexts that require elevated privileges:
//   - /api/scan route handler (writes to attendance_logs)
//   - Seed scripts
//   - Any future admin-only server actions
//
// ⚠ NEVER import this in Client Components or expose the
//   service role key to the browser.
// ─────────────────────────────────────────────────────────────

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY')
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
