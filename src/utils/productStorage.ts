
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

/**
 * Get all products (either default or modified)
 */
export const getProducts = (): Product[] => {
  return defaultProducts;
};

/**
 * Save a product to the project (in-memory during development)
 */
export const saveProduct = (product: Product): void => {
  const existingIndex = defaultProducts.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    // Update existing product
    defaultProducts[existingIndex] = { ...product };
  } else {
    // Add new product with next available ID
    const maxId = Math.max(0, ...defaultProducts.map(p => p.id));
    const newProduct = { ...product, id: product.id || maxId + 1 };
    defaultProducts.push(newProduct);
  }
  
  console.log("Product saved:", product);
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  const index = defaultProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    defaultProducts.splice(index, 1);
    console.log("Product deleted:", productId);
  }
};

/**
 * Check if data has been modified since app start
 */
export const hasDataBeenModified = (): boolean => {
  return false; // Теперь это просто заглушка
};
