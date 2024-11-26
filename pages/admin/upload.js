import {1985ca48f4d597426e30} from './config.js';
import { compressImage, validateImage } from './utils.js';
import { ImageAPI } from './api.js';

export const initializeUploader = (selector, options = {}) => {
  const widget = uploadcare.Widget(selector, {
    publicKey: UPLOADCARE_PUBLIC_KEY,
    imagesOnly: true,
    previewStep: true,
    crop: options.crop || '',
    imageShrink: '1920x1080',
    ...options
  });

  widget.onUploadComplete(async (info) => {
    try {
      // Guardar URL en el sistema
      await ImageAPI.save(info.cdnUrl, options.type || 'product');
      
      // Callback personalizado
      if (options.onComplete) {
        options.onComplete(info);
      }
    } catch (error) {
      console.error('Error en carga de imagen:', error);
      if (options.onError) {
        options.onError(error);
      }
    }
  });

  return widget;
};

export const handleImageUpload = async (file, options = {}) => {
  try {
    // Validar imagen
    validateImage(file);

    // Comprimir imagen
    const compressedFile = await compressImage(file);

    // Crear FormData para la carga
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUBLIC_KEY);

    // Subir a Uploadcare
    const response = await fetch('https://upload.uploadcare.com/base/', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }

    const data = await response.json();
    
    // Guardar URL en el sistema
    await ImageAPI.save(data.file, options.type || 'product');

    return data.file;
  } catch (error) {
    console.error('Error en carga de imagen:', error);
    throw error;
  }
};