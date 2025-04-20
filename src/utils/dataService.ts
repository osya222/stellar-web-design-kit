
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { products as initialProducts } from "@/data/products";
import { categories as initialCategories } from "@/data/categories";

// Кэширование загруженных данных для работы в рамках сессии
let productsCache = [...initialProducts];
let categoriesCache = [...initialCategories];

/**
 * Получить все товары
 */
export const getProducts = (): Product[] => {
  return [...productsCache];
};

/**
 * Получить товар по ID
 */
export const getProductById = (id: number): Product | undefined => {
  return productsCache.find(product => product.id === id);
};

/**
 * Сохранить товар (создать или обновить)
 */
export const saveProduct = (product: Product): Product => {
  const products = [...productsCache];
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  // Создаем копию со всеми свойствами
  const productToSave = { ...product };
  
  if (existingIndex >= 0) {
    // Обновляем существующий
    products[existingIndex] = productToSave;
    console.log('Товар обновлен:', productToSave.id);
  } else {
    // Добавляем новый со следующим ID
    const maxId = Math.max(0, ...products.map(p => p.id));
    productToSave.id = maxId + 1;
    products.push(productToSave);
    console.log('Новый товар добавлен:', productToSave.id);
  }
  
  // Обновляем кэш
  productsCache = products;
  
  // Обновляем исходный массив в модуле
  initialProducts.length = 0;
  products.forEach(p => initialProducts.push({...p}));
  
  // Обновляем исходный файл кода
  updateProductsData(products);
  
  return productToSave;
};

/**
 * Удалить товар
 */
export const deleteProduct = (id: number): boolean => {
  const products = [...productsCache];
  const index = products.findIndex(p => p.id === id);
  
  if (index >= 0) {
    products.splice(index, 1);
    
    // Обновляем кэш
    productsCache = products;
    
    // Обновляем исходный массив в модуле
    initialProducts.length = 0;
    products.forEach(p => initialProducts.push({...p}));
    
    // Обновляем исходный файл кода
    updateProductsData(products);
    
    console.log('Товар удален:', id);
    return true;
  }
  
  return false;
};

/**
 * Получить все категории
 */
export const getCategories = (): Category[] => {
  return [...categoriesCache];
};

/**
 * Получить категорию по ID
 */
export const getCategoryById = (id: number): Category | undefined => {
  return categoriesCache.find(category => category.id === id);
};

/**
 * Сохранить категорию (создать или обновить)
 */
export const saveCategory = (category: Category): Category => {
  const categories = [...categoriesCache];
  const existingIndex = categories.findIndex(c => c.id === category.id);
  
  // Создаем копию
  const categoryToSave = { ...category };
  
  if (existingIndex >= 0) {
    // Обновляем существующую
    categories[existingIndex] = categoryToSave;
    console.log('Категория обновлена:', categoryToSave.id);
  } else {
    // Добавляем новую со следующим ID
    const maxId = Math.max(0, ...categories.map(c => c.id));
    categoryToSave.id = maxId + 1;
    categories.push(categoryToSave);
    console.log('Новая категория добавлена:', categoryToSave.id);
  }
  
  // Обновляем кэш
  categoriesCache = categories;
  
  // Обновляем исходный массив в модуле
  initialCategories.length = 0;
  categories.forEach(c => initialCategories.push({...c}));
  
  // Обновляем исходный файл кода
  updateCategoriesData(categories);
  
  return categoryToSave;
};

/**
 * Удалить категорию
 * Возвращает false, если категория используется и не может быть удалена
 */
export const deleteCategory = (id: number): boolean => {
  // Проверяем, используется ли категория в товарах
  const isInUse = productsCache.some(product => product.categoryId === id);
  
  if (isInUse) {
    console.log('Категория не может быть удалена, так как используется в товарах');
    return false;
  }
  
  const categories = [...categoriesCache];
  const index = categories.findIndex(c => c.id === id);
  
  if (index >= 0) {
    categories.splice(index, 1);
    
    // Обновляем кэш
    categoriesCache = categories;
    
    // Обновляем исходный массив в модуле
    initialCategories.length = 0;
    categories.forEach(c => initialCategories.push({...c}));
    
    // Обновляем исходный файл кода
    updateCategoriesData(categories);
    
    console.log('Категория удалена:', id);
    return true;
  }
  
  return false;
};

/**
 * Обновить данные о товарах в исходном файле
 */
const updateProductsData = (products: Product[]) => {
  try {
    // Форматируем данные для файла исходного кода
    const content = `import { Product } from "@/types/product";\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};`;
    
    console.log('Сохранение данных о товарах в исходный код');
    
    // Сохраняем в исходный код
    fetch('/api/save-source', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: 'src/data/products/index.ts',
        content
      })
    })
    .then(() => console.log('Данные о товарах успешно сохранены'))
    .catch(error => console.error('Ошибка сохранения данных о товарах:', error));
  } catch (error) {
    console.error('Ошибка при подготовке данных о товарах:', error);
  }
};

/**
 * Обновить данные о категориях в исходном файле
 */
const updateCategoriesData = (categories: Category[]) => {
  try {
    // Форматируем данные для файла исходного кода
    const content = `import { Category } from "@/types/category";\n\nexport const categories: Category[] = ${JSON.stringify(categories, null, 2)};`;
    
    console.log('Сохранение данных о категориях в исходный код');
    
    // Сохраняем в исходный код
    fetch('/api/save-source', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: 'src/data/categories.ts',
        content
      })
    })
    .then(() => console.log('Данные о категориях успешно сохранены'))
    .catch(error => console.error('Ошибка сохранения данных о категориях:', error));
  } catch (error) {
    console.error('Ошибка при подготовке данных о категориях:', error);
  }
};
