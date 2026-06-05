import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import EstadisticasSection from './EstadisticasSection';
import ProductosFavoritos from './ProductosFavoritos';
import CatalogoProductos from './CatalogoProductos';
import BeneficiosSection from './BeneficiosSection';
import PromocionesSection from './PromocionesSection';
import ComoFunciona from './ComoFunciona';
import Testimonios from './Testimonios';
import EventosEmpresas from './EventosEmpresas';
import FAQ from './FAQ';
import CTAFinal from './CTAFinal';
import Contacto from './Contacto';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CartDrawer from './CartDrawer';
import OrderTicket from './OrderTicket';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import CustomerLogin from './CustomerLogin';
import CustomerOrders from './CustomerOrders';
import { saveOrder, generateOrderId } from '../utils/orderStorage';
import { getProducts } from '../utils/productStorage';
import { getSettings } from '../utils/settingsStorage';

const LandingPanaderia = () => {
  /* ── Carrito ──────────────────────────────────────── */
  const [openFaq,    setOpenFaq]    = useState(null);
  const [addingId,   setAddingId]   = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart,       setCart]       = useState([]);
  const [notes,      setNotes]      = useState('');

  /* ── Admin ────────────────────────────────────────── */
  const [showAdminLogin,  setShowAdminLogin]  = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentTicket,   setCurrentTicket]   = useState(null);

  /* ── Cliente ──────────────────────────────────────── */
  const [loggedInCustomer,   setLoggedInCustomer]   = useState(null);
  const [showCustomerLogin,  setShowCustomerLogin]  = useState(false);
  const [showCustomerOrders, setShowCustomerOrders] = useState(false);

  /* ── Datos desde localStorage ─────────────────────── */
  const [storedProducts, setStoredProducts] = useState(() => getProducts());
  const [settings,       setSettings]       = useState(() => getSettings());

  /* Refrescar cuando el admin cierra sesión */
  useEffect(() => {
    if (!isAdminLoggedIn) {
      setStoredProducts(getProducts());
      setSettings(getSettings());
    }
  }, [isAdminLoggedIn]);

  /* menuData: solo productos activos */
  const menuData = Object.fromEntries(
    Object.entries(storedProducts)
      .map(([cat, prods]) => [cat, prods.filter((p) => p.activo !== false)])
      .filter(([, prods]) => prods.length > 0)
  );

  const whatsappNumber = settings.whatsappNumber || '51951655295';
  const defaultMessage = encodeURIComponent('¡Hola! Me gustaría realizar una consulta sobre sus productos.');
  const isLoggedIn     = !!loggedInCustomer;

  /* ── Carrito helpers ──────────────────────────────── */
  const addToCart = (product) => {
    /* Guard: requiere sesión activa */
    if (!loggedInCustomer) {
      setShowCustomerLogin(true);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddingId(product.id);
    setTimeout(() => setAddingId(null), 2000);
  };

  const updateCartQty = (id, delta) =>
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
          .filter((i) => i.qty > 0)
    );

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const totalCart = cart.reduce((acc, i) => acc + i.precio * i.qty, 0);

  /* ── Confirmar pedido ─────────────────────────────── */
  const handleConfirmOrder = ({ paymentMethod, yapeCode, customer }) => {
    const order = {
      id:        generateOrderId(),
      timestamp: new Date().toISOString(),
      status:    'recepcionado',
      customer: {
        nombre:     customer.nombre,
        direccion:  customer.direccion,
        referencia: customer.referencia,
        /* Vinculación con la cuenta del cliente */
        ...(loggedInCustomer && {
          telefono: loggedInCustomer.telefono,
          email:    loggedInCustomer.email,
        }),
      },
      items:         cart.map(({ id, nombre, precio, qty }) => ({ id, nombre, precio, qty })),
      total:         totalCart,
      paymentMethod,
      yapeCode:      paymentMethod === 'yape' ? yapeCode : null,
      notes:         notes.trim(),
      statusHistory: [
        { status: 'recepcionado', timestamp: new Date().toISOString(), note: '' },
      ],
    };

    saveOrder(order);

    setCart([]);
    setNotes('');
    setIsCartOpen(false);
    setCurrentTicket(order);
  };

  /* ── Navegación cliente ───────────────────────────── */
  const handleUserClick = () => {
    if (loggedInCustomer) setShowCustomerOrders(true);
    else setShowCustomerLogin(true);
  };

  /* ── FAQs ─────────────────────────────────────────── */
  const faqs = [
    { pregunta: '¿Realizan delivery a domicilio?',           respuesta: '¡Sí! Contamos con servicio de delivery en toda el área. Los pedidos realizados antes de las 6:00 PM se entregan el mismo día.' },
    { pregunta: '¿Cuál es el horario de atención?',          respuesta: 'Atendemos de lunes a sábado de 6:00 AM a 7:00 PM, y los domingos de 7:00 AM a 5:00 PM.' },
    { pregunta: '¿Aceptan Yape y Plin?',                     respuesta: 'Sí, aceptamos Yape, Plin, transferencias bancarias, tarjetas de crédito/débito y efectivo.' },
    { pregunta: '¿Con cuánta anticipación pido una torta?',  respuesta: 'Para tortas especiales recomendamos solicitarlas con al menos 48 horas de anticipación.' },
    { pregunta: '¿Preparan pedidos al por mayor?',           respuesta: 'Sí, trabajamos con empresas y eventos. Ofrecemos paquetes especiales con descuentos. Contáctanos por WhatsApp.' },
    { pregunta: '¿Atienden eventos y reuniones?',            respuesta: 'Absolutamente. Ofrecemos coffee break, catering y eventos corporativos. Cotizamos sin compromiso.' },
  ];

  const sec = settings.sections;

  /* ── Panel admin reemplaza landing ───────────────── */
  if (isAdminLoggedIn) {
    return <AdminPanel onLogout={() => setIsAdminLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-gray-800 relative">

      {/* WhatsApp flotante */}
      <WhatsAppButton whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />

      {/* Botón Admin flotante */}
      <button
        onClick={() => setShowAdminLogin(true)}
        title="Acceso Administrador"
        className="fixed bottom-6 left-6 z-50 bg-gray-900 hover:bg-gray-700 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <Lock size={20} />
      </button>

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
        onConfirmOrder={handleConfirmOrder}
        loggedInCustomer={loggedInCustomer}
      />

      {/* Modal Login Admin */}
      {showAdminLogin && (
        <AdminLogin
          onSuccess={() => { setShowAdminLogin(false); setIsAdminLoggedIn(true); }}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {/* Modal Login / Registro Cliente */}
      {showCustomerLogin && (
        <CustomerLogin
          onSuccess={(customer) => {
            setLoggedInCustomer(customer);
            setShowCustomerLogin(false);
            setShowCustomerOrders(true);
          }}
          onClose={() => setShowCustomerLogin(false)}
        />
      )}

      {/* Panel de pedidos del cliente */}
      {showCustomerOrders && loggedInCustomer && (
        <CustomerOrders
          customer={loggedInCustomer}
          onClose={() => setShowCustomerOrders(false)}
          onLogout={() => { setLoggedInCustomer(null); setShowCustomerOrders(false); setCart([]); }}
        />
      )}

      {/* Ticket de comprobante */}
      {currentTicket && (
        <OrderTicket
          order={currentTicket}
          onClose={() => setCurrentTicket(null)}
          whatsappNumber={whatsappNumber}
        />
      )}

      {/* Navbar */}
      <Navbar
        cartLength={cart.reduce((a, b) => a + b.qty, 0)}
        onCartClick={() => setIsCartOpen(true)}
        loggedInCustomer={loggedInCustomer}
        onUserClick={handleUserClick}
      />

      {/* 1. Hero */}
      <Hero
        onOrderClick={() => {
          const msg = encodeURIComponent('¡Hola! Quiero hacer un pedido. ¿Qué productos tienen disponibles hoy?');
          window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
        }}
        onCatalogClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Aviso de sesión requerida — visible solo si no hay sesión */}
      {!isLoggedIn && (
        <div className="bg-amber-50 border-y border-[#D4A373]/30 py-3 px-6 text-center">
          <p className="text-[#5A3E2B] text-sm font-medium">
            🔐 <strong>Inicia sesión</strong> para agregar productos al carrito y hacer seguimiento de tus pedidos.{' '}
            <button
              onClick={() => setShowCustomerLogin(true)}
              className="underline font-bold hover:text-[#3D2010] transition"
            >
              Crear cuenta o ingresar →
            </button>
          </p>
        </div>
      )}

      {/* 2. Estadísticas */}
      {sec.estadisticas && <EstadisticasSection />}

      {/* 3. Productos Favoritos */}
      {sec.favoritos && (
        <ProductosFavoritos
          onAddToCart={addToCart}
          addingId={addingId}
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* 4. Catálogo por Especialidades */}
      <CatalogoProductos
        menuData={menuData}
        onAddToCart={addToCart}
        addingId={addingId}
        isLoggedIn={isLoggedIn}
      />

      {/* 5. Beneficios */}
      {sec.beneficios && <BeneficiosSection />}

      {/* 6. Promociones */}
      {sec.promociones && <PromocionesSection whatsappNumber={whatsappNumber} />}

      {/* 7. Cómo Funciona */}
      {sec.comoFunciona && <ComoFunciona />}

      {/* 8. Testimonios */}
      {sec.testimonios && <Testimonios />}

      {/* 9. Eventos */}
      {sec.eventos && <EventosEmpresas whatsappNumber={whatsappNumber} />}

      {/* 10. FAQ */}
      {sec.faq && (
        <div id="faq">
          <FAQ
            faqs={faqs}
            openFaq={openFaq}
            onToggleFaq={(i) => setOpenFaq(openFaq === i ? null : i)}
          />
        </div>
      )}

      {/* 11. CTA Final */}
      {sec.ctaFinal && <CTAFinal whatsappNumber={whatsappNumber} />}

      {/* 12. Contacto */}
      {sec.contacto && (
        <div id="contacto">
          <Contacto />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LandingPanaderia;
