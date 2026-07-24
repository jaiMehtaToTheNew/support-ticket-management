# UI Flow

## Navigation

```
Ticket List (/) ──▶ Create Ticket (/tickets/new)
       │
       └──▶ Ticket Detail (/tickets/:id)
```

Header nav: "Tickets" (list) and "New Ticket" (create).

## Flow 1: Browse and search tickets

1. User lands on **Ticket List**
2. Sees seeded tickets as cards with status badge, priority, assignee
3. Types keyword in search box → list filters (title/description match)
4. Selects status from dropdown → list filters by status
5. Clicks a card → navigates to **Ticket Detail**

**Empty state:** "No tickets found" with link to create first ticket.

## Flow 2: Create a ticket

1. User clicks "New Ticket"
2. Fills title, description, priority, creator, optional assignee
3. Submits form
4. On success → redirected to ticket detail
5. On validation error → error banner shows API message

## Flow 3: View and update ticket

1. User opens ticket detail
2. Sees current status badge, editable fields, metadata (creator, dates)
3. Edits title/description/priority/assignee → clicks "Save Changes"
4. On success → form reflects saved data
5. On error → error banner

## Flow 4: Change status (state machine)

1. On detail page, **Status** section shows current status
2. Only allowed next statuses appear as buttons (from `/api/tickets/meta`)
3. User clicks "Move to In Progress" (or other allowed transition)
4. On success → status updates, buttons refresh for new state
5. On invalid transition (should not happen via UI) → `statusError` banner
6. Terminal states (Closed, Cancelled) → "No further transitions available"

## Flow 5: Add comment

1. User scrolls to Comments section on detail page
2. Types message, selects author from seeded users
3. Submits → comment appears in list after reload
4. On error → error banner

## Error States

| Location | Trigger | UI response |
|----------|---------|-------------|
| List page | API failure | ErrorBanner at top |
| Create page | Validation error | ErrorBanner |
| Detail page | Update failure | ErrorBanner |
| Detail page | Status change failure | Separate statusError banner |
| Detail page | Ticket not found | Error message + back link |
