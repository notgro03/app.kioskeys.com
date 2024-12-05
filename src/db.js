import Dexie from 'dexie';

export const db = new Dexie('kioskeysDB');

db.version(1).stores({
  brands: '++id, name, type, logo',
  products: '++id, name, brandId, category, price, description, image',
  categories: '++id, name, description',
  settings: 'key, value'
});

// Helper functions for brands
export const brandsAPI = {
  async getAll() {
    return await db.brands.toArray();
  },

  async add(brand) {
    return await db.brands.add(brand);
  },

  async update(id, brand) {
    return await db.brands.update(id, brand);
  },

  async delete(id) {
    return await db.brands.delete(id);
  }
};

// Helper functions for products
export const productsAPI = {
  async getAll() {
    return await db.products.toArray();
  },

  async getByBrand(brandId) {
    return await db.products.where('brandId').equals(brandId).toArray();
  },

  async add(product) {
    return await db.products.add(product);
  },

  async update(id, product) {
    return await db.products.update(id, product);
  },

  async delete(id) {
    return await db.products.delete(id);
  }
};