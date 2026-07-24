# Code Review Prompts

## Prompt 1 — Security and bypass review

**Prompt:**
> Review the ticket API for security issues and state machine bypass risks. Can status be changed through the generic PATCH endpoint? Are all inputs validated? Any secrets in the repo?

**AI response summary:** Confirmed status excluded from update schema; suggested `.gitignore` for `.env` and `*.db`; validated Zod on all write endpoints.

**Accepted:** `.gitignore` additions, validation checklist.  
**Changed:** Added explicit `ensureUserExists` checks in service layer.  
**Rejected:** Adding rate limiting — out of Core scope.

---

## Prompt 2 — Frontend review

**Prompt:**
> Review the React frontend for missing error states, loading states, and accessibility basics.

**AI response summary:** Noted missing empty state (added), suggested loading text (added), form labels present.

**Accepted:** Empty state, loading indicators.  
**Changed:** None significant.  
**Rejected:** Full ARIA audit — beyond Core scope.

---

## Prompt 3 — Dependency check

**Prompt:**
> Verify all imports in generated code reference packages that exist in package.json. Flag any hallucinated dependencies.

**AI response summary:** All dependencies valid; no extra packages needed.

**Accepted:** Clean dependency list.  
**Changed:** None.  
**Rejected:** Suggested adding lodash — unnecessary.
