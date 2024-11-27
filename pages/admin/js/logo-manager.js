import { STORAGE_KEYS } from './config.js';
import { showSuccess, showError } from './ui.js';

class LogoManager {
  constructor() {
    this.currentLogo = this.loadLogo();
    this.initializeWidget();
  }

  loadLogo() {
    return localStorage.getItem(STORAGE_KEYS.LOGO) || 'https://ucarecdn.com/bdf174c8-8731-47fa-a3f9-2443689099be/logokioskey.png';
  }

  initializeWidget() {
    const widget = uploadcare.Widget('[role=uploadcare-uploader]', {
      publicKey: '1985ca48f4d597426e30',
      tabs: 'file url',
      previewStep: true,
      clearable: true,
      multiple: false,
      imagesOnly: true
    });

    widget.onUploadComplete((fileInfo) => {
      this.updateLogo(fileInfo.cdnUrl);
    });
  }

  updateLogo(logoUrl) {
    try {
      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.LOGO, logoUrl);
      
      // Update all logo elements in the page
      document.querySelectorAll('[data-logo]').forEach(img => {
        img.src = logoUrl;
      });

      // Update preview
      const preview = document.getElementById('logoPreview');
      if (preview) {
        preview.src = logoUrl;
      }

      showSuccess('Logo actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error updating logo:', error);
      showError('Error al actualizar el logo');
      return false;
    }
  }

  getCurrentLogo() {
    return this.currentLogo;
  }
}

export const logoManager = new LogoManager();