import React from 'react';
import { Gift, TrendingUp, AlertCircle } from 'lucide-react';

const Promociones = ({ onOrderClick }) => {
  const promociones = [
    {
      titulo: 'Combo Desayuno Familiar',
      incluye: ['Pan Francés', 'Bebida caliente', 'Complementos'],
      ahorro: '25%',
      precio: 'S/ 35.00',
      icono: <Gift size={32} />,
      urgencia: 'Producción limitada diaria'
    },
    {
      titulo: 'Pack Fin de Semana',
      incluye: ['2 Tortas medianas', 'Docena de alfajores', 'Bebidas'],
      ahorro: '30%',
      precio: 'S/ 85.00',
      icono: <TrendingUp size={32} />,
      urgencia: 'Realiza tu pedido antes de las 6 PM'
    },
    {
      titulo: 'Ofertas Especiales',
      incluye: ['Compra determinada cantidad', 'Recibe beneficio adicional', 'Válido todo el mes'],
      ahorro: 'Hasta 40%',
      precio: 'Ver condiciones',
      icono: <AlertCircle size={32} />,
      urgencia: 'Delivery el mismo día'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-yellow-50 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
              PROMOCIONES DESTACADAS
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Ofertas del Día 🎉
          </h2>
          <p className="text-gray-600 text-lg">
            Disfruta de nuestras promociones especiales con ahorros increíbles
          </p>
        </div>

        {/* Grid de Promociones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {promociones.map((promo, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-orange-200"
            >
              {/* Banner de Ahorro */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-sm">
                {promo.ahorro} OFF
              </div>

              {/* Icono */}
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-6 text-center text-white">
                {promo.icono}
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {promo.titulo}
                </h3>
                <ul className="space-y-2 mb-4">
                  {promo.incluye.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700 text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 italic mb-4 pb-4 border-b">
                  ⏰ {promo.urgencia}
                </p>
                <p className="text-2xl font-bold text-green-600 mb-4">
                  {promo.precio}
                </p>
                <button
                  onClick={onOrderClick}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Pedir Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Inferior */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-2xl text-white text-center shadow-lg">
          <p className="text-lg font-bold mb-2">
            ¡No esperes más! Aprovecha nuestras promociones limitadas
          </p>
          <p className="text-sm opacity-90">
            Stock limitado • Válido mientras duren nuestras existencias
          </p>
        </div>
      </div>
    </section>
  );
};

export default Promociones;
