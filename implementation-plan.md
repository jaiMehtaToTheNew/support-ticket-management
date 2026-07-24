# Implementation Plan

## Overview

Build a React + Express + SQLite support ticket app in phases: planning artifacts first, then backend with state machine, then frontend, then tests and documentation. AI (Cursor) assists at each phase with persistent context files for traceability.

## Task Breakdown

### Phase 1 — Planning & Context
- Write requirements analysis and acceptance criteria
- Create Cursor workflow docs (`project-context.md`, `spec.md`, `tasks.md`)
- Define API contract and data model

### Phase 2 — Backend
- Initialize Express + Prisma with SQLite
- Implement `User`, `Ticket`, `Comment` schema
- Build `stateMachine.js` as pure module
- Implement ticket service, routes, Zod validators, error middleware
- Seed users and sample tickets
- Write state machine integration tests

### Phase 3 — Frontend
- React + Vite + React Router setup
- API client with error handling
- Pages: list (search/filter), create, detail (edit/status/comments)
- Fetch allowed transitions from `/api/tickets/meta`

### Phase 4 — Artifacts & Verification
- Prompt history, design/testing/debugging/review notes
- Reflection and PR description
- Run tests, manual smoke test, update README

## Milestones

| Milestone | Deliverable |
|-----------|-------------|
| M1 | Planning docs + repo structure |
| M2 | Working API with seed data |
| M3 | State machine tests passing |
| M4 | Full UI with search/filter |
| M5 | All lifecycle artifacts complete |

## AI Usage Plan

- **Planning:** Prompt for entity design, API surface, state machine rules
- **Implementation:** Scaffold backend/frontend, iterate on validation and error handling
- **Testing:** Prompt for integration test matrix covering all transitions
- **Review:** Ask AI to review for state machine bypass and missing error handling
- **Documentation:** Generate artifact templates, then edit for accuracy

## Risks

| Risk | Mitigation |
|------|------------|
| Status bypass via generic PATCH | Separate `/status` endpoint; exclude status from update schema |
| Frontend/backend rule drift | Meta endpoint as single source of truth for transitions |
| Test data pollution | Isolated `test.db` in integration tests |
| Over-scoping into Stretch | Strict acceptance criteria checklist |

## Mitigation

- Enforce state machine only in `changeTicketStatus()` service method
- Integration tests as acceptance gate before marking Core complete
- Time-box Stretch features; prioritize lifecycle artifacts
