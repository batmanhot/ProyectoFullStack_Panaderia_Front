import React, { useState, useEffect, useCallback } from 'react';
import {
  LogOut, RefreshCw, Package, Clock, Truck, CheckCircle2,
  ChevronDown, ChevronUp, Search, ShieldCheck, MapPin,
  User, Banknote, Smartphone, ClipboardList, History,
  ShoppingBag, Settings, XCircle, ShieldX, AlertTriangle,
} from 'lucide-react';
import { orderService } from '../services';
import { STATUS_FLOW, TERMINAL_NEG } from '../constants/orderStatuses';
import { currency } from '../utils/format';
import AdminProductsTab from './AdminProductsTab';
import AdminSettingsTab from './AdminSettingsTab';

/* ── Estado config ─────────────────────────────────────── */
const STATUS = {
  recepcionado:   { label: 'Recepcionado',   color: 'bg-blue-100 text-blue-700 border-blue-300',     dot: 'bg-blue-500',   Icon: Package      },
  en_preparacion: { label: 'En Preparación', color: 'bg-orange-100 text-orange-700 border-orange-300', dot: 'bg-orange-500', Icon: Clock        },
  en_camino:      { label: 'En Camino',      color: 'bg-purple-100 text-purple-700 border-purple-300', dot: 'bg-purple-500', Icon: Truck        },
  entregado:      { label: 'Entregado',      color: 'bg-green-100 text-green-700 border-green-300',   dot: 'bg-green-500',  Icon: CheckCircle2 },
  cancelado:      { label: 'Cancelado',      color: 'bg-red-100 text-red-700 border-red-300',         dot: 'bg-red-500',    Icon: XCircle      },
  pago_rechazado: { label: 'Pago Rechazado', color: 'bg-rose-100 text-rose-700 border-rose-300',      dot: 'bg-rose-600',   Icon: ShieldX      },
};

const TABS = [
  { key: 'pedidos',       label: 'Pedidos',       Icon: Package      },
  { key: 'productos',     label: 'Productos',     Icon: ShoppingBag  },
  { key: 'configuracion', label: 'Configuración', Icon: Settings     },
];

