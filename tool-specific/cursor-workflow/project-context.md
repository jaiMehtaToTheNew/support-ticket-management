# Project Context

## Purpose

Build the **Support Ticket Management System** (Core tier) as a full-stack app demonstrating AI-assisted engineering across the lifecycle — not just working code, but visible planning, testing, and reflection.

## Business Context

Internal users manage support tickets: create, update, comment, search, filter, and progress tickets through a defined lifecycle.

## Scope (Core Only)

### Entities
- **User** — seeded only (id, name, email, role)
- **Ticket** — id, title, description, priority, status, assignedTo, createdBy, createdAt, updatedAt
- **Comment** — id, ticketId, message, createdBy, createdAt

### State Machine (Critical)
| From        | To          |
|-------------|-------------|
| Open        | In Progress |
| In Progress | Resolved    |
| Resolved    | Closed      |
| Open        | Cancelled   |
| In Progress | Cancelled   |

Invalid transitions must be rejected by the backend.

### Features
1. Create, list, view, update tickets
2. Status changes via state machine
3. Add comments
4. Keyword search + status filter
5. Backend validation + UI error states
6. Integration tests for state machine

## Out of Scope (Stretch)
- Authentication / JWT
- User CRUD UI
- Pagination, sorting by priority/assignee
- Docker, CI, Swagger

## Tech Decisions
- **SQLite + Prisma** — zero-config local DB, meets persistence requirement
- **Express + Zod** — simple API with schema validation
- **React + Vite** — fast dev experience, proxy to API

## Key Constraints
- No secrets in repo
- Data must survive server restart
- README must enable setup from scratch
