import React from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';

const MobileCartBar = ({ cartLength, totalCart, onCartClick }) => {
  if (cartLength === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] md:hidden animate-in slide-in-from-bottom duration-300">
      {/* Sombra superior */}
      <div className="h-px bg-linear-to-r from-transparent via-[#D4A373]/40 to-transparent" />

      <div className="bg-[#5A3E2B] px-4 py-3 flex items-center justify-between gap-3
                      shadow-[0_-4px_24px_rgba(42,26,10,0.25)]">
        {/* Info */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <ShoppingCart size={22} className="text-white" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-extrabold
                             w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#5A3E2B]">
              {cartLength > 9 ? '9+' : cartLength}
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-white/65 text-xs leading-none mb-0.5">
              {cartLength} producto{cartLength !== 1 ? 's' : ''}
            </p>
            <p className="text-[#D4A373] font-extrabold text-sm leading-none">
              S/ {totalCart.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={onCartClick}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400
                     text-white font-extrabold px-5 py-2.5 rounded-full text-sm
                     transition-all duration-200 active:scale-95 shadow-lg shrink-0"
        >
          Ver Carrito
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default MobileCartBar;
