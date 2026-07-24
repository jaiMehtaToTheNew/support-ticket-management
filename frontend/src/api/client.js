const API_BASE = '/api/tickets';

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.error || 'Request failed';
    const details = data.details ? data.details.map((d) => d.message).join(', ') : '';
    throw new Error(details ? `${message}: ${details}` : message);
  }
  return data;
}

export async function fetchMeta() {
  const res = await fetch(`${API_BASE}/meta`);
  return handleResponse(res);
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return handleResponse(res);
}

export async function fetchTickets({ search, status } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);
  const query = params.toString();
  const res = await fetch(`${API_BASE}${query ? `?${query}` : ''}`);
  return handleResponse(res);
}

export async function fetchTicket(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse(res);
}

export async function createTicket(payload) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateTicket(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function changeTicketStatus(id, status) {
  const res = await fetch(`${API_BASE}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}

export async function addComment(ticketId, payload) {
  const res = await fetch(`${API_BASE}/${ticketId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
