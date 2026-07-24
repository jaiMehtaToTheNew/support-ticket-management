# Testing Prompts

## Prompt 1 — Integration test matrix

**Prompt:**
> Write integration tests that prove the state machine rules — valid transitions should succeed, invalid ones should be rejected. Also test that creating a ticket with missing required fields returns a validation error. Use an isolated test database.

**AI response summary:** `state-machine.test.js` with 12 tests, isolated `test.db`, Express app on port 3099.

**Accepted:** Full transition matrix, validation test, test DB isolation.  
**Changed:** Added `beforeEach` to create fresh ticket per test.  
**Rejected:** Jest setup — used Node built-in test runner instead.

---

## Prompt 2 — Test strategy document

**Prompt:**
> Document the test strategy: what's covered, what's not, and why. Core mandatory tier is integration tests for state machine.

**AI response summary:** Test strategy with scope, coverage table, gaps.

**Accepted:** Structure and coverage table.  
**Changed:** Added manual smoke test checklist.  
**Rejected:** None.

---

## Results

All 12 integration tests pass. See [test-results.md](../test-results.md).
