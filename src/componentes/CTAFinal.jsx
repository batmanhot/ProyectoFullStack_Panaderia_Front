import React from 'react';
import { MessageCircle, Clock, CheckCircle } from 'lucide-react';
import FadeIn from './FadeIn';

const CTAFinal = ({ whatsappNumber }) => {
  const handlePedir = () => {
    const msg = encodeURIComponent(
      '¡Hola! Estoy listo para hacer mi pedido. ¿Podrían ayudarme con la disponibilidad de hoy?'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-linear-to-br from-[#2A1A0A] via-[#5A3E2B] to-[#3D2010]">
      {/* Destellos cálidos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-800/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4A373]/5 rounded-full blur-3xl pointer-events-none" />

      <FadeIn>
        <div className="relative max-w-3xl mx-auto text-center text-white">
          {/* Badge */}
          <span className="inline-block bg-[#D4A373]/20 text-amber-300 border border-[#D4A373]/30 text-xs font-bold px-5 py-2 rounded-full mb-8 tracking-widest uppercase">
            ¿Listo para disfrutar?
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Productos recién horneados<br />
            <span className="text-[#D4A373]">a tu puerta hoy</span>
          </h2>

          <p className="text-white/75 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            Haz tu pedido ahora y recibe la calidad y frescura que distingue a La Jaujina.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-white/65 mb-12 text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#D4A373]" /> Delivery el mismo día
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-[#D4A373]" /> Yape · Efectivo
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-[#D4A373]" /> Pedidos antes de las 6 PM
            </span>
          </div>

          <button
            onClick={handlePedir}
            className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400
                       text-white font-extrabold px-14 py-5 rounded-full text-xl
                       shadow-[0_8px_40px_rgba(234,88,12,0.45)]
                       hover:shadow-[0_14px_48px_rgba(234,88,12,0.6)]
                       transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle size={26} />
            PEDIR POR WHATSAPP
          </button>

          <p className="mt-6 text-white/40 text-xs">
            Producción limitada diaria · Sin mínimo de pedido
          </p>
        </div>
      </FadeIn>
    </section>
  );
};

export default CTAFinal;
