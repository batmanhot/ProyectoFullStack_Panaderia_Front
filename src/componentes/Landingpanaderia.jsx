import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Especialidades from './Especialidades';
import ProductModal from './ProductModal';
import CartDrawer from './CartDrawer';
import FAQ from './FAQ';
import Contacto from './Contacto';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';



const LandingPanaderia = () => {
  // Estados
  const [openFaq, setOpenFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [notes, setNotes] = useState("");

  // Configuración de WhatsApp
  const whatsappNumber = "51951655295";
  const defaultMessage = encodeURIComponent("¡Hola! Me gustaría realizar una consulta sobre sus productos.");

  // Datos de menú
  const menuData = {
    Panadería: [
      { id: 'p1', nombre: 'Pan de Masa Madre', precio: 15.00, desc: 'Fermentación natural de 24 horas.' },
      { id: 'p2', nombre: 'Baguette Tradicional', precio: 3.50, desc: 'Crocante por fuera, suave por dentro.' },
      { id: 'p3', nombre: 'Pan de Queso Regional', precio: 2.50, desc: 'Receta secreta de la casa.' },
      { id: 'p4', nombre: 'Pan de Trigo Integral', precio: 2.50, desc: 'Nutritivo y con sabor natural.' },
      { id: 'p5', nombre: 'Ciabatta Artesanal', precio: 4.00, desc: 'Ideal para sándwiches premium.' },
    ],
    'Pasteles y Tortas': [
      { id: 't1', nombre: 'Torta de Tres Leches', precio: 65.00, desc: 'Bañada en nuestra mezcla especial.' },
      { id: 't2', nombre: 'Cheesecake de Frutos Rojos', precio: 55.00, desc: 'Con mermelada artesanal.' },      
      { id: 't3', nombre: 'Torta de Chocolate', precio: 60.00, desc: 'Torta de chocolate relleno de manjarblanco.' },      
      { id: 't4', nombre: 'Torta de Fresa', precio: 60.00, desc: 'Torta de fresa con crema de leche.' },      
    ],
    'Dulces Regionales': [
      { id: 'd1', nombre: 'Alfajores Artesanales', precio: 3.00, desc: 'Rellenos de mucho dulce de leche.' },
      { id: 'd2', nombre: 'Cocadas Crujientes', precio: 4.00, desc: 'Coco rallado y panela orgánica.' },
      { id: 'd3', nombre: 'Conservas de Fruta', precio: 5.50, desc: 'Fruta de temporada en almíbar.' },
      { id: 'd4', nombre: 'Mazamorra Regional', precio: 3.00, desc: 'Postre típico con maíz morado.' },
    ]
  };

  // Métodos del carrito
  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const addToCart = (product) => {
    const qty = quantities[product.id] || 1;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { ...product, qty }];
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 2000);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.precio * item.qty), 0);

  // Envío por WhatsApp
  const sendToWhatsApp = () => {
    let mensaje = `*Nuevo Pedido - Panaderia la Jaujina*%0A------------------------------%0A`;
    cart.forEach(item => {
      mensaje += `• ${item.qty}x ${item.nombre} - S/ ${(item.precio * item.qty).toFixed(2)}%0A`;
    });
    
    mensaje += `------------------------------%0A*Total a Pagar: S/ ${totalCart.toFixed(2)}*%0A`;
    
    if (notes.trim()) {
      mensaje += `%0A*Observaciones:* ${encodeURIComponent(notes)}%0A`;
    }

    mensaje += `%0A¿Podrían confirmarme la disponibilidad y el tiempo de entrega? ... POR APERTURA DE SU NUEVA PANADERIA LA JAUJINA, TODOS SUS PEDIDOS SON GRATIS, SOLICITELO YA !!. GRACIAS.`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`, '_blank');
  };

  // Datos de FAQs
  const faqs = [
    {
      pregunta: "¿Realizan envíos a domicilio (Delivery)?",
      respuesta: "¡Sí! Contamos con servicio de delivery en toda el área metropolitana. Los pedidos realizados antes de las 10:00 AM se entregan el mismo día por la tarde. El costo varía según la zona."
    },
    {
      pregunta: "¿Con cuánta anticipación debo pedir una torta personalizada?",
      respuesta: "Para tortas especiales o de cumpleaños, recomendamos realizar tu pedido con al menos 48 horas de anticipación para garantizar la disponibilidad y el detalle que tu celebración merece."
    },
    {
      pregunta: "¿Qué medios de pago aceptan?",
      respuesta: "Aceptamos efectivo, transferencias bancarias, tarjetas de crédito/débito y billeteras digitales (Yape, Plin o similares). En nuestra tienda física también aceptamos pagos sin contacto."
    },
    {
      pregunta: "¿Venden productos al por mayor para eventos?",
      respuesta: "Sí, trabajamos con empresas y eventos familiares. Ofrecemos paquetes especiales de panes regionales y bocaditos dulces al por mayor. Contáctanos por WhatsApp para una cotización personalizada."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white font-sans text-gray-800 relative">
      {/* Botón flotante WhatsApp */}
      <WhatsAppButton whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />

      {/* Navbar */}
      <Navbar 
        cartLength={cart.reduce((a, b) => a + b.qty, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Hero Section */}
      <Hero />

      {/* Especialidades */}
      <div id="especialidades">
        <Especialidades 
          menuData={menuData} 
          onOpenMenu={(category) => {
            setSelectedCategory(category);
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Modal de Productos */}
      <ProductModal 
        isOpen={isModalOpen}
        selectedCategory={selectedCategory}
        menuData={menuData}
        quantities={quantities}
        addingId={addingId}
        onClose={() => setIsModalOpen(false)}
        onQuantityChange={handleQuantityChange}
        onAddToCart={addToCart}
      />

      {/* Carrito */}
      <CartDrawer 
        isOpen={isCartOpen}
        cart={cart}
        totalCart={totalCart}
        notes={notes}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={updateCartQty}
        onRemoveItem={removeFromCart}
        onNotesChange={setNotes}
        onSendToWhatsApp={sendToWhatsApp}
      />

      {/* FAQ */}
      <div id="faq">
        <FAQ 
          faqs={faqs}
          openFaq={openFaq}
          onToggleFaq={(index) => setOpenFaq(openFaq === index ? null : index)}
        />
      </div>

      {/* Contacto */}
      <div id="contacto">
        <Contacto />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPanaderia;