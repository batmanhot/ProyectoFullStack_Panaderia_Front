const KEY = 'panaderia_jaujina_products';

const DEFAULT_PRODUCTS = {
  'Panadería': [
    { id: 'p1', nombre: 'Pan de Masa Madre',     precio: 15.00, desc: 'Fermentación natural de 24 horas.',   activo: true },
    { id: 'p2', nombre: 'Baguette Tradicional',   precio: 3.50,  desc: 'Crocante por fuera, suave por dentro.', activo: true },
    { id: 'p3', nombre: 'Pan de Queso Regional',  precio: 2.50,  desc: 'Receta secreta de la casa.',          activo: true },
    { id: 'p4', nombre: 'Pan de Trigo Integral',  precio: 2.50,  desc: 'Nutritivo y con sabor natural.',      activo: true },
    { id: 'p5', nombre: 'Ciabatta Artesanal',     precio: 4.00,  desc: 'Ideal para sándwiches premium.',      activo: true },
  ],
  'Pasteles y Tortas': [
    { id: 't1', nombre: 'Torta de Tres Leches',       precio: 65.00, desc: 'Bañada en nuestra mezcla especial.', activo: true },
    { id: 't2', nombre: 'Cheesecake de Frutos Rojos', precio: 55.00, desc: 'Con mermelada artesanal.',           activo: true },
    { id: 't3', nombre: 'Torta de Chocolate',         precio: 60.00, desc: 'Relleno de manjarblanco.',           activo: true },
    { id: 't4', nombre: 'Torta de Fresa',             precio: 60.00, desc: 'Con crema de leche.',                activo: true },
  ],
  'Dulces Regionales': [
    { id: 'd1', nombre: 'Alfajores Artesanales', precio: 3.00, desc: 'Rellenos de dulce de leche.',         activo: true },
    { id: 'd2', nombre: 'Cocadas Crujientes',    precio: 4.00, desc: 'Coco rallado y panela orgánica.',     activo: true },
    { id: 'd3', nombre: 'Conservas de Fruta',    precio: 5.50, desc: 'Fruta de temporada en almíbar.',      activo: true },
    { id: 'd4', nombre: 'Mazamorra Regional',    precio: 3.00, desc: 'Postre típico con maíz morado.',      activo: true },
  ],
};

export const getProducts = () => {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
  } catch { return DEFAULT_PRODUCTS; }
};

const persist = (products) => {
  localStorage.setItem(KEY, JSON.stringify(products));
  return products;
};

export const saveProducts = persist;

export const addProduct = (category, product) => {
  const products = getProducts();
  if (!products[category]) products[category] = [];
  const newItem = {
    ...product,
    id:     `p_${Date.now()}`,
    precio: parseFloat(product.precio) || 0,
    activo: true,
  };
  products[category] = [...products[category], newItem];
  return persist(products);
};

export const updateProduct = (category, productId, updates) => {
  const products = getProducts();
  if (products[category]) {
    products[category] = products[category].map((p) =>
      p.id !== productId ? p : {
        ...p, ...updates,
        precio: updates.precio !== undefined ? parseFloat(updates.precio) || 0 : p.precio,
      }
    );
  }
  return persist(products);
};

export const deleteProduct = (category, productId) => {
  const products = getProducts();
  if (products[category]) {
    products[category] = products[category].filter((p) => p.id !== productId);
  }
  return persist(products);
};

export const addCategory = (categoryName) => {
  const products = getProducts();
  if (!products[categoryName]) products[categoryName] = [];
  return persist(products);
};

export const resetToDefaults = () => persist(DEFAULT_PRODUCTS);
