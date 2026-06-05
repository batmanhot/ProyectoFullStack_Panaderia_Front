import { http, isBackend } from '../lib/api';
import * as local from '../utils/settingsStorage';

export const settingsService = {

  /** GET /settings */
  getSettings: async () => {
    if (isBackend()) {
      const { settings } = await http.get('/settings');
      return settings;
    }
    return local.getSettings();
  },

  /** PATCH /settings  → settings guardados */
  saveSettings: async (settings) => {
    if (isBackend()) {
      const { settings: saved } = await http.patch('/settings', settings);
      return saved;
    }
    return local.saveSettings(settings);
  },
};
