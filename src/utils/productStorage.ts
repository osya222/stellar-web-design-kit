
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
    try {
      // Создаем глубокую копию исходных товаров
      cachedProducts = JSON.parse(JSON.stringify(defaultProducts));
      isInitialized = true;
      console.log('Инициализирован кеш продуктов:', cachedProducts.length);
    } catch (error) {
      console.error('Ошибка инициализации кеша продуктов:', error);
      // В случае ошибки используем пустой массив
      cachedProducts = [];
      isInitialized = true;
    }
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
    console.log('Обновлен существующий товар:', product.id);
  } else {
    // Add new product with next available ID
    const maxId = Math.max(0, ...cachedProducts.map(p => p.id));
    const newProduct = { ...product, id: maxId + 1 };
    cachedProducts.push(newProduct);
    console.log('Добавлен новый товар с ID:', newProduct.id);
  }
  
  // Обновляем исходный массив defaultProducts для сохранения между перезагрузками
  try {
    // Сначала очищаем массив
    defaultProducts.length = 0;
    // Затем добавляем все товары из кеша
    cachedProducts.forEach(p => defaultProducts.push({...p}));
    
    // Сохраняем изменения в исходный код через API Lovable
    updateProductsFile();
  } catch (error) {
    console.error('Ошибка при обновлении исходного массива товаров:', error);
  }
};

/**
 * Delete a product
 */
export const deleteProduct = (productId: number): void => {
  initializeCache();
  
  const index = cachedProducts.findIndex(p => p.id === productId);
  if (index >= 0) {
    cachedProducts.splice(index, 1);
    console.log('Удален товар с ID:', productId);
    
    try {
      // Обновляем исходный массив defaultProducts для сохранения между перезагрузками
      defaultProducts.length = 0;
      cachedProducts.forEach(p => defaultProducts.push({...p}));
      
      // Save changes to source code
      updateProductsFile();
    } catch (error) {
      console.error('Ошибка при обновлении исходного массива после удаления:', error);
    }
  }
};

/**
 * Update products file
 */
const updateProductsFile = () => {
  try {
    const content = `import { Product } from "@/types/product";\n\nexport const products: Product[] = ${JSON.stringify(cachedProducts, null, 2)};`;
    
    console.log('Сохраняем данные товаров в исходный код');
    
    fetch('/_source/data/products/index.ts', {
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
