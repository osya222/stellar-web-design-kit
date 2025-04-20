
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

// Categories that are predefined and always available
const PREDEFINED_CATEGORIES = ['Лосось', 'Форель', 'Морепродукты'];

// Global variable to track if we've modified the products data
let hasModifiedData = false;

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
  
  hasModifiedData = true;
  console.log("Product saved:", product);
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  const index = defaultProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    defaultProducts.splice(index, 1);
    hasModifiedData = true;
    console.log("Product deleted:", productId);
  }
};

/**
 * Get all unique categories from products
 */
export const getAllCategories = (): string[] => {
  // Get categories from products
  const productCategories = [...new Set(defaultProducts.map(p => p.category))];
  
  // Combine with predefined categories and ensure uniqueness
  const allCategories = [...new Set([...PREDEFINED_CATEGORIES, ...productCategories])];
  
  return allCategories;
};

/**
 * Delete all products in a category
 */
export const deleteProductsByCategory = (category: string): void => {
  // Don't allow deletion of predefined categories
  if (PREDEFINED_CATEGORIES.includes(category)) {
    console.warn("Cannot delete products from predefined category:", category);
    return;
  }
  
  const initialLength = defaultProducts.length;
  
  // Remove all products in this category
  for (let i = defaultProducts.length - 1; i >= 0; i--) {
    if (defaultProducts[i].category === category) {
      defaultProducts.splice(i, 1);
    }
  }
  
  if (defaultProducts.length !== initialLength) {
    hasModifiedData = true;
    console.log(`Deleted products in category: ${category}`);
  }
};

/**
 * Check if data has been modified since app start
 */
export const hasDataBeenModified = (): boolean => {
  return hasModifiedData;
};
