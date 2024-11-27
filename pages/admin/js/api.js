import { STORAGE_KEYS } from './config.js';
import { saveToStorage, getFromStorage, generateId, validateProduct } from '../utils.js';

export const ProductAPI = {
  // Obtener todos los productos
  getAll: () => {
    return getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
  },

  // Obtener producto por ID
  getById: (id) => {
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
    return products.find(p => p.id === id);
  },

  // Crear nuevo producto
  create: (productData) => {
    try {
      validateProduct(productData);
      const products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
      
      const newProduct = {
        id: generateId(),
        ...productData,
        createdAt: new Date().toISOString()
      };

      products.push(newProduct);
      
      if (saveToStorage(STORAGE_KEYS.PRODUCTS, products)) {
        return newProduct;
      }
      throw new Error('Error al guardar el producto');
    } catch (error) {
      throw error;
    }
  },

  // Actualizar producto
  update: (id, productData) => {
    try {
      validateProduct(productData);
      let products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }

      products[index] = {
        ...products[index],
        ...productData,
        updatedAt: new Date().toISOString()
      };

      if (saveToStorage(STORAGE_KEYS.PRODUCTS, products)) {
        return products[index];
      }
      throw new Error('Error al actualizar el producto');
    } catch (error) {
      throw error;
    }
  },

  // Eliminar producto
  delete: (id) => {
    try {
      let products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
      products = products.filter(p => p.id !== id);
      
      if (saveToStorage(STORAGE_KEYS.PRODUCTS, products)) {
        return true;
      }
      throw new Error('Error al eliminar el producto');
    } catch (error) {
      throw error;
    }
  }
};

export const ImageAPI = {
  // Guardar URL de imagen
  save: (imageUrl, type = 'product') => {
    try {
      const images = getFromStorage(STORAGE_KEYS.IMAGES) || {};
      if (!images[type]) images[type] = [];
      
      images[type].push({
        id: generateId(),
        url: imageUrl,
        createdAt: new Date().toISOString()
      });

      return saveToStorage(STORAGE_KEYS.IMAGES, images);
    } catch (error) {
      throw error;
    }
  },

  // Obtener imágenes por tipo
  getByType: (type = 'product') => {
    const images = getFromStorage(STORAGE_KEYS.IMAGES) || {};
    return images[type] || [];
  },

  // Eliminar imagen
  delete: (id, type = 'product') => {
    try {
      const images = getFromStorage(STORAGE_KEYS.IMAGES) || {};
      if (!images[type]) return false;
      
      images[type] = images[type].filter(img => img.id !== id);
      return saveToStorage(STORAGE_KEYS.IMAGES, images);
    } catch (error) {
      throw error;
    }
  }
};