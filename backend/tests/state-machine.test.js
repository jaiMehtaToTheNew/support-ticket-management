const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const TEST_DB_PATH = path.join(__dirname, '../prisma/test.db');
const TEST_ENV_PATH = path.join(__dirname, '../.env.test');

process.env.DATABASE_URL = `file:${TEST_DB_PATH}`;
process.env.PORT = '3099';

function setupTestDb() {
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }

  fs.writeFileSync(TEST_ENV_PATH, `DATABASE_URL="file:${TEST_DB_PATH}"\nPORT=3099\n`);

  execSync('npx prisma db push --skip-generate', {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: `file:${TEST_DB_PATH}` },
    stdio: 'pipe',
  });

  execSync('node prisma/seed.js', {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: `file:${TEST_DB_PATH}` },
    stdio: 'pipe',
  });
}

function cleanupTestDb() {
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }
  if (fs.existsSync(TEST_ENV_PATH)) {
    fs.unlinkSync(TEST_ENV_PATH);
  }
}

let app;
let server;
let baseUrl;
let ticketId;

before(() => {
  setupTestDb();
  delete require.cache[require.resolve('../src/index.js')];
  delete require.cache[require.resolve('../src/services/ticketService.js')];
  app = require('../src/index.js');
  server = app.listen(3099);
  baseUrl = 'http://localhost:3099/api/tickets';
});

after(() => {
  server.close();
  cleanupTestDb();
});

async function request(method, urlPath, body) {
  const res = await fetch(`${baseUrl}${urlPath}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

beforeEach(async () => {
  const { prisma } = require('../src/services/ticketService');
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  const ticket = await prisma.ticket.create({
    data: {
      title: 'Test ticket',
      description: 'For state machine tests',
      priority: 'Low',
      status: 'Open',
      createdBy: 1,
    },
  });
  ticketId = ticket.id;
});

test('Open -> In Progress succeeds', async () => {
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  assert.equal(status, 200);
  assert.equal(data.status, 'In Progress');
});

test('Open -> Cancelled succeeds', async () => {
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Cancelled' });
  assert.equal(status, 200);
  assert.equal(data.status, 'Cancelled');
});

test('Open -> Resolved is rejected', async () => {
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Resolved' });
  assert.equal(status, 400);
  assert.match(data.error, /Invalid status transition/);
});

test('Open -> Closed is rejected', async () => {
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Closed' });
  assert.equal(status, 400);
  assert.match(data.error, /Invalid status transition/);
});

test('In Progress -> Resolved succeeds', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Resolved' });
  assert.equal(status, 200);
  assert.equal(data.status, 'Resolved');
});

test('In Progress -> Cancelled succeeds', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Cancelled' });
  assert.equal(status, 200);
  assert.equal(data.status, 'Cancelled');
});

test('In Progress -> Open is rejected', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Open' });
  assert.equal(status, 400);
  assert.match(data.error, /Invalid status transition/);
});

test('Resolved -> Closed succeeds', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  await request('PATCH', `/${ticketId}/status`, { status: 'Resolved' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Closed' });
  assert.equal(status, 200);
  assert.equal(data.status, 'Closed');
});

test('Resolved -> In Progress is rejected', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  await request('PATCH', `/${ticketId}/status`, { status: 'Resolved' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  assert.equal(status, 400);
  assert.match(data.error, /Invalid status transition/);
});

test('Closed ticket cannot transition', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'In Progress' });
  await request('PATCH', `/${ticketId}/status`, { status: 'Resolved' });
  await request('PATCH', `/${ticketId}/status`, { status: 'Closed' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Open' });
  assert.equal(status, 400);
  assert.match(data.error, /Invalid status transition/);
});

test('Cancelled ticket cannot transition', async () => {
  await request('PATCH', `/${ticketId}/status`, { status: 'Cancelled' });
  const { status, data } = await request('PATCH', `/${ticketId}/status`, { status: 'Open' });
  assert.equal(status, 400);
  assert.match(data.error, /Invalid status transition/);
});

test('create ticket rejects missing required fields', async () => {
  const { status, data } = await request('POST', '', { title: '' });
  assert.equal(status, 400);
  assert.equal(data.error, 'Validation failed');
});
