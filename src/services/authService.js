import { http, isBackend, setToken, clearToken } from '../lib/api';
import * as localCustomer from '../utils/customerStorage';

/* Solo para desarrollo local — NUNCA en producción con backend */
const DEV_ADMIN_PWD = import.meta.env.VITE_ADMIN_PASSWORD || 'jaujina2026';

export const authService = {

  /* ─────────────────── ADMIN ─────────────────── */

  /**
   * Login de administrador.
   * Backend: POST /auth/admin/login  → { token }
   * Local:   compara contra VITE_ADMIN_PASSWORD
   * @returns {Promise<boolean>}
   */
  adminLogin: async (password) => {
    if (isBackend()) {
      const { token } = await http.post('/auth/admin/login', { password });
      setToken(token);
      return true;
    }
    return password === DEV_ADMIN_PWD;
  },

  adminLogout: () => {
    clearToken();
  },

  /* ────────────────── CLIENTE ─────────────────── */

  /**
   * Login de cliente.
   * Backend: POST /auth/customer/login  → { customer, token }
   * Local:   busca en localStorage, compara hash
   * @returns {Promise<object|null>}  customer sin passwordHash, o null si falla
   */
  customerLogin: async (email, password) => {
    if (isBackend()) {
      const { customer, token } = await http.post('/auth/customer/login', { email, password });
      setToken(token);
      return customer;
    }
    const raw = localCustomer.login(email, password);
    if (!raw) return null;
    const { passwordHash: _, ...safe } = raw;
    return safe;
  },

  /**
   * Registro de cliente.
   * Backend: POST /auth/customer/register  → { customer, token }
   * Local:   crea en localStorage con hash btoa (solo dev)
   * @returns {Promise<object>}  customer, o { error: string } si falla
   */
  customerRegister: async (nombre, email, telefono, password) => {
    if (isBackend()) {
      const { customer, token } = await http.post('/auth/customer/register', {
        nombre, email, telefono, password,
      });
      setToken(token);
      return customer;
    }
    const raw = localCustomer.register(nombre, email, telefono, password);
    if (raw?.error) return raw;
    const { passwordHash: _, ...safe } = raw;
    return safe;
  },

  customerLogout: () => {
    clearToken();
  },
};
