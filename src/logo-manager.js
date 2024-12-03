import { api } from './api';
import { showSuccess, showError, showLoading, hideLoading } from './ui';
import { compressImage } from './utils';

class LogoManager {
  constructor() {
    this.logoUrl = localStorage.getItem('kioskeys_logo') || '/logo.svg';
    this.initializeUploader();
    this.initializeEventListeners();
  }

  initializeUploader() {
    const uploader = document.getElementById('logoUploader');
    if (!uploader) return;

    uploadcare.registerTab('preview', uploadcareTabPreview);
    
    const widget = uploadcare.Widget(uploader, {
      publicKey: '1985ca48f4d597426e30',
      tabs: 'file url preview',
      previewStep: true,
      clearable: true,
      multiple: false,
      crop: '1:1',
      imageShrink: '1024x1024',
      imageQuality: 0.8
    });

    widget.onUploadComplete(async (fileInfo) => {
      try {
        await this.updateLogo(fileInfo.cdnUrl);
      } catch (error) {
        showError('Error al actualizar el logo');
        console.error('Logo update error:', error);
      }
    });
  }

  initializeEventListeners() {
    // Save button
    const saveButton = document.getElementById('saveLogo');
    if (saveButton) {
      saveButton.addEventListener('click', () => this.saveLogo());
    }

    // Reset button
    const resetButton = document.getElementById('resetLogo');
    if (resetButton) {
      resetButton.addEventListener('click', () => this.resetLogo());
    }
  }

  async updateLogo(url) {
    try {
      showLoading();

      // Validate URL
      if (!url || typeof url !== 'string') {
        throw new Error('URL de logo inválida');
      }

      // Update storage
      localStorage.setItem('kioskeys_logo', url);
      this.logoUrl = url;

      // Update all logo elements
      document.querySelectorAll('[data-logo]').forEach(img => {
        img.src = url;
      });

      // Update preview
      const preview = document.getElementById('logoPreview');
      if (preview) {
        preview.src = url;
      }

      // Save to API
      await api.updateLogo({ url });

      showSuccess('Logo actualizado correctamente');
    } catch (error) {
      showError('Error al actualizar el logo');
      console.error('Logo update error:', error);
      throw error;
    } finally {
      hideLoading();
    }
  }

  async saveLogo() {
    try {
      const preview = document.getElementById('logoPreview');
      if (!preview || !preview.src) {
        throw new Error('No hay logo para guardar');
      }

      await this.updateLogo(preview.src);
    } catch (error) {
      showError(error.message);
    }
  }

  async resetLogo() {
    try {
      await this.updateLogo('/logo.svg');
      showSuccess('Logo restablecido correctamente');
    } catch (error) {
      showError('Error al restablecer el logo');
    }
  }

  getCurrentLogo() {
    return this.logoUrl;
  }
}

export const logoManager = new LogoManager();