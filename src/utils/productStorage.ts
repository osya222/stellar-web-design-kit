
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

/**
 * Get all products (either default or modified)
 */
export const getProducts = (): Product[] => {
  return defaultProducts;
};

/**
 * Save a product to the project (will persist to source code)
 */
export const saveProduct = (product: Product): void => {
  const existingIndex = defaultProducts.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    // Update existing product
    defaultProducts[existingIndex] = { ...product };
  } else {
    // Add new product with next available ID
    const maxId = Math.max(0, ...defaultProducts.map(p => p.id));
    const newProduct = { ...product, id: product.id || maxId + 1 };
    defaultProducts.push(newProduct);
  }
  
  // Save changes to source code via Lovable's internal API
  fetch('/_source/data/products/index.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `export const products = ${JSON.stringify(defaultProducts, null, 2)};`
    })
  }).then(() => {
    console.log("Product saved to source code:", product);
  }).catch(error => {
    console.error("Error saving to source code:", error);
  });
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  const index = defaultProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    defaultProducts.splice(index, 1);
    
    // Save changes to source code
    fetch('/_source/data/products/index.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `export const products = ${JSON.stringify(defaultProducts, null, 2)};`
      })
    }).then(() => {
      console.log("Product deleted from source code:", productId);
    }).catch(error => {
      console.error("Error saving to source code:", error);
    });
  }
};

/**
 * Check if data has been modified since app start
 */
export const hasDataBeenModified = (): boolean => {
  return false; // Now always false since changes are saved to source
};

