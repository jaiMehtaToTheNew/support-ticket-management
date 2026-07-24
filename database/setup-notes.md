# Database Setup Notes

## Database Choice

**SQLite** via Prisma ORM — zero external services, file-based persistence, suitable for local development and Core demonstration.

## Files

| File | Purpose |
|------|---------|
| `backend/prisma/schema.prisma` | Schema definition (User, Ticket, Comment) |
| `backend/prisma/seed.js` | Seed data script |
| `backend/.env.example` | Environment variable template |
| `backend/.env` | Local config (gitignored — copy from example) |

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

Copy `backend/.env.example` to `backend/.env`. No secrets required for local development.

## Setup Commands

```bash
cd backend
cp .env.example .env
npm install
npm run db:setup    # prisma db push + seed
```

Individual commands:
- `npm run db:push` — apply schema to database
- `npm run db:seed` — load seed data
- `npm run db:migrate` — deploy migrations (if using migrate workflow)

## Schema

Three models: `User`, `Ticket`, `Comment`. See [data-model.md](../data-model.md) for field details.

Prisma uses `db push` for this project (no migration history files). For production, switch to `prisma migrate`.

## Seed Data

**Users (4):**
- Alice Admin (admin)
- Bob Agent (agent)
- Carol Support (agent)
- Dave User (user)

**Tickets (3):** Sample tickets in different statuses with comments.

Run seed: `npm run db:seed` or as part of `npm run db:setup`.

## Persistence

Data is stored in `backend/prisma/dev.db` (gitignored). Survives server restarts. Delete the file and re-run `db:setup` to reset.

## Test Database

Integration tests use `backend/prisma/test.db` (also gitignored), created and destroyed per test run. Does not affect development data.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Environment variable not found: DATABASE_URL` | Copy `.env.example` to `.env` |
| Schema out of sync | Run `npm run db:push` |
| Empty database | Run `npm run db:seed` |
| Corrupt dev.db | Delete `prisma/dev.db` and run `npm run db:setup` |
