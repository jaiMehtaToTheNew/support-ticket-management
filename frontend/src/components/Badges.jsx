const STATUS_COLORS = {
  Open: 'status-open',
  'In Progress': 'status-progress',
  Resolved: 'status-resolved',
  Closed: 'status-closed',
  Cancelled: 'status-cancelled',
};

const PRIORITY_COLORS = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high',
  Critical: 'priority-critical',
};

export function StatusBadge({ status }) {
  return <span className={`badge ${STATUS_COLORS[status] || ''}`}>{status}</span>;
}

export function PriorityBadge({ priority }) {
  return <span className={`badge ${PRIORITY_COLORS[priority] || ''}`}>{priority}</span>;
}
