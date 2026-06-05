import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Phone, Store } from 'lucide-react';
import { settingsService } from '../services';

const SECTION_LABELS = {
  estadisticas: '📊 Estadísticas',
  favoritos:    '⭐ Productos Favoritos',
  beneficios:   '✅ Beneficios',
  promociones:  '🎯 Promociones del Día',
  comoFunciona: '🔄 Cómo Funciona',
  testimonios:  '💬 Testimonios',
  eventos:      '🎉 Eventos y Empresas',
  faq:          '❓ Preguntas Frecuentes',
  ctaFinal:     '📣 Llamada a la Acción Final',
  contacto:     '📍 Información de Contacto',
};

const Toggle = ({ on, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? 'bg-green-500' : 'bg-gray-300'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const AdminSettingsTab = () => {
  const [settings, setSettings] = useState(null);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    settingsService.getSettings()
      .then(setSettings)
      .catch((err) => console.error('Error cargando configuración:', err));
  }, []);

  const setSections = (key) =>
    setSettings((s) => ({ ...s, sections: { ...s.sections, [key]: !s.sections[key] } }));

  const handleSave = async () => {
    try {
      await settingsService.saveSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error guardando configuración:', err);
    }
  };

  if (!settings) return null;

  const visibleCount = Object.values(settings.sections).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Información de la Tienda */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <Store size={16} className="text-orange-600" />
          <h3 className="font-bold text-gray-800">Información del Negocio</h3>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Nombre del Negocio</label>
            <input
              value={settings.storeName}
              onChange={(e) => setSettings((s) => ({ ...s, storeName: e.target.value }))}
              className="w-full border-2 border-gray-200 focus:border-orange-400 rounded-2xl px-4 py-3 text-sm outline-none transition text-gray-800"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Phone size={11} /> Número de WhatsApp
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-mono bg-gray-100 border-2 border-gray-200 rounded-2xl px-3 py-3 select-none">+</span>
              <input
                value={settings.whatsappNumber}
                onChange={(e) => setSettings((s) => ({ ...s, whatsappNumber: e.target.value.replace(/\D/g, '') }))}
                placeholder="51951655295"
                className="flex-1 border-2 border-gray-200 focus:border-orange-400 rounded-2xl px-4 py-3 text-sm outline-none transition font-mono text-gray-800"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Código de país incluido, sin el signo +. Ej: 51 para Perú.</p>
          </div>
        </div>
      </div>

      {/* Visibilidad de Secciones */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800">Visibilidad de Secciones</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {visibleCount} de {Object.keys(SECTION_LABELS).length} secciones visibles en la landing
          </p>
        </div>
        <div className="divide-y divide-gray-50">
          {Object.entries(SECTION_LABELS).map(([key, label]) => {
            const isOn = settings.sections[key] !== false;
            return (
              <div key={key} className="px-5 py-3.5 flex items-center justify-between">
                <span className={`text-sm font-medium ${isOn ? 'text-gray-700' : 'text-gray-400'}`}>{label}</span>
                <Toggle on={isOn} onChange={() => setSections(key)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Los cambios se aplicarán cuando cierres sesión del panel.</p>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-orange-600 hover:bg-orange-700 text-white active:scale-95'
          }`}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? '¡Cambios Guardados!' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsTab;
