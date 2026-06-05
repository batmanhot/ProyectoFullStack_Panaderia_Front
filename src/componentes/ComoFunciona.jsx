import React from 'react';
import { ShoppingBag, Send, ChefHat, Home } from 'lucide-react';

const pasos = [
  {
    num: 1,
    icono: ShoppingBag,
    titulo: 'Selecciona tus productos',
    desc: 'Navega por nuestro catálogo y elige los productos que deseas. Tenemos más de 50 variedades.',
    color: 'bg-orange-500',
  },
  {
    num: 2,
    icono: Send,
    titulo: 'Realiza tu pedido',
    desc: 'Envíanos tu pedido por WhatsApp o llámanos directamente. Es rápido y muy sencillo.',
    color: 'bg-amber-500',
  },
  {
    num: 3,
    icono: ChefHat,
    titulo: 'Preparamos tu orden',
    desc: 'Nuestros panaderos preparan tu pedido con los mejores ingredientes, recién horneado con amor.',
    color: 'bg-green-600',
  },
  {
    num: 4,
    icono: Home,
    titulo: 'Recíbelo en casa',
    desc: 'Te lo entregamos en la puerta de tu hogar o empresa. Rápido, fresco y con la misma calidad.',
    color: 'bg-blue-600',
  },
];

const ComoFunciona = () => {
  return (
    <section id="como-funciona" className="py-20 px-6 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-bold px-4 py-1 rounded-full mb-4 tracking-wide">
            SIMPLE Y RÁPIDO
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-3">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600 text-lg">
            Recibir nuestros productos en tu hogar es muy sencillo
          </p>
        </div>

        <div className="relative">
          {/* Línea conectora - solo desktop */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-orange-200 z-0" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {pasos.map((paso) => (
              <div key={paso.num} className="flex flex-col items-center text-center">
                <div
                  className={`${paso.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-white`}
                >
                  <paso.icono size={28} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md w-full">
                  <span className="text-5xl font-extrabold text-orange-100 mb-2 block leading-none">
                    0{paso.num}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{paso.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
