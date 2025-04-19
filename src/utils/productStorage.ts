
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
    return [];
  }
};

/**
 * Save a product to the project
 */
export const saveProductToProject = async (
  product: Product, 
  allProducts?: Product[]
): Promise<void> => {
  try {
    // Get existing custom products
    const customProducts = JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY) || '[]') as Product[];
    
    // Check if product already exists (for updates)
    const existingIndex = customProducts.findIndex(p => p.id === product.id);
    
    if (existingIndex >= 0) {
      // Update existing product
      customProducts[existingIndex] = product;
    } else {
      // Add new product with next available ID
      customProducts.push({
        ...product,
        id: product.id || Math.max(0, ...customProducts.map(p => p.id)) + 1
      });
    }
    
    // Save updated products to local storage
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
    
    console.log("Product saved successfully:", product);
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
