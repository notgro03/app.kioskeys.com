import { STORAGE_KEYS, DEFAULT_THEME, DEFAULT_LOGO } from './config.js';

class StateManager {
  constructor() {
    this.subscribers = new Set();
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    return {
      theme: JSON.parse(localStorage.getItem(STORAGE_KEYS.THEME)) || DEFAULT_THEME,
      logo: localStorage.getItem(STORAGE_KEYS.LOGO) || DEFAULT_LOGO,
      products: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [],
      brands: JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANDS)) || {}
    };
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  updateState(key, value) {
    this.state[key] = value;
    localStorage.setItem(STORAGE_KEYS[key.toUpperCase()], JSON.stringify(value));
    this.notify();
  }

  getState() {
    return this.state;
  }

  // Theme methods
  updateTheme(theme) {
    this.updateState('theme', theme);
    this.applyTheme(theme);
  }

  applyTheme(theme) {
    document.documentElement.style.setProperty('--primary-blue', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-blue', theme.secondaryColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
  }

  // Logo methods
  updateLogo(logoUrl) {
    this.updateState('logo', logoUrl);
    this.applyLogo(logoUrl);
  }

  applyLogo(logoUrl) {
    document.querySelectorAll('[data-logo]').forEach(img => {
      img.src = logoUrl;
    });
  }

  // Products methods
  addProduct(product) {
    const products = [...this.state.products, product];
    this.updateState('products', products);
  }

  updateProduct(id, updatedProduct) {
    const products = this.state.products.map(p => 
      p.id === id ? { ...p, ...updatedProduct } : p
    );
    this.updateState('products', products);
  }

  deleteProduct(id) {
    const products = this.state.products.filter(p => p.id !== id);
    this.updateState('products', products);
  }

  // Brands methods
  addBrand(brand, data) {
    const brands = { ...this.state.brands, [brand]: data };
    this.updateState('brands', brands);
  }

  updateBrand(brand, data) {
    const brands = { 
      ...this.state.brands,
      [brand]: { ...this.state.brands[brand], ...data }
    };
    this.updateState('brands', brands);
  }

  deleteBrand(brand) {
    const brands = { ...this.state.brands };
    delete brands[brand];
    this.updateState('brands', brands);
  }
}

export const stateManager = new StateManager();