# API Contract

Base URL: `http://localhost:3001/api/tickets`

## Endpoint: List tickets

**Method:** GET  
**Path:** `/`  
**Purpose:** List tickets with optional search and status filter

### Request (query params)

```json
{
  "search": "optional keyword",
  "status": "optional status enum"
}
```

### Response `200`

```json
[
  {
    "id": 1,
    "title": "Login issue",
    "description": "...",
    "priority": "High",
    "status": "Open",
    "assignedTo": 2,
    "createdBy": 1,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z",
    "creator": { "id": 1, "name": "...", "email": "...", "role": "admin" },
    "assignee": { "id": 2, "name": "...", "email": "...", "role": "agent" },
    "comments": []
  }
]
```

### Validation Rules

- `status` must be one of: Open, In Progress, Resolved, Closed, Cancelled

---

## Endpoint: Get ticket detail

**Method:** GET  
**Path:** `/:id`  
**Purpose:** Single ticket with comments

### Response `200`

Ticket object with `comments` array (ordered by `createdAt` asc).

### Error Responses

- `404` — Ticket not found

---

## Endpoint: Create ticket

**Method:** POST  
**Path:** `/`  
**Purpose:** Create a new ticket (status defaults to Open)

### Request

```json
{
  "title": "string (required, max 200)",
  "description": "string (required, max 5000)",
  "priority": "Low | Medium | High | Critical",
  "createdBy": 1,
  "assignedTo": 2
}
```

### Response `201`

Created ticket object.

### Validation Rules

- `title`, `description`, `priority`, `createdBy` required
- `assignedTo` optional; must reference existing user if provided

### Error Responses

- `400` — Validation failed or user not found

---

## Endpoint: Update ticket

**Method:** PATCH  
**Path:** `/:id`  
**Purpose:** Update title, description, priority, assignee (not status)

### Request

```json
{
  "title": "string",
  "description": "string",
  "priority": "Low | Medium | High | Critical",
  "assignedTo": 2
}
```

### Error Responses

- `400` — Validation failed
- `404` — Ticket not found

---

## Endpoint: Change status

**Method:** PATCH  
**Path:** `/:id/status`  
**Purpose:** Transition ticket status via state machine

### Request

```json
{
  "status": "In Progress"
}
```

### Validation Rules

- Transition must be valid per state machine (see [data-model.md](data-model.md))

### Error Responses

- `400` — Invalid status transition (includes allowed transitions in message)
- `404` — Ticket not found

---

## Endpoint: Add comment

**Method:** POST  
**Path:** `/:id/comments`  
**Purpose:** Add a comment to a ticket

### Request

```json
{
  "message": "string (required)",
  "createdBy": 1
}
```

### Response `201`

Created comment with author.

---

## Endpoint: Meta

**Method:** GET  
**Path:** `/meta`  
**Purpose:** Statuses, priorities, and allowed transitions for UI

### Response `200`

```json
{
  "statuses": ["Open", "In Progress", "Resolved", "Closed", "Cancelled"],
  "priorities": ["Low", "Medium", "High", "Critical"],
  "transitions": {
    "Open": ["In Progress", "Cancelled"],
    "In Progress": ["Resolved", "Cancelled"],
    "Resolved": ["Closed"],
    "Closed": [],
    "Cancelled": []
  }
}
```

---

## Endpoint: List users

**Method:** GET  
**Path:** `/users`  
**Purpose:** Seeded users for form dropdowns

### Response `200`

```json
[{ "id": 1, "name": "Alice Admin", "email": "alice@example.com", "role": "admin" }]
```
