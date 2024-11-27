import { STORAGE_KEYS, DEFAULT_LOGO } from './config.js';
import { stateManager } from './state.js';
import { showSuccess, showError } from './ui.js';

class LogoManager {
  constructor() {
    this.currentLogo = DEFAULT_LOGO;
  }

  updateLogo(logoUrl) {
    try {
      this.currentLogo = logoUrl;
      localStorage.setItem(STORAGE_KEYS.LOGO, logoUrl);
      
      // Update all logo elements in the page
      document.querySelectorAll('[data-logo]').forEach(img => {
        img.src = logoUrl;
      });

      // Update state
      stateManager.updateState('logo', logoUrl);
      
      showSuccess('Logo actualizado correctamente');
      return true;
    } catch (error) {
      showError('Error al actualizar el logo');
      console.error('Error updating logo:', error);
      return false;
    }
  }

  getCurrentLogo() {
    return localStorage.getItem(STORAGE_KEYS.LOGO) || DEFAULT_LOGO;
  }

  resetToDefault() {
    return this.updateLogo(DEFAULT_LOGO);
  }
}

export const logoManager = new LogoManager();