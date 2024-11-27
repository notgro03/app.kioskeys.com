import { STORAGE_KEYS } from './config.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { CAR_BRANDS } from './models.js';

export function updateBrandLogo(brand, logoUrl) {
  try {
    const brands = getFromStorage(STORAGE_KEYS.BRANDS) || CAR_BRANDS;
    if (brands[brand]) {
      brands[brand].logo = logoUrl;
      saveToStorage(STORAGE_KEYS.BRANDS, brands);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating brand logo:', error);
    return false;
  }
}

export function getBrandLogo(brand) {
  const brands = getFromStorage(STORAGE_KEYS.BRANDS) || CAR_BRANDS;
  return brands[brand]?.logo;
}

export function getAllBrands() {
  return getFromStorage(STORAGE_KEYS.BRANDS) || CAR_BRANDS;
}

export function getBrandModels(brand) {
  const brands = getFromStorage(STORAGE_KEYS.BRANDS) || CAR_BRANDS;
  return brands[brand]?.models || {};
}

export function getModelYears(brand, model) {
  const brands = getFromStorage(STORAGE_KEYS.BRANDS) || CAR_BRANDS;
  return brands[brand]?.models[model] || [];
}