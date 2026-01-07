import React from 'react';

const Especialidades = ({ menuData, onOpenMenu }) => {
  const imageMap = {
    'Panadería': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73',
    'Pasteles y Tortas': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    'Dulces Regionales': 'https://images.unsplash.com/photo-1559620192-032c4bc4674e'
  };

  return (
    <section id="especialidades" className="py-20 px-6 bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-orange-900 italic">Nuestras Especialidades</h3>
          <p className="text-orange-700 mt-2 italic text-lg">Selecciona una categoría para ver precios</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
        {Object.keys(menuData).map((category) => (
          <div 
            key={category} 
            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="overflow-hidden h-56">
              <img 
                src={imageMap[category]} 
                alt={category} 
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500" 
              />
            </div>
            <div className="p-8 text-center">
              <h4 className="text-2xl font-bold mb-3 text-orange-800">{category}</h4>
              <p className="text-gray-600 mb-6 italic">Variedades artesanales con ingredientes de primera.</p>
              <button 
                onClick={() => onOpenMenu(category)} 
                className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition"
              >
                Ver Precios y Variedad
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Especialidades;
