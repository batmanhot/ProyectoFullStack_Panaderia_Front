import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Sección principal */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Información de la empresa */}
          <div className="flex flex-col">
            <h3 className="text-white text-2xl font-bold mb-3 font-serif italic">
              Panaderia la Jaujina
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Desde el corazón de nuestra región, llevando dulzura y tradición a cada hogar. 
              Productos artesanales elaborados con ingredientes de la más alta calidad.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/51951655295" className="text-gray-400 hover:text-orange-400 transition">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Ubicación y Horario */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-orange-500" />
              Ubicación
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400">
                📍 Calle Principal 123, La Jaujina
              </li>
              <li className="text-gray-400">
                Provincia de la Quebrada, Perú
              </li>
            </ul>

            <h4 className="text-white font-bold text-lg mt-6 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-orange-500" />
              Horario
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Lun - Sáb: 6:00 AM - 7:00 PM</li>
              <li>Domingo: 7:00 AM - 5:00 PM</li>
              <li className="text-orange-400 font-semibold mt-2">Delivery disponible</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Phone size={20} className="text-orange-500" />
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+51951655295" className="text-gray-400 hover:text-orange-400 transition">
                  📱 +51 951 655 295
                </a>
              </li>
              <li>
                <a href="https://wa.me/51951655295" className="text-gray-400 hover:text-orange-400 transition">
                  💬 WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:info@panaderialajaujina.com" className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </a>
              </li>
            </ul>

            <h4 className="text-white font-bold text-lg mt-6 mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✓ Delivery a domicilio</li>
              <li>✓ Pedidos personalizados</li>
              <li>✓ Al por mayor</li>
              <li>✓ Eventos especiales</li>
            </ul>
          </div>

          {/* Métodos de pago */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Medios de Pago</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">💳</span> Tarjeta de crédito/débito
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">📱</span> Billeteras digitales (Yape, Plin)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">🏦</span> Transferencia bancaria
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">💵</span> Efectivo
              </li>
            </ul>

            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-xs text-orange-400 font-semibold mb-1">¡OFERTA ESPECIAL!</p>
              <p className="text-sm text-gray-300">
                10% descuento en pedidos al por mayor
              </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition">
              Términos de Servicio
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition">
              Preguntas Frecuentes
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm mb-2">
              © 2026 PANADERÍA LA JAUJINA - TODOS LOS DERECHOS RESERVADOS
            </p>
            <p className="text-gray-600 text-xs">
              Hecho con ❤️ para la comunidad de La Jaujina
            </p>
          </div>
        </div>
      </div>

      {/* Banner final */}
      <div className="bg-orange-600 text-center py-4 px-6">
        <p className="text-white font-semibold text-sm">
          ¿Necesitas hacer un pedido especial? Contáctanos por WhatsApp 📞
        </p>
      </div>
    </footer>
  );
};

export default Footer;
