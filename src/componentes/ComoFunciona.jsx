import React from 'react';
import { ShoppingBag, Send, ChefHat, Home } from 'lucide-react';
import FadeIn from './FadeIn';

const pasos = [
  {
    num: 1,
    icono: ShoppingBag,
    titulo: 'Selecciona tus productos',
    desc: 'Navega por nuestro catálogo y elige los productos que deseas. Tenemos más de 50 variedades.',
    dot: 'bg-[#D4A373]',
    ring: 'ring-[#D4A373]/25',
  },
  {
    num: 2,
    icono: Send,
    titulo: 'Realiza tu pedido',
    desc: 'Agrega al carrito y completa tus datos de entrega. Rápido y muy sencillo.',
    dot: 'bg-[#8B6547]',
    ring: 'ring-[#8B6547]/25',
  },
  {
    num: 3,
    icono: ChefHat,
    titulo: 'Preparamos tu orden',
    desc: 'Nuestros panaderos preparan tu pedido con los mejores ingredientes, recién horneado con amor.',
    dot: 'bg-[#5A3E2B]',
    ring: 'ring-[#5A3E2B]/25',
  },
  {
    num: 4,
    icono: Home,
    titulo: 'Recíbelo en casa',
    desc: 'Te lo entregamos en la puerta de tu hogar o empresa. Fresco y con la misma calidad.',
    dot: 'bg-[#3D2010]',
    ring: 'ring-[#3D2010]/25',
  },
];

const ComoFunciona = () => {
  return (
    <section id="como-funciona" className="py-24 px-6 bg-[#F8F1E8]">
      <div className="max-w-7xl mx-auto">

        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-[#5A3E2B] text-xs font-bold px-5 py-2 rounded-full mb-5 tracking-widest uppercase">
              SIMPLE Y RÁPIDO
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5A3E2B] mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-500 text-lg">
              Recibir nuestros productos en tu hogar es muy sencillo
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Línea conectora desktop */}
          <div className="hidden md:block absolute top-[2.2rem] left-[12.5%] right-[12.5%] h-px bg-[#D4A373]/30 z-0" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {pasos.map((paso, i) => (
              <FadeIn key={paso.num} delay={i * 120}>
                <div className="flex flex-col items-center text-center">
                  <div className={`${paso.dot} w-18 h-18 rounded-full flex items-center justify-center
                                  shadow-lg mb-6 ring-6 ring-white ring-offset-1 ${paso.ring}`}>
                    <paso.icono size={26} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(90,62,43,0.08)]
                                  border border-[#EDE3D8] w-full
                                  hover:shadow-[0_8px_32px_rgba(90,62,43,0.12)] transition-shadow duration-300">
                    <span className="text-5xl font-extrabold text-[#D4A373]/20 mb-2 block leading-none select-none">
                      0{paso.num}
                    </span>
                    <h3 className="text-base font-extrabold text-[#2B2B2B] mb-2">{paso.titulo}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
