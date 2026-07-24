const { PrismaClient } = require('@prisma/client');
const { canTransition, getAllowedTransitions } = require('./stateMachine');
const { createError } = require('../middleware/errorHandler');

const prisma = new PrismaClient();

const ticketInclude = {
  creator: { select: { id: true, name: true, email: true, role: true } },
  assignee: { select: { id: true, name: true, email: true, role: true } },
  comments: {
    include: { author: { select: { id: true, name: true, email: true, role: true } } },
    orderBy: { createdAt: 'asc' },
  },
};

async function listTickets({ search, status }) {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  return prisma.ticket.findMany({
    where,
    include: ticketInclude,
    orderBy: { updatedAt: 'desc' },
  });
}

async function getTicketById(id) {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: ticketInclude,
  });

  if (!ticket) {
    throw createError(404, 'Ticket not found');
  }

  return ticket;
}

async function createTicket(data) {
  await ensureUserExists(data.createdBy);

  if (data.assignedTo) {
    await ensureUserExists(data.assignedTo);
  }

  return prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      createdBy: data.createdBy,
      assignedTo: data.assignedTo ?? null,
      status: 'Open',
    },
    include: ticketInclude,
  });
}

async function updateTicket(id, data) {
  await getTicketById(id);

  if (data.assignedTo) {
    await ensureUserExists(data.assignedTo);
  }

  return prisma.ticket.update({
    where: { id },
    data,
    include: ticketInclude,
  });
}

async function changeTicketStatus(id, newStatus) {
  const ticket = await getTicketById(id);

  if (!canTransition(ticket.status, newStatus)) {
    const allowed = getAllowedTransitions(ticket.status);
    throw createError(
      400,
      `Invalid status transition from "${ticket.status}" to "${newStatus}". Allowed: ${allowed.length ? allowed.join(', ') : 'none'}`
    );
  }

  return prisma.ticket.update({
    where: { id },
    data: { status: newStatus },
    include: ticketInclude,
  });
}

async function addComment(ticketId, data) {
  await getTicketById(ticketId);
  await ensureUserExists(data.createdBy);

  return prisma.comment.create({
    data: {
      ticketId,
      message: data.message,
      createdBy: data.createdBy,
    },
    include: { author: { select: { id: true, name: true, email: true, role: true } } },
  });
}

async function listUsers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { name: 'asc' },
  });
}

async function ensureUserExists(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw createError(400, `User with id ${userId} not found`);
  }
  return user;
}

module.exports = {
  listTickets,
  getTicketById,
  createTicket,
  updateTicket,
  changeTicketStatus,
  addComment,
  listUsers,
  prisma,
};
