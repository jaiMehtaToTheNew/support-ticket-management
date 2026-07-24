# Debugging Notes

## Issue: Status transition errors not visible in UI

**Symptom:** Clicking an invalid status (if somehow exposed) didn't show a clear message.

**Fix:** Added separate `statusError` state on the detail page, displayed via `ErrorBanner`. Status changes catch API errors and show the backend message (e.g., "Invalid status transition from Open to Resolved").

## Issue: Frontend showing all statuses as buttons

**Symptom:** Risk of exposing invalid transitions in UI.

**Fix:** Detail page fetches `meta.transitions[currentStatus]` and only renders buttons for allowed next states.

## Issue: Test database pollution

**Symptom:** Tests could interfere with dev database.

**Fix:** Tests use dedicated `test.db` file, deleted and recreated in `before`/`after` hooks. `DATABASE_URL` overridden in test file.

## Debugging Approach

1. Check API response in browser Network tab
2. Read `error` field from JSON response
3. For state machine issues, verify `canTransition()` in `stateMachine.js`
4. Run `npm test` to reproduce backend logic in isolation
