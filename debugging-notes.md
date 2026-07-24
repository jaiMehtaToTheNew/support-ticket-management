# Debugging Notes

## Issue 1: Status transition errors not visible in UI

### Problem
API returned 400 for invalid transitions but the detail page did not show a clear message to the user.

### How I Investigated
- Checked Network tab — confirmed 400 response with `error` field
- Traced frontend `handleStatusChange` — error was caught but not displayed distinctly from form errors

### How AI Helped
Prompted Cursor to add separate `statusError` state and wire it to `ErrorBanner` on the detail page.

### What I Validated
- Manually triggered invalid transition via API (curl) to confirm error message format
- Verified UI shows backend message like "Invalid status transition from Open to Resolved"

### Final Fix
Added `statusError` state in `TicketDetailPage.jsx`, separate from general `error` state.

---

## Issue 2: Frontend showing all statuses as buttons

### Problem
Risk of exposing invalid transition buttons if status rules were hardcoded incorrectly in frontend.

### How I Investigated
Reviewed detail page status button rendering logic.

### How AI Helped
Suggested fetching allowed transitions from `/api/tickets/meta` instead of duplicating rules client-side.

### What I Validated
- Confirmed meta endpoint returns correct transitions per current status
- Verified Closed/Cancelled tickets show no action buttons

### Final Fix
Detail page calls `fetchMeta()` and renders only `meta.transitions[currentStatus]` buttons.

---

## Issue 3: Test database pollution

### Problem
Integration tests could write to the development `dev.db` file.

### How I Investigated
Noticed test data appearing in dev environment after test runs.

### How AI Helped
Generated test setup using dedicated `test.db` with `DATABASE_URL` override.

### What I Validated
- `dev.db` unchanged after `npm test`
- `test.db` created and deleted in test lifecycle hooks

### Final Fix
`state-machine.test.js` sets `DATABASE_URL=file:../prisma/test.db` and cleans up in `after` hook.
