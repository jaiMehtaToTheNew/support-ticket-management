# Testing Notes

## Test Strategy

**Mandatory tier (Core):** Integration tests for the status state machine.

Location: `backend/tests/state-machine.test.js`

## Test Setup

- Isolated SQLite database (`prisma/test.db`) created per test run
- Schema pushed via `prisma db push`
- Seed data loaded before tests
- Express app started on port 3099
- Each test gets a fresh ticket in `Open` status via `beforeEach`

## Coverage

### Valid Transitions (must succeed)
- Open → In Progress
- Open → Cancelled
- In Progress → Resolved
- In Progress → Cancelled
- Resolved → Closed

### Invalid Transitions (must return 400)
- Open → Resolved
- Open → Closed
- In Progress → Open
- Resolved → In Progress
- Closed → Open (terminal state)
- Cancelled → Open (terminal state)

### Validation
- POST with empty title → 400 Validation failed

## Running Tests

```bash
cd backend
npm test
```

## Manual Smoke Test Checklist

- [ ] List page loads seeded tickets
- [ ] Search filters by keyword
- [ ] Status filter works
- [ ] Create new ticket redirects to detail
- [ ] Update title/description saves
- [ ] Valid status button works
- [ ] Invalid transition shows error banner
- [ ] Comment appears after posting
- [ ] Restart server — data still present
