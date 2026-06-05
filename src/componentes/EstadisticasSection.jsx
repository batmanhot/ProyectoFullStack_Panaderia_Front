import React from 'react';
import { Users, Package, Calendar, TrendingUp } from 'lucide-react';
import FadeIn from './FadeIn';

const stats = [
  { icono: Users,     valor: '+10,000', etiqueta: 'Clientes satisfechos'   },
  { icono: Package,   valor: '+50',     etiqueta: 'Productos frescos diarios' },
  { icono: Calendar,  valor: '+5',      etiqueta: 'Años de experiencia'     },
  { icono: TrendingUp,valor: '+500',    etiqueta: 'Pedidos mensuales'       },
];

const EstadisticasSection = () => {
  return (
    <section className="py-20 px-6 bg-linear-to-r from-[#5A3E2B] via-[#7A5235] to-[#5A3E2B]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex flex-col items-center text-center text-white">
                <div className="bg-white/10 border border-white/15 p-4 rounded-2xl mb-4 backdrop-blur-sm">
                  <s.icono size={32} className="text-[#D4A373]" />
                </div>
                <p className="text-4xl md:text-5xl font-extrabold mb-1 text-white">{s.valor}</p>
                <p className="text-white/65 text-sm font-medium">{s.etiqueta}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EstadisticasSection;
