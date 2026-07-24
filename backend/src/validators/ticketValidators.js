const { z } = require('zod');
const { ALL_STATUSES } = require('../services/stateMachine');

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const createTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  priority: z.enum(PRIORITIES, { errorMap: () => ({ message: 'Invalid priority' }) }),
  createdBy: z.number().int().positive('createdBy must be a valid user id'),
  assignedTo: z.number().int().positive().optional().nullable(),
});

const updateTicketSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  priority: z.enum(PRIORITIES).optional(),
  assignedTo: z.number().int().positive().nullable().optional(),
});

const statusChangeSchema = z.object({
  status: z.enum(ALL_STATUSES, { errorMap: () => ({ message: 'Invalid status' }) }),
});

const createCommentSchema = z.object({
  message: z.string().min(1, 'Message is required').max(2000),
  createdBy: z.number().int().positive('createdBy must be a valid user id'),
});

const listQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(ALL_STATUSES).optional(),
});

module.exports = {
  PRIORITIES,
  createTicketSchema,
  updateTicketSchema,
  statusChangeSchema,
  createCommentSchema,
  listQuerySchema,
};
