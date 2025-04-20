
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

/**
 * Get all products
 */
export const getProducts = (): Product[] => {
  return [...defaultProducts];
};

/**
 * Save a product to the project
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
  updateProductsFile();
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  const index = defaultProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    defaultProducts.splice(index, 1);
    
    // Save changes to source code
    updateProductsFile();
  }
};

/**
 * Update products file
 */
const updateProductsFile = () => {
  fetch('/_source/data/products/index.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `import { Category } from "../categories";\n\nexport interface Product {\n  id: number;\n  name: string;\n  price: number;\n  categoryId: number;\n  description?: string;\n  manufacturer: string;\n  image?: string;\n}\n\nexport const products: Product[] = ${JSON.stringify(defaultProducts, null, 2)};`
    })
  }).then(() => {
    console.log("Products data updated in source code");
  }).catch(error => {
    console.error("Error saving to source code:", error);
  });
};
