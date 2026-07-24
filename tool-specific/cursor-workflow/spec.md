# Specification — Support Ticket Management System

## 1. Data Model

### User
| Field | Type   | Notes                |
|-------|--------|----------------------|
| id    | int    | PK, auto-increment   |
| name  | string | required             |
| email | string | unique               |
| role  | string | admin, agent, user   |

### Ticket
| Field       | Type     | Notes                          |
|-------------|----------|--------------------------------|
| id          | int      | PK                             |
| title       | string   | required, max 200              |
| description | string   | required, max 5000             |
| priority    | enum     | Low, Medium, High, Critical    |
| status      | enum     | Open, In Progress, Resolved, Closed, Cancelled |
| assignedTo  | int?     | FK → User                      |
| createdBy   | int      | FK → User, required            |
| createdAt   | datetime | auto                           |
| updatedAt   | datetime | auto                           |

### Comment
| Field     | Type     | Notes        |
|-----------|----------|--------------|
| id        | int      | PK           |
| ticketId  | int      | FK → Ticket  |
| message   | string   | required     |
| createdBy | int      | FK → User    |
| createdAt | datetime | auto         |

## 2. API Design

### Tickets
- `GET /api/tickets` — list with optional `search` and `status` query params
- `GET /api/tickets/:id` — detail with comments
- `POST /api/tickets` — create (status defaults to Open)
- `PATCH /api/tickets/:id` — update title, description, priority, assignee
- `PATCH /api/tickets/:id/status` — change status (state machine enforced)
- `POST /api/tickets/:id/comments` — add comment

### Meta
- `GET /api/tickets/meta` — statuses, priorities, allowed transitions
- `GET /api/tickets/users` — list seeded users for form dropdowns

## 3. State Machine Service

Centralized in `backend/src/services/stateMachine.js`:
- `canTransition(from, to)` → boolean
- `getAllowedTransitions(status)` → string[]

Status changes MUST go through the dedicated status endpoint, not the general update endpoint.

## 4. Frontend Pages

1. **Ticket List** — cards with search input and status dropdown filter
2. **Create Ticket** — form with validation error display
3. **Ticket Detail** — edit fields, status action buttons (only valid transitions), comment thread

## 5. Error Handling

- Backend: Zod validation → 400 with field details; state machine violation → 400 with message; not found → 404
- Frontend: `ErrorBanner` component displays API errors; status errors shown separately on detail page

## 6. Seed Data

4 users, 3 tickets in various statuses, 3 comments.

## 7. Tests

Integration tests proving:
- Each valid transition succeeds
- Key invalid transitions are rejected (Open→Resolved, Closed→Open, etc.)
- Create validation rejects empty title
