import { http, isBackend } from '../lib/api';
import * as local from '../utils/productStorage';

export const productService = {

  /** GET /products  → { [categoria]: [...productos] } */
  getProducts: async () => {
    if (isBackend()) {
      const { products } = await http.get('/products');
      return products;
    }
    return local.getProducts();
  },

  /** POST /products  → productos actualizados */
  addProduct: async (category, product) => {
    if (isBackend()) {
      const { products } = await http.post('/products', { category, product });
      return products;
    }
    return local.addProduct(category, product);
  },

  /** PATCH /products/:id  → productos actualizados */
  updateProduct: async (category, productId, updates) => {
    if (isBackend()) {
      const { products } = await http.patch(`/products/${productId}`, { category, updates });
      return products;
    }
    return local.updateProduct(category, productId, updates);
  },

  /** DELETE /products/:id?category=X  → productos actualizados */
  deleteProduct: async (category, productId) => {
    if (isBackend()) {
      const { products } = await http.delete(`/products/${productId}?category=${encodeURIComponent(category)}`);
      return products;
    }
    return local.deleteProduct(category, productId);
  },

  /** POST /products/categories  → productos actualizados */
  addCategory: async (categoryName) => {
    if (isBackend()) {
      const { products } = await http.post('/products/categories', { categoryName });
      return products;
    }
    return local.addCategory(categoryName);
  },

  /** POST /products/reset  → productos por defecto */
  resetToDefaults: async () => {
    if (isBackend()) {
      const { products } = await http.post('/products/reset');
      return products;
    }
    return local.resetToDefaults();
  },
};
