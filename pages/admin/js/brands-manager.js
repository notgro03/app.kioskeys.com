import { STORAGE_KEYS } from './config.js';
import { stateManager } from './state.js';
import { showSuccess, showError } from './ui.js';

class BrandsManager {
  constructor() {
    this.brands = this.loadBrands();
  }

  loadBrands() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANDS)) || {};
  }

  saveBrands() {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(this.brands));
    stateManager.updateState('brands', this.brands);
  }

  addBrand(brandData) {
    try {
      const { name, logo, type = 'car' } = brandData;
      
      if (!name || !logo) {
        throw new Error('Nombre y logo son requeridos');
      }

      this.brands[name] = {
        logo,
        type,
        models: {},
        createdAt: new Date().toISOString()
      };

      this.saveBrands();
      showSuccess('Marca agregada correctamente');
      return true;
    } catch (error) {
      showError('Error al agregar la marca');
      console.error('Error adding brand:', error);
      return false;
    }
  }

  updateBrand(name, updates) {
    try {
      if (!this.brands[name]) {
        throw new Error('Marca no encontrada');
      }

      this.brands[name] = {
        ...this.brands[name],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      this.saveBrands();
      showSuccess('Marca actualizada correctamente');
      return true;
    } catch (error) {
      showError('Error al actualizar la marca');
      console.error('Error updating brand:', error);
      return false;
    }
  }

  deleteBrand(name) {
    try {
      if (!this.brands[name]) {
        throw new Error('Marca no encontrada');
      }

      delete this.brands[name];
      this.saveBrands();
      showSuccess('Marca eliminada correctamente');
      return true;
    } catch (error) {
      showError('Error al eliminar la marca');
      console.error('Error deleting brand:', error);
      return false;
    }
  }

  addModel(brandName, modelData) {
    try {
      const { name, years } = modelData;
      
      if (!this.brands[brandName]) {
        throw new Error('Marca no encontrada');
      }

      this.brands[brandName].models[name] = years;
      this.saveBrands();
      showSuccess('Modelo agregado correctamente');
      return true;
    } catch (error) {
      showError('Error al agregar el modelo');
      console.error('Error adding model:', error);
      return false;
    }
  }

  getAllBrands() {
    return this.brands;
  }

  getBrand(name) {
    return this.brands[name];
  }

  getModels(brandName) {
    return this.brands[brandName]?.models || {};
  }
}

export const brandsManager = new BrandsManager();