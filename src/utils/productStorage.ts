
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

// Constants
const CUSTOM_PRODUCTS_KEY = 'custom_products';
const CUSTOM_PRODUCTS_PREFIX = 'custom_product_';

// Storage types
type StorageType = 'localStorage' | 'projectStorage';

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
          console.error(`Error parsing product ${id}:`, error);
        }
      }
    }
    
    // Combine default and custom products
    const allProducts = [...defaultProducts, ...customProducts];
    
    // Make sure there are no duplicate IDs
    const uniqueProducts = allProducts.reduce((acc, product) => {
      // If a product with this ID already exists in the accumulator,
      // prefer the custom product over the default one
      const existingProductIndex = acc.findIndex(p => p.id === product.id);
      if (existingProductIndex !== -1) {
        // Check if this is a custom product (should replace default)
        if (customProductIds.includes(product.id)) {
          acc[existingProductIndex] = product;
        }
      } else {
        acc.push(product);
      }
      return acc;
    }, [] as Product[]);
    
    return uniqueProducts;
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
    
    // If we have all products, update the data structure with the latest products
    if (allProducts) {
      // Here, we would typically update the products.ts file or a JSON file
      // In this example, we're saving to localStorage as a fallback
      localStorage.setItem('all_products', JSON.stringify(allProducts));
    }
    
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
