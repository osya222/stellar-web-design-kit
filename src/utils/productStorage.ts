
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

// Local storage key for custom products
const CUSTOM_PRODUCTS_KEY = 'custom_products';

/**
 * Get all products from storage (both default and custom)
 */
export const getProductsFromStorage = (): Product[] => {
  try {
    // Get custom products
    const customProducts = getCustomProducts();
    
    // Combine default and custom products, ensuring no duplicates
    const allProducts = [...defaultProducts];
    
    customProducts.forEach(custom => {
      // Check if product already exists in default products
      const exists = allProducts.some(p => p.id === custom.id);
      if (!exists) {
        allProducts.push(custom);
      }
    });
    
    return allProducts;
  } catch (error) {
    console.error("Error loading products from storage:", error);
    return defaultProducts; // Return at least default products if there's an error
  }
};

/**
 * Get only custom products from localStorage
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
 * Save a product to the project
 */
export const saveProductToProject = async (
  product: Product
): Promise<void> => {
  try {
    // Get existing custom products
    let customProducts = getCustomProducts();
    
    // Create a new product object with all required fields
    const newProduct = { 
      ...product,
      // Ensure required fields are present
      name: product.name || 'Без названия',
      price: product.price || 0,
      category: product.category || 'Без категории',
    };
    
    // Check if product already exists (for updates)
    const existingIndex = customProducts.findIndex(p => p.id === newProduct.id);
    
    if (existingIndex >= 0) {
      // Update existing product
      customProducts[existingIndex] = newProduct;
    } else {
      // Add new product with next available ID
      const allProducts = getProductsFromStorage();
      const maxId = Math.max(0, ...allProducts.map(p => p.id));
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
    const customProducts = getCustomProducts();
    
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
    // Only delete from custom products
    const customProducts = getCustomProducts();
    
    // Filter out all products in the category
    const updatedProducts = customProducts.filter(p => p.category !== category);
    
    // Save the filtered products back to storage
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updatedProducts));
    
    console.log("Custom products in category deleted successfully:", category);
  } catch (error) {
    console.error("Error deleting products by category:", error);
    throw new Error(`Failed to delete products in category: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Get all unique categories from all products
 */
export const getAllCategories = (): string[] => {
  try {
    const allProducts = getProductsFromStorage();
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    return uniqueCategories;
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};
