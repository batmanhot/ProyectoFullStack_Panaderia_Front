const KEY = 'panaderia_jaujina_settings';

const DEFAULTS = {
  storeName:       'Panadería La Jaujina',
  whatsappNumber:  '51951655295',
  sections: {
    estadisticas: true,
    favoritos:    true,
    beneficios:   true,
    promociones:  true,
    comoFunciona: true,
    testimonios:  true,
    eventos:      true,
    faq:          true,
    ctaFinal:     true,
    contacto:     true,
  },
};

export const getSettings = () => {
  try {
    const stored = localStorage.getItem(KEY);
    if (!stored) return DEFAULTS;
    const parsed = JSON.parse(stored);
    return { ...DEFAULTS, ...parsed, sections: { ...DEFAULTS.sections, ...(parsed.sections || {}) } };
  } catch { return DEFAULTS; }
};

export const saveSettings = (settings) => {
  localStorage.setItem(KEY, JSON.stringify(settings));
  return settings;
};
