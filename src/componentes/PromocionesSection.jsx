import React from 'react';
import { MessageCircle, Clock, Flame, Tag } from 'lucide-react';

const PromocionesSection = ({ whatsappNumber }) => {
  const handlePromoClick = (promoName) => {
    const msg = encodeURIComponent(
      `¡Hola! Estoy interesado en la promoción: *${promoName}*. ¿Aún está disponible hoy?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="promociones" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-600 text-sm font-bold px-4 py-1 rounded-full mb-4 tracking-wide">
            OFERTAS ESPECIALES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-3">
            Promociones del Día
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Aprovecha nuestras ofertas diarias. ¡Producción limitada — no te quedes sin la tuya!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Promo 1: Combo Desayuno */}
          <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-10 -translate-x-10 pointer-events-none" />
            <span className="relative inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Flame size={14} /> Más Popular
            </span>
            <h3 className="relative text-3xl font-extrabold mb-2">Combo Desayuno Familiar</h3>
            <p className="relative text-white/90 mb-6 leading-relaxed text-sm">
              Incluye: <strong>10 panes variados</strong> + 1 paquete de mantequilla + 1 mermelada artesanal.<br />
              Perfecto para empezar el día en familia.
            </p>
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/70 text-sm line-through">S/ 18.00</p>
                <p className="text-4xl font-extrabold">S/ 14.90</p>
              </div>
              <button
                onClick={() => handlePromoClick('Combo Desayuno Familiar')}
                className="flex items-center gap-2 bg-white text-orange-600 font-bold px-5 py-3 rounded-xl hover:bg-orange-50 transition-all active:scale-95 shrink-0"
              >
                <MessageCircle size={18} />
                Pedir ahora
              </button>
            </div>
          </div>

          {/* Promo 2: Pack Pastelería */}
          <div className="relative bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-10 -translate-x-10 pointer-events-none" />
            <span className="relative inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Tag size={14} /> Oferta Especial
            </span>
            <h3 className="relative text-3xl font-extrabold mb-2">Pack Pastelería x 6</h3>
            <p className="relative text-white/90 mb-6 leading-relaxed text-sm">
              Elige <strong>6 pasteles surtidos</strong> de nuestra selección del día.<br />
              Ideal para reuniones, compartir o darte un antojo.
            </p>
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/70 text-sm line-through">S/ 32.00</p>
                <p className="text-4xl font-extrabold">S/ 25.00</p>
              </div>
              <button
                onClick={() => handlePromoClick('Pack Pastelería x 6')}
                className="flex items-center gap-2 bg-white text-green-700 font-bold px-5 py-3 rounded-xl hover:bg-green-50 transition-all active:scale-95 shrink-0"
              >
                <MessageCircle size={18} />
                Pedir ahora
              </button>
            </div>
          </div>
        </div>

        {/* Barra de urgencia */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-orange-700">
            <Clock size={26} className="shrink-0" />
            <div>
              <p className="font-bold text-lg">¡Producción limitada diaria!</p>
              <p className="text-sm text-orange-600">
                Realiza tu pedido antes de las <strong>6 PM</strong> y recíbelo hoy mismo.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Quiero hacer un pedido para hoy antes de las 6 PM.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            <MessageCircle size={18} />
            Pedir antes de las 6 PM
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromocionesSection;
