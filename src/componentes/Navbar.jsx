import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = ({ cartLength, onCartClick, loggedInCustomer, onUserClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'productos', label: 'Favoritos'  },
    { id: 'panaderia', label: 'Catálogo'   },
    { id: 'eventos',   label: 'Eventos'    },
    { id: 'faq',       label: 'Preguntas'  },
    { id: 'contacto',  label: 'Contacto'   },
  ];

  /* Iniciales del cliente para el avatar */
  const initials = loggedInCustomer
    ? loggedInCustomer.nombre.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : null;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-2xl font-bold text-orange-700 font-serif italic hover:text-orange-800 transition"
      >
        Panaderia la Jaujina
      </button>

      {/* Menú desktop */}
      <div className="hidden md:flex gap-6 items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="text-gray-700 hover:text-orange-700 font-medium transition text-sm"
          >
            {item.label}
          </button>
        ))}

        {/* Botón cliente */}
        <button
          onClick={onUserClick}
          title={loggedInCustomer ? `Mis pedidos — ${loggedInCustomer.nombre}` : 'Ver mis pedidos'}
          className={`relative flex items-center justify-center transition rounded-full shadow-md active:scale-90 ${
            loggedInCustomer
              ? 'w-10 h-10 bg-orange-600 text-white font-extrabold text-sm hover:bg-orange-700'
              : 'w-10 h-10 bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {loggedInCustomer ? initials : <User size={19} />}
          {loggedInCustomer && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </button>

        {/* Carrito */}
        <button
          onClick={onCartClick}
          className="relative bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition shadow-lg active:scale-90"
          aria-label="Ver carrito"
        >
          <ShoppingCart size={22} />
          {cartLength > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
              {cartLength}
            </span>
          )}
        </button>
      </div>

      {/* Móvil: iconos + hamburguesa */}
      <div className="md:hidden flex items-center gap-2">
        {/* Botón cliente móvil */}
        <button
          onClick={onUserClick}
          title={loggedInCustomer ? 'Mis pedidos' : 'Ver mis pedidos'}
          className={`relative flex items-center justify-center rounded-full transition active:scale-90 ${
            loggedInCustomer
              ? 'w-9 h-9 bg-orange-600 text-white font-extrabold text-xs hover:bg-orange-700'
              : 'w-9 h-9 bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {loggedInCustomer ? initials : <User size={17} />}
          {loggedInCustomer && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </button>

        <button
          onClick={onCartClick}
          className="relative bg-orange-600 text-white p-2.5 rounded-full hover:bg-orange-700 transition shadow-lg active:scale-90"
          aria-label="Ver carrito"
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
          aria-label="Menú"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-gray-700 hover:text-orange-700 font-medium py-2.5 px-3 transition hover:bg-orange-50 rounded-lg"
              >
                {item.label}
              </button>
            ))}
            {loggedInCustomer && (
              <button
                onClick={() => { onUserClick(); setIsMenuOpen(false); }}
                className="text-left text-orange-600 hover:text-orange-700 font-medium py-2.5 px-3 transition hover:bg-orange-50 rounded-lg flex items-center gap-2"
              >
                <User size={16} /> Mis Pedidos ({loggedInCustomer.nombre.split(' ')[0]})
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
