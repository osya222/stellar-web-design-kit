
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';
import { getCustomProducts, saveCustomProduct, deleteCustomProduct } from '@/data/products/custom';

// Local storage key for custom products
const CUSTOM_PRODUCTS_KEY = 'custom_products';

/**
 * Get all products from storage (both default and custom)
 */
export const getProductsFromStorage = (): Product[] => {
  try {
    // Get custom products
    const customProducts = getCustomProducts();
    
    // Combine default and custom products
    return [...defaultProducts, ...customProducts];
  } catch (error) {
    console.error("Error loading products from storage:", error);
    return defaultProducts; // Return at least default products if there's an error
  }
};

/**
 * Save a product to the project
 */
export const saveProductToProject = async (
  product: Product
): Promise<void> => {
  try {
    // Get existing custom products
    let customProducts: Product[] = [];
    try {
      const storedProducts = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
      customProducts = storedProducts ? JSON.parse(storedProducts) : [];
      
      // Ensure customProducts is an array
      if (!Array.isArray(customProducts)) {
        customProducts = [];
      }
    } catch (e) {
      console.error("Error parsing stored products:", e);
      customProducts = [];
    }
    
    // Ensure product has a valid ID
    const newProduct = { ...product };
    
    // Check if product already exists (for updates)
    const existingIndex = customProducts.findIndex(p => p.id === newProduct.id);
    
    if (existingIndex >= 0) {
      // Update existing product
      customProducts[existingIndex] = newProduct;
    } else {
      // Add new product with next available ID
      const maxId = Math.max(0, ...defaultProducts.map(p => p.id), ...customProducts.map(p => p.id));
      newProduct.id = newProduct.id || maxId + 1;
      customProducts.push(newProduct);
    }
    
    // Save updated products to local storage
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
    
    console.log("Product saved successfully:", newProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    throw new Error(`Failed to save product: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Delete a product from storage
 */
export const deleteProductFromStorage = async (productId: number): Promise<void> => {
  try {
    // Check if product is in default products
    const isDefaultProduct = defaultProducts.some(p => p.id === productId);
    
    if (isDefaultProduct) {
      throw new Error("Cannot delete default products");
    }
    
    // Get existing custom products
    const customProducts = JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY) || '[]') as Product[];
    
    // Filter out the product to delete
    const updatedProducts = customProducts.filter(p => p.id !== productId);
    
    // Save updated products to local storage
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedProducts));
    
    console.log("Product deleted successfully:", productId);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Delete all products in a specific category
 */
export const deleteProductsByCategory = async (category: string): Promise<void> => {
  try {
    const customProducts = getCustomProducts();
    
    // Filter out all products in the category
    const updatedProducts = customProducts.filter(p => p.category !== category);
    
    // Save the filtered products back to storage
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedProducts));
    
    console.log("Products in category deleted successfully:", category);
  } catch (error) {
    console.error("Error deleting products by category:", error);
    throw new Error(`Failed to delete products in category: ${error instanceof Error ? error.message : String(error)}`);
  }
};
