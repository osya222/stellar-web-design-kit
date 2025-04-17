
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';
import { getCustomProducts, saveCustomProduct, deleteCustomProduct } from '@/data/products/custom';

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
    // Save the product using the custom products module
    saveCustomProduct(product);
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
    // Delete the product using the custom products module
    deleteCustomProduct(productId);
    console.log(`Product ${productId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : String(error)}`);
  }
};
