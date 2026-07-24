const express = require('express');
const ticketService = require('../services/ticketService');
const { validate } = require('../middleware/validate');
const {
  createTicketSchema,
  updateTicketSchema,
  statusChangeSchema,
  createCommentSchema,
  listQuerySchema,
  PRIORITIES,
} = require('../validators/ticketValidators');
const { ALL_STATUSES, getAllowedTransitions } = require('../services/stateMachine');

const router = express.Router();

router.get('/meta', (_req, res) => {
  res.json({
    statuses: ALL_STATUSES,
    priorities: PRIORITIES,
    transitions: ALL_STATUSES.reduce((acc, status) => {
      acc[status] = getAllowedTransitions(status);
      return acc;
    }, {}),
  });
});

router.get('/users', async (_req, res, next) => {
  try {
    const users = await ticketService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/', validate(listQuerySchema, 'query'), async (req, res, next) => {
  try {
    const tickets = await ticketService.listTickets(req.query);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(Number(req.params.id));
    res.json(ticket);
  } catch (err) {
    next(err);
  }
});

router.post('/', validate(createTicketSchema), async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', validate(updateTicketSchema), async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicket(Number(req.params.id), req.body);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/status', validate(statusChangeSchema), async (req, res, next) => {
  try {
    const ticket = await ticketService.changeTicketStatus(Number(req.params.id), req.body.status);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/comments', validate(createCommentSchema), async (req, res, next) => {
  try {
    const comment = await ticketService.addComment(Number(req.params.id), req.body);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
