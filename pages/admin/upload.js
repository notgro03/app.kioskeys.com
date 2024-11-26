// Configuración de Uploadcare
const UPLOADCARE_PUBLIC_KEY = '1985ca48f4d597426e30';

// Inicializar widget de Uploadcare
export function initializeUploader(element, options = {}) {
  const defaultOptions = {
    publicKey: UPLOADCARE_PUBLIC_KEY,
    tabs: 'file url',
    previewStep: true,
    clearable: true,
    multiple: false,
    imagesOnly: true,
    ...options
  };

  const widget = uploadcare.Widget(element, defaultOptions);

  widget.onUploadComplete((fileInfo) => {
    if (options.onSuccess) {
      options.onSuccess(fileInfo);
    }
  });

  widget.onUploadFail((error) => {
    if (options.onError) {
      options.onError(error);
    }
    console.error('Error al cargar imagen:', error);
  });

  return widget;
}

// Función para mostrar vista previa de imagen
export function showImagePreview(imageUrl, previewElement) {
  if (!previewElement) return;
  
  const img = previewElement instanceof HTMLImageElement ? 
    previewElement : 
    previewElement.querySelector('img');

  if (img) {
    img.src = imageUrl;
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/200x200?text=Error+de+imagen';
    };
  }
}

// Función para guardar URL de imagen en localStorage
export function saveImageUrl(key, imageUrl) {
  try {
    let images = JSON.parse(localStorage.getItem(key) || '[]');
    images.push({
      url: imageUrl,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(images));
    return true;
  } catch (error) {
    console.error('Error al guardar imagen:', error);
    return false;
  }
}

// Función para obtener imágenes guardadas
export function getStoredImages(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return [];
  }
}

// Función para eliminar imagen
export function deleteStoredImage(key, imageUrl) {
  try {
    let images = JSON.parse(localStorage.getItem(key) || '[]');
    images = images.filter(img => img.url !== imageUrl);
    localStorage.setItem(key, JSON.stringify(images));
    return true;
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return false;
  }
}

// Función para validar imagen
export function validateImage(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Formato de imagen no válido. Use JPG, PNG o WebP.');
  }

  if (file.size > maxSize) {
    throw new Error('La imagen es demasiado grande. Máximo 5MB.');
  }

  return true;
}

// Función para crear widget de carga de imagen
export function createUploadWidget(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.setAttribute('role', 'uploadcare-uploader');
  container.appendChild(input);

  return initializeUploader(input, {
    ...options,
    onSuccess: (fileInfo) => {
      showImagePreview(fileInfo.cdnUrl, container.querySelector('.preview'));
      if (options.onSuccess) {
        options.onSuccess(fileInfo);
      }
    }
  });
}

// Función para inicializar todos los uploaders en la página
export function initializeAllUploaders() {
  document.querySelectorAll('[data-uploader]').forEach(element => {
    const options = {
      previewElement: element.querySelector('.preview'),
      storageKey: element.dataset.storageKey,
      ...JSON.parse(element.dataset.uploaderOptions || '{}')
    };

    createUploadWidget(element.id, options);
  });
}