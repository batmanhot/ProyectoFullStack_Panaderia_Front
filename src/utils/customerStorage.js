const KEY  = 'panaderia_jaujina_customers';
const SALT = 'jaujina_bakery_2026';

const hashPass = (password) => btoa(encodeURIComponent(password + SALT));

export const getCustomers = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
};

export const register = (nombre, email, telefono, password) => {
  const emailLower = email.trim().toLowerCase();
  if (!nombre.trim() || !emailLower || !password) return { error: 'Todos los campos son obligatorios.' };
  if (!/\S+@\S+\.\S+/.test(emailLower)) return { error: 'El correo electrónico no es válido.' };
  if (password.length < 6) return { error: 'La contraseña debe tener al menos 6 caracteres.' };

  const customers = getCustomers();
  if (customers.find((c) => c.email === emailLower)) {
    return { error: 'Ya existe una cuenta con ese correo. Inicia sesión.' };
  }

  const customer = {
    id:           `CUST-${Date.now()}`,
    nombre:       nombre.trim(),
    email:        emailLower,
    telefono:     String(telefono || '').replace(/\D/g, ''),
    passwordHash: hashPass(password),
    registradoEn: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([...customers, customer]));
  return customer;
};

export const login = (email, password) => {
  const emailLower = email.trim().toLowerCase();
  const customer   = getCustomers().find((c) => c.email === emailLower);
  if (!customer) return null;
  if (customer.passwordHash !== hashPass(password)) return null;
  return customer;
};
