import { STORAGE_KEYS } from './config.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { v4 as uuidv4 } from 'uuid';

export function addProduct(productData) {
  try {
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
    const newProduct = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
}

export function updateProduct(id, productData) {
  try {
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };
    
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export function deleteProduct(id) {
  try {
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
    const newProducts = products.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PRODUCTS, newProducts);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export function getAllProducts() {
  return getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
}

export function getProductById(id) {
  const products = getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
  return products.find(p => p.id === id);
}