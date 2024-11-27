import { initializeUploader } from './upload.js';
import { stateManager } from './state.js';
import { UPLOADCARE_CONFIG } from './config.js';

export function initializeAdmin() {
  // Set Uploadcare public key
  window.UPLOADCARE_PUBLIC_KEY = UPLOADCARE_CONFIG.publicKey;

  // Initialize theme
  const { theme } = stateManager.getState();
  stateManager.applyTheme(theme);

  // Initialize logo
  const { logo } = stateManager.getState();
  stateManager.applyLogo(logo);

  // Initialize logo uploader
  initializeUploader('#logoUploader', {
    crop: '1:1',
    onSuccess: (fileInfo) => {
      stateManager.updateLogo(fileInfo.cdnUrl);
    }
  });

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

  // Subscribe to state changes
  stateManager.subscribe((state) => {
    // Update UI when state changes
    if (primaryColor) primaryColor.value = state.theme.primaryColor;
    if (secondaryColor) secondaryColor.value = state.theme.secondaryColor;
    
    // Update products list
    const productsList = document.getElementById('productsList');
    if (productsList) {
      renderProducts(state.products);
    }

    // Update brands list
    const brandsList = document.getElementById('brandsList');
    if (brandsList) {
      renderBrands(state.brands);
    }
  });

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
}

function renderProducts(products) {
  const productsList = document.getElementById('productsList');
  if (!productsList) return;

  productsList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.brand} ${product.model}" class="product-image">
      <div class="product-content">
        <h3>${product.brand} ${product.model} ${product.year}</h3>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
      </div>
      <div class="product-actions">
        <button class="btn btn-primary" onclick="editProduct('${product.id}')">Editar</button>
        <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button>
      </div>
    </div>
  `).join('');
}

function renderBrands(brands) {
  const brandsList = document.getElementById('brandsList');
  if (!brandsList) return;

  brandsList.innerHTML = Object.entries(brands).map(([name, data]) => `
    <div class="brand-card">
      <img src="${data.logo}" alt="${name}" class="brand-logo">
      <div class="brand-content">
        <h3>${name}</h3>
        <p>${Object.keys(data.models).length} modelos</p>
      </div>
      <div class="brand-actions">
        <button class="btn btn-primary" onclick="editBrand('${name}')">Editar</button>
        <button class="btn btn-danger" onclick="deleteBrand('${name}')">Eliminar</button>
      </div>
    </div>
  `).join('');
}