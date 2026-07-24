# Cursor Rules & Instructions

These guidelines were followed during AI-assisted development of this project.

## Project Rules

1. **Spec-first** — Read `project-context.md` and `spec.md` before implementing features.
2. **State machine is sacred** — Never allow status changes outside `stateMachine.js` rules.
3. **Validate at the boundary** — All API inputs validated with Zod before service layer.
4. **Separate status endpoint** — Status changes use `PATCH /:id/status`, not generic update.
5. **No secrets** — Use `.env.example` only; never commit real credentials.
6. **Test critical paths** — State machine integration tests are mandatory, not optional.
7. **Minimal scope** — Core features only; don't add auth or stretch features unless asked.
8. **Match conventions** — Follow existing patterns in each layer (Express middleware style, React functional components).

## Prompting Patterns Used

- **Context loading**: "Build a full-stack Support Ticket Management System with React, Node.js, Express, and Prisma. Include User, Ticket, and Comment entities..."
- **Focused implementation**: "Implement the state machine service with these exact transitions: Open → In Progress, In Progress → Resolved..."
- **Validation**: "Run integration tests and fix any failing transitions."
- **Iteration**: "Show meaningful error states in the UI when status transition fails."

## Code Quality Standards

- Use `async/await` consistently
- Return structured JSON errors: `{ error, details? }`
- Frontend: handle API errors in a shared `handleResponse` helper
- Keep components small — pages orchestrate, components display

## Files to Reference

| Need              | File                                      |
|-------------------|-------------------------------------------|
| Business rules    | `tool-specific/cursor-workflow/spec.md`   |
| What's done/next  | `tool-specific/cursor-workflow/tasks.md`  |
| Done definition   | `tool-specific/cursor-workflow/acceptance-criteria.md` |
| State machine     | `backend/src/services/stateMachine.js`    |
| API tests         | `backend/tests/state-machine.test.js`     |
