const ORDERS_KEY = 'panaderia_jaujina_orders';

export const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveOrder = (order) => {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const updateOrderStatus = (orderId, newStatus, note = '') => {
  const orders = getOrders();
  const updated = orders.map((o) => {
    if (o.id !== orderId) return o;
    return {
      ...o,
      status: newStatus,
      statusHistory: [
        ...o.statusHistory,
        { status: newStatus, timestamp: new Date().toISOString(), note },
      ],
    };
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return updated;
};

export const generateOrderId = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `ORD-${date}-${time}`;
};
