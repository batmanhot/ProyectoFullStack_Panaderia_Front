import React from 'react';
import ProductCard from './ProductCard';

const productosFavoritos = [
  {
    id: 'fav1',
    nombre: 'Pan Francés',
    precio: 0.50,
    desc: 'Crujiente por fuera y suave por dentro. El clásico de todos los días.',
    badge: 'Más vendido',
    img: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fav2',
    nombre: 'Pan Integral',
    precio: 2.50,
    desc: 'Nutritivo y con sabor natural. Elaborado con trigo integral seleccionado.',
    badge: 'Saludable',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fav3',
    nombre: 'Empanadas',
    precio: 2.00,
    desc: 'Rellenas de carne o queso, horneadas a la perfección cada mañana.',
    badge: '',
    img: 'https://images.unsplash.com/photo-1601050690117-94f5f7b72378?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fav4',
    nombre: 'Croissants',
    precio: 4.00,
    desc: 'Hojaldrados y mantecosos. El desayuno parisino directo a tu mesa.',
    badge: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fav5',
    nombre: 'Pasteles Surtidos',
    precio: 5.00,
    desc: 'Variedades artesanales frescas preparadas cada día. ¡Pídelos calientes!',
    badge: '',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fav6',
    nombre: 'Tortas Personalizadas',
    precio: 65.00,
    desc: 'Para todas las ocasiones, con ingredientes de primera calidad.',
    badge: 'Para eventos',
    img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
  },
];

const ProductosFavoritos = ({ onAddToCart, addingId, isLoggedIn }) => {
  return (
    <section id="productos" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-bold px-4 py-1 rounded-full mb-4 tracking-wide">
            LOS MÁS PEDIDOS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-3">
            Productos Favoritos
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Nuestros clientes los adoran. Elaborados cada día con ingredientes frescos y mucho cariño.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFavoritos.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              addingId={addingId}
              priceColor="text-orange-600"
              btnColor="bg-orange-700 hover:bg-orange-800"
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('panaderia')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200"
          >
            Ver Catálogo Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductosFavoritos;
