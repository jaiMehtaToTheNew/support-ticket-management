const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      { name: 'Alice Admin', email: 'alice@example.com', role: 'admin' },
      { name: 'Bob Agent', email: 'bob@example.com', role: 'agent' },
      { name: 'Carol Support', email: 'carol@example.com', role: 'agent' },
      { name: 'Dave User', email: 'dave@example.com', role: 'user' },
    ],
  });

  console.log(`Seeded ${users.count} users`);

  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'Cannot login to dashboard',
      description: 'User reports 500 error when attempting to login after password reset.',
      priority: 'High',
      status: 'Open',
      createdBy: 1,
      assignedTo: 2,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'Feature request: export reports',
      description: 'Customer wants CSV export for monthly analytics reports.',
      priority: 'Medium',
      status: 'In Progress',
      createdBy: 4,
      assignedTo: 3,
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      title: 'Billing discrepancy on invoice #4521',
      description: 'Invoice shows duplicate charge for subscription renewal.',
      priority: 'Critical',
      status: 'Resolved',
      createdBy: 4,
      assignedTo: 2,
    },
  });

  await prisma.comment.createMany({
    data: [
      { ticketId: ticket1.id, message: 'Reproduced locally. Checking auth service logs.', createdBy: 2 },
      { ticketId: ticket2.id, message: 'Scoping CSV columns with product team.', createdBy: 3 },
      { ticketId: ticket3.id, message: 'Refund issued. Awaiting customer confirmation.', createdBy: 2 },
    ],
  });

  console.log(`Seeded tickets: ${ticket1.id}, ${ticket2.id}, ${ticket3.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
