# Test Results

## Latest Run

**Date:** 2026-07-24  
**Command:** `cd backend && npm test`  
**Result:** ✅ 12/12 passed

```
# tests 12
# pass 12
# fail 0
```

## Test Cases

| # | Test | Result |
|---|------|--------|
| 1 | Open → In Progress succeeds | ✅ pass |
| 2 | Open → Cancelled succeeds | ✅ pass |
| 3 | Open → Resolved is rejected | ✅ pass |
| 4 | Open → Closed is rejected | ✅ pass |
| 5 | In Progress → Resolved succeeds | ✅ pass |
| 6 | In Progress → Cancelled succeeds | ✅ pass |
| 7 | In Progress → Open is rejected | ✅ pass |
| 8 | Resolved → Closed succeeds | ✅ pass |
| 9 | Resolved → In Progress is rejected | ✅ pass |
| 10 | Closed ticket cannot transition | ✅ pass |
| 11 | Cancelled ticket cannot transition | ✅ pass |
| 12 | create ticket rejects missing required fields | ✅ pass |

## Manual Smoke Test

Performed after integration tests:

- [x] List page loads seeded tickets
- [x] Search filters by keyword
- [x] Status filter works
- [x] Create new ticket
- [x] Update title/description
- [x] Valid status transition via UI
- [x] Comment posting
- [x] Data persists after server restart

## Notes

First test run takes ~5s due to Prisma schema push and seed. Subsequent tests in the suite run in milliseconds.
