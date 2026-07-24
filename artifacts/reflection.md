# Reflection (Part C)

## What went well

- Writing out requirements in the first prompt and creating spec/acceptance-criteria docs kept scope clear.
- Prompting for the state machine separately made the hardest requirement testable and reviewable.
- SQLite + Prisma provided fast iteration without infrastructure overhead.

## Challenges

- The state machine is the trickiest part — it's easy to accidentally allow status updates through a generic PATCH endpoint. Prompting for a dedicated route avoided this.
- Balancing application code vs. lifecycle artifacts — both matter for demonstrating the AI workflow, so time was split between building features and documenting the process.

## Key decisions I'd defend

1. **Dedicated status endpoint** — enforces lifecycle rules at the API boundary.
2. **Meta endpoint for transitions** — frontend doesn't duplicate business rules.
3. **Integration tests over unit tests for Core** — proves end-to-end behavior that matters for acceptance.

## What I'd improve with more time

- Add Stretch features: priority/assignee filters, pagination, OpenAPI docs.
- Add Docker Compose for one-command startup.
- Case-insensitive search.
- E2E tests with Playwright for full UI flows.

## AI workflow learnings

- A detailed initial prompt with entities, tech stack, and constraints gave much better results than a vague "build a ticket system."
- Follow-up prompts for specific concerns (state machine, tests, error handling) kept each iteration focused.
- Validating AI output with targeted integration tests caught assumptions early.
- Keeping persistent context files (`project-context.md`, `spec.md`) helps across longer multi-session projects.

## Honest assessment

I understand the state machine rules, where they're enforced, and how the frontend consumes allowed transitions. I can explain why status changes are not part of the generic update endpoint and how invalid transitions propagate as user-visible errors.
