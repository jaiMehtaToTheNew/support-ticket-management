# Acceptance Criteria (Core)

Derived from project requirements — Support Ticket Management System.

## Application

1. **Create ticket** — User can create a ticket via the UI with title, description, priority, creator, and optional assignee.
2. **List tickets** — User can view all tickets loaded from the database.
3. **Ticket detail** — User can open a ticket and see full details plus comments.
4. **Update ticket** — User can update title, description, priority, and reassign.
5. **Comments** — User can add comments to a ticket.
6. **State machine** — Status changes only through valid transitions; invalid ones rejected by backend and shown in UI.
7. **Search & filter** — Keyword search (title/description) and filter by status work.
8. **Persistence** — Data survives server restart (SQLite file on disk).
9. **Validation** — Backend rejects invalid records (empty title, invalid priority, invalid user ids).
10. **No secrets** — No credentials committed; `.env` is gitignored.

## Tests

11. **Integration tests** — State machine rules tested: valid transitions succeed, invalid transitions rejected.

## Repository Artifacts

12. **README** — Clear local setup instructions.
13. **tool-workflow.md** — Part A AI workflow document.
14. **Cursor workflow** — project-context, spec, tasks, acceptance-criteria, cursor-rules.
15. **Prompt history** — Documented AI interactions.
16. **Lifecycle artifacts** — Design, testing, debugging, review, reflection notes.
17. **PR description** — Summary of changes for review.

## State Machine Test Matrix

| From        | To          | Expected |
|-------------|-------------|----------|
| Open        | In Progress | ✅ Pass  |
| Open        | Cancelled   | ✅ Pass  |
| Open        | Resolved    | ❌ Reject |
| Open        | Closed      | ❌ Reject |
| In Progress | Resolved    | ✅ Pass  |
| In Progress | Cancelled   | ✅ Pass  |
| In Progress | Open        | ❌ Reject |
| Resolved    | Closed      | ✅ Pass  |
| Resolved    | In Progress | ❌ Reject |
| Closed      | *           | ❌ Reject |
| Cancelled   | *           | ❌ Reject |
