# Data Model

## User (seeded only)

| Field | Type   | Constraints        | Notes                |
|-------|--------|--------------------|----------------------|
| id    | Int    | PK, auto-increment |                      |
| name  | String | required           |                      |
| email | String | unique             |                      |
| role  | String | required           | admin, agent, user   |

No user-management UI in Core. Users are created via seed script.

## Ticket

| Field       | Type     | Constraints        | Notes                          |
|-------------|----------|--------------------|--------------------------------|
| id          | Int      | PK, auto-increment |                                |
| title       | String   | required           | max 200 chars (validated)      |
| description | String   | required           | max 5000 chars (validated)     |
| priority    | String   | required           | Low, Medium, High, Critical    |
| status      | String   | default: Open      | see state machine below        |
| assignedTo  | Int?     | FK → User.id       | optional                       |
| createdBy   | Int      | FK → User.id       | required                       |
| createdAt   | DateTime | auto               |                                |
| updatedAt   | DateTime | auto               |                                |

### Status State Machine

```
Open        → In Progress
In Progress → Resolved
Resolved    → Closed
Open        → Cancelled
In Progress → Cancelled
```

Terminal states (no outgoing transitions): **Closed**, **Cancelled**.

Implementation: `backend/src/services/stateMachine.js`

## Comment

| Field     | Type     | Constraints        | Notes        |
|-----------|----------|--------------------|--------------|
| id        | Int      | PK, auto-increment |              |
| ticketId  | Int      | FK → Ticket.id     | cascade delete |
| message   | String   | required           |              |
| createdBy | Int      | FK → User.id       |              |
| createdAt | DateTime | auto               |              |

## Relationships

```
User 1──* Ticket (createdBy)
User 1──* Ticket (assignedTo)
User 1──* Comment (createdBy)
Ticket 1──* Comment
```

## Schema Location

Prisma schema: `backend/prisma/schema.prisma`  
Seed script: `backend/prisma/seed.js`
