# Debugging Prompts

## Prompt 1 — Status errors not showing in UI

**Prompt:**
> Status transition API returns 400 but the frontend doesn't show the error clearly. The detail page catches the error but doesn't display it. Fix this.

**AI response summary:** Add separate `statusError` state wired to `ErrorBanner`.

**Accepted:** Separate error state for status changes.  
**Changed:** None.  
**Rejected:** Alert dialogs — used inline banner for consistency.

---

## Prompt 2 — Test database pollution

**Prompt:**
> Integration tests are writing to my development database. How do I isolate test data?

**AI response summary:** Override `DATABASE_URL` to `test.db`, create/destroy in hooks.

**Accepted:** Dedicated test DB with cleanup.  
**Changed:** Added `execSync` for schema push and seed in test setup.  
**Rejected:** In-memory SQLite — file-based is closer to real usage.

---

## Prompt 3 — Frontend transition buttons

**Prompt:**
> The detail page might show wrong status buttons if rules are hardcoded. How should it get allowed transitions?

**AI response summary:** Fetch from `/api/tickets/meta` and render `transitions[currentStatus]`.

**Accepted:** Meta endpoint consumption.  
**Changed:** Refresh transitions after status change.  
**Rejected:** Duplicating rules in frontend constants.
