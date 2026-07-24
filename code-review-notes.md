# Code Review Notes

## AI-Assisted Review Summary

Asked Cursor to review the implementation against acceptance criteria, focusing on:
- State machine bypass risks
- Missing error handling
- Hallucinated dependencies
- Security (no secrets, input validation)

## My Review Observations

### Security
- [x] No secrets in repository
- [x] `.env` gitignored
- [x] Input validated on all write endpoints
- [x] No `eval` or unsafe patterns

### State Machine
- [x] Rules centralized in `stateMachine.js`
- [x] Backend enforces transitions (not just frontend)
- [x] Terminal states have no outgoing transitions
- [x] Integration tests cover valid and invalid paths
- [x] Status excluded from `updateTicketSchema`

### API Design
- [x] Consistent error format `{ error: "..." }`
- [x] Appropriate HTTP status codes (400, 404, 500)
- [x] Status change isolated to dedicated endpoint

### Frontend
- [x] Loading and error states handled
- [x] Empty state on ticket list
- [x] Form validation mirrors backend requirements
- [x] Transitions fetched from API meta endpoint

## Changes Made After Review

See [review-fixes.md](review-fixes.md).

## Suggestions Rejected (and why)

| Suggestion | Reason rejected |
|------------|-----------------|
| Add JWT auth for Core | Out of scope — Stretch feature |
| Use PostgreSQL instead of SQLite | SQLite meets Core requirements; simpler local setup |
| Optimistic UI updates | Added complexity without Core requirement |
| Redux for state management | Over-engineering for three pages |
