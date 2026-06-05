import React from 'react';
import { MessageCircle, Clock, CheckCircle } from 'lucide-react';

const CTAFinal = ({ whatsappNumber }) => {
  const handlePedir = () => {
    const msg = encodeURIComponent(
      '¡Hola! Estoy listo para hacer mi pedido. ¿Podrían ayudarme con la disponibilidad de hoy?'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700">
      {/* Destellos decorativos */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          ¿Listo para disfrutar productos recién horneados?
        </h2>
        <p className="text-white/90 text-xl mb-6 leading-relaxed">
          Haz tu pedido ahora y recibe la calidad y frescura que distingue a La Jaujina.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-white/85 mb-10 text-sm">
          <span className="flex items-center gap-1.5">
            <CheckCircle size={16} /> Delivery el mismo día
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle size={16} /> Pago por Yape o Plin
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} /> Pedidos antes de las 6 PM
          </span>
        </div>

        <button
          onClick={handlePedir}
          className="inline-flex items-center gap-3 bg-white text-orange-600 hover:bg-orange-50 font-extrabold px-12 py-5 rounded-full text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95"
        >
          <MessageCircle size={28} className="fill-green-500 text-green-500" />
          PEDIR POR WHATSAPP
        </button>

        <p className="mt-6 text-white/60 text-xs">
          Producción limitada diaria · Sin mínimo de pedido
        </p>
      </div>
    </section>
  );
};

export default CTAFinal;
