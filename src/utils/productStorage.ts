
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

// Constants
const CUSTOM_PRODUCTS_KEY = 'custom_products';
const CUSTOM_PRODUCTS_PREFIX = 'custom_product_';

/**
 * Get all products from storage (both default and custom)
 */
export const getProductsFromStorage = (): Product[] => {
  try {
    // Get custom products from storage
    const customProductsString = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    const customProductIds = customProductsString 
      ? JSON.parse(customProductsString) as number[] 
      : [];
    
    // Load all custom products
    const customProducts: Product[] = [];
    for (const id of customProductIds) {
      const productString = localStorage.getItem(`${CUSTOM_PRODUCTS_PREFIX}${id}`);
      if (productString) {
        try {
          const product = JSON.parse(productString) as Product;
          customProducts.push(product);
        } catch (error) {
          console.error(`Error parsing custom product ${id}:`, error);
        }
      }
    }
    
    // Combine default and custom products
    return [...defaultProducts, ...customProducts];
  } catch (error) {
    console.error("Error loading products from storage:", error);
    return [...defaultProducts];
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
    // Get existing custom product IDs
    const customProductsString = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    const customProductIds = customProductsString 
      ? JSON.parse(customProductsString) as number[] 
      : [];
    
    // Add this product ID if it's not already in the list
    if (!customProductIds.includes(product.id)) {
      customProductIds.push(product.id);
      // Save updated list of custom product IDs
      localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProductIds));
    }
    
    // Save the product data
    localStorage.setItem(
      `${CUSTOM_PRODUCTS_PREFIX}${product.id}`, 
      JSON.stringify(product)
    );
    
    console.log(`Product ${product.id} saved successfully`);
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
    // Get existing custom product IDs
    const customProductsString = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    const customProductIds = customProductsString 
      ? JSON.parse(customProductsString) as number[] 
      : [];
    
    // Remove this product ID from the list
    const updatedIds = customProductIds.filter(id => id !== productId);
    
    // Save updated list of custom product IDs
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedIds));
    
    // Remove the product data
    localStorage.removeItem(`${CUSTOM_PRODUCTS_PREFIX}${productId}`);
    
    console.log(`Product ${productId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : String(error)}`);
  }
};
