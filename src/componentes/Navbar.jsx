import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ cartLength, onCartClick, sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'especialidades', label: 'Especialidades' },
    { id: 'faq', label: 'Preguntas' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-orange-700 font-serif italic">Panaderia la Jaujina</h1>
      
      {/* Menú desktop */}
      <div className="hidden md:flex gap-6 items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="text-gray-700 hover:text-orange-700 font-medium transition"
          >
            {item.label}
          </button>
        ))}
        <button 
          onClick={onCartClick}
          className="relative bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition shadow-lg active:scale-90"
        >
          <ShoppingCart size={24} />
          {cartLength > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
              {cartLength}
            </span>
          )}
        </button>
      </div>

      {/* Menú móvil - botón hamburguesa */}
      <div className="md:hidden flex items-center gap-3">
        <button 
          onClick={onCartClick}
          className="relative bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition shadow-lg active:scale-90"
        >
          <ShoppingCart size={20} />
          {cartLength > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
              {cartLength}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:text-orange-700 transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="flex flex-col p-4 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-gray-700 hover:text-orange-700 font-medium py-2 px-3 transition hover:bg-orange-50 rounded"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
