# AI Workflow Foundation (Part A)

## 1. Primary AI Tool Used

**Cursor** — used as the primary AI-assisted development environment for requirement analysis, planning, implementation, testing, and documentation.

## 2. How I Provide Project Context to the Tool

- Started with a clear initial prompt describing the full-stack scope, entities, and tech stack.
- Maintained persistent context in `tool-specific/cursor-workflow/project-context.md` and `spec.md`.
- Referenced acceptance criteria and state-machine rules explicitly in follow-up prompts.
- Used a structured task breakdown (`tasks.md`) to keep implementation aligned with scope.

## 3. Requirement Analysis

- Broke the project into application deliverables and lifecycle artifacts before coding.
- Identified the state machine as the core engineering judgment piece and prompted for it separately.
- Mapped entities (User, Ticket, Comment) and API surface in a dedicated prompt.
- Documented acceptance criteria in `tool-specific/cursor-workflow/acceptance-criteria.md`.

## 4. Planning and Design

- Chose React + Node.js + SQLite/Prisma for fast local setup without external services.
- Separated state machine logic into a dedicated service module for testability.
- Designed REST endpoints around ticket lifecycle operations.
- Planned frontend pages: list (search/filter), create, detail (edit/status/comments).

## 5. Code Generation

- Used Cursor to scaffold backend routes, Prisma schema, and React pages.
- Generated boilerplate (package.json, vite config) then reviewed and adjusted.
- Iterated on validation schemas and error response format.
- Kept generated code focused — avoided over-abstraction.

## 6. Validating AI-Generated Code

- Ran `npm test` after backend implementation to verify state machine rules.
- Manually reviewed transition logic against `spec.md` before trusting generated tests.
- Checked that invalid transitions return `400` with clear messages.
- Verified frontend only exposes allowed status buttons from `/api/tickets/meta`.

## 7. Testing

- Mandatory integration tests in `backend/tests/state-machine.test.js`.
- Tests use an isolated SQLite database per run.
- Covered all valid transitions, all key invalid transitions, and validation errors.
- Documented approach in `artifacts/testing/testing-notes.md`.

## 8. Debugging

- Used API error responses to trace validation vs. state machine failures.
- Test runner output helped isolate transition edge cases (e.g., Closed → Open).
- Documented debugging patterns in `artifacts/debugging/debugging-notes.md`.

## 9. Code Review

- Reviewed AI output for: hardcoded secrets, missing validation, bypassable state transitions.
- Ensured status changes go through a dedicated endpoint, not generic PATCH.
- Checked error handling surfaces meaningful messages in the UI.
- Notes in `artifacts/review/code-review-notes.md`.

## 10. Information I Avoid Sharing with AI Tools

- Production credentials, API keys, or internal company secrets.
- Real customer or employee PII.
- Proprietary code from unrelated internal projects.
- Access tokens or `.env` file contents.

## 11. Reusing This Workflow in a Real Project

1. Start with a written spec and acceptance criteria before generating code.
2. Keep persistent project context files updated as decisions change.
3. Use AI for scaffolding and iteration, not as a substitute for understanding requirements.
4. Validate generated code with targeted tests for critical business rules.
5. Maintain prompt history for traceability and team knowledge sharing.
6. Review security, validation, and error handling on every AI-generated module.
