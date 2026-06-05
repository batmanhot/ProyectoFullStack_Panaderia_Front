import React, { useState } from 'react';
import { ShoppingCart, Check, Lock } from 'lucide-react';

const ProductCard = ({
  product,
  onAddToCart,
  addingId,
  priceColor  = 'text-orange-600',
  btnColor    = 'bg-orange-700 hover:bg-orange-800',
  isLoggedIn  = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isAdding   = addingId === product.id;
  const needsLogin = isLoggedIn === false;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                    flex flex-col h-full">

      {/* ── Imagen ── */}
      <div className="relative h-52 overflow-hidden shrink-0 bg-orange-50">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white
                           text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}

        {product.img && !imgError ? (
          <img
            src={product.img}
            alt={product.nombre}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-orange-200">
            <ShoppingCart size={40} />
            <span className="text-xs text-orange-300 font-medium">{product.nombre}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* ── Contenido ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-gray-800 text-lg leading-tight mb-1">
          {product.nombre}
        </h3>
        <p className="text-gray-400 text-sm italic leading-relaxed flex-1 mb-4">
          {product.desc}
        </p>

        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-50">
          <span className={`text-2xl font-extrabold ${priceColor}`}>
            S/ {product.precio.toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isAdding}
            title={needsLogin ? 'Debes iniciar sesión para agregar al carrito' : ''}
            className={`flex items-center gap-2 text-white font-bold px-4 py-2.5 rounded-xl text-sm
                        shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${
                          isAdding    ? 'bg-green-500 cursor-default' :
                          needsLogin  ? 'bg-gray-400 hover:bg-gray-500' :
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
