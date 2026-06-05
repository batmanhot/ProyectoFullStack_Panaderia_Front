import React from 'react';
import { Star, Quote } from 'lucide-react';
import FadeIn from './FadeIn';

const testimonios = [
  {
    nombre: 'María González',
    cargo:  'Cliente frecuente',
    texto:  'El pan de masa madre es simplemente increíble. Lo pido todas las semanas y siempre llega fresco y delicioso. ¡100% recomendado!',
    stars:  5,
    initials: 'MG',
    color:  'bg-amber-500',
  },
  {
    nombre: 'Carlos Mendoza',
    cargo:  'Empresario local',
    texto:  'Contratamos a La Jaujina para el coffee break de nuestra empresa y quedamos muy satisfechos. Puntualidad y calidad excelentes.',
    stars:  5,
    initials: 'CM',
    color:  'bg-[#5A3E2B]',
  },
  {
    nombre: 'Ana Quispe',
    cargo:  'Mamá de familia',
    texto:  'Los croissants son de otro nivel. Mis hijos los adoran. El delivery siempre llega a tiempo y los productos están perfectos.',
    stars:  5,
    initials: 'AQ',
    color:  'bg-rose-500',
  },
  {
    nombre: 'Roberto Flores',
    cargo:  'Chef de restaurante',
    texto:  'La calidad de sus panes artesanales es comparable con los mejores. Los uso en mi restaurante y mis clientes siempre los elogian.',
    stars:  5,
    initials: 'RF',
    color:  'bg-emerald-600',
  },
  {
    nombre: 'Lucía Vargas',
    cargo:  'Cliente ocasional',
    texto:  'Pedí la torta de tres leches para el cumpleaños de mi mamá y fue un éxito total. Todos preguntaron de dónde era. ¡Gracias La Jaujina!',
    stars:  5,
    initials: 'LV',
    color:  'bg-purple-500',
  },
  {
    nombre: 'Jorge Castillo',
    cargo:  'Trabajador de oficina',
    texto:  'El combo desayuno familiar es una ganga. Nos alcanza para todos y siempre viene variado. El mejor desayuno de la semana.',
    stars:  5,
    initials: 'JC',
    color:  'bg-[#D4A373]',
  },
];

const Testimonios = () => {
  return (
    <section id="testimonios" className="py-24 px-6 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto">

        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-[#5A3E2B] text-xs font-bold px-5 py-2 rounded-full mb-5 tracking-widest uppercase">
              LO QUE DICEN NUESTROS CLIENTES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5A3E2B] mb-4">
              Testimonios
            </h2>
            <p className="text-gray-500 text-lg">Miles de familias ya confían en La Jaujina</p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white rounded-3xl p-7 border border-[#EDE3D8]
                              shadow-[0_2px_12px_rgba(90,62,43,0.07)]
                              hover:shadow-[0_12px_40px_rgba(90,62,43,0.13)]
                              hover:-translate-y-1 transition-all duration-300
                              flex flex-col h-full relative overflow-hidden">

                {/* Icono decorativo */}
                <Quote size={40} className="absolute top-5 right-5 text-[#D4A373]/12 rotate-180" />

                {/* Estrellas */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Texto */}
                <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm italic relative z-10">
                  "{t.texto}"
                </p>

                {/* Autor */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#F0E8DE]">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-extrabold text-[#2B2B2B] text-sm">{t.nombre}</p>
                    <p className="text-xs text-gray-400">{t.cargo}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
