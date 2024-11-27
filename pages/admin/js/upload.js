import { UPLOADCARE_PUBLIC_KEY } from './config.js';

export function initializeUploader(element, options = {}) {
  const widget = uploadcare.Widget(element, {
    publicKey: UPLOADCARE_PUBLIC_KEY,
    imagesOnly: true,
    previewStep: true,
    crop: options.crop || '16:9',
    ...options
  });

  widget.onUploadComplete((fileInfo) => {
    if (options.onSuccess) {
      options.onSuccess(fileInfo);
    }
  });

  widget.onUploadFail((error) => {
    console.error('Upload failed:', error);
    if (options.onError) {
      options.onError(error);
    }
  });

  return widget;
}

export function createImagePreview(url, container) {
  const img = document.createElement('img');
  img.src = url;
  img.className = 'preview-image';
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  img.style.borderRadius = '8px';
  img.style.marginTop = '16px';
  
  container.innerHTML = '';
  container.appendChild(img);
}