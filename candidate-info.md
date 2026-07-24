# Candidate Information

Name: Jai Mohan Mehta 
Role: Senior Software Engineer  
Primary Technology Stack: React, Node.js, SQLite/Prisma

Primary AI Tool Used: Cursor  
Project Option Selected: Support Ticket Management System (Core)

Assessment Start Date: 1/07/2026  
Submission Date: 24/07/2026

## Project Summary

A full-stack support ticket management application with React frontend, Express API, and SQLite persistence. Users can create, list, search, filter, update, comment on, and progress tickets through an enforced status state machine. Seeded users support creator/assignee/comment author selection without a user-management UI.

## Tools Used

| Tool | Purpose |
|------|---------|
| Cursor | Primary AI-assisted development (planning, code, tests, docs) |
| Node.js 20+ | Backend runtime and test runner |
| React 19 + Vite | Frontend SPA |
| Prisma + SQLite | ORM and local database |
| Zod | Backend input validation |

## Setup Summary

```bash
cd backend && cp .env.example .env && npm install && npm run db:setup && npm run dev
cd frontend && npm install && npm run dev
cd backend && npm test
```

See [README.md](README.md) for full instructions.
