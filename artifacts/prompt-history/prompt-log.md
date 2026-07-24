# Prompt History

Chronological log of key AI prompts used during this project.

---

## Prompt 1 — Project kickoff

**Prompt:**
> Build a full-stack Support Ticket Management System. Use React for the frontend, Node.js + Express for the backend, and a database with Prisma. I need User, Ticket, and Comment entities. Users are seeded only — no user management UI. Include setup instructions, seed data, input validation, error handling, and a README.

**Outcome:** Scaffolded repo structure with `backend/` and `frontend/`, Prisma schema, and initial project layout.

---

## Prompt 2 — State machine (core business logic)

**Prompt:**
> Implement a strict ticket status state machine on the backend. Valid transitions only:
> - Open → In Progress
> - In Progress → Resolved
> - Resolved → Closed
> - Open → Cancelled
> - In Progress → Cancelled
>
> Invalid transitions must be rejected with a 400 error. Don't allow status changes through the generic update endpoint — use a dedicated status endpoint. The frontend should only show valid next statuses.

**Outcome:** Created `stateMachine.js`, `PATCH /:id/status` route, and `/api/tickets/meta` for allowed transitions.

---

## Prompt 3 — Features and UI

**Prompt:**
> Add these features to the app:
> 1. Create, list, and view ticket details
> 2. Update ticket fields (title, description, priority, assignee)
> 3. Add comments to tickets
> 4. Keyword search and filter by status on the list page
> 5. Show meaningful error messages in the UI when API calls fail

**Outcome:** Built TicketListPage, CreateTicketPage, TicketDetailPage with ErrorBanner component.

---

## Prompt 4 — Tests

**Prompt:**
> Write integration tests that prove the state machine rules — valid transitions should succeed, invalid ones should be rejected. Also test that creating a ticket with missing required fields returns a validation error.

**Outcome:** `backend/tests/state-machine.test.js` — 12 tests, all passing.

---

## Prompt 5 — Lifecycle artifacts

**Prompt:**
> Set up the repository with AI workflow artifacts: tool-workflow.md, cursor-workflow folder with project-context, spec, tasks, and acceptance-criteria. Also add folders for prompt history, design notes, testing notes, debugging notes, code review notes, and a reflection doc.

**Outcome:** Full artifact structure under `tool-specific/cursor-workflow/` and `artifacts/`.

---

## Prompt 6 — Seed data and polish

**Prompt:**
> Add seed data with 4 users (admin, agents, regular user), 3 sample tickets in different statuses, and a few comments. Make sure data persists across server restarts and document how to run everything locally in the README.

**Outcome:** `prisma/seed.js`, README with setup steps, `.env.example`.

---

## Iteration notes

| Topic | Decision |
|-------|----------|
| State machine | Dedicated `PATCH /:id/status` endpoint — prevents bypass via generic update |
| Meta endpoint | Frontend fetches allowed transitions from API — single source of truth |
| Database | SQLite for zero-config local dev |
| Test DB | Isolated `test.db` in integration tests to avoid polluting dev data |

---

## Follow-up prompts (if continuing)

- "Add unit tests for `canTransition` in isolation"
- "Add filter by priority and assignee with pagination"
- "Generate OpenAPI spec from the routes"
- "Add Docker Compose for one-command startup"
