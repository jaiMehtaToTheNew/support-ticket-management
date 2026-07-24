import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTickets, fetchMeta } from '../api/client';
import { StatusBadge, PriorityBadge } from '../components/Badges';
import ErrorBanner from '../components/ErrorBanner';

export default function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMeta()
      .then((meta) => setStatuses(meta.statuses))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchTickets({ search: search || undefined, status: statusFilter || undefined })
      .then(setTickets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  return (
    <div>
      <div className="page-header">
        <h1>Tickets</h1>
        <p className="muted">Search and filter support tickets</p>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      <div className="filters card">
        <div className="form-row">
          <label>
            Search
            <input
              type="search"
              placeholder="Keyword in title or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label>
            Status
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <div className="card empty-state">
          <p>No tickets found.</p>
          <Link to="/tickets/new" className="btn btn-primary">
            Create your first ticket
          </Link>
        </div>
      ) : (
        <div className="ticket-grid">
          {tickets.map((ticket) => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="card ticket-card">
              <div className="ticket-card-header">
                <h2>#{ticket.id} {ticket.title}</h2>
                <StatusBadge status={ticket.status} />
              </div>
              <p className="ticket-desc">{ticket.description}</p>
              <div className="ticket-meta">
                <PriorityBadge priority={ticket.priority} />
                <span className="muted">
                  {ticket.assignee ? `Assigned to ${ticket.assignee.name}` : 'Unassigned'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
