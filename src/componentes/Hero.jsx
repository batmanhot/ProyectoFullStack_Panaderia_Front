import React from 'react';
import { MessageCircle, Zap, Leaf, Clock } from 'lucide-react';

const Hero = ({ onOrderClick, onCatalogClick }) => {
  return (
    <header className="relative h-[75vh] flex items-center justify-center text-center text-white overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600" 
        alt="Pan recién horneado" className="absolute inset-0 w-full h-full object-cover brightness-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-transparent"></div>
      
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-in slide-in-from-top duration-700 text-white drop-shadow-lg">
          Pan recién horneado
          <br />
          <span className="text-green-200">todos los días</span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-lg md:text-xl mb-8 opacity-95 italic max-w-2xl mx-auto drop-shadow-md text-gray-100">
          Disfruta panes, pasteles, empanadas y productos artesanales elaborados con ingredientes seleccionados y el sabor tradicional que nos caracteriza.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onOrderClick}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <MessageCircle size={24} />
            Pedir por WhatsApp
          </button>
          <button
            onClick={onCatalogClick}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-green-700 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all text-lg"
          >
            Ver Catálogo
          </button>
        </div>

        {/* Indicadores Rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col items-center gap-2">
            <Zap className="text-yellow-300" size={28} />
            <p className="text-sm font-semibold drop-shadow">Horneado fresco diariamente</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="text-blue-300" size={28} />
            <p className="text-sm font-semibold drop-shadow">Delivery rápido</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Leaf className="text-green-300" size={28} />
            <p className="text-sm font-semibold drop-shadow">Productos artesanales</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MessageCircle className="text-pink-300" size={28} />
            <p className="text-sm font-semibold drop-shadow">Atención personalizada</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
