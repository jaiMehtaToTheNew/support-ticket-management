# Support Ticket Management System

Full-stack mini project (Core) — a support ticket app built with AI-assisted development in Cursor.

A small internal application for creating, updating, commenting on, searching, and progressing support tickets through a defined lifecycle with an enforced status state machine.

## Tech Stack

| Layer    | Choice                          |
|----------|---------------------------------|
| Frontend | React 19 + Vite + React Router  |
| Backend  | Node.js + Express               |
| Database | SQLite via Prisma ORM           |
| Tests    | Node.js built-in test runner    |
| Validation | Zod (backend)                 |

## Prerequisites

- Node.js 20+
- npm

## Quick Start

### 1. Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run db:setup    # creates schema + seeds sample data
npm run dev         # API at http://localhost:3001
```

### 2. Frontend setup (separate terminal)

```bash
cd frontend
npm install
npm run dev         # UI at http://localhost:5173
```

The Vite dev server proxies `/api` requests to the backend.

### 3. Run tests

```bash
cd backend
npm test
```

Integration tests cover the ticket status state machine (valid transitions succeed, invalid ones are rejected).

## Environment Variables

| Variable       | Description              | Default              |
|----------------|--------------------------|----------------------|
| `DATABASE_URL` | SQLite database file URL | `file:./dev.db`      |
| `PORT`         | API server port          | `3001`               |

Copy `backend/.env.example` to `backend/.env` — no secrets required for local development.

## API Endpoints

| Method | Path                        | Description                    |
|--------|-----------------------------|--------------------------------|
| GET    | `/api/tickets/meta`         | Statuses, priorities, transitions |
| GET    | `/api/tickets/users`        | Seeded users list              |
| GET    | `/api/tickets`              | List tickets (`?search=&status=`) |
| GET    | `/api/tickets/:id`          | Ticket detail with comments    |
| POST   | `/api/tickets`              | Create ticket                  |
| PATCH  | `/api/tickets/:id`          | Update ticket fields           |
| PATCH  | `/api/tickets/:id/status`   | Change status (state machine)  |
| POST   | `/api/tickets/:id/comments` | Add comment                    |

## Status State Machine

```
Open        → In Progress
In Progress → Resolved
Resolved    → Closed
Open        → Cancelled
In Progress → Cancelled
```

Invalid transitions are rejected by the backend with a `400` response. The frontend only shows allowed next statuses.

## Seeded Users

| Name          | Email              | Role  |
|---------------|--------------------|-------|
| Alice Admin   | alice@example.com  | admin |
| Bob Agent     | bob@example.com    | agent |
| Carol Support | carol@example.com  | agent |
| Dave User     | dave@example.com   | user  |

Three sample tickets with comments are also seeded.

## Repository Structure

```
support-ticket-management/
├── README.md
├── candidate-info.md
├── tool-workflow.md                    # Part A: AI workflow foundation
├── requirements-analysis.md
├── acceptance-criteria.md
├── implementation-plan.md
├── design-notes.md
├── api-contract.md
├── data-model.md
├── ui-flow.md
├── test-strategy.md
├── test-results.md
├── debugging-notes.md
├── code-review-notes.md
├── review-fixes.md
├── pr-description.md
├── reflection.md
├── final-ai-usage-summary.md
├── backend/                            # Express API + Prisma + tests
├── frontend/                           # React UI
├── database/
│   └── setup-notes.md                  # DB setup (schema in backend/prisma/)
├── ai-prompts/                         # Prompt history by lifecycle phase
│   ├── planning.md
│   ├── design.md
│   ├── implementation.md
│   ├── testing.md
│   ├── debugging.md
│   ├── code-review.md
│   └── documentation.md
├── tool-specific/
│   └── cursor-workflow/                # Cursor-specific planning artifacts
└── artifacts/                          # Supplementary working notes
    ├── prompt-history/
    ├── design/
    ├── testing/
    ├── debugging/
    ├── review/
    └── reflection.md
```

## Core Acceptance Criteria

- [x] Create ticket via UI
- [x] View all tickets from database
- [x] Ticket detail view
- [x] Update fields and reassign
- [x] Add comments
- [x] Status changes only through valid transitions
- [x] Keyword search and status filter
- [x] Data persists across restarts
- [x] Backend validation
- [x] No secrets in repo
- [x] State-machine integration tests
