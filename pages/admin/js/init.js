import { stateManager } from './state.js';
import { brandsManager } from './brands-manager.js';
import { logoManager } from './logo-manager.js';
import { productsManager } from './products-manager.js';
import { initializeUploadcare } from './ui.js';

export function initializeAdmin() {
  // Initialize Uploadcare widgets
  document.querySelectorAll('[role=uploadcare-uploader]').forEach(element => {
    const widget = initializeUploadcare(element);
    
    if (element.id === 'logoUploader') {
      widget.onUploadComplete((fileInfo) => {
        logoManager.updateLogo(fileInfo.cdnUrl);
      });
    }
  });

  // Initialize brand management
  const brandForm = document.getElementById('brandForm');
  if (brandForm) {
    brandForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      brandsManager.addBrand({
        name: formData.get('brandName'),
        logo: formData.get('brandLogo'),
        type: formData.get('brandType')
      });
    });
  }

  // Initialize product management
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      productsManager.addProduct(formData.get('type'), {
        name: formData.get('name'),
        brand: formData.get('brand'),
        model: formData.get('model'),
        year: formData.get('year'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        image: formData.get('image')
      });
    });
  }

  // Apply initial state
  stateManager.applyCurrentState();

  // Render initial data
  renderBrands();
  renderProducts();
}

function renderBrands() {
  const brandsGrid = document.getElementById('brandsGrid');
  if (!brandsGrid) return;

  const brands = brandsManager.getAllBrands();
  brandsGrid.innerHTML = Object.entries(brands).map(([name, data]) => `
    <div class="brand-item">
      <img src="${data.logo}" alt="${name}" class="brand-logo">
      <div class="brand-name">${name}</div>
      <div class="brand-actions">
        <button onclick="editBrand('${name}')" class="btn btn-primary">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button onclick="deleteBrand('${name}')" class="btn btn-danger">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `).join('');
}

function renderProducts() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  const products = productsManager.getAllProducts();
  productsGrid.innerHTML = Object.entries(products).map(([type, items]) => `
    <div class="products-section">
      <h3>${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <div class="products-grid">
        ${items.map(product => `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
              <h4>${product.name}</h4>
              <p>${product.description}</p>
              <div class="product-price">$${product.price}</div>
            </div>
            <div class="product-actions">
              <button onclick="editProduct('${type}', '${product.id}')" class="btn btn-primary">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button onclick="deleteProduct('${type}', '${product.id}')" class="btn btn-danger">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}