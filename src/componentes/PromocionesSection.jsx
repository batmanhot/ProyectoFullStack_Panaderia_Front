import React from 'react';
import { ShoppingCart, Clock, Flame, Tag, Check } from 'lucide-react';

const COMBO1 = {
  id:     'promo-combo-desayuno',
  nombre: 'Combo Desayuno Familiar',
  precio: 14.90,
  desc:   '10 panes variados + mantequilla + mermelada artesanal',
};

const COMBO2 = {
  id:     'promo-pack-pasteleria',
  nombre: 'Pack Pastelería x 6',
  precio: 25.00,
  desc:   '6 pasteles surtidos de nuestra selección del día',
};

const PromocionesSection = ({ onAddToCart, addingId, isLoggedIn }) => {
  const adding1 = addingId === COMBO1.id;
  const adding2 = addingId === COMBO2.id;

  const scrollToCatalog = () =>
    document.getElementById('panaderia')?.scrollIntoView({ behavior: 'smooth' });

  const AddBtn = ({ combo, adding }) => (
    <button
      onClick={() => onAddToCart(combo)}
      disabled={adding}
      className={`flex items-center gap-2 font-bold px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 shrink-0 ${
        adding
          ? 'bg-emerald-500 text-white cursor-default'
          : 'bg-white text-[#5A3E2B] hover:bg-amber-50 hover:shadow-md'
      }`}
    >
      {adding ? (
        <><Check size={16} strokeWidth={3} /> Agregado</>
      ) : (
        <><ShoppingCart size={16} /> Agregar al Carrito</>
      )}
    </button>
  );

  return (
    <section id="promociones" className="py-24 px-6 bg-[#F8F1E8]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-[#5A3E2B] text-xs font-bold px-5 py-2 rounded-full mb-5 tracking-widest uppercase">
            OFERTAS ESPECIALES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#5A3E2B] mb-4">
            Promociones del Día
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            Aprovecha nuestras ofertas diarias. ¡Producción limitada — no te quedes sin la tuya!
          </p>
        </div>

        {/* Tarjetas de combos */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          {/* Combo 1 — Desayuno Familiar */}
          <div className="relative bg-linear-to-br from-orange-500 to-amber-600 rounded-3xl p-8 text-white overflow-hidden shadow-[0_8px_40px_rgba(234,88,12,0.25)] hover:shadow-[0_16px_56px_rgba(234,88,12,0.35)] transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-12 -translate-x-10 pointer-events-none" />

            <span className="relative inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <Flame size={13} /> Más Popular
            </span>
            <h3 className="relative text-2xl md:text-3xl font-extrabold mb-2">Combo Desayuno Familiar</h3>
            <p className="relative text-white/85 mb-6 leading-relaxed text-sm">
              Incluye: <strong>10 panes variados</strong> + 1 paquete de mantequilla + 1 mermelada artesanal.<br />
              Perfecto para empezar el día en familia.
            </p>
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/60 text-sm line-through">S/ 18.00</p>
                <p className="text-4xl font-extrabold">S/ 14.90</p>
              </div>
              <AddBtn combo={COMBO1} adding={adding1} />
            </div>
          </div>

          {/* Combo 2 — Pack Pastelería */}
          <div className="relative bg-linear-to-br from-[#5A3E2B] to-[#8B6547] rounded-3xl p-8 text-white overflow-hidden shadow-[0_8px_40px_rgba(90,62,43,0.25)] hover:shadow-[0_16px_56px_rgba(90,62,43,0.35)] transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-12 -translate-x-10 pointer-events-none" />

            <span className="relative inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <Tag size={13} /> Oferta Especial
            </span>
            <h3 className="relative text-2xl md:text-3xl font-extrabold mb-2">Pack Pastelería x 6</h3>
            <p className="relative text-white/85 mb-6 leading-relaxed text-sm">
              Elige <strong>6 pasteles surtidos</strong> de nuestra selección del día.<br />
              Ideal para reuniones, compartir o darte un antojo.
            </p>
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/60 text-sm line-through">S/ 32.00</p>
                <p className="text-4xl font-extrabold">S/ 25.00</p>
              </div>
              <AddBtn combo={COMBO2} adding={adding2} />
            </div>
          </div>
        </div>

        {/* Barra de urgencia */}
        <div className="bg-white border-2 border-[#D4A373]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-[#5A3E2B]">
            <Clock size={26} className="shrink-0 text-orange-500" />
            <div>
              <p className="font-extrabold text-base">¡Producción limitada diaria!</p>
              <p className="text-sm text-gray-500 mt-0.5">
                Realiza tu pedido antes de las <strong className="text-[#5A3E2B]">6 PM</strong> y recíbelo hoy mismo.
              </p>
            </div>
          </div>
          <button
            onClick={scrollToCatalog}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-extrabold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap active:scale-95"
          >
            <ShoppingCart size={17} />
            Ver Productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromocionesSection;
