
import { Product } from '@/types/product';

/**
 * This file is designed to load and handle custom products added via the admin interface.
 * It works alongside the default product imports to ensure all products are available.
 */

// Helper function to load custom products from localStorage
export const getCustomProducts = (): Product[] => {
  try {
    // Check for custom products
    const customProductsKey = localStorage.getItem('custom_products');
    if (!customProductsKey) {
      return [];
    }
    
    // Parse custom product IDs
    const customProductIds = JSON.parse(customProductsKey) as number[];
    if (!customProductIds.length) {
      return [];
    }
    
    // Load each custom product
    const customProducts: Product[] = [];
    for (const id of customProductIds) {
      const productData = localStorage.getItem(`custom_product_${id}`);
      if (productData) {
        try {
          const product = JSON.parse(productData) as Product;
          customProducts.push(product);
        } catch (error) {
          console.error(`Error parsing custom product ${id}:`, error);
        }
      }
    }
    
    return customProducts;
  } catch (error) {
    console.error("Error loading custom products:", error);
    return [];
  }
};

// Export custom products for use in the application
export const customProducts = getCustomProducts();
