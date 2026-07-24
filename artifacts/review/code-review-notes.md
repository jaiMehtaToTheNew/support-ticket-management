# Code Review Notes

## Review Checklist

### Security
- [x] No secrets in repository
- [x] `.env` gitignored
- [x] Input validated on all write endpoints
- [x] No `eval` or unsafe patterns

### State Machine
- [x] Rules centralized in one module
- [x] Backend enforces transitions (not just frontend)
- [x] Terminal states (Closed, Cancelled) have no outgoing transitions
- [x] Integration tests cover valid and invalid paths

### API Design
- [x] Consistent error format
- [x] Appropriate HTTP status codes (400, 404, 500)
- [x] Status change isolated to dedicated endpoint

### Frontend
- [x] Loading and error states handled
- [x] Empty state on ticket list
- [x] Form validation mirrors backend requirements

### Improvements for Stretch
- Add unit tests for `stateMachine.js` in isolation
- Case-insensitive search
- Optimistic UI updates with rollback on error
- Loading skeletons instead of plain text

## AI-Generated Code Review

Reviewed AI output for common issues:
- **Hallucinated dependencies** — verified all imports exist in package.json
- **Missing error handling** — added `errorHandler` middleware and frontend `handleResponse`
- **State machine bypass** — ensured status not in `updateTicketSchema`
