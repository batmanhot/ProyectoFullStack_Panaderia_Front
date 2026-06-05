import React, { useState, useEffect, useCallback } from 'react';
import {
  LogOut, RefreshCw, Package, Clock, Truck, CheckCircle2,
  ChevronDown, ChevronUp, ShoppingBag, User, Printer,
  XCircle, ShieldX,
} from 'lucide-react';
import { getOrders } from '../utils/orderStorage';
import OrderTicket from './OrderTicket';

/* ── Config estados ───────────────────────────────────── */
const STATUS = {
  recepcionado:   { label: 'Recepcionado',   emoji: '📦', dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',     Icon: Package      },
  en_preparacion: { label: 'En Preparación', emoji: '👨‍🍳', dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700', Icon: Clock        },
  en_camino:      { label: 'En Camino',      emoji: '🛵', dot: 'bg-purple-500', badge: 'bg-purple-100 text-purple-700', Icon: Truck        },
  entregado:      { label: 'Entregado',      emoji: '✅', dot: 'bg-green-500',  badge: 'bg-green-100 text-green-700',   Icon: CheckCircle2 },
  cancelado:      { label: 'Cancelado',      emoji: '❌', dot: 'bg-red-500',    badge: 'bg-red-100 text-red-700',       Icon: XCircle      },
  pago_rechazado: { label: 'Pago Rechazado', emoji: '🚫', dot: 'bg-rose-600',   badge: 'bg-rose-100 text-rose-700',     Icon: ShieldX      },
};

const TERMINAL_NEGATIVE = ['cancelado', 'pago_rechazado'];
const FLOW = ['recepcionado', 'en_preparacion', 'en_camino', 'entregado'];
const STEP_SHORT = { recepcionado: 'Recibido', en_preparacion: 'Preparando', en_camino: 'En Camino', entregado: 'Entregado' };

/* ── Panel principal del cliente ─────────────────────── */
const CustomerOrders = ({ customer, onClose, onLogout }) => {
  const [orders,       setOrders]       = useState([]);
  const [filter,       setFilter]       = useState('todos');
  const [expandedId,   setExpandedId]   = useState(null);
  const [ticketOrder,  setTicketOrder]  = useState(null);
  const [lastRefresh,  setLastRefresh]  = useState(new Date());

  const loadOrders = useCallback(() => {
    const all  = getOrders();
    const mine = all.filter((o) => o.customer?.telefono === customer.telefono ||
                                   o.customer?.email     === customer.email);
    setOrders(mine);
    setLastRefresh(new Date());
  }, [customer.telefono, customer.email]);

  useEffect(() => {
    loadOrders();
    const t = setInterval(loadOrders, 5000);
    return () => clearInterval(t);
  }, [loadOrders]);

  const stats = {
    total:          orders.length,
    recepcionado:   orders.filter((o) => o.status === 'recepcionado').length,
    en_preparacion: orders.filter((o) => o.status === 'en_preparacion').length,
    en_camino:      orders.filter((o) => o.status === 'en_camino').length,
    entregado:      orders.filter((o) => o.status === 'entregado').length,
    activos:        orders.filter((o) => !['entregado', ...TERMINAL_NEGATIVE].includes(o.status)).length,
    cancelados:     orders.filter((o) => TERMINAL_NEGATIVE.includes(o.status)).length,
  };

  const filtered = filter === 'todos' ? orders : orders.filter((o) => o.status === filter);

  const timeStr = lastRefresh.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const initials = customer.nombre.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="fixed inset-0 z-200 bg-gray-100 overflow-y-auto font-sans">

      {/* ── Header ── */}
      <header className="bg-linear-to-r from-orange-700 to-amber-600 text-white px-6 py-5 sticky top-0 z-10 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center font-extrabold text-lg">
              {initials}
            </div>
            <div>
              <p className="font-extrabold text-lg leading-none">Hola, {customer.nombre.split(' ')[0]} 👋</p>
              <p className="text-orange-200 text-xs mt-0.5">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadOrders}
              className="flex items-center gap-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl text-sm transition"
              title="Actualizar">
              <RefreshCw size={14} />
              <span className="hidden sm:inline text-xs">{timeStr}</span>
            </button>
            <button onClick={onLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-sm font-bold transition">
              <LogOut size={15} /> Salir
            </button>
            <button onClick={onClose}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-sm font-bold transition">
              ✕
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* ── Stats cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { key: 'todos',          label: 'Total Pedidos',  value: stats.total,        bg: 'bg-gray-800',   ring: 'ring-gray-400'   },
            { key: 'recepcionado',   label: 'Recepcionados',  value: stats.recepcionado, bg: 'bg-blue-600',   ring: 'ring-blue-400'   },
            { key: 'en_camino',      label: 'En Camino',      value: stats.en_camino,    bg: 'bg-purple-600', ring: 'ring-purple-400' },
            { key: 'entregado',      label: 'Entregados',     value: stats.entregado,    bg: 'bg-green-600',  ring: 'ring-green-400'  },
            { key: 'cancelado',      label: 'Cancelados',     value: stats.cancelados,   bg: 'bg-red-600',    ring: 'ring-red-400'    },
          ].map((s) => (
            <button key={s.key} onClick={() => setFilter(s.key)}
              className={`${s.bg} text-white rounded-2xl p-4 text-center shadow hover:opacity-90 transition ${
                filter === s.key ? `ring-2 ${s.ring} ring-offset-2` : ''
              }`}
            >
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-xs opacity-80 mt-0.5 leading-tight">{s.label}</p>
            </button>
          ))}
        </div>

        {/* ── Aviso si hay pedidos activos ── */}
        {stats.activos > 0 && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="font-bold text-orange-800">
                {stats.activos} pedido{stats.activos > 1 ? 's' : ''} en proceso
              </p>
              <p className="text-orange-600 text-sm">Se actualiza automáticamente cada 5 segundos.</p>
            </div>
          </div>
        )}

        {/* ── Lista de pedidos ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-gray-800 text-lg">
              {filter === 'todos' ? 'Todos mis pedidos' : `Pedidos: ${STATUS[filter]?.label || filter}`}
              {' '}<span className="text-gray-400 font-normal text-base">({filtered.length})</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-300 bg-white rounded-2xl border border-gray-100">
              <ShoppingBag size={56} className="mx-auto mb-3 opacity-30" />
              <p className="text-gray-400 font-medium">
                {orders.length === 0
                  ? 'Aún no tienes pedidos. ¡Haz tu primer pedido!'
                  : 'Sin pedidos con este estado.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((order) => (
                <CustomerOrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedId === order.id}
                  onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  onViewTicket={() => setTicketOrder(order)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ticket modal */}
      {ticketOrder && (
        <OrderTicket order={ticketOrder} onClose={() => setTicketOrder(null)} />
      )}
    </div>
  );
};

