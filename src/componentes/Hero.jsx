import React from 'react';
import { ShoppingCart, ChefHat, Clock, Star, ShieldCheck } from 'lucide-react';

const Hero = ({ onOrderClick, onCatalogClick }) => {
  return (
    <header className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <img
        src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1920"
        alt="Pan artesanal La Jaujina"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay cálido multicapa */}
      <div className="absolute inset-0 bg-linear-to-br from-[#2A1A0A]/92 via-[#5A3E2B]/72 to-[#D4A373]/25" />
      <div className="absolute inset-0 bg-linear-to-t from-[#1A0D05]/65 via-transparent to-transparent" />

      <div className="relative z-10 px-6 max-w-5xl mx-auto text-center py-24">

        {/* Pre-badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2.5 bg-[#D4A373]/15 text-amber-200 border border-[#D4A373]/35 text-xs font-bold px-6 py-2.5 rounded-full tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse shrink-0" />
            Horneado fresco cada mañana · Jauja
          </span>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight">
          <span className="text-white drop-shadow-2xl">Pan artesanal con</span>
          <br />
          <span className="text-[#D4A373] drop-shadow-2xl">el sabor que enamora</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-amber-50/80 font-light">
          Elaborados con ingredientes seleccionados y recetas familiares que se transmiten de generación en generación.
          Cada bocado, una experiencia única.
        </p>

        {/* CTAs — compra directa al catálogo */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={onOrderClick}
            className="group relative inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-extrabold px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(234,88,12,0.45)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.6)] transition-all duration-300 hover:-translate-y-0.5 text-base overflow-hidden"
          >
            <ShoppingCart size={22} />
            Comprar Ahora
            <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/8 transition-colors duration-300" />
          </button>
          <button
            onClick={onCatalogClick}
            className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/18 text-white font-bold px-10 py-4 rounded-full border border-white/25 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 text-base"
          >
            Ver Catálogo
          </button>
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto pt-8 border-t border-white/12">
          {[
            { Icon: ChefHat,     val: '+50 productos', label: 'Recetas artesanales' },
            { Icon: Clock,       val: 'Mismo día',     label: 'Delivery rápido'     },
            { Icon: Star,        val: '+10,000',       label: 'Clientes felices'    },
            { Icon: ShieldCheck, val: '+5 años',       label: 'De tradición'        },
          ].map(({ Icon, val, label }, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 text-white/85">
              <Icon size={22} className="text-[#D4A373]" />
              <p className="font-extrabold text-sm">{val}</p>
              <p className="text-xs text-white/55">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#FFF8F0] to-transparent pointer-events-none" />
    </header>
  );
};

export default Hero;
