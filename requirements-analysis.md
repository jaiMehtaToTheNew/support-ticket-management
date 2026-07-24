# Requirement Analysis

## Selected Project Option

**Support Ticket Management System — Core (Mandatory)**

## My Understanding (in your own words)

Internal users need a small app to manage support tickets from creation through resolution. Tickets have a title, description, priority, assignee, and a status that must follow strict lifecycle rules — not every status change is allowed. Users can comment on tickets for collaboration. Users exist in the database (seeded) but there is no user-management UI in Core. The hardest requirement is the status state machine: the backend must reject invalid transitions, and the frontend must reflect that clearly.

## Functional Requirements

1. **Tickets** — Create, list, view detail, update fields (title, description, priority, assignee).
2. **Status lifecycle** — Change status only through valid transitions enforced on the backend.
3. **Comments** — Add comments to a ticket with author and timestamp.
4. **Search & filter** — Keyword search on title/description; filter list by status.
5. **Users** — Seeded only; exposed for form dropdowns (creator, assignee, comment author).
6. **Persistence** — All data stored in a database and survives restarts.

## Non-Functional Requirements

- Clear local setup from README (no external services required).
- Backend validation on all write endpoints.
- Meaningful error messages in API and UI.
- No secrets committed to the repository.
- Integration tests proving state machine rules.

## Assumptions

- No authentication in Core scope — any seeded user can be selected in forms.
- SQLite is acceptable for local development and demonstration.
- Case-sensitive keyword search is acceptable for Core.
- Single-tenant internal use; no multi-org support needed.

## Clarifications (questions for a product owner)

- Should cancelled tickets be reopenable? **Assumed no** — terminal state per spec.
- Should comments be editable/deletable? **Assumed no** for Core.
- Who can change status? **Assumed any user** without auth in Core.

## Edge Cases

| Scenario | Expected behavior |
|----------|-------------------|
| Invalid status transition | Backend returns 400; UI shows error banner |
| Update non-existent ticket | 404 Not Found |
| Assign to non-existent user | 400 validation error |
| Empty title on create | 400 validation error |
| Search with no matches | Empty list with helpful message |
| Ticket in Closed/Cancelled | No status action buttons shown |
| Status change via generic PATCH | Not allowed — status excluded from update schema |
