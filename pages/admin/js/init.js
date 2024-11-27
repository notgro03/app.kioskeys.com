import { initializeUploader } from './upload.js';
import { loadLogo, saveLogo } from './logo.js';
import { getTheme, applyTheme } from './theme.js';
import { initializeBrands } from './brands.js';
import { initializeProducts } from './products.js';
import { UPLOADCARE_CONFIG } from './config.js';

export function initializeAdmin() {
  // Set Uploadcare public key
  window.UPLOADCARE_PUBLIC_KEY = UPLOADCARE_CONFIG.publicKey;

  // Initialize logo
  const savedLogo = loadLogo();
  if (savedLogo) {
    document.querySelectorAll('[data-logo]').forEach(img => {
      img.src = savedLogo;
    });
  }

  // Initialize logo uploader
  initializeUploader('#logoUploader', {
    crop: '1:1',
    onSuccess: (fileInfo) => {
      saveLogo(fileInfo.cdnUrl);
    }
  });

  // Initialize theme
  const theme = getTheme();
  applyTheme(theme);

  // Initialize color pickers
  const primaryColor = document.getElementById('primaryColor');
  const secondaryColor = document.getElementById('secondaryColor');
  
  if (primaryColor && secondaryColor) {
    primaryColor.value = theme.primaryColor;
    secondaryColor.value = theme.secondaryColor;
    
    function updateColorPreviews() {
      document.getElementById('primaryPreview').style.backgroundColor = primaryColor.value;
      document.getElementById('secondaryPreview').style.backgroundColor = secondaryColor.value;
    }
    
    primaryColor.addEventListener('input', updateColorPreviews);
    secondaryColor.addEventListener('input', updateColorPreviews);
    updateColorPreviews();
  }

  // Initialize tabs
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const tabName = button.dataset.tab;
      document.querySelectorAll('[data-section]').forEach(section => {
        section.style.display = section.dataset.section === tabName ? 'block' : 'none';
      });
    });
  });

  // Initialize other modules
  initializeBrands();
  initializeProducts();
}