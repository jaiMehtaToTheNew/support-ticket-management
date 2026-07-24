# Design Notes

## Architecture

```
┌─────────────┐     proxy      ┌─────────────┐     Prisma    ┌──────────┐
│  React UI   │ ──────────────▶│  Express    │ ─────────────▶│  SQLite  │
│  (Vite)     │   /api/*       │  API        │               │  dev.db  │
└─────────────┘                └─────────────┘               └──────────┘
```

## Key Design Decisions

### 1. Dedicated State Machine Module
The state machine lives in `stateMachine.js` as a pure module with no DB dependency. This makes it trivial to unit/integration test and prevents logic duplication.

### 2. Separate Status Endpoint
`PATCH /tickets/:id` updates fields only. `PATCH /tickets/:id/status` handles lifecycle transitions. This prevents clients from sneaking status changes through field updates.

### 3. Meta Endpoint for UI
Frontend fetches allowed transitions from the API rather than duplicating rules client-side. Single source of truth stays on the backend.

### 4. Seeded Users as Form Context
No auth in Core scope. Users are seeded and exposed via `/api/tickets/users` for creator/assignee/comment author dropdowns.

### 5. Search Implementation
SQLite `contains` filter on title and description. Case-sensitive by default in SQLite — acceptable for Core; could add `mode: 'insensitive'` with PostgreSQL in production.

## Trade-offs

| Decision           | Pro                          | Con                           |
|--------------------|------------------------------|-------------------------------|
| SQLite             | No setup, portable           | Not production-scale          |
| No auth            | Faster Core delivery         | No role-based restrictions    |
| Zod validation     | Type-safe, clear errors      | Extra dependency              |
| Node test runner   | No Jest config needed        | Less ecosystem tooling        |
