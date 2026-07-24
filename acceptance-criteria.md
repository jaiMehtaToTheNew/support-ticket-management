# Acceptance Criteria

## Core

- [x] User can create a ticket via the UI
- [x] User can view all tickets from the database
- [x] User can open a ticket detail view
- [x] User can update ticket fields and reassign
- [x] User can add comments
- [x] Status changes only through valid transitions; invalid ones rejected
- [x] Keyword search and status filter work
- [x] Data remains available after restart
- [x] Backend validation prevents invalid records
- [x] No secrets committed to the repo
- [x] State-machine integration tests pass

## Validation

- [x] Required fields enforced (title, description, priority, createdBy)
- [x] Invalid priority values rejected
- [x] Invalid user IDs rejected for assignee/creator/comment author
- [x] Status not accepted on generic ticket update endpoint

## Error Handling

- [x] API returns consistent JSON error shape (`{ error: "..." }`)
- [x] 400 for validation and invalid transitions
- [x] 404 for missing tickets
- [x] Frontend displays API errors via `ErrorBanner` component
- [x] Separate error state for status change failures on detail page

## Testing

- [x] Integration tests cover all valid transitions
- [x] Integration tests cover key invalid transitions
- [x] Integration test for create validation failure
- [x] Tests use isolated database (no dev data pollution)

## Documentation

- [x] README with setup instructions
- [x] tool-workflow.md (Part A)
- [x] Lifecycle artifacts (design, testing, debugging, review, reflection)
- [x] Prompt history in `ai-prompts/`
- [x] Cursor workflow in `tool-specific/cursor-workflow/`
- [x] PR description