/* ── Tarjeta de pedido para el cliente ───────────────── */
const CustomerOrderCard = ({ order, isExpanded, onToggle, onViewTicket }) => {
  const cfg           = STATUS[order.status] || STATUS.recepcionado;
  const currentIdx    = FLOW.indexOf(order.status);
  const date          = new Date(order.timestamp);
  const dateStr       = date.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr       = date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  const isTerminal    = TERMINAL_NEGATIVE.includes(order.status);
  const isActive      = !['entregado', ...TERMINAL_NEGATIVE].includes(order.status);

  return (
    <div className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all ${
      isActive ? 'border-orange-200' : 'border-gray-100'
    }`}>

      {/* Cabecera clickeable */}
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition">
        <div className={`${cfg.dot} w-3 h-3 rounded-full shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-gray-800 text-xs tracking-wider">{order.id}</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cfg.badge}`}>
              {cfg.emoji} {cfg.label}
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-0.5 truncate">
            {dateStr} · {timeStr} · <span className="font-bold text-gray-600">S/ {order.total.toFixed(2)}</span>
          </p>
        </div>
        {isExpanded
          ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
          : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
      </button>

      {/* Detalle */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-4">

          {/* Estado del pedido */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Estado del Pedido</p>

            {/* Progreso normal (solo estados del flujo regular) */}
            {!isTerminal && (
              <>
                <div className="relative flex items-start justify-between">
                  <div className="absolute top-3.5 left-3.5 right-3.5 h-1 bg-gray-200 z-0" />
                  <div
                    className="absolute top-3.5 left-3.5 h-1 bg-green-400 z-0 transition-all"
                    style={{ width: currentIdx > 0 ? `${(currentIdx / (FLOW.length - 1)) * 100}%` : '0%' }}
                  />
                  {FLOW.map((s, idx) => {
                    const scfg   = STATUS[s];
                    const done   = idx <= currentIdx;
                    const active = idx === currentIdx;
                    return (
                      <div key={s} className="flex flex-col items-center gap-1.5 relative z-10 flex-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          active  ? `${scfg.dot} ring-4 ring-offset-1 ring-orange-200 text-white shadow-md`
                          : done  ? `${scfg.dot} text-white`
                                  : 'bg-gray-200 text-gray-400'
                        }`}>
                          {done ? <scfg.Icon size={12} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                        </div>
                        <span className={`text-xs text-center leading-tight ${
                          active ? 'font-extrabold text-orange-700' : done ? 'font-bold text-gray-700' : 'text-gray-400'
                        }`}>
                          {STEP_SHORT[s]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className={`mt-4 rounded-xl px-3 py-2.5 text-sm font-medium flex items-center gap-2 ${cfg.badge}`}>
                  <span>{cfg.emoji}</span>
                  {order.status === 'recepcionado'   && 'Tu pedido fue recibido. ¡Pronto comenzamos a prepararlo!'}
                  {order.status === 'en_preparacion' && 'Estamos preparando tu pedido con todo el cariño artesanal. 🧁'}
                  {order.status === 'en_camino'      && '¡Tu pedido está en camino! Pronto llegará a tu puerta. 🛵'}
                  {order.status === 'entregado'      && '¡Pedido entregado! Esperamos que lo disfrutes mucho. 😊'}
                </div>
              </>
            )}

            {/* Pedido cerrado negativamente */}
            {isTerminal && (
              <div className={`rounded-xl px-4 py-4 flex items-start gap-3 ${cfg.badge} border border-current/20`}>
                <cfg.Icon size={28} className="shrink-0 mt-0.5 opacity-80" />
                <div>
                  <p className="font-extrabold text-base leading-tight">
                    {order.status === 'cancelado'      && 'Pedido Cancelado'}
                    {order.status === 'pago_rechazado' && 'Pago Rechazado'}
                  </p>
                  <p className="text-sm mt-1 opacity-80">
                    {order.status === 'cancelado'      && 'Este pedido fue cancelado definitivamente. Para un nuevo pedido, vuelve al catálogo.'}
                    {order.status === 'pago_rechazado' && 'No se pudo verificar el pago. El pedido fue cerrado. Comunícate con nosotros si crees que es un error.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Resumen de productos */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Productos</p>
            <div className="space-y-1.5">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600"><span className="font-bold text-gray-800">{item.qty}×</span> {item.nombre}</span>
                  <span className="font-bold text-gray-800">S/ {(item.precio * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-2.5 pt-2 flex justify-between font-extrabold text-sm">
              <span className="text-gray-600">Total pagado</span>
              <span className="text-orange-700 text-base">S/ {order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Info de entrega */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-sm space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Datos de Entrega</p>
            <p className="text-gray-500">📍 {order.customer.direccion}</p>
            {order.customer.referencia && <p className="text-gray-400 text-xs">🔖 {order.customer.referencia}</p>}
            <p className="text-gray-500 text-xs pt-0.5">
              {order.paymentMethod === 'efectivo' ? '💵 Efectivo contra Entrega' : '📱 Yape'}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <button
              onClick={onViewTicket}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-orange-200 text-orange-700 hover:bg-orange-50 font-bold py-2.5 rounded-xl text-sm transition"
            >
              <Printer size={15} /> Ver Comprobante
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
