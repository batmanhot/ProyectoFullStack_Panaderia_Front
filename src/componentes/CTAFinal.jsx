import React from 'react';
import { ShoppingCart, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import FadeIn from './FadeIn';

const CTAFinal = ({ whatsappNumber }) => {
  const scrollToCatalog = () =>
    document.getElementById('panaderia')?.scrollIntoView({ behavior: 'smooth' });

  const handleSupport = () => {
    const msg = encodeURIComponent('¡Hola! Tengo una consulta sobre sus productos. ¿Me pueden ayudar?');
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-linear-to-br from-[#2A1A0A] via-[#5A3E2B] to-[#3D2010]">
      {/* Destellos cálidos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-800/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-[#D4A373]/5 rounded-full blur-3xl pointer-events-none" />

      <FadeIn>
        <div className="relative max-w-3xl mx-auto text-center text-white">

          {/* Badge */}
          <span className="inline-block bg-[#D4A373]/20 text-amber-300 border border-[#D4A373]/30 text-xs font-bold px-5 py-2 rounded-full mb-8 tracking-widest uppercase">
            ¿Listo para pedir?
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Productos recién horneados<br />
            <span className="text-[#D4A373]">a tu puerta hoy</span>
          </h2>

          <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            Explora nuestro catálogo, agrega al carrito y recibe la frescura que distingue a La Jaujina.
          </p>

          {/* Garantías */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-white/60 mb-12 text-sm">
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

          {/* CTA principal → catálogo */}
          <button
            onClick={scrollToCatalog}
            className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400
                       text-white font-extrabold px-14 py-5 rounded-full text-xl
                       shadow-[0_8px_40px_rgba(234,88,12,0.45)]
                       hover:shadow-[0_14px_48px_rgba(234,88,12,0.6)]
                       transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            <ShoppingCart size={26} />
            VER PRODUCTOS
          </button>

          {/* Soporte por WhatsApp — canal secundario */}
          <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
            <span>¿Tienes dudas?</span>
            <button
              onClick={handleSupport}
              className="flex items-center gap-1.5 text-[#D4A373]/80 hover:text-[#D4A373] transition-colors font-semibold"
            >
              <MessageCircle size={14} />
              Escríbenos por WhatsApp
            </button>
          </div>

          <p className="mt-4 text-white/30 text-xs">
            Producción limitada diaria · Sin mínimo de pedido
          </p>
        </div>
      </FadeIn>
    </section>
  );
};

export default CTAFinal;
