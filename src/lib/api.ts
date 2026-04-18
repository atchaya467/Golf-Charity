const API_BASE = import.meta.env.VITE_API_BASE || '/api';

function getToken(): string | null {
  return localStorage.getItem('dh_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

// ── Auth ──

export async function apiRegister(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('dh_token', data.token);
  return data;
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('dh_token', data.token);
  return data;
}

export function apiLogout() {
  localStorage.removeItem('dh_token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// ── User Profile ──

export async function apiGetMe() {
  const res = await fetch(`${API_BASE}/me`, { headers: authHeaders() });
  return handleResponse(res);
}

// ── Events ──

export async function apiGetEvents() {
  const res = await fetch(`${API_BASE}/events`);
  return handleResponse(res);
}

export async function apiRegisterEvent(event_id: string) {
  const res = await fetch(`${API_BASE}/events/${event_id}/register`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

// ── Donations ──

export async function apiDonate(amount: number, charity_id?: string, user_id?: string) {
  const res = await fetch(`${API_BASE}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, charity_id, user_id }),
  });
  return handleResponse(res);
}

export async function apiGetImpact() {
  const res = await fetch(`${API_BASE}/donations/impact`);
  return handleResponse(res);
}

// ── Admin: Users ──

export async function apiGetAllUsers() {
  const res = await fetch(`${API_BASE}/users`, { headers: authHeaders() });
  return handleResponse(res);
}
