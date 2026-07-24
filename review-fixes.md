# Review Fixes

Changes made after AI-assisted and self code review.

## 1. Dedicated status endpoint

**Finding:** Generic PATCH could allow status changes if not carefully excluded.  
**Fix:** Created `PATCH /api/tickets/:id/status` and removed `status` from `updateTicketSchema`.  
**File:** `backend/src/routes/tickets.js`, `backend/src/validators/ticketValidators.js`

## 2. Error handling middleware

**Finding:** AI-generated routes lacked consistent error responses.  
**Fix:** Added `errorHandler.js` with `createError()` helper; all services throw operational errors.  
**File:** `backend/src/middleware/errorHandler.js`

## 3. Frontend API error parsing

**Finding:** Raw fetch errors were not user-friendly.  
**Fix:** `api/client.js` `handleResponse()` extracts `error` field from JSON responses.  
**File:** `frontend/src/api/client.js`

## 4. Separate status error display

**Finding:** Status change failures were not clearly shown.  
**Fix:** Added `statusError` state and dedicated `ErrorBanner` on detail page.  
**File:** `frontend/src/pages/TicketDetailPage.jsx`

## 5. Meta endpoint for transitions

**Finding:** Frontend risked duplicating state machine rules.  
**Fix:** Added `GET /api/tickets/meta` returning allowed transitions; detail page consumes it.  
**File:** `backend/src/routes/tickets.js`, `frontend/src/pages/TicketDetailPage.jsx`

## 6. Test database isolation

**Finding:** Tests could pollute development data.  
**Fix:** Tests use dedicated `test.db` with cleanup hooks.  
**File:** `backend/tests/state-machine.test.js`

## 7. .gitignore for secrets and local DB

**Finding:** `.env` and `*.db` files should not be committed.  
**Fix:** Added root `.gitignore` covering `.env`, `node_modules`, `*.db`, `.DS_Store`.  
**File:** `.gitignore`
