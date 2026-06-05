import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductModal = ({
  isOpen,
  selectedCategory,
  menuData,
  quantities,
  addingId,
  onClose,
  onQuantityChange,
  onAddToCart,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  if (!isOpen || !selectedCategory) return null;

  const products = menuData[selectedCategory] || [];
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col max-h-[88vh]">

        {/* Header */}
        <div className="bg-orange-700 px-6 py-5 flex justify-between items-center text-white shrink-0">
          <div>
            <h3 className="text-2xl font-extrabold font-serif">{selectedCategory}</h3>
            <p className="text-orange-200 text-xs mt-0.5">Selecciona cantidad y agrega al carrito</p>
          </div>
          <button
            onClick={handleClose}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {currentProducts.map((product) => {
            const isAdding = addingId === product.id;
            const qty = quantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className={`relative rounded-2xl border-2 transition-all duration-200 ${
                  isAdding ? 'border-green-400 bg-green-50' : 'border-orange-100 bg-orange-50/40 hover:border-orange-200'
                }`}
              >
                <div className="p-4 flex items-start gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-extrabold text-gray-800 text-base leading-tight">{product.nombre}</h5>
                    <p className="text-orange-600 font-bold text-sm mt-0.5">S/ {product.precio.toFixed(2)}</p>
                    <p className="text-gray-400 text-xs italic mt-1 leading-snug">{product.desc}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* Cantidad */}
                    <div className="flex items-center rounded-xl border-2 border-orange-200 bg-white overflow-hidden">
                      <button
                        onClick={() => onQuantityChange(product.id, -1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-orange-50 text-orange-600 font-bold transition"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-9 text-center font-extrabold text-gray-800 text-sm select-none">
                        {qty}
                      </span>
                      <button
                        onClick={() => onQuantityChange(product.id, 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-orange-50 text-orange-600 font-bold transition"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    {/* Botón agregar */}
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={isAdding}
                      className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                        isAdding
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-orange-700 hover:bg-orange-800 text-white shadow-md'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <Check size={15} strokeWidth={3} />
                          Agregado
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={15} />
                          Agregar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between shrink-0 bg-gray-50">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-orange-200 text-orange-700 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-xl font-bold text-sm transition ${
                    currentPage === page
                      ? 'bg-orange-700 text-white shadow'
                      : 'border border-orange-200 text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-orange-200 text-orange-700 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
