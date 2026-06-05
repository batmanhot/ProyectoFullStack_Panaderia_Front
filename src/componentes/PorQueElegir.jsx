import React from 'react';
import { Sparkles, Zap, Users, Award, Leaf, Heart } from 'lucide-react';

const PorQueElegir = () => {
  const beneficios = [
    {
      icon: <Zap size={40} />,
      titulo: 'Producción Fresca',
      desc: 'Horneados todos los días con la garantía de frescura que caracteriza nuestros productos.'
    },
    {
      icon: <Leaf size={40} />,
      titulo: 'Ingredientes Seleccionados',
      desc: 'Utilizamos solo ingredientes de la más alta calidad para garantizar el mejor sabor.'
    },
    {
      icon: <Award size={40} />,
      titulo: 'Tradición y Experiencia',
      desc: 'Más de 20 años de experiencia perfeccionando nuestras recetas artesanales.'
    },
    {
      icon: <Users size={40} />,
      titulo: 'Atención Personalizada',
      desc: 'Servicio dedicado y atento a cada una de tus necesidades especiales.'
    },
    {
      icon: <Heart size={40} />,
      titulo: 'Variedad de Productos',
      desc: 'Amplio catálogo que cubre desde lo clásico hasta creaciones innovadoras.'
    },
    {
      icon: <Sparkles size={40} />,
      titulo: 'Delivery Rápido',
      desc: 'Entrega el mismo día para que recibas tus productos en perfecto estado.'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            ¿Por qué elegir La Jaujina? 🏆
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre los beneficios diferenciales que nos hacen única en el mercado.
          </p>
        </div>

        {/* Grid de Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-l-4 border-green-500"
            >
              <div className="text-green-600 mb-4">
                {beneficio.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {beneficio.titulo}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {beneficio.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mensaje Destacado */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-2xl text-white text-center shadow-lg">
          <p className="text-xl font-semibold mb-2">
            Cada producto es un testimonio de nuestro compromiso con la excelencia
          </p>
          <p className="text-green-100">
            La Jaujina: Donde la tradición se encuentra con la calidad
          </p>
        </div>
      </div>
    </section>
  );
};

export default PorQueElegir;
