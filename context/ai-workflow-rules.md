# AI Workflow & Agent Execution Rules

## 1. Operating Rules for the Coding Agent
- **One Spec Unit at a Time:** Never build across multiple spec units in a single prompt. Complete, verify, and mark one unit complete before advancing.
- **Read Context First:** Always parse `CLAUDE.md`, `architecture.md`, and `code-standards.md` prior to writing or modifying files.
- **No Speculative Architecture:** Do not introduce unrequested libraries (e.g., Redux, Prisma, Express) when Supabase and Next.js are the established stack.
- **Preserve Invariants:** Check every database query and API handler against the invariants defined in `architecture.md`.

## 2. Handling Missing Information
- If an edge-case scenario is not detailed in the context files, stop and ask for clarification rather than assuming business logic.
- If environment variables are required, specify their exact key names in `.env.example`.

## 3. Verification Steps Before Completing a Unit
1. Run TypeScript check: `npm run type-check` or `npx tsc --noEmit`.
2. Run build verification: `npm run build`.
3. Verify database RLS policies protect sensitive employee personal information.
4. Update `progress-tracker.md` to reflect the completed state.