import React from 'react';
import { X, Printer, CheckCircle, MessageCircle } from 'lucide-react';

const STATUS_LABELS = {
  recepcionado:   'Recepcionado',
  en_preparacion: 'En Preparación',
  en_camino:      'En Camino',
  entregado:      'Entregado',
  cancelado:      'Cancelado',
  pago_rechazado: 'Pago Rechazado',
};

const OrderTicket = ({ order, onClose, whatsappNumber }) => {
  if (!order) return null;

  const date = new Date(order.timestamp);
  const dateStr = date.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

  const handleSendWhatsApp = () => {
    const number = whatsappNumber || '51951655295';
    const formaPago = order.paymentMethod === 'efectivo' ? 'Efectivo contra Entrega' : 'Yape';
    let msg = `*Pedido Confirmado - Panadería La Jaujina*%0A`;
    msg += `*N° Pedido: ${order.id}*%0A`;
    msg += `———————————————%0A`;
    msg += `*DATOS DE ENTREGA*%0A`;
    msg += `👤 ${order.customer.nombre}%0A`;
    msg += `📍 ${order.customer.direccion}%0A`;
    if (order.customer.referencia) msg += `🔖 Ref: ${order.customer.referencia}%0A`;
    msg += `———————————————%0A`;
    msg += `*PRODUCTOS*%0A`;
    order.items.forEach((i) => {
      msg += `• ${i.qty}x ${i.nombre} — S/ ${(i.precio * i.qty).toFixed(2)}%0A`;
    });
    msg += `———————————————%0A`;
    msg += `*TOTAL: S/ ${order.total.toFixed(2)}*%0A`;
    msg += `*Pago: ${formaPago}*%0A`;
    if (order.yapeCode) msg += `*Código Yape: ${order.yapeCode}*%0A`;
    if (order.notes) msg += `%0A📝 Obs: ${encodeURIComponent(order.notes)}%0A`;
    msg += `%0A¿Pueden confirmar disponibilidad y tiempo de entrega? ¡Gracias!`;
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
  };

  const handlePrint = () => {
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <title>Ticket ${order.id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Courier New', monospace; font-size: 13px; padding: 20px; max-width: 320px; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .title { font-size: 18px; font-weight: bold; }
          .divider { border-top: 1px dashed #000; margin: 8px 0; }
          .row { display: flex; justify-content: space-between; margin: 3px 0; }
          .label { color: #555; font-size: 11px; text-transform: uppercase; margin: 6px 0 2px; }
          .badge { display: inline-block; background: #f0f0f0; padding: 2px 8px; border-radius: 10px; font-size: 11px; }
          .total { font-size: 20px; font-weight: bold; }
          .footer { margin-top: 12px; font-size: 11px; color: #888; text-align: center; }
        </style>
      </head>
      <body>
        <div class="center">
          <div class="title">PANADERÍA LA JAUJINA</div>
          <div style="font-size:11px; color:#888; margin-top:2px;">Productos Artesanales Frescos</div>
          <div class="divider"></div>
          <div class="bold" style="font-size:16px; letter-spacing:2px;">${order.id}</div>
          <div style="font-size:11px; color:#555;">${dateStr} · ${timeStr}</div>
        </div>
        <div class="divider"></div>
        <div class="label">Datos de Entrega</div>
        <div class="bold">${order.customer.nombre}</div>
        <div>📍 ${order.customer.direccion}</div>
        ${order.customer.referencia ? `<div style="font-size:11px; color:#555;">Ref: ${order.customer.referencia}</div>` : ''}
        <div class="divider"></div>
        <div class="label">Productos</div>
        ${order.items.map(i => `
          <div class="row">
            <span>${i.qty}x ${i.nombre}</span>
            <span>S/ ${(i.precio * i.qty).toFixed(2)}</span>
          </div>
        `).join('')}
        <div class="divider"></div>
        <div class="row">
          <span class="bold total">TOTAL</span>
          <span class="bold total">S/ ${order.total.toFixed(2)}</span>
        </div>
        <div class="row" style="margin-top:4px;">
          <span style="color:#555;">Forma de pago</span>
          <span class="bold">${order.paymentMethod === 'efectivo' ? 'Efectivo contra Entrega' : 'Yape'}</span>
        </div>
        ${order.yapeCode ? `<div class="row" style="margin-top:4px;"><span style="color:#555;">Código Yape</span><span class="bold" style="color:#7c3aed;">${order.yapeCode}</span></div>` : ''}
        ${order.notes ? `<div class="divider"></div><div style="font-size:11px; color:#555;">Obs: ${order.notes}</div>` : ''}
        <div class="divider"></div>
        <div class="center badge">${STATUS_LABELS[order.status] || order.status}</div>
        <div class="footer">
          <div>¡Gracias por tu compra!</div>
          <div>Tu pedido fue enviado por WhatsApp</div>
        </div>
      </body>
      </html>
    `;
    const win = window.open('', '_blank', 'width=400,height=650');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 300);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">

        {/* Header */}
        <div className="bg-green-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <CheckCircle size={22} />
            <span className="font-extrabold text-lg">¡Pedido Confirmado!</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={22} />
          </button>
        </div>

        {/* Ticket */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-4">

          {/* Branding */}
          <div className="text-center border-b-2 border-dashed border-gray-200 pb-4">
            <h2 className="text-xl font-extrabold text-orange-800 font-serif italic">Panadería La Jaujina</h2>
            <p className="text-xs text-gray-400">Productos Artesanales Frescos</p>
            <div className="mt-3 inline-block bg-orange-100 px-5 py-1.5 rounded-full">
              <span className="text-orange-700 font-extrabold tracking-widest text-sm">{order.id}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{dateStr} · {timeStr}</p>
          </div>

          {/* Datos de entrega */}
          <div className="bg-orange-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2">Datos de Entrega</p>
            <p className="font-extrabold text-gray-800">{order.customer.nombre}</p>
            <p className="text-gray-600 text-sm mt-1">📍 {order.customer.direccion}</p>
            {order.customer.referencia && (
              <p className="text-gray-400 text-xs mt-0.5">🔖 Ref: {order.customer.referencia}</p>
            )}
          </div>

          {/* Productos */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Productos</p>
            <div className="space-y-1.5">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    <span className="font-bold text-gray-800">{item.qty}x</span> {item.nombre}
                  </span>
                  <span className="font-bold text-gray-800">S/ {(item.precio * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totales */}
          <div className="border-t-2 border-dashed border-gray-200 pt-3 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600">Total</span>
              <span className="text-2xl font-extrabold text-orange-700">S/ {order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Forma de pago</span>
              <span className="font-semibold text-gray-700">
                {order.paymentMethod === 'efectivo' ? '💵 Efectivo contra Entrega' : '📱 Yape'}
              </span>
            </div>
            {order.yapeCode && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Código Yape</span>
                <span className="font-bold text-purple-700 font-mono tracking-wider">{order.yapeCode}</span>
              </div>
            )}
          </div>

          {/* Observaciones */}
          {order.notes && (
            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 italic">
              📝 {order.notes}
            </div>
          )}

          {/* Estado */}
          <div className="text-center border-t border-dashed border-gray-200 pt-3">
            <span className="inline-block bg-blue-100 text-blue-700 font-bold text-sm px-5 py-1.5 rounded-full">
              ✅ {STATUS_LABELS[order.status] || order.status}
            </span>
            <p className="text-xs text-gray-300 mt-2">¡Gracias por tu compra!</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="px-6 pb-6 space-y-3">
          {/* WhatsApp opcional */}
          <button
            onClick={handleSendWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl transition active:scale-95 shadow"
          >
            <MessageCircle size={18} />
            Enviar por WhatsApp
          </button>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-3 rounded-2xl transition"
            >
              <Printer size={18} />
              Imprimir
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-2xl transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTicket;
