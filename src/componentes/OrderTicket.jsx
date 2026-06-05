import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, FileDown, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { STATUS_LABELS } from '../constants/orderStatuses';
import { esc, currency, formatDate, formatTime } from '../utils/format';

const OrderTicket = ({ order, onClose, whatsappNumber }) => {
  const [pdfPreview, setPdfPreview] = useState(null); // { dataUrl, width, height }
  const [generating, setGenerating] = useState(false);
  const [pdfError,   setPdfError]   = useState('');

  if (!order) return null;

  const dateStr = formatDate(order.timestamp, { month: 'long' });
  const timeStr = formatTime(order.timestamp);

  /* ── WhatsApp ──────────────────────────────────────── */
  const handleSendWhatsApp = () => {
    const number    = whatsappNumber || '';
    if (!number) return;
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
      msg += `• ${i.qty}x ${i.nombre} — ${currency(i.precio * i.qty)}%0A`;
    });
    msg += `———————————————%0A`;
    msg += `*TOTAL: ${currency(order.total)}*%0A`;
    msg += `*Pago: ${formaPago}*%0A`;
    if (order.yapeCode) msg += `*Código Yape: ${order.yapeCode}*%0A`;
    if (order.notes)    msg += `%0A📝 Obs: ${encodeURIComponent(order.notes)}%0A`;
    msg += `%0A¡Gracias por su pedido!`;
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
  };

  /* ── HTML con inline styles para captura limpia ────── */
  /* IMPORTANTE: usar esc() en todo dato de usuario para evitar XSS vía innerHTML */
  const buildTicketHtml = () => {
    const formaPago = order.paymentMethod === 'efectivo' ? 'Efectivo contra Entrega' : 'Yape';
    return `
      <div style="font-family:Georgia,serif;padding:28px 24px;background:#ffffff;width:360px;box-sizing:border-box;">

        <div style="text-align:center;border-bottom:2px dashed #e5e7eb;padding-bottom:16px;margin-bottom:16px;">
          <div style="color:#92400e;font-size:20px;font-style:italic;font-weight:800;margin:0 0 3px;">Panadería La Jaujina</div>
          <div style="color:#9ca3af;font-size:11px;margin:0 0 12px;">Productos Artesanales Frescos</div>
          <div style="background:#ffedd5;display:inline-block;padding:5px 20px;border-radius:20px;">
            <span style="color:#c2410c;font-weight:800;letter-spacing:2px;font-size:13px;">${esc(order.id)}</span>
          </div>
          <div style="color:#9ca3af;font-size:11px;margin-top:8px;">${esc(dateStr)} · ${esc(timeStr)}</div>
        </div>

        <div style="background:#fff7ed;border-radius:12px;padding:12px 16px;margin-bottom:16px;">
          <div style="color:#b45309;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Datos de Entrega</div>
          <div style="font-weight:800;color:#1f2937;margin-bottom:4px;">${esc(order.customer.nombre)}</div>
          <div style="color:#4b5563;font-size:13px;margin-bottom:2px;">📍 ${esc(order.customer.direccion)}</div>
          ${order.customer.referencia ? `<div style="color:#9ca3af;font-size:11px;">🔖 Ref: ${esc(order.customer.referencia)}</div>` : ''}
        </div>

        <div style="margin-bottom:16px;">
          <div style="color:#9ca3af;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Productos</div>
          ${order.items.map(item => `
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
              <span style="color:#4b5563;font-size:13px;"><strong style="color:#1f2937;">${item.qty}x</strong> ${esc(item.nombre)}</span>
              <span style="font-weight:700;color:#1f2937;font-size:13px;">${currency(item.precio * item.qty)}</span>
            </div>
          `).join('')}
        </div>

        <div style="border-top:2px dashed #e5e7eb;padding-top:12px;margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-weight:700;color:#4b5563;">Total</span>
            <span style="font-size:22px;font-weight:800;color:#c2410c;">${currency(order.total)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#9ca3af;font-size:13px;">Forma de pago</span>
            <span style="font-weight:600;color:#374151;font-size:13px;">${esc(formaPago)}</span>
          </div>
          ${order.yapeCode ? `
            <div style="display:flex;justify-content:space-between;">
              <span style="color:#9ca3af;font-size:13px;">Código Yape</span>
              <span style="font-weight:700;color:#7c3aed;font-family:monospace;font-size:13px;">${esc(order.yapeCode)}</span>
            </div>
          ` : ''}
        </div>

        ${order.notes ? `
          <div style="background:#f9fafb;border-radius:10px;padding:10px 12px;margin-bottom:14px;font-size:11px;color:#6b7280;font-style:italic;">
            📝 ${esc(order.notes)}
          </div>
        ` : ''}

        <div style="text-align:center;border-top:1px dashed #e5e7eb;padding-top:12px;">
          <div style="background:#dbeafe;display:inline-block;padding:5px 20px;border-radius:20px;">
            <span style="color:#1d4ed8;font-weight:700;font-size:13px;">✅ ${STATUS_LABELS[order.status] || esc(order.status)}</span>
          </div>
          <div style="color:#d1d5db;font-size:11px;margin-top:8px;">¡Gracias por tu compra! · Panadería La Jaujina</div>
        </div>

      </div>
    `;
  };

  /* ── Generar vista previa PDF ──────────────────────── */
  const handlePreviewPdf = async () => {
    setGenerating(true);
    setPdfError('');
    try {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:fixed;top:-20000px;left:-20000px;';
      wrapper.innerHTML = buildTicketHtml();
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper.firstElementChild, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      });

      document.body.removeChild(wrapper);

      setPdfPreview({
        dataUrl: canvas.toDataURL('image/png'),
        width:   canvas.width,
        height:  canvas.height,
      });
    } catch (err) {
      console.error('PDF error:', err);
      setPdfError('No se pudo generar el PDF. Intenta de nuevo.');
    } finally {
      setGenerating(false);
    }
  };

  /* ── Descargar PDF ─────────────────────────────────── */
  const handleDownloadPdf = () => {
    if (!pdfPreview) return;
    const { dataUrl, width, height } = pdfPreview;
    const mmPerPx = 25.4 / 192; // scale:2 → 192dpi
    const pdfW = width  * mmPerPx;
    const pdfH = height * mmPerPx;
    const pdf  = new jsPDF({
      orientation: 'portrait',
      unit:   'mm',
      format: [pdfW, pdfH],
    });
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfW, pdfH);
    pdf.save(`pedido-${order.id}.pdf`);
  };

  /* ── Render ────────────────────────────────────────── */
  return (
    <>
      {/* ── Ticket Modal ──────────────────────────────── */}
      <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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

          {/* Contenido scrollable */}
          <div className="p-6 max-h-[62vh] overflow-y-auto">
            <div className="space-y-4">

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
                    <div key={item.id ?? i} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        <span className="font-bold text-gray-800">{item.qty}x</span> {item.nombre}
                      </span>
                      <span className="font-bold text-gray-800">{currency(item.precio * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div className="border-t-2 border-dashed border-gray-200 pt-3 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Total</span>
                  <span className="text-2xl font-extrabold text-orange-700">{currency(order.total)}</span>
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
          </div>

          {/* Acciones */}
          <div className="px-6 pb-6 pt-2 space-y-3">
            <button
              onClick={handleSendWhatsApp}
              disabled={!whatsappNumber}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-2xl transition active:scale-95 shadow"
            >
              <MessageCircle size={18} />
              Reenviar Confirmación
            </button>

            <div className="flex gap-3">
              <button
                onClick={handlePreviewPdf}
                disabled={generating}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-2xl transition border-2 ${
                  generating
                    ? 'border-gray-200 text-gray-400 cursor-default'
                    : 'border-[#5A3E2B] text-[#5A3E2B] hover:bg-[#5A3E2B]/5 active:scale-95'
                }`}
              >
                <FileDown size={18} />
                {generating ? 'Generando…' : 'Ver PDF'}
              </button>

              <button
                onClick={onClose}
                className="flex-1 bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 rounded-2xl transition"
              >
                Cerrar
              </button>
            </div>

            {pdfError && (
              <p className="text-center text-xs text-red-500">{pdfError}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Vista Previa PDF ──────────────────────────── */}
      {pdfPreview && (
        <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="bg-[#5A3E2B] px-6 py-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2">
                <FileDown size={20} />
                <span className="font-extrabold">Vista Previa del PDF</span>
              </div>
              <button
                onClick={() => setPdfPreview(null)}
                className="p-1 hover:bg-white/20 rounded-full transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Imagen preview */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
              <img
                src={pdfPreview.dataUrl}
                alt="Vista previa del ticket"
                className="w-full shadow-xl rounded-xl border border-gray-200"
              />
            </div>

            {/* Acciones */}
            <div className="p-4 border-t border-gray-100 flex gap-3 shrink-0">
              <button
                onClick={handleDownloadPdf}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5A3E2B] hover:bg-[#3D2010] text-white font-bold py-3 rounded-2xl transition active:scale-95 shadow"
              >
                <Download size={18} />
                Descargar PDF
              </button>
              <button
                onClick={() => setPdfPreview(null)}
                className="flex-1 border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-bold py-3 rounded-2xl transition"
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default OrderTicket;
