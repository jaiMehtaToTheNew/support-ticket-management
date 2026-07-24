# Implementation Tasks

## Phase 1: Repository & Planning
- [x] Create repo structure with lifecycle artifact folders
- [x] Write project-context.md, spec.md, acceptance-criteria.md
- [x] Write tool-workflow.md (Part A)

## Phase 2: Backend
- [x] Initialize Express + Prisma (SQLite)
- [x] Define schema: User, Ticket, Comment
- [x] Implement state machine service
- [x] Implement ticket service (CRUD, comments, status)
- [x] Add Zod validators
- [x] Add error handling middleware
- [x] Create seed script
- [x] Write state machine integration tests

## Phase 3: Frontend
- [x] Initialize React + Vite
- [x] API client with error handling
- [x] Ticket list page (search + status filter)
- [x] Create ticket page
- [x] Ticket detail page (edit, status, comments)
- [x] Error banner and status badges

## Phase 4: Documentation & Artifacts
- [x] README with setup instructions
- [x] Prompt history
- [x] Testing, debugging, review notes
- [x] Reflection (Part C)
- [x] PR description

## Phase 5: Verification
- [x] Run `npm run db:setup`
- [x] Run `npm test` — all state machine tests pass
- [x] Manual smoke test: create ticket, change status, add comment, search
