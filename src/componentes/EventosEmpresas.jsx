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
    <section id="eventos" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-orange-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500/20 text-orange-300 text-sm font-bold px-4 py-1 rounded-full mb-4 border border-orange-500/30 tracking-wide">
            EMPRESAS Y EVENTOS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
            Servicios para Empresas y Eventos
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Llevamos la calidad artesanal de La Jaujina a tus eventos corporativos, celebraciones y reuniones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {servicios.map((s, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors duration-300 flex flex-col"
            >
              <div className="bg-orange-500/20 p-3 rounded-xl w-fit mb-5">
                <s.icono size={28} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.nombre}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}

          {/* Card CTA dentro del grid */}
          <div className="bg-orange-500/10 border-2 border-orange-500/30 rounded-2xl p-7 flex flex-col items-center justify-center text-center">
            <p className="text-orange-300 font-semibold text-lg mb-3">¿Tienes un evento próximo?</p>
            <p className="text-gray-400 text-sm mb-5">Solicita una cotización personalizada sin compromiso.</p>
            <button
              onClick={handleCotizar}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              <MessageCircle size={18} />
              Cotizar ahora
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleCotizar}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
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
