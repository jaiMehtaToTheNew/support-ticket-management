# PR Description

## Summary

Implements the **Support Ticket Management System** Core tier — a full-stack app with React frontend, Express API, SQLite persistence, enforced status state machine, and integration tests.

## Features Implemented

- Ticket CRUD: create, list, view, update fields and assignee
- Status lifecycle with backend-enforced state machine
- Comments on tickets
- Keyword search and status filter
- Backend validation (Zod) and UI error states
- Seed data: 4 users, 3 tickets, 3 comments

## Technical Changes

- **Backend:** Express routes, Prisma ORM, Zod validators, state machine service, error middleware
- **Frontend:** React 19 + Vite, three pages (list, create, detail), API client with error handling
- **Database:** SQLite with Prisma schema and seed script
- **Tests:** 12 integration tests for state machine rules

## Database Changes

- New schema: `User`, `Ticket`, `Comment` models
- Seed script creates 4 users, 3 sample tickets, 3 comments
- Setup via `npm run db:setup` (push schema + seed)

## Testing Done

```bash
cd backend && npm test
# 12/12 tests pass
```

Manual smoke test: create ticket, update fields, change status, add comment, search/filter, verify persistence after restart.

## AI Usage Summary

- Cursor used for planning (spec, tasks), implementation (scaffold + iterate), testing (integration test matrix), and documentation (lifecycle artifacts)
- Persistent context in `tool-specific/cursor-workflow/`
- Prompt history in `ai-prompts/`
- Validated AI output with integration tests and manual review

## Screenshots / Demo Notes

1. Start backend (`npm run dev` in `backend/`) and frontend (`npm run dev` in `frontend/`)
2. Open http://localhost:5173
3. Browse seeded tickets, use search/filter
4. Create a ticket, change status through valid transitions
5. Add a comment; restart server to verify persistence

## Known Limitations

- No authentication (Core scope)
- No user management UI
- Case-sensitive search
- No pagination or priority/assignee filters (Stretch)

## Future Improvements

- Authentication and role-based access
- OpenAPI documentation
- Docker Compose for one-command startup
- E2E tests with Playwright
