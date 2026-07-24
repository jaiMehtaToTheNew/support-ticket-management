import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket, fetchUsers } from '../api/client';
import ErrorBanner from '../components/ErrorBanner';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    createdBy: '',
    assignedTo: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setForm((prev) => ({ ...prev, createdBy: String(data[0].id) }));
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        createdBy: Number(form.createdBy),
        assignedTo: form.assignedTo ? Number(form.assignedTo) : null,
      };
      const ticket = await createTicket(payload);
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Create Ticket</h1>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Title *
          <input name="title" value={form.title} onChange={handleChange} required maxLength={200} />
        </label>

        <label>
          Description *
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
            maxLength={5000}
          />
        </label>

        <label>
          Priority *
          <select name="priority" value={form.priority} onChange={handleChange}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label>
          Created By *
          <select name="createdBy" value={form.createdBy} onChange={handleChange} required>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </label>

        <label>
          Assign To
          <select name="assignedTo" value={form.assignedTo} onChange={handleChange}>
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}
