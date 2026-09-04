// ─────────────────────────────────────────────────────────────
// Utility Functions
//
// cn() is re-exported from the "cn" package (installed by shadcn).
// Additional project-specific helpers live here.
// ─────────────────────────────────────────────────────────────

export { cn } from 'cn'

/**
 * Format a decimal hour value into a human-readable duration string.
 *
 * @param hours - Decimal hours (e.g. 8.5)
 * @returns Formatted string like "8h 30m"
 *
 * @example formatDuration(8.5)  // "8h 30m"
 * @example formatDuration(0.25) // "0h 15m"
 * @example formatDuration(null) // "—"
 */
export function formatDuration(hours: number | null): string {
  if (hours === null || hours === undefined) return '—'

  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)

  return `${h}h ${m}m`
}

/**
 * Format a TIMESTAMPTZ ISO string into a locale-aware time display.
 *
 * @param isoString - ISO-8601 timestamp string
 * @returns Formatted time like "2:30:45 PM"
 */
export function formatTime(isoString: string | null): string {
  if (!isoString) return '—'

  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

/**
 * Format a TIMESTAMPTZ ISO string into a locale-aware date display.
 *
 * @param isoString - ISO-8601 timestamp string
 * @returns Formatted date like "Sep 5, 2026"
 */
export function formatDate(isoString: string | null): string {
  if (!isoString) return '—'

  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
