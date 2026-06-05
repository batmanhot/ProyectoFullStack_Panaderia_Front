export const currency = (amount) => `S/ ${Number(amount).toFixed(2)}`;

export const formatDate = (iso, opts = {}) =>
  new Date(iso).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric', ...opts });

export const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

/** Escapa caracteres HTML en strings de usuario para evitar XSS vía innerHTML */
export const esc = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
