# Reflection

## What I Built

A Support Ticket Management System with React frontend, Express API, and SQLite database. Core features include ticket CRUD, comments, keyword search, status filtering, and a backend-enforced status state machine with integration tests.

## How I Used AI (across the lifecycle)

| Phase | How Cursor helped |
|-------|-------------------|
| Requirements | Broke down entities, state machine rules, acceptance criteria |
| Planning | Generated spec, tasks, API contract drafts |
| Implementation | Scaffolded backend routes, Prisma schema, React pages |
| Testing | Generated integration test matrix for state machine |
| Debugging | Suggested meta endpoint and test DB isolation |
| Code review | Checked for state machine bypass and missing validation |
| Documentation | Created artifact templates, then edited for accuracy |

## What AI Helped With Most

- Scaffolding the full-stack project structure quickly
- Generating the integration test matrix covering all transition paths
- Identifying the risk of status changes via generic PATCH endpoint

## What AI Got Wrong

- Initial frontend code did not separate status errors from form errors — fixed manually
- Suggested over-abstraction (Redux, auth middleware) for Core scope — rejected
- Needed verification that all suggested npm packages actually existed

## How I Validated AI Output

- Ran `npm test` after every backend change
- Manually compared `stateMachine.js` against spec transition table
- Smoke-tested UI flows in browser
- Reviewed generated code for security issues and unnecessary dependencies

## What I Would Improve Next

- Stretch: priority/assignee filters, pagination, OpenAPI docs, Docker
- Case-insensitive search
- E2E tests with Playwright
- Unit tests for `stateMachine.js` in isolation

## Reusable Workflow (prompts, rules, specs, templates)

- Persistent context in `tool-specific/cursor-workflow/project-context.md` and `spec.md`
- Acceptance criteria referenced in follow-up prompts
- Prompt history organized by lifecycle phase in `ai-prompts/`
- State machine prompted separately from CRUD features for better testability

## Honest Assessment

I understand where the state machine is enforced, why status has a dedicated endpoint, and how the frontend consumes allowed transitions from the API. I can explain every valid and invalid transition and how errors propagate to the UI.
