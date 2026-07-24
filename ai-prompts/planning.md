# Planning Prompts

## Prompt 1 — Project kickoff

**Prompt:**
> Build a full-stack Support Ticket Management System. Use React for the frontend, Node.js + Express for the backend, and a database with Prisma. I need User, Ticket, and Comment entities. Users are seeded only — no user management UI. Include setup instructions, seed data, input validation, error handling, and a README.

**AI response summary:** Proposed React + Express + SQLite/Prisma stack; outlined folder structure with `backend/` and `frontend/`.

**Accepted:** Tech stack choice, entity model, repo layout.  
**Changed:** Adjusted folder names to match assignment artifact requirements.  
**Rejected:** Suggestion to add authentication in initial scaffold — out of Core scope.

---

## Prompt 2 — Requirements breakdown

**Prompt:**
> Break down the Core requirements for the Support Ticket Management System. List functional requirements, non-functional requirements, assumptions, and edge cases. Focus on the status state machine as the core engineering judgment piece.

**AI response summary:** Generated requirements analysis with state machine edge cases (terminal states, bypass risks).

**Accepted:** Edge case table, assumption that no auth in Core.  
**Changed:** Clarified that cancelled tickets are terminal (not reopenable).  
**Rejected:** None.

---

## Prompt 3 — Implementation plan

**Prompt:**
> Create a phased implementation plan: planning artifacts, backend with state machine, frontend, tests, documentation. Include risks and mitigations for status bypass and test data pollution.

**AI response summary:** Five-phase plan with milestones and risk table.

**Accepted:** Phase structure, dedicated status endpoint as mitigation.  
**Changed:** Added artifact creation as explicit phase.  
**Rejected:** None.
