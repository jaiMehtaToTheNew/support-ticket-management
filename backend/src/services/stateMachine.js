const VALID_TRANSITIONS = {
  Open: ['In Progress', 'Cancelled'],
  'In Progress': ['Resolved', 'Cancelled'],
  Resolved: ['Closed'],
  Closed: [],
  Cancelled: [],
};

const ALL_STATUSES = Object.keys(VALID_TRANSITIONS);

function canTransition(fromStatus, toStatus) {
  if (!ALL_STATUSES.includes(fromStatus)) {
    return false;
  }
  if (!ALL_STATUSES.includes(toStatus)) {
    return false;
  }
  return VALID_TRANSITIONS[fromStatus].includes(toStatus);
}

function getAllowedTransitions(status) {
  return VALID_TRANSITIONS[status] ?? [];
}

module.exports = {
  VALID_TRANSITIONS,
  ALL_STATUSES,
  canTransition,
  getAllowedTransitions,
};
