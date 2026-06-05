import React from 'react';
import { Users, Package, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  { icono: Users, valor: '+10,000', etiqueta: 'Clientes satisfechos' },
  { icono: Package, valor: '+50', etiqueta: 'Productos frescos diarios' },
  { icono: Calendar, valor: '+5', etiqueta: 'Años de experiencia' },
  { icono: TrendingUp, valor: '+500', etiqueta: 'Pedidos mensuales' },
];

const EstadisticasSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-orange-600 to-amber-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center text-white">
              <div className="bg-white/20 p-4 rounded-2xl mb-4">
                <s.icono size={32} className="text-white" />
              </div>
              <p className="text-4xl md:text-5xl font-extrabold mb-1">{s.valor}</p>
              <p className="text-white/85 text-sm font-medium">{s.etiqueta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EstadisticasSection;
