# Final AI Usage Summary

## Tool

**Cursor** — primary AI-assisted development environment for this project.

## Lifecycle Coverage

| Phase | Artifacts | Key AI contribution |
|-------|-----------|---------------------|
| Requirements | `requirements-analysis.md`, `acceptance-criteria.md` | Entity breakdown, edge case identification |
| Planning | `implementation-plan.md`, `tool-specific/cursor-workflow/spec.md` | API design, task breakdown |
| Design | `design-notes.md`, `data-model.md`, `ui-flow.md` | Architecture decisions, state machine design |
| Implementation | `backend/`, `frontend/` | Scaffolded routes, schema, React pages |
| Testing | `backend/tests/state-machine.test.js` | Integration test matrix |
| Debugging | `debugging-notes.md` | Meta endpoint, test DB isolation |
| Code review | `code-review-notes.md`, `review-fixes.md` | Security and bypass checks |
| Documentation | All lifecycle artifacts | Templates generated, then edited |

## Prompt Patterns That Worked

1. **Detailed kickoff** — entities, tech stack, constraints in first prompt
2. **Focused follow-ups** — state machine, tests, and error handling as separate prompts
3. **Persistent context** — `project-context.md` and `spec.md` referenced across sessions
4. **Validation prompts** — "review for state machine bypass" after implementation

## What I Accepted vs. Changed vs. Rejected

| AI suggestion | Decision | Reason |
|---------------|----------|--------|
| React + Express + Prisma scaffold | Accepted | Matches stack, fast setup |
| Dedicated status endpoint | Accepted | Prevents lifecycle bypass |
| Meta endpoint for transitions | Accepted | Single source of truth |
| Redux state management | Rejected | Over-engineering for 3 pages |
| JWT auth in Core | Rejected | Stretch scope |
| Separate statusError state | Accepted after review | Better UX for transition failures |

## Responsible AI Practices

- No secrets shared with AI tools
- No production credentials in prompts
- All AI-generated code reviewed and tested before trusting
- Prompt history documents iteration, not just final answers

## Reuse in Real Projects

This workflow transfers to production work:
1. Write spec and acceptance criteria before coding
2. Maintain persistent project context files
3. Prompt for specific concerns (security, state machines) separately
4. Validate with targeted tests, not just manual inspection
5. Document decisions and rejected suggestions for team traceability

See `tool-workflow.md` (Part A) and `ai-prompts/` for detailed prompt history.
