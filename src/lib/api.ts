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

// ── Scores ──

export async function apiGetScores() {
  const res = await fetch(`${API_BASE}/scores`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function apiAddScore(score_value: number) {
  const res = await fetch(`${API_BASE}/scores`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ score_value }),
  });
  return handleResponse(res);
}

// ── Charities ──

export async function apiGetCharities() {
  const res = await fetch(`${API_BASE}/charities`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function apiSelectCharity(charity_id: string, charity_percent: number) {
  const res = await fetch(`${API_BASE}/charities/select`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ charity_id, charity_percent }),
  });
  return handleResponse(res);
}

// ── Draws ──

export async function apiGetDraws() {
  const res = await fetch(`${API_BASE}/draws`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function apiSimulateDraw(prize_pool_total: number) {
  const res = await fetch(`${API_BASE}/draws/simulate`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ prize_pool_total }),
  });
  return handleResponse(res);
}

// ── Admin: Users ──

export async function apiGetAllUsers() {
  const res = await fetch(`${API_BASE}/users`, { headers: authHeaders() });
  return handleResponse(res);
}
