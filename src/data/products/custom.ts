
import { Product } from "@/types/product";

// Local storage key for custom products
const CUSTOM_PRODUCTS_KEY = 'custom_products';

/**
 * Get custom products from localStorage
 */
export const getCustomProducts = (): Product[] => {
  try {
    const productsJson = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    if (!productsJson) return [];
    
    return JSON.parse(productsJson) as Product[];
  } catch (error) {
    console.error("Error getting custom products from localStorage:", error);
    return [];
  }
};

/**
 * Save a custom product to localStorage
 */
export const saveCustomProduct = (product: Product): void => {
  try {
    const products = getCustomProducts();
    
    // Check if the product already exists
    const existingIndex = products.findIndex(p => p.id === product.id);
    
    if (existingIndex >= 0) {
      // Update existing product
      products[existingIndex] = product;
    } else {
      // Add new product
      products.push(product);
    }
    
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving custom product to localStorage:", error);
    throw new Error("Failed to save product");
  }
};

/**
 * Delete a custom product from localStorage
 */
export const deleteCustomProduct = (productId: number): void => {
  try {
    const products = getCustomProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error("Error deleting custom product from localStorage:", error);
    throw new Error("Failed to delete product");
  }
};
