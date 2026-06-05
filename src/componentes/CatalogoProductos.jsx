import React from 'react';
import ProductCard from './ProductCard';

/* Imágenes por ID de producto — URLs verificadas de Unsplash */
const productImages = {
  // Panadería
  p1: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
  p2: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=600',
  p3: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&q=80&w=600',
  p4: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
  p5: 'https://images.unsplash.com/photo-1550507497-d2f6bc8bb83a?auto=format&fit=crop&q=80&w=600',
  // Pasteles y Tortas
  t1: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
  t2: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
  t3: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
  t4: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
  // Dulces Regionales
  d1: 'https://images.unsplash.com/photo-1599599810694-c5ff32407f13?auto=format&fit=crop&q=80&w=600',
  d2: 'https://images.unsplash.com/photo-1618894868566-d19b9e14e3ff?auto=format&fit=crop&q=80&w=600',
  d3: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
  d4: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600',
};

const categoryConfig = {
  'Panadería': {
    sectionId: 'panaderia',
    label: 'PANADERÍA ARTESANAL',
    title: 'Pan Fresco Cada Mañana',
    desc: 'Horneado con fermentación natural y los mejores ingredientes. Del horno directamente a tu mesa.',
    sectionBg: 'bg-amber-50',
    chip: 'bg-orange-100 text-orange-700',
    accentText: 'text-orange-800',
    priceColor: 'text-orange-600',
    btnColor: 'bg-orange-700 hover:bg-orange-800',
  },
  'Pasteles y Tortas': {
    sectionId: 'pasteles-tortas',
    label: 'PASTELES Y TORTAS',
    title: 'Dulces para Cada Ocasión',
    desc: 'Creaciones artesanales para cumpleaños, celebraciones y antojos del día a día.',
    sectionBg: 'bg-rose-50',
    chip: 'bg-rose-100 text-rose-700',
    accentText: 'text-rose-800',
    priceColor: 'text-rose-600',
    btnColor: 'bg-rose-600 hover:bg-rose-700',
  },
  'Dulces Regionales': {
    sectionId: 'dulces-regionales',
    label: 'DULCES REGIONALES',
    title: 'Sabores de Nuestra Tierra',
    desc: 'Recetas tradicionales con ingredientes locales. El sabor auténtico de la región.',
    sectionBg: 'bg-yellow-50',
    chip: 'bg-yellow-100 text-yellow-700',
    accentText: 'text-yellow-800',
    priceColor: 'text-amber-600',
    btnColor: 'bg-amber-600 hover:bg-amber-700',
  },
};

const CatalogoProductos = ({ menuData, onAddToCart, addingId, isLoggedIn }) => {
  return (
    <>
      {Object.entries(categoryConfig).map(([categoryName, cfg]) => {
        const products = (menuData[categoryName] || []).map((p) => ({
          ...p,
          img: productImages[p.id] || null,
        }));

        return (
          <section
            key={categoryName}
            id={cfg.sectionId}
            className={`py-20 px-6 ${cfg.sectionBg}`}
          >
            <div className="max-w-7xl mx-auto">
              {/* Encabezado */}
              <div className="text-center mb-12">
                <span className={`inline-block text-xs font-bold px-4 py-1 rounded-full mb-4 tracking-widest ${cfg.chip}`}>
                  {cfg.label}
                </span>
                <h2 className={`text-4xl md:text-5xl font-extrabold mb-3 ${cfg.accentText}`}>
                  {cfg.title}
                </h2>
                <p className="text-gray-500 text-lg max-w-lg mx-auto">{cfg.desc}</p>
              </div>

              {/* Grid uniforme — mismas columnas que ProductosFavoritos */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    addingId={addingId}
                    priceColor={cfg.priceColor}
                    btnColor={cfg.btnColor}
                    isLoggedIn={isLoggedIn}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default CatalogoProductos;
