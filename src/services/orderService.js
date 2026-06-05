import { http, isBackend } from '../lib/api';
import * as local from '../utils/orderStorage';

export const orderService = {

  /** GET /orders  → todos (admin) */
  getOrders: async () => {
    if (isBackend()) {
      const { orders } = await http.get('/orders');
      return orders;
    }
    return local.getOrders();
  },

  /**
   * GET /orders/mine  → solo los del cliente autenticado.
   * En local: filtra por teléfono o email.
   */
  getMyOrders: async (telefono, email) => {
    if (isBackend()) {
      const { orders } = await http.get('/orders/mine');
      return orders;
    }
    const all = local.getOrders();
    return all.filter((o) =>
      (telefono && o.customer?.telefono === telefono) ||
      (email    && o.customer?.email    === email)
    );
  },

  /** POST /orders  → crea el pedido y devuelve el objeto guardado */
  createOrder: async (order) => {
    if (isBackend()) {
      const { order: saved } = await http.post('/orders', order);
      return saved;
    }
    local.saveOrder(order);
    return order;
  },

  /**
   * PATCH /orders/:id/status  → cambia estado (solo admin).
   * Devuelve el array actualizado de pedidos.
   */
  updateStatus: async (orderId, newStatus, note = '') => {
    if (isBackend()) {
      const { orders } = await http.patch(`/orders/${orderId}/status`, { status: newStatus, note });
      return orders;
    }
    return local.updateOrderStatus(orderId, newStatus, note);
  },

  /** Genera un ID de pedido — siempre local (el backend generará el suyo) */
  generateId: () => local.generateOrderId(),
};
