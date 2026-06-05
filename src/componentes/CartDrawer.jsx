import React, { useState, useEffect } from 'react';
import {
  X, ShoppingCart, Plus, Minus, Trash2, ClipboardList,
  Banknote, Smartphone, Check, CreditCard, CheckCircle2,
  User, MapPin, BookMarked, AlertCircle, Hash,
} from 'lucide-react';

const CartDrawer = ({
  isOpen,
  cart,
  totalCart,
  notes,
  onClose,
  onQuantityChange,
  onRemoveItem,
  onNotesChange,
  onConfirmOrder,     // fn({ paymentMethod, yapeCode, customer: { nombre, direccion, referencia } })
  loggedInCustomer,   // { nombre, telefono } | null
}) => {
  const [paymentMethod, setPaymentMethod]       = useState(null);
  const [customerName, setCustomerName]         = useState('');
  const [customerAddress, setCustomerAddress]   = useState('');
  const [customerRef, setCustomerRef]           = useState('');
  const [yapeCode, setYapeCode]                 = useState('');
  const [showValidation, setShowValidation]     = useState(false);

  /* Reset al cerrar; pre-llenar nombre si cliente logueado */
  useEffect(() => {
    if (!isOpen) {
      setPaymentMethod(null);
      setCustomerName('');
      setCustomerAddress('');
      setCustomerRef('');
      setYapeCode('');
      setShowValidation(false);
    } else if (loggedInCustomer) {
      setCustomerName(loggedInCustomer.nombre);
    }
  }, [isOpen, loggedInCustomer]);

  if (!isOpen) return null;

  const nameOk     = customerName.trim().length > 0;
  const addressOk  = customerAddress.trim().length > 0;
  const yapeCodeOk = paymentMethod !== 'yape' || yapeCode.trim().length > 0;
  const canConfirm = cart.length > 0 && paymentMethod && nameOk && addressOk && yapeCodeOk;

  const handleConfirm = () => {
    if (!canConfirm) {
      setShowValidation(true);
      return;
    }
    onConfirmOrder({
      paymentMethod,
      yapeCode: paymentMethod === 'yape' ? yapeCode.trim() : null,
      customer: {
        nombre:     customerName.trim(),
        direccion:  customerAddress.trim(),
        referencia: customerRef.trim(),
      },
    });
  };

  const fieldClass = (ok) =>
    `w-full border-2 rounded-xl px-4 py-2.5 outline-none transition text-sm text-gray-800 placeholder:text-gray-300 ${
      showValidation && !ok
        ? 'border-red-400 focus:border-red-500 bg-red-50'
        : 'border-gray-200 focus:border-orange-400 bg-white'
    }`;

  return (
    <div className="fixed inset-0 z-120 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

        {/* ── Header ── */}
        <div className="px-6 py-5 bg-orange-700 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} />
            <div>
              <h3 className="text-xl font-extrabold font-serif">Mi Pedido</h3>
              {cart.length > 0 && (
                <p className="text-orange-200 text-xs">
                  {cart.reduce((a, b) => a + b.qty, 0)} producto(s)
                </p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition" aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {/* ── Contenido scrollable ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingCart size={64} className="mx-auto mb-4 text-gray-200" />
              <p className="text-gray-400 font-medium">¿Qué se te antoja hoy?</p>
              <p className="text-gray-300 text-sm mt-1">Agrega productos desde el catálogo</p>
            </div>
          ) : (
            <>
              {/* Productos */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Productos</p>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white border-2 border-orange-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm truncate">{item.nombre}</p>
                    <p className="text-orange-600 font-bold text-sm">S/ {(item.precio * item.qty).toFixed(2)}</p>
                    <p className="text-gray-400 text-xs">S/ {item.precio.toFixed(2)} c/u</p>
                  </div>
                  <div className="flex items-center rounded-xl border-2 border-orange-200 bg-orange-50 overflow-hidden">
                    <button onClick={() => onQuantityChange(item.id, -1)} className="w-9 h-9 flex items-center justify-center hover:bg-orange-100 text-orange-600 transition">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-extrabold text-gray-800 text-sm select-none">{item.qty}</span>
                    <button onClick={() => onQuantityChange(item.id, 1)} className="w-9 h-9 flex items-center justify-center hover:bg-orange-100 text-orange-600 transition">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-red-300 hover:text-red-500 transition p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {/* ── DATOS DE ENTREGA ── */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <MapPin size={13} /> Datos de Entrega <span className="text-red-400 text-xs font-normal">(requerido)</span>
                  </label>
                  {loggedInCustomer && (
                    <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold border border-green-200">
                      ✓ Sesión activa
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {/* Nombre */}
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => { setCustomerName(e.target.value); setShowValidation(false); }}
                      placeholder="Nombre completo *"
                      className={`${fieldClass(nameOk)} pl-9`}
                    />
                    {showValidation && !nameOk && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> El nombre es requerido
                      </p>
                    )}
                  </div>

                  {/* Dirección */}
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => { setCustomerAddress(e.target.value); setShowValidation(false); }}
                      placeholder="Dirección completa de entrega *"
                      className={`${fieldClass(addressOk)} pl-9`}
                    />
                    {showValidation && !addressOk && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> La dirección es requerida
                      </p>
                    )}
                  </div>

                  {/* Referencia */}
                  <div className="relative">
                    <BookMarked size={15} className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={customerRef}
                      onChange={(e) => setCustomerRef(e.target.value)}
                      placeholder="Referencia (frente a, color de casa…)"
                      className="w-full border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-2.5 pl-9 outline-none transition text-sm text-gray-800 placeholder:text-gray-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* ── OBSERVACIONES ── */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <ClipboardList size={13} /> Observaciones (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => onNotesChange(e.target.value)}
                  placeholder="Ej: sin canela, llevar cambio de S/ 50..."
                  className="w-full p-4 bg-orange-50 rounded-2xl border-2 border-orange-100 focus:border-orange-400 outline-none transition text-sm h-20 resize-none text-gray-700 placeholder:italic placeholder:text-gray-300"
                />
              </div>

              {/* ── FORMA DE PAGO ── */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  <CreditCard size={13} /> Forma de Pago <span className="text-red-400">*</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {/* Efectivo */}
                  <button
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                      paymentMethod === 'efectivo'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    {paymentMethod === 'efectivo' && (
                      <span className="absolute top-2 right-2 bg-orange-500 rounded-full p-0.5">
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </span>
                    )}
                    <div className={`p-2 rounded-xl ${paymentMethod === 'efectivo' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      <Banknote size={26} className={paymentMethod === 'efectivo' ? 'text-orange-600' : 'text-gray-400'} />
                    </div>
                    <p className={`font-extrabold text-sm ${paymentMethod === 'efectivo' ? 'text-orange-700' : 'text-gray-600'}`}>Efectivo</p>
                    <p className="text-xs text-gray-400 -mt-1">Contra Entrega</p>
                  </button>

                  {/* Yape */}
                  <button
                    onClick={() => setPaymentMethod('yape')}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                      paymentMethod === 'yape'
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    {paymentMethod === 'yape' && (
                      <span className="absolute top-2 right-2 bg-purple-500 rounded-full p-0.5">
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </span>
                    )}
                    <div className={`p-2 rounded-xl ${paymentMethod === 'yape' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <Smartphone size={26} className={paymentMethod === 'yape' ? 'text-purple-600' : 'text-gray-400'} />
                    </div>
                    <p className={`font-extrabold text-sm ${paymentMethod === 'yape' ? 'text-purple-700' : 'text-gray-600'}`}>Yape</p>
                    <p className="text-xs text-gray-400 -mt-1">Pago Digital</p>
                  </button>
                </div>

                {paymentMethod === 'yape' && (
                  <div className="mt-3 space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-widest">
                      <Hash size={12} /> Código de Operación Yape <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Smartphone size={15} className="absolute left-3.5 top-3 text-purple-400 pointer-events-none" />
                      <input
                        type="text"
                        value={yapeCode}
                        onChange={(e) => { setYapeCode(e.target.value); setShowValidation(false); }}
                        placeholder="Ej: 123456"
                        className={`w-full border-2 rounded-xl px-4 py-2.5 pl-9 outline-none transition text-sm text-gray-800 placeholder:text-gray-300 ${
                          showValidation && !yapeCodeOk
                            ? 'border-red-400 focus:border-red-500 bg-red-50'
                            : 'border-purple-200 focus:border-purple-400 bg-purple-50'
                        }`}
                      />
                    </div>
                    {showValidation && !yapeCodeOk && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle size={11} /> El código Yape es requerido
                      </p>
                    )}
                    <p className="text-xs text-purple-500">
                      Ingresa el código de operación que genera Yape al realizar tu pago.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Footer fijo ── */}
        {cart.length > 0 && (
          <div className="p-5 border-t-2 border-orange-100 bg-gray-50 space-y-3 shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold uppercase text-xs tracking-wider">Total del pedido</span>
              <span className="text-3xl font-black text-orange-900 font-serif">S/ {totalCart.toFixed(2)}</span>
            </div>
            <button
              onClick={handleConfirm}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
                canConfirm
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg active:scale-95 cursor-pointer'
                  : showValidation
                  ? 'bg-red-500 text-white cursor-pointer animate-pulse'
                  : 'bg-gray-200 text-gray-400 cursor-pointer'
              }`}
            >
              <CheckCircle2 size={22} />
              {canConfirm
                ? 'Aceptar Pago'
                : showValidation
                ? 'Completa los datos requeridos'
                : 'Completa nombre, dirección y pago'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
