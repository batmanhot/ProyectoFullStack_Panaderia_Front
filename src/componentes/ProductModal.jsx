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
  onAddToCart 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  if (!isOpen || !selectedCategory) return null;

  const products = menuData[selectedCategory] || [];
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col max-h-[85vh]">
        <div className="bg-orange-700 p-6 flex justify-between items-center text-white">
          <h3 className="text-2xl font-bold font-serif">{selectedCategory}</h3>
          <button onClick={handleClose} className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {currentProducts.map((product) => { 
            const isAdding = addingId === product.id;

            return (
              <div 
                key={product.id} 
                className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative"
              >
                {isAdding && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm py-2 px-4 rounded-lg shadow-xl animate-bounce z-10 flex items-center gap-2 font-semibold border border-green-400/30 backdrop-blur-sm">                                                
                    <Check size={16} strokeWidth={3} /> Producto agregado
                  </div>
                )}
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 text-lg">{product.nombre}</h5>
                  <p className="text-orange-700 font-bold mb-1">S/ {product.precio.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 italic">{product.desc}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl border border-orange-200 bg-white">
                    <button 
                      onClick={() => onQuantityChange(product.id, -1)} 
                      className="p-2 hover:bg-orange-50 rounded-l-xl"
                    >
                      <Minus size={16}/>
                    </button>
                    <span className="px-3 font-bold text-lg min-w-[30px] text-center">
                      {quantities[product.id] || 1}
                    </span>
                    <button 
                      onClick={() => onQuantityChange(product.id, 1)} 
                      className="p-2 hover:bg-orange-50 rounded-r-xl"
                    >
                      <Plus size={16}/>
                    </button>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className={`p-3 rounded-xl transition-all shadow-md active:scale-90 flex items-center justify-center ${
                      isAdding 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-orange-800 text-white hover:bg-orange-900'
                    }`}
                    title="Agregar al carrito"
                  >
                    {isAdding ? <Check size={18} /> : <ShoppingCart size={18} />}
                  </button>                    
                </div>                    
              </div>
            );
          })}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 p-4 flex items-center justify-between">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-lg font-bold transition ${
                    currentPage === page
                      ? 'bg-orange-700 text-white'
                      : 'border border-orange-300 text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
