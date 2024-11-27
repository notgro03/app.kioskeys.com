import { logoManager } from './logo-manager.js';
import { brandsManager } from './brands-manager.js';
import { productsManager } from './products-manager.js';
import { plansManager } from './plans-manager.js';

export function initializeAdmin() {
  // Initialize logo management
  document.addEventListener('DOMContentLoaded', () => {
    // Apply current logo
    const currentLogo = logoManager.getCurrentLogo();
    document.querySelectorAll('[data-logo]').forEach(img => {
      img.src = currentLogo;
    });

    // Initialize forms
    initializeForms();
  });
}

function initializeForms() {
  // Brand form
  const brandForm = document.getElementById('brandForm');
  if (brandForm) {
    brandForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(brandForm);
      brandsManager.addBrand({
        name: formData.get('brandName'),
        logo: formData.get('brandLogo'),
        type: formData.get('brandType')
      });
    });
  }

  // Product form
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(productForm);
      productsManager.addProduct({
        type: formData.get('productType'),
        name: formData.get('productName'),
        description: formData.get('productDescription'),
        price: parseFloat(formData.get('productPrice')),
        image: formData.get('productImage'),
        brand: formData.get('productBrand'),
        model: formData.get('productModel'),
        year: formData.get('productYear')
      });
    });
  }
}

// Initialize admin panel
initializeAdmin();