import { initializeAdmin } from './init.js';
import { BrandsManager } from './managers/BrandsManager.js';
import { ProductManager } from './managers/ProductManager.js';
import { db } from './db.js';

// Initialize admin interface
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await db.open();
    initializeAdmin();
    
    // Initialize managers
    window.brandsManager = new BrandsManager();
    window.productManager = new ProductManager();

  } catch (error) {
    console.error('Error initializing admin panel:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al inicializar el panel de administración'
    });
  }
});