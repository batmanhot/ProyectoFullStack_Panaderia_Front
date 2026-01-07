import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setError('Por favor completa los campos obligatorios (Nombre, Email y Mensaje)');
      return;
    }

    // Crear mailto link
    const mailto = `mailto:info@panaderialajaujina.com?subject=${encodeURIComponent(`Consulta: ${formData.asunto || 'Desde formulario de contacto'}`)}&body=${encodeURIComponent(
      `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\n\nMensaje:\n${formData.mensaje}`
    )}`;

    window.location.href = mailto;
    
    // Mostrar confirmación
    setEnviado(true);
    setError('');
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-green-900 italic mb-3">¿Deseas algo especial?</h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Cotiza tortas personalizadas o pedidos para eventos corporativos y familiares. 
            <span className="block mt-2 text-green-700 font-semibold">Completa el formulario y nos pondremos en contacto contigo por correo electrónico</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Tarjetas de contacto */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl hover:bg-green-50 transition">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Phone className="text-green-600" size={28} />
              </div>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Llamadas directas</p>
            <p className="text-lg font-bold text-gray-800">+51 951 655 295</p>
            <p className="text-sm text-gray-500 mt-2">Respuesta inmediata</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl hover:bg-green-50 transition">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Mail className="text-green-600" size={28} />
              </div>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Correo electrónico</p>
            <p className="text-lg font-bold text-gray-800">info@panaderialajaujina.com</p>
            <p className="text-sm text-gray-500 mt-2">Respuesta en 24 horas</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl hover:bg-green-50 transition">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Send className="text-green-600" size={28} />
              </div>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">WhatsApp</p>
            <p className="text-lg font-bold text-gray-800">+51 951 655 295</p>
            <p className="text-sm text-gray-500 mt-2">Chat directo</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl mx-auto">
          <div className="mb-6">
            <h4 className="text-2xl font-bold text-center text-gray-800">
              📧 Enviar Consulta por Email
            </h4>
            <p className="text-center text-sm text-gray-600 mt-2">
              Completa el formulario y tu mensaje será enviado directamente a nuestro correo electrónico
            </p>
          </div>

          {/* Mensajes de estado */}
          {enviado && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-start gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-bold text-green-800">¡Mensaje listo para enviar!</p>
                <p className="text-sm text-green-700">Se abrirá tu cliente de correo. Verifica los datos y envía el mensaje.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo" 
                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:bg-white transition outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com" 
                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:bg-white transition outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Usaremos este correo para responder tu consulta</p>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Teléfono / WhatsApp
              </label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+51 9XX XXX XXX" 
                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:bg-white transition outline-none"
              />
            </div>

            {/* Asunto */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Asunto
              </label>
              <input 
                type="text" 
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="Ej: Cotización de torta personalizada" 
                className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:bg-white transition outline-none"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos qué necesitas..." 
                className="w-full p-4 h-40 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:bg-white transition outline-none resize-none"
              ></textarea>
            </div>

            {/* Información adicional */}
            <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
              <p className="text-sm text-green-900">
                <span className="font-bold">📬 Nota:</span> Al hacer click en "Enviar", se abrirá tu cliente de correo predeterminado con tu mensaje prellenado. Solo debes revisar y enviar.
              </p>
            </div>

            {/* Botón */}
            <button 
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <Send size={20} /> Preparar Email
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;

