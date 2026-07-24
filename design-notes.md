# Design Notes

## Architecture Overview (frontend, backend, database)

```
┌─────────────┐     proxy      ┌─────────────┐     Prisma    ┌──────────┐
│  React UI   │ ──────────────▶│  Express    │ ─────────────▶│  SQLite  │
│  (Vite)     │   /api/*       │  API        │               │  dev.db  │
└─────────────┘                └─────────────┘               └──────────┘
```

- **Frontend:** React 19 SPA with React Router; Vite dev server proxies `/api` to backend.
- **Backend:** Express REST API with layered structure (routes → services → Prisma).
- **Database:** SQLite file via Prisma ORM; schema in `backend/prisma/schema.prisma`.

## Frontend Design

| Page | Route | Features |
|------|-------|----------|
| Ticket List | `/` | Cards, keyword search, status filter, empty state |
| Create Ticket | `/tickets/new` | Form with validation errors |
| Ticket Detail | `/tickets/:id` | Edit fields, status buttons, comments |

Shared components: `ErrorBanner`, `StatusBadge`, `PriorityBadge`. API client centralizes fetch and error parsing.

## Backend Design

- **Routes:** `backend/src/routes/tickets.js` — thin handlers delegating to service
- **Services:** `ticketService.js` (data access), `stateMachine.js` (pure transition logic)
- **Validation:** Zod schemas in `validators/ticketValidators.js` via `validate` middleware
- **Errors:** `errorHandler.js` middleware returns `{ error: message }` with appropriate status codes

## Database Design

Three entities: `User`, `Ticket`, `Comment`. Tickets reference users for creator and optional assignee. Comments cascade-delete with tickets. Status stored as string enum values matching state machine.

See [data-model.md](data-model.md) for field-level detail.

## Validation Strategy

- Zod validates request bodies and query params before service layer
- Service layer validates foreign keys (user exists) and state transitions
- Frontend mirrors required fields but backend is authoritative

## Error Handling Strategy

- Operational errors (404, 400) thrown via `createError(status, message)`
- Unexpected errors caught by global error handler → 500
- Frontend `handleResponse` extracts `error` field and displays in `ErrorBanner`
- Status changes use separate `statusError` state to avoid conflating with form errors

## Testing Strategy Link

See [test-strategy.md](test-strategy.md). Core mandatory tier: integration tests for state machine in `backend/tests/state-machine.test.js`.
