import React, { useState } from 'react';
import { ShoppingCart, Check, Lock } from 'lucide-react';

const BADGE_STYLES = {
  'Más vendido':    'bg-amber-500 text-white',
  'Favorito':       'bg-rose-500 text-white',
  'Recién horneado':'bg-orange-500 text-white',
  'Saludable':      'bg-emerald-500 text-white',
  'Nuevo':          'bg-blue-500 text-white',
  'Para eventos':   'bg-purple-500 text-white',
};

const ProductCard = ({
  product,
  onAddToCart,
  addingId,
  priceColor = 'text-[#5A3E2B]',
  btnColor   = 'bg-[#5A3E2B] hover:bg-[#3D2010]',
  isLoggedIn = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isAdding   = addingId === product.id;
  const needsLogin = isLoggedIn === false;
  const badgeStyle = BADGE_STYLES[product.badge] || 'bg-[#D4A373] text-white';

  return (
    <div className="group bg-white rounded-3xl overflow-hidden
                    border border-[#E8DDD0]
                    shadow-[0_2px_12px_rgba(90,62,43,0.08)]
                    hover:shadow-[0_16px_48px_rgba(90,62,43,0.18)]
                    hover:-translate-y-2 transition-all duration-400
                    flex flex-col h-full">

      {/* Imagen */}
      <div className="relative h-52 overflow-hidden shrink-0 bg-[#FFF8F0]">
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 ${badgeStyle}
                            text-xs font-bold px-3 py-1.5 rounded-full shadow-md tracking-wide`}>
            {product.badge}
          </span>
        )}

        {product.img && !imgError ? (
          <img
            src={product.img}
            alt={product.nombre}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#D4A373]">
            <ShoppingCart size={40} />
            <span className="text-xs text-[#D4A373]/70 font-medium">{product.nombre}</span>
          </div>
        )}

        {/* Overlay hover sutil */}
        <div className="absolute inset-0 bg-[#5A3E2B]/0 group-hover:bg-[#5A3E2B]/8 transition-colors duration-400 pointer-events-none" />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-[#2B2B2B] text-lg leading-tight mb-1.5">
          {product.nombre}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4 italic">
          {product.desc}
        </p>

        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-[#F0E8DE]">
          <span className={`text-2xl font-extrabold ${priceColor}`}>
            S/ {product.precio.toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isAdding}
            title={needsLogin ? 'Debes iniciar sesión para agregar al carrito' : ''}
            className={`flex items-center gap-2 text-white font-bold px-4 py-2.5 rounded-xl text-sm
                        shadow-md transition-all duration-200 active:scale-95 cursor-pointer
                        hover:-translate-y-0.5 hover:shadow-lg ${
                          isAdding   ? 'bg-emerald-500 cursor-default' :
                          needsLogin ? 'bg-gray-400 hover:bg-gray-500' :
                                       `${btnColor}`
                        }`}
          >
            {isAdding ? (
              <><Check size={15} strokeWidth={3} /> Agregado</>
            ) : needsLogin ? (
              <><Lock size={14} /> Iniciar Sesión</>
            ) : (
              <><ShoppingCart size={15} /> Agregar</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
