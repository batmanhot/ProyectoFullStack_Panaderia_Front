import React from 'react';
import { Coffee, Building2, Cake, Users, UtensilsCrossed, MessageCircle } from 'lucide-react';

const servicios = [
  {
    icono: Coffee,
    nombre: 'Coffee Break',
    desc: 'Panes, pasteles y bebidas para reuniones de trabajo o capacitaciones corporativas.',
  },
  {
    icono: Building2,
    nombre: 'Eventos Corporativos',
    desc: 'Soluciones gastronómicas completas adaptadas a tu empresa o institución.',
  },
  {
    icono: Cake,
    nombre: 'Cumpleaños',
    desc: 'Tortas personalizadas y bocaditos para hacer tus celebraciones especiales e inolvidables.',
  },
  {
    icono: Users,
    nombre: 'Reuniones',
    desc: 'Variedad de productos artesanales para hacer tus reuniones más cómodas y especiales.',
  },
  {
    icono: UtensilsCrossed,
    nombre: 'Catering',
    desc: 'Servicio de catering con productos frescos y artesanales elaborados para tu evento.',
  },
];

const EventosEmpresas = ({ whatsappNumber }) => {
  const handleCotizar = () => {
    const msg = encodeURIComponent(
      '¡Hola! Quisiera solicitar una *cotización para un evento o empresa*. ¿Podrían ayudarme con los detalles?'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="eventos" className="py-24 px-6 bg-linear-to-b from-[#1A0A02] to-[#2D1810] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#D4A373]/15 text-[#D4A373] text-xs font-bold px-5 py-2 rounded-full mb-5 border border-[#D4A373]/25 tracking-widest uppercase">
            EMPRESAS Y EVENTOS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Servicios para Empresas y Eventos
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Llevamos la calidad artesanal de La Jaujina a tus eventos corporativos, celebraciones y reuniones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {servicios.map((s, i) => (
            <div
              key={i}
              className="bg-white/4 border border-white/8 rounded-2xl p-7
                         hover:bg-white/8 hover:-translate-y-1
                         transition-all duration-300 flex flex-col"
            >
              <div className="bg-[#D4A373]/15 p-3 rounded-xl w-fit mb-5">
                <s.icono size={28} className="text-[#D4A373]" />
              </div>
              <h3 className="text-lg font-extrabold mb-2 text-white">{s.nombre}</h3>
              <p className="text-white/45 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}

          {/* Card CTA */}
          <div className="bg-[#D4A373]/8 border-2 border-[#D4A373]/25 rounded-2xl p-7 flex flex-col items-center justify-center text-center">
            <p className="text-[#D4A373] font-bold text-lg mb-3">¿Tienes un evento próximo?</p>
            <p className="text-white/45 text-sm mb-6">Solicita una cotización personalizada sin compromiso.</p>
            <button
              onClick={handleCotizar}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle size={18} />
              Cotizar ahora
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleCotizar}
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-extrabold px-12 py-4 rounded-full text-lg shadow-[0_8px_32px_rgba(234,88,12,0.4)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle size={22} />
            Solicitar Cotización por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventosEmpresas;
