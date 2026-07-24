# Test Strategy

## Test Scope

**Core mandatory tier:** API integration tests proving the ticket status state machine.

Out of scope for Core: unit tests for pure modules, component tests, E2E browser tests (Stretch).

## Unit Tests

Not implemented in Core. The state machine module (`stateMachine.js`) is covered indirectly via integration tests. A Stretch improvement would add isolated unit tests for `canTransition()` and `getAllowedTransitions()`.

## Component Tests

Not implemented in Core. Manual smoke testing covers UI flows (see `artifacts/testing/testing-notes.md`).

## API / Integration Tests

**Location:** `backend/tests/state-machine.test.js`  
**Runner:** Node.js built-in test runner (`node --test`)

### Setup
- Isolated SQLite database (`prisma/test.db`)
- Schema pushed via `prisma db push`
- Seed data loaded
- Express app on port 3099
- Fresh ticket in `Open` status before each test

### Coverage

| Category | Tests |
|----------|-------|
| Valid transitions | Open→In Progress, Open→Cancelled, In Progress→Resolved, In Progress→Cancelled, Resolved→Closed |
| Invalid transitions | Open→Resolved, Open→Closed, In Progress→Open, Resolved→In Progress |
| Terminal states | Closed and Cancelled cannot transition |
| Validation | Create with empty title returns 400 |

## Edge Case Tests

Covered in integration suite:
- Terminal state transitions rejected
- Validation error on create

Not covered (acceptable for Core):
- Concurrent status changes
- Very long title/description boundary values
- SQL injection (handled by Prisma parameterization)

## Tests Not Covered (and why)

| Gap | Reason |
|-----|--------|
| Frontend component tests | Core focuses on state machine backend enforcement |
| E2E Playwright tests | Time-boxed; manual smoke test used instead |
| Search/filter API tests | Lower risk; manually verified |
| Comment CRUD edge cases | Straightforward validation; lower priority than state machine |

## Running Tests

```bash
cd backend
npm test
```

See [test-results.md](test-results.md) for latest run output.
