const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const opts = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  };

  // Attach auth token if present
  try {
    const token = localStorage.getItem('authToken');
    if (token) opts.headers = { ...opts.headers, Authorization: `Bearer ${token}` };
  } catch (e) {
    // ignore
  }

  if (opts.body && typeof opts.body !== 'string') {
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const err = data && data.error ? data.error : (data && data.message) || res.statusText;
    const e = new Error(err || 'Request failed');
    e.status = res.status;
    e.body = data;
    throw e;
  }

  return data;
}

export default apiFetch;
