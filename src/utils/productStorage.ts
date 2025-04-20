
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/products';

/**
 * Get all products
 */
export const getProducts = (): Product[] => {
  return [...initialProducts];
};

/**
 * Save a product to the project
 */
export const saveProduct = (product: Product): Product => {
  const products = [...initialProducts];
  
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  let savedProduct: Product;
  
  if (existingIndex >= 0) {
    // Update existing product
    products[existingIndex] = { ...product };
    savedProduct = products[existingIndex];
    console.log('Updated existing product:', product.id);
  } else {
    // Add new product with next available ID
    const maxId = Math.max(0, ...products.map(p => p.id));
    savedProduct = { ...product, id: maxId + 1 };
    products.push(savedProduct);
    console.log('Added new product with ID:', savedProduct.id);
  }
  
  // Update source products array
  updateProductsInSource(products);
  
  return savedProduct;
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  const products = [...initialProducts];
  
  const index = products.findIndex(p => p.id === productId);
  if (index >= 0) {
    products.splice(index, 1);
    console.log('Deleted product with ID:', productId);
    
    // Update source products array
    updateProductsInSource(products);
  }
};

/**
 * Update products in source code
 */
const updateProductsInSource = (products: Product[]) => {
  try {
    // Clear original array
    while (initialProducts.length > 0) {
      initialProducts.pop();
    }
    
    // Add updated products
    products.forEach(p => initialProducts.push({...p}));
    
    // Create content for products.ts file
    const content = `import { Product } from "@/types/product";\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};`;
    
    console.log('Saving product data to source code');
    
    // Use Lovable API to update the file
    fetch('/_api/source/data/products/index.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content })
    }).then(() => {
      console.log("Products data updated in source code");
    }).catch(error => {
      console.error("Error saving to source code:", error);
    });
  } catch (error) {
    console.error("Error preparing products data:", error);
  }
};