/* ── Panel principal ───────────────────────────────────── */
const AdminPanel = ({ onLogout }) => {
  const [activeTab,   setActiveTab]   = useState('pedidos');
  const [orders,      setOrders]      = useState([]);
  const [filter,      setFilter]      = useState('todos');
  const [search,      setSearch]      = useState('');
  const [expandedId,  setExpandedId]  = useState(null);

  const loadOrders = useCallback(async () => {
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error cargando pedidos:', err);
    }
  }, []);

  useEffect(() => {
    loadOrders();
    const t = setInterval(loadOrders, 30_000);
    return () => clearInterval(t);
  }, [loadOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updated = await orderService.updateStatus(orderId, newStatus);
      setOrders(updated);
    } catch (err) {
      console.error('Error actualizando estado:', err);
    }
  };

  const filtered = orders.filter((o) => {
    const matchStatus = filter === 'todos' || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      o.id.toLowerCase().includes(q) ||
      (o.customer?.nombre || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const stats = {
    total:          orders.length,
    recepcionado:   orders.filter((o) => o.status === 'recepcionado').length,
    en_preparacion: orders.filter((o) => o.status === 'en_preparacion').length,
    en_camino:      orders.filter((o) => o.status === 'en_camino').length,
    entregado:      orders.filter((o) => o.status === 'entregado').length,
    cancelado:      orders.filter((o) => o.status === 'cancelado').length,
    pago_rechazado: orders.filter((o) => o.status === 'pago_rechazado').length,
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      {/* ── Topbar ── */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2.5 rounded-xl">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold leading-none">Panel de Administración</h1>
            <p className="text-gray-400 text-xs mt-0.5">Panadería La Jaujina</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'pedidos' && (
            <button
              onClick={loadOrders}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <RefreshCw size={15} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          )}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition active:scale-95"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      {/* ── Tab navigation ── */}
      <div className="bg-white border-b border-gray-200 sticky top-18 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-orange-600 text-orange-700 bg-orange-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.Icon size={16} />
              {tab.label}
              {tab.key === 'pedidos' && orders.length > 0 && (
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                  activeTab === 'pedidos' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {stats.total}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Contenido por tab ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── TAB: PEDIDOS ── */}
        {activeTab === 'pedidos' && (
          <>
            {/* Stats — fila principal */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
              {[
                { key: 'todos',          label: 'Total',         value: stats.total,          bg: 'bg-gray-800',   ring: 'ring-gray-500'   },
                { key: 'recepcionado',   label: 'Recepcionados', value: stats.recepcionado,   bg: 'bg-blue-600',   ring: 'ring-blue-400'   },
                { key: 'en_preparacion', label: 'Preparando',    value: stats.en_preparacion, bg: 'bg-orange-500', ring: 'ring-orange-300' },
                { key: 'en_camino',      label: 'En Camino',     value: stats.en_camino,      bg: 'bg-purple-600', ring: 'ring-purple-400' },
                { key: 'entregado',      label: 'Entregados',    value: stats.entregado,      bg: 'bg-green-600',  ring: 'ring-green-400'  },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setFilter(s.key)}
                  className={`${s.bg} text-white rounded-2xl p-4 text-center shadow-md hover:opacity-90 transition-all ${
                    filter === s.key ? `ring-2 ${s.ring} ring-offset-2` : ''
                  }`}
                >
                  <p className="text-3xl font-extrabold">{s.value}</p>
                  <p className="text-xs opacity-85 mt-0.5 leading-tight">{s.label}</p>
                </button>
              ))}
            </div>

            {/* Stats — fila cierre negativo */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { key: 'cancelado',      label: 'Cancelados',     value: stats.cancelado,      bg: 'bg-red-600',   ring: 'ring-red-400'   },
                { key: 'pago_rechazado', label: 'Pago Rechazado', value: stats.pago_rechazado, bg: 'bg-rose-700',  ring: 'ring-rose-400'  },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setFilter(s.key)}
                  className={`${s.bg} text-white rounded-xl p-3 text-center shadow hover:opacity-90 transition-all ${
                    filter === s.key ? `ring-2 ${s.ring} ring-offset-2` : ''
                  }`}
                >
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-xs opacity-85 mt-0.5 leading-tight">{s.label}</p>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por N° de pedido o nombre del cliente..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-orange-400 transition text-gray-700 shadow-sm text-sm"
              />
            </div>

            {/* Orders list */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-300">
                <Package size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium text-gray-400">
                  {orders.length === 0 ? 'No hay pedidos registrados aún' : 'Sin resultados para este filtro'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isExpanded={expandedId === order.id}
                    onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB: PRODUCTOS ── */}
        {activeTab === 'productos' && <AdminProductsTab />}

        {/* ── TAB: CONFIGURACIÓN ── */}
        {activeTab === 'configuracion' && <AdminSettingsTab />}
      </div>
    </div>
  );
};

/* ── Tarjeta de pedido ─────────────────────────────────── */
const OrderCard = ({ order, isExpanded, onToggle, onStatusChange }) => {
  const [pendingAction, setPendingAction] = React.useState(null);

  const cfg        = STATUS[order.status] || STATUS.recepcionado;
  const currentIdx = STATUS_FLOW.indexOf(order.status);
  const isTerminal = TERMINAL_NEG.includes(order.status);
  const date = new Date(order.timestamp);
  const dateStr = date.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`${cfg.dot} w-3 h-3 rounded-full shrink-0`} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-gray-800 text-sm">{order.id}</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${cfg.color}`}>{cfg.label}</span>
              {order.customer?.telefono && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">📱 Cliente registrado</span>
              )}
            </div>
            <p className="text-gray-400 text-xs mt-0.5 truncate">
              {order.customer?.nombre} · {dateStr} {timeStr}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-2">
          <span className="text-lg font-extrabold text-orange-700">{currency(order.total)}</span>
          {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-5 space-y-5">

          {/* Progress — solo para flujo normal */}
          {!isTerminal && (
            <div className="flex items-center gap-0">
              {STATUS_FLOW.map((s, idx) => {
                const scfg  = STATUS[s];
                const done   = idx <= currentIdx;
                const active = idx === currentIdx;
                return (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        active ? `${scfg.dot} border-transparent ring-2 ring-offset-1 ring-current text-white`
                        : done ? `${scfg.dot} border-transparent text-white`
                               : 'bg-gray-200 border-gray-300 text-gray-400'
                      }`}>
                        <scfg.Icon size={14} />
                      </div>
                      <span className={`text-xs mt-1 text-center leading-tight ${done ? 'font-bold text-gray-700' : 'text-gray-400'}`}>
                        {scfg.label}
                      </span>
                    </div>
                    {idx < STATUS_FLOW.length - 1 && (
                      <div className={`h-0.5 flex-1 mb-4 mx-1 rounded ${idx < currentIdx ? 'bg-green-400' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Indicador de cierre negativo */}
          {isTerminal && (
            <div className={`flex items-center gap-3 rounded-2xl px-5 py-4 border-2 ${
              order.status === 'cancelado' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}>
              <cfg.Icon size={28} className="shrink-0" />
              <div>
                <p className="font-extrabold text-base">
                  {order.status === 'cancelado' ? 'Pedido Cancelado' : 'Pago Rechazado'}
                </p>
                <p className="text-sm opacity-80">
                  {order.status === 'cancelado'
                    ? 'Este pedido fue cancelado y cerrado definitivamente.'
                    : 'El pago online no pudo verificarse. Pedido cerrado definitivamente.'}
                </p>
              </div>
            </div>
          )}

          {/* Cliente + Productos */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <User size={12} /> Datos del Cliente
              </p>
              <p className="font-extrabold text-gray-800">{order.customer?.nombre}</p>
              <p className="text-gray-600 text-sm flex items-start gap-1.5">
                <MapPin size={14} className="text-orange-500 mt-0.5 shrink-0" />
                {order.customer?.direccion}
              </p>
              {order.customer?.referencia && (
                <p className="text-gray-400 text-xs">🔖 Ref: {order.customer.referencia}</p>
              )}
              {order.customer?.telefono && (
                <p className="text-blue-600 text-xs font-medium">📱 +{order.customer.telefono}</p>
              )}
              <div className="flex items-center gap-1.5 text-sm pt-1 border-t border-gray-50">
                {order.paymentMethod === 'efectivo'
                  ? <><Banknote size={14} className="text-orange-500" /><span className="font-semibold text-gray-700">Efectivo contra Entrega</span></>
                  : <><Smartphone size={14} className="text-purple-500" /><span className="font-semibold text-gray-700">Yape</span></>}
              </div>
              {order.notes && (
                <div className="flex items-start gap-1.5 text-xs text-gray-500 italic bg-gray-50 p-2 rounded-lg">
                  <ClipboardList size={12} className="mt-0.5 shrink-0" />
                  {order.notes}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Productos</p>
              <div className="space-y-1.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      <span className="font-bold text-gray-800">{item.qty}x</span> {item.nombre}
                    </span>
                    <span className="font-bold text-gray-800">{currency(item.precio * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-3 pt-2 flex justify-between font-extrabold">
                <span className="text-gray-600">Total</span>
                <span className="text-orange-700">{currency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Cambiar estado — solo para pedidos en flujo normal */}
          {!isTerminal && (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Cambiar Estado del Pedido</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_FLOW.map((s) => {
                  const scfg    = STATUS[s];
                  const isCurrent = order.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => !isCurrent && onStatusChange(order.id, s)}
                      disabled={isCurrent}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        isCurrent
                          ? `${scfg.color} ring-2 ring-offset-1 cursor-default shadow-sm`
                          : 'border-gray-200 text-gray-500 bg-white hover:border-gray-400 hover:bg-gray-50 active:scale-95'
                      }`}
                    >
                      <scfg.Icon size={14} />
                      {scfg.label}
                      {isCurrent && <span className="ml-0.5">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Acciones críticas — cancelar / pago rechazado */}
          {!isTerminal && (
            <div className="bg-white rounded-xl p-4 border-2 border-red-100">
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle size={12} /> Acciones Críticas (cierre definitivo)
              </p>

              {/* Confirmación inline */}
              {pendingAction ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="font-bold text-red-800 text-sm mb-1 flex items-center gap-2">
                    <AlertTriangle size={15} />
                    {pendingAction === 'cancelado'
                      ? '¿Cancelar este pedido definitivamente?'
                      : '¿Marcar el pago como rechazado y cerrar el pedido?'}
                  </p>
                  <p className="text-red-600 text-xs mb-3 ml-5">
                    Esta acción no se puede revertir. El cliente verá el nuevo estado en su panel.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { onStatusChange(order.id, pendingAction); setPendingAction(null); }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition active:scale-95"
                    >
                      Sí, confirmar
                    </button>
                    <button
                      onClick={() => setPendingAction(null)}
                      className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-bold py-2.5 rounded-xl text-sm transition"
                    >
                      No, volver
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPendingAction('pago_rechazado')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 transition active:scale-95"
                  >
                    <ShieldX size={15} />
                    Pago Online Rechazado
                  </button>
                  <button
                    onClick={() => setPendingAction('cancelado')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-red-300 text-red-700 bg-red-50 hover:bg-red-100 transition active:scale-95"
                  >
                    <XCircle size={15} />
                    Cancelar Pedido
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Historial */}
          {order.statusHistory?.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <History size={12} /> Historial de Trazabilidad
              </p>
              <div className="space-y-2.5">
                {[...order.statusHistory].reverse().map((h, i) => {
                  const hcfg  = STATUS[h.status];
                  const d     = new Date(h.timestamp);
                  const first = i === 0;
                  return (
                    <div key={i} className={`flex items-start gap-3 text-sm ${first ? 'opacity-100' : 'opacity-70'}`}>
                      <div className={`${hcfg?.dot || 'bg-gray-400'} w-2.5 h-2.5 rounded-full mt-1.5 shrink-0`} />
                      <div className="flex-1">
                        <span className={`font-bold ${first ? 'text-gray-800' : 'text-gray-600'}`}>
                          {hcfg?.label || h.status}
                        </span>
                        {h.note && <span className="text-gray-400 ml-2 text-xs italic">{h.note}</span>}
                        <div className="text-gray-400 text-xs mt-0.5">
                          {d.toLocaleDateString('es-PE')} · {d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {first && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${hcfg?.color}`}>Actual</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
