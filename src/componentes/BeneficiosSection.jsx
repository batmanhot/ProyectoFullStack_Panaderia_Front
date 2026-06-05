import React from 'react';
import { Sun, Leaf, Award, Truck, Heart, Package } from 'lucide-react';

const beneficios = [
  {
    icono: Sun,
    titulo: 'Producción fresca diaria',
    desc: 'Horneamos todos nuestros productos cada mañana para garantizar la máxima frescura en cada bocado.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icono: Leaf,
    titulo: 'Ingredientes seleccionados',
    desc: 'Usamos ingredientes de primera calidad, naturales y sin conservantes artificiales.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icono: Award,
    titulo: 'Tradición y experiencia',
    desc: 'Años de trayectoria y recetas familiares respaldan cada producto que sale de nuestros hornos.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icono: Truck,
    titulo: 'Delivery rápido',
    desc: 'Llevamos tus productos hasta tu puerta. Pedidos antes de las 6 PM, entrega el mismo día.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icono: Heart,
    titulo: 'Atención personalizada',
    desc: 'Cada pedido es único. Te asesoramos para que encuentres exactamente lo que buscas.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icono: Package,
    titulo: 'Amplia variedad',
    desc: 'Desde panes diarios hasta tortas para eventos especiales. Más de 50 productos frescos cada día.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

const BeneficiosSection = () => {
  return (
    <section id="beneficios" className="py-20 px-6 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-bold px-4 py-1 rounded-full mb-4 tracking-wide">
            NUESTROS DIFERENCIADORES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-3">
            ¿Por qué elegir La Jaujina?
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Más que una panadería, somos parte de tu familia. Aquí te decimos por qué nuestros clientes confían en nosotros.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
            >
              <div className={`${b.bg} p-4 rounded-2xl mb-5`}>
                <b.icono size={32} className={b.color} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{b.titulo}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeneficiosSection;
