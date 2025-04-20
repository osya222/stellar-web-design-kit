
import { Product } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

// Переменная для кеширования продуктов в памяти
let cachedProducts: Product[] = [];
let isInitialized = false;

/**
 * Инициализация кеша продуктов
 */
const initializeCache = () => {
  if (!isInitialized) {
    // Создаем глубокую копию исходных товаров
    cachedProducts = defaultProducts.map(p => ({...p}));
    isInitialized = true;
    console.log('Инициализирован кеш продуктов:', cachedProducts.length);
  }
};

/**
 * Get all products
 */
export const getProducts = (): Product[] => {
  initializeCache();
  return [...cachedProducts];
};

/**
 * Save a product to the project
 */
export const saveProduct = (product: Product): void => {
  initializeCache();
  
  const existingIndex = cachedProducts.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    // Update existing product
    cachedProducts[existingIndex] = { ...product };
  } else {
    // Add new product with next available ID
    const maxId = Math.max(0, ...cachedProducts.map(p => p.id));
    const newProduct = { ...product, id: product.id || maxId + 1 };
    cachedProducts.push(newProduct);
  }
  
  // Обновляем исходный массив defaultProducts для сохранения между перезагрузками
  defaultProducts.length = 0;
  cachedProducts.forEach(p => defaultProducts.push({...p}));
  
  // Save changes to source code via Lovable's internal API
  updateProductsFile();
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  initializeCache();
  
  const index = cachedProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    cachedProducts.splice(index, 1);
    
    // Обновляем исходный массив defaultProducts для сохранения между перезагрузками
    defaultProducts.length = 0;
    cachedProducts.forEach(p => defaultProducts.push({...p}));
    
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
      content: `import { Category } from "../categories";\n\nexport interface Product {\n  id: number;\n  name: string;\n  price: number;\n  categoryId: number;\n  description?: string;\n  manufacturer: string;\n  image?: string;\n}\n\nexport const products: Product[] = ${JSON.stringify(cachedProducts, null, 2)};`
    })
  }).then(() => {
    console.log("Products data updated in source code");
  }).catch(error => {
    console.error("Error saving to source code:", error);
  });
};
