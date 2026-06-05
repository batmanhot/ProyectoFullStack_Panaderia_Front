import React from 'react';
import { Sun, Leaf, Award, Truck, Heart, Package } from 'lucide-react';
import FadeIn from './FadeIn';

const beneficios = [
  {
    icono: Sun,
    titulo: 'Producción fresca diaria',
    desc: 'Horneamos todos nuestros productos cada mañana para garantizar la máxima frescura en cada bocado.',
    color: 'text-amber-500',
    bg:    'bg-amber-50',
    ring:  'ring-amber-100',
  },
  {
    icono: Leaf,
    titulo: 'Ingredientes seleccionados',
    desc: 'Usamos ingredientes de primera calidad, naturales y sin conservantes artificiales.',
    color: 'text-emerald-600',
    bg:    'bg-emerald-50',
    ring:  'ring-emerald-100',
  },
  {
    icono: Award,
    titulo: 'Tradición y experiencia',
    desc: 'Años de trayectoria y recetas familiares respaldan cada producto que sale de nuestros hornos.',
    color: 'text-[#D4A373]',
    bg:    'bg-amber-50',
    ring:  'ring-amber-100',
  },
  {
    icono: Truck,
    titulo: 'Delivery rápido',
    desc: 'Llevamos tus productos hasta tu puerta. Pedidos antes de las 6 PM, entrega el mismo día.',
    color: 'text-blue-500',
    bg:    'bg-blue-50',
    ring:  'ring-blue-100',
  },
  {
    icono: Heart,
    titulo: 'Atención personalizada',
    desc: 'Cada pedido es único. Te asesoramos para que encuentres exactamente lo que buscas.',
    color: 'text-rose-500',
    bg:    'bg-rose-50',
    ring:  'ring-rose-100',
  },
  {
    icono: Package,
    titulo: 'Amplia variedad',
    desc: 'Desde panes diarios hasta tortas para eventos especiales. Más de 50 productos frescos cada día.',
    color: 'text-purple-500',
    bg:    'bg-purple-50',
    ring:  'ring-purple-100',
  },
];

const BeneficiosSection = () => {
  return (
    <section id="beneficios" className="py-24 px-6 bg-linear-to-b from-[#FFF8F0] to-[#F8F1E8]">
      <div className="max-w-7xl mx-auto">

        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-[#5A3E2B] text-xs font-bold px-5 py-2 rounded-full mb-5 tracking-widest uppercase">
              NUESTROS DIFERENCIADORES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5A3E2B] mb-4">
              ¿Por qué elegir La Jaujina?
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Más que una panadería, somos parte de tu familia. Aquí te decimos por qué nuestros clientes confían en nosotros.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficios.map((b, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white rounded-2xl p-8 border border-[#EDE3D8]
                              shadow-[0_2px_12px_rgba(90,62,43,0.06)]
                              hover:shadow-[0_10px_40px_rgba(90,62,43,0.12)]
                              hover:-translate-y-1 transition-all duration-300
                              flex flex-col items-start h-full">
                <div className={`${b.bg} p-4 rounded-2xl mb-5 ring-2 ${b.ring}`}>
                  <b.icono size={30} className={b.color} />
                </div>
                <h3 className="text-lg font-extrabold text-[#2B2B2B] mb-2">{b.titulo}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeneficiosSection;
