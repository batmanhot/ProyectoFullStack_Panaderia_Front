import React from 'react';
import { Star } from 'lucide-react';

const testimonios = [
  {
    nombre: 'María González',
    cargo: 'Cliente frecuente',
    texto: 'El pan de masa madre es simplemente increíble. Lo pido todas las semanas y siempre llega fresco y delicioso. ¡100% recomendado!',
    stars: 5,
    avatar: 'MG',
    color: 'bg-orange-500',
  },
  {
    nombre: 'Carlos Mendoza',
    cargo: 'Empresario local',
    texto: 'Contratamos a La Jaujina para el coffee break de nuestra empresa y quedamos muy satisfechos. Puntualidad y calidad excelentes.',
    stars: 5,
    avatar: 'CM',
    color: 'bg-blue-500',
  },
  {
    nombre: 'Ana Quispe',
    cargo: 'Mamá de familia',
    texto: 'Los croissants son de otro nivel. Mis hijos los adoran. El delivery siempre llega a tiempo y los productos están perfectos.',
    stars: 5,
    avatar: 'AQ',
    color: 'bg-pink-500',
  },
  {
    nombre: 'Roberto Flores',
    cargo: 'Chef de restaurante',
    texto: 'La calidad de sus panes artesanales es comparable con los mejores. Los uso en mi restaurante y mis clientes siempre los elogian.',
    stars: 5,
    avatar: 'RF',
    color: 'bg-green-600',
  },
  {
    nombre: 'Lucía Vargas',
    cargo: 'Cliente ocasional',
    texto: 'Pedí la torta de tres leches para el cumpleaños de mi mamá y fue un éxito total. Todos preguntaron de dónde era. ¡Gracias La Jaujina!',
    stars: 5,
    avatar: 'LV',
    color: 'bg-purple-500',
  },
  {
    nombre: 'Jorge Castillo',
    cargo: 'Trabajador de oficina',
    texto: 'El combo desayuno familiar es una ganga. Nos alcanza para todos y siempre viene variado. El mejor desayuno de la semana.',
    stars: 5,
    avatar: 'JC',
    color: 'bg-amber-500',
  },
];

const Testimonios = () => {
  return (
    <section id="testimonios" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-bold px-4 py-1 rounded-full mb-4 tracking-wide">
            LO QUE DICEN NUESTROS CLIENTES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-3">
            Testimonios
          </h2>
          <p className="text-gray-500 text-lg">Miles de familias ya confían en La Jaujina</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-orange-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-orange-100 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} size={15} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed mb-5 flex-1">"{t.texto}"</p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{t.nombre}</p>
                  <p className="text-xs text-gray-500">{t.cargo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
