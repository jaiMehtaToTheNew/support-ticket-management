import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  addComment,
  changeTicketStatus,
  fetchMeta,
  fetchTicket,
  fetchUsers,
  updateTicket,
} from '../api/client';
import { StatusBadge, PriorityBadge } from '../components/Badges';
import ErrorBanner from '../components/ErrorBanner';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [editForm, setEditForm] = useState({});
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [error, setError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTicket = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTicket(id);
      setTicket(data);
      setEditForm({
        title: data.title,
        description: data.description,
        priority: data.priority,
        assignedTo: data.assignedTo ? String(data.assignedTo) : '',
      });
      const meta = await fetchMeta();
      setTransitions(meta.transitions[data.status] || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        if (data.length > 0) setCommentAuthor(String(data[0].id));
      })
      .catch((err) => setError(err.message));
    loadTicket();
  }, [loadTicket]);

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    try {
      const updated = await updateTicket(id, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        priority: editForm.priority,
        assignedTo: editForm.assignedTo ? Number(editForm.assignedTo) : null,
      });
      setTicket(updated);
      const meta = await fetchMeta();
      setTransitions(meta.transitions[updated.status] || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStatusChange(newStatus) {
    setStatusError('');
    try {
      const updated = await changeTicketStatus(id, newStatus);
      setTicket(updated);
      const meta = await fetchMeta();
      setTransitions(meta.transitions[updated.status] || []);
    } catch (err) {
      setStatusError(err.message);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    setError('');
    try {
      await addComment(id, {
        message: commentText.trim(),
        createdBy: Number(commentAuthor),
      });
      setCommentText('');
      await loadTicket();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="muted">Loading ticket...</p>;
  if (!ticket) {
    return (
      <div>
        <ErrorBanner message={error || 'Ticket not found'} />
        <Link to="/">Back to tickets</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Back to tickets
        </Link>
        <h1>
          #{ticket.id} {ticket.title}
        </h1>
        <div className="badges-row">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError('')} />
      <ErrorBanner message={statusError} onDismiss={() => setStatusError('')} />

      <div className="detail-grid">
        <section className="card">
          <h2>Details</h2>
          <form className="form" onSubmit={handleUpdate}>
            <label>
              Title
              <input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={5}
                required
              />
            </label>
            <label>
              Priority
              <select
                value={editForm.priority}
                onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Assignee
              <select
                value={editForm.assignedTo}
                onChange={(e) => setEditForm({ ...editForm, assignedTo: e.target.value })}
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </section>

        <section className="card">
          <h2>Status</h2>
          <p className="muted">Current: <strong>{ticket.status}</strong></p>
          {transitions.length === 0 ? (
            <p className="muted">No further transitions available.</p>
          ) : (
            <div className="status-actions">
              {transitions.map((s) => (
                <button key={s} type="button" className="btn btn-secondary" onClick={() => handleStatusChange(s)}>
                  Move to {s}
                </button>
              ))}
            </div>
          )}
          <dl className="meta-list">
            <div>
              <dt>Created by</dt>
              <dd>{ticket.creator?.name}</dd>
            </div>
            <div>
              <dt>Assignee</dt>
              <dd>{ticket.assignee?.name || 'Unassigned'}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{new Date(ticket.createdAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{new Date(ticket.updatedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="card comments-section">
        <h2>Comments ({ticket.comments.length})</h2>
        <ul className="comment-list">
          {ticket.comments.map((c) => (
            <li key={c.id} className="comment">
              <div className="comment-header">
                <strong>{c.author?.name}</strong>
                <span className="muted">{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <p>{c.message}</p>
            </li>
          ))}
        </ul>

        <form className="form" onSubmit={handleAddComment}>
          <label>
            Add comment
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              required
              placeholder="Write an update..."
            />
          </label>
          <label>
            Author
            <select value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>
      </section>
    </div>
  );
}
