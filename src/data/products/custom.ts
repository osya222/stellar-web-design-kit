
import { Product } from '@/types/product';

/**
 * This file is designed to load and handle custom products added via the admin interface.
 * It works alongside the default product imports to ensure all products are available.
 */

// Global variable to store custom products in memory
declare global {
  interface Window {
    customProducts: Product[];
  }
}

// Initialize the custom products array if it doesn't exist
if (typeof window !== 'undefined' && !window.customProducts) {
  window.customProducts = [];
  
  // Try to load custom products from localStorage during development
  try {
    const storedProducts = localStorage.getItem('custom_products_data');
    if (storedProducts) {
      window.customProducts = JSON.parse(storedProducts);
      console.log(`Loaded ${window.customProducts.length} custom products from localStorage`);
    }
  } catch (error) {
    console.error("Failed to load custom products from localStorage", error);
  }
}

// Helper function to save custom products to localStorage during development
const saveCustomProductsToLocalStorage = () => {
  if (typeof window === 'undefined' || !window.customProducts) return;
  
  try {
    localStorage.setItem('custom_products_data', JSON.stringify(window.customProducts));
    console.log(`Saved ${window.customProducts.length} custom products to localStorage`);
  } catch (error) {
    console.error("Failed to save custom products to localStorage", error);
  }
};

// Helper function to get custom products
export const getCustomProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  return window.customProducts || [];
};

// Helper function to add or update a custom product
export const saveCustomProduct = (product: Product): Product => {
  if (typeof window === 'undefined') {
    throw new Error("Cannot save product: window is undefined");
  }
  
  // Initialize the array if needed
  if (!window.customProducts) {
    window.customProducts = [];
  }
  
  // If it's a new product, assign an ID
  if (!product.id) {
    const maxId = Math.max(0, ...window.customProducts.map(p => p.id));
    product.id = maxId + 1;
  }
  
  // Find and replace existing product or add new one
  const index = window.customProducts.findIndex(p => p.id === product.id);
  if (index >= 0) {
    window.customProducts[index] = product;
  } else {
    window.customProducts.push(product);
  }
  
  // Save to localStorage for persistence during development
  saveCustomProductsToLocalStorage();
  
  return product;
};

// Helper function to delete a custom product
export const deleteCustomProduct = (productId: number): void => {
  if (typeof window === 'undefined' || !window.customProducts) return;
  
  window.customProducts = window.customProducts.filter(p => p.id !== productId);
  
  // Save the updated list to localStorage
  saveCustomProductsToLocalStorage();
};

// Export custom products for use in the application
export const customProducts = getCustomProducts();
