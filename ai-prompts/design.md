# Design Prompts

## Prompt 1 — Architecture and API design

**Prompt:**
> Design the API for ticket management. I need endpoints for CRUD, status changes (separate from field updates), comments, and a meta endpoint for statuses/priorities/allowed transitions. Document the data model for User, Ticket, Comment.

**AI response summary:** REST API with `PATCH /:id/status`, `GET /meta`, Zod validation, Prisma schema.

**Accepted:** Separate status endpoint, meta endpoint pattern.  
**Changed:** Added `GET /users` for form dropdowns.  
**Rejected:** GraphQL suggestion — REST is simpler for Core.

---

## Prompt 2 — State machine design

**Prompt:**
> Implement a strict ticket status state machine as a pure module. Valid transitions only:
> - Open → In Progress
> - In Progress → Resolved
> - Resolved → Closed
> - Open → Cancelled
> - In Progress → Cancelled
>
> Provide `canTransition(from, to)` and `getAllowedTransitions(status)`. No database dependency.

**AI response summary:** `stateMachine.js` with `VALID_TRANSITIONS` map and helper functions.

**Accepted:** Pure module design, transition map structure.  
**Changed:** Added `ALL_STATUSES` export for meta endpoint.  
**Rejected:** None — matched spec exactly.

---

## Prompt 3 — UI flow

**Prompt:**
> Design three frontend pages: ticket list with search/filter, create ticket form, and ticket detail with edit/status/comments. How should the detail page know which status buttons to show?

**AI response summary:** Fetch transitions from meta endpoint; only render allowed buttons.

**Accepted:** Meta-driven UI, separate error states for status vs form.  
**Changed:** Added empty state on list page.  
**Rejected:** Hardcoding transitions in frontend.
