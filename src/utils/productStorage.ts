
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

/**
 * Get all products
 */
export const getProductsFromStorage = (): Product[] => {
  return defaultProducts;
};

/**
 * Save a product to the project
 * Since we're not using localStorage anymore, this just adds or updates
 * a product in the defaultProducts array in memory.
 */
export const saveProductToProject = async (product: Product): Promise<void> => {
  // Check if product already exists
  const existingIndex = defaultProducts.findIndex(p => p.id === product.id);
  
  // Create a new product object with all required fields
  const newProduct = { 
    ...product,
    // Ensure required fields are present
    name: product.name || 'Без названия',
    price: product.price || 0,
    category: product.category || 'Без категории',
  };
  
  if (existingIndex >= 0) {
    // Update existing product
    defaultProducts[existingIndex] = newProduct;
  } else {
    // Add new product with next available ID
    const maxId = Math.max(0, ...defaultProducts.map(p => p.id));
    newProduct.id = newProduct.id || maxId + 1;
    defaultProducts.push(newProduct);
  }
  
  console.log("Product saved in memory:", newProduct);
};

/**
 * Delete a product
 */
export const deleteProductFromStorage = async (productId: number): Promise<void> => {
  const index = defaultProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    defaultProducts.splice(index, 1);
    console.log("Product deleted:", productId);
  }
};

/**
 * Delete all products in a specific category
 */
export const deleteProductsByCategory = async (category: string): Promise<void> => {
  // Find all indices to remove
  const indicestoRemove = [];
  for (let i = 0; i < defaultProducts.length; i++) {
    if (defaultProducts[i].category === category) {
      indicestoRemove.push(i);
    }
  }
  
  // Remove from highest index to lowest to avoid changing indices
  for (let i = indicestoRemove.length - 1; i >= 0; i--) {
    defaultProducts.splice(indicestoRemove[i], 1);
  }
  
  console.log("Products in category deleted:", category);
};

/**
 * Get all unique categories from all products
 */
export const getAllCategories = (): string[] => {
  const uniqueCategories = [...new Set(defaultProducts.map(p => p.category))];
  return uniqueCategories;
};
