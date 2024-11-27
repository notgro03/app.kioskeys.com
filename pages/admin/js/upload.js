import { UPLOADCARE_CONFIG, DEFAULT_LOGO, STORAGE_KEYS } from './config.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { showSuccess } from './ui.js';

export function initializeUploader(element, options = {}) {
  const widget = uploadcare.Widget(element, {
    ...UPLOADCARE_CONFIG,
    ...options
  });

  widget.onUploadComplete((fileInfo) => {
    if (options.onSuccess) {
      options.onSuccess(fileInfo);
    }
  });

  return widget;
}

export function saveLogo(url) {
  try {
    saveToStorage(STORAGE_KEYS.LOGO, url);
    
    // Update all logo elements
    document.querySelectorAll('[data-logo]').forEach(img => {
      img.src = url;
    });

    showSuccess('Logo actualizado correctamente');
    return true;
  } catch (error) {
    console.error('Error saving logo:', error);
    return false;
  }
}

export function loadLogo() {
  return getFromStorage(STORAGE_KEYS.LOGO) || DEFAULT_LOGO;
}