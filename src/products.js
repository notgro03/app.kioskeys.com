import { api } from './api';
import { showSuccess, showError, showConfirm, showLoading, hideLoading } from './ui';

class ProductManager {
  constructor() {
    this.products = [];
    this.initializeEventListeners();
    this.loadProducts();
  }

  initializeEventListeners() {
    // Product form
    const form = document.getElementById('productForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleProductSubmit(e);
      });
    }

    // Product filters
    const filters = document.querySelectorAll('[data-product-filter]');
    filters.forEach(filter => {
      filter.addEventListener('change', () => this.loadProducts());
    });
  }

  async loadProducts() {
    try {
      showLoading();
      const filters = this.getFilters();
      this.products = await api.getProducts(filters);
      this.renderProducts();
    } catch (error) {
      showError('Error al cargar productos');
      console.error('Error loading products:', error);
    } finally {
      hideLoading();
    }
  }

  getFilters() {
    const filters = {};
    document.querySelectorAll('[data-product-filter]').forEach(filter => {
      if (filter.value) {
        filters[filter.dataset.productFilter] = filter.value;
      }
    });
    return filters;
  }

  renderProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;

    container.innerHTML = this.products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-content">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-price">$${product.price}</div>
        </div>
        <div class="product-actions">
          <button onclick="productManager.editProduct('${product.id}')" class="btn btn-primary">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button onclick="productManager.deleteProduct('${product.id}')" class="btn btn-danger">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    `).join('');
  }

  async handleProductSubmit(e) {
    try {
      showLoading();
      const formData = new FormData(e.target);
      const productData = Object.fromEntries(formData.entries());
      
      if (productData.id) {
        await api.updateProduct(productData.id, productData);
        showSuccess('Producto actualizado correctamente');
      } else {
        await api.createProduct(productData);
        showSuccess('Producto creado correctamente');
      }

      e.target.reset();
      this.loadProducts();
    } catch (error) {
      showError('Error al guardar el producto');
      console.error('Error saving product:', error);
    } finally {
      hideLoading();
    }
  }

  async deleteProduct(id) {
    if (await showConfirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        showLoading();
        await api.deleteProduct(id);
        showSuccess('Producto eliminado correctamente');
        this.loadProducts();
      } catch (error) {
        showError('Error al eliminar el producto');
        console.error('Error deleting product:', error);
      } finally {
        hideLoading();
      }
    }
  }

  editProduct(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    const form = document.getElementById('productForm');
    if (!form) return;

    // Fill form fields
    Object.entries(product).forEach(([key, value]) => {
      const input = form.elements[key];
      if (input) {
        input.value = value;
      }
    });

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

export const productManager = new ProductManager();