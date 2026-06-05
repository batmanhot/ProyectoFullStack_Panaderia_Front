/**
 * HTTP client base.
 * Activa el backend configurando VITE_API_URL en .env
 * Sin esa variable, el frontend sigue usando localStorage.
 */

const BASE_URL = import.meta.env.VITE_API_URL; // e.g. "http://localhost:3001/api"

/* ── Token en memoria (NO en localStorage por seguridad) ── */
let _token = null;
export const setToken   = (t) => { _token = t; };
export const clearToken = ()  => { _token = null; };
export const getToken   = ()  => _token;

/* ── Detecta si el backend está habilitado ──────────────── */
export const isBackend = () => Boolean(BASE_URL);

/* ── Headers comunes ────────────────────────────────────── */
const buildHeaders = () => ({
  'Content-Type': 'application/json',
  ...(_token ? { Authorization: `Bearer ${_token}` } : {}),
});

/* ── Request base ───────────────────────────────────────── */
const request = async (method, path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status} en ${method} ${path}`;
    throw new Error(msg);
  }

  return data;
};

/* ── Métodos exportables ────────────────────────────────── */
export const http = {
  get:    (path)       => request('GET',    path),
  post:   (path, body) => request('POST',   path, body),
  patch:  (path, body) => request('PATCH',  path, body),
  put:    (path, body) => request('PUT',    path, body),
  delete: (path)       => request('DELETE', path),
};

/*
 * ── CONTRATO DE API ESPERADO ─────────────────────────────
 *
 * Auth:
 *   POST /auth/admin/login          { password }            → { token }
 *   POST /auth/customer/login       { email, password }     → { customer, token }
 *   POST /auth/customer/register    { nombre, email, telefono, password } → { customer, token }
 *
 * Pedidos:
 *   GET  /orders                    (admin: todos; cliente: propios vía token)
 *   GET  /orders/mine               (cliente autenticado)
 *   POST /orders                    { order }               → { order }
 *   PATCH /orders/:id/status        { status, note }        → { orders }
 *
 * Productos:
 *   GET  /products                                          → { products }
 *   POST /products                  { category, product }  → { products }
 *   PATCH /products/:id             { category, updates }  → { products }
 *   DELETE /products/:id?category=X                        → { products }
 *   POST /products/categories       { categoryName }       → { products }
 *   POST /products/reset                                   → { products }
 *
 * Configuración:
 *   GET  /settings                                         → { settings }
 *   PATCH /settings                 { settings }           → { settings }
 */
