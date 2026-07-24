# Implementation Prompts

## Prompt 1 — Backend scaffold

**Prompt:**
> Scaffold the Express backend with Prisma (SQLite), ticket routes, Zod validators, error handling middleware, and seed script with 4 users and 3 sample tickets.

**AI response summary:** Generated `index.js`, routes, services, validators, middleware, seed.

**Accepted:** Layered structure (routes → services → Prisma).  
**Changed:** Ensured `status` excluded from update schema.  
**Rejected:** Auto-generated migration files — used `db push` for simplicity.

---

## Prompt 2 — Frontend pages

**Prompt:**
> Build React pages for ticket list (search + status filter), create ticket, and ticket detail (edit fields, status buttons, comments). Use an API client with error handling and ErrorBanner component.

**AI response summary:** Three pages, `api/client.js`, `ErrorBanner`, `Badges` components.

**Accepted:** Page structure, error banner pattern.  
**Changed:** Added loading states and empty state on list.  
**Rejected:** CSS framework (Tailwind) — used custom CSS to minimize dependencies.

---

## Prompt 3 — Validation

**Prompt:**
> Add Zod validation for all write endpoints. Enforce required fields, valid priority enum, and existing user IDs for creator/assignee/comment author.

**AI response summary:** Schemas in `ticketValidators.js` with `validate` middleware.

**Accepted:** Zod schemas, middleware pattern.  
**Changed:** Added max length constraints on title/description.  
**Rejected:** None.
