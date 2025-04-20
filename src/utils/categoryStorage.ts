
import { Category } from '@/data/categories';
import { categories as defaultCategories } from '@/data/categories';
import { products } from '@/data/products';

// Переменная для кеширования категорий в памяти
let cachedCategories: Category[] = [];
let isInitialized = false;

/**
 * Инициализация кеша категорий
 */
const initializeCache = () => {
  if (!isInitialized) {
    // Создаем глубокую копию исходных категорий
    cachedCategories = JSON.parse(JSON.stringify(defaultCategories));
    isInitialized = true;
    console.log('Инициализирован кеш категорий:', cachedCategories.length);
  }
};

/**
 * Get all categories
 */
export const getCategories = (): Category[] => {
  initializeCache();
  return [...cachedCategories];
};

/**
 * Save a category
 */
export const saveCategory = (category: Category): void => {
  initializeCache();
  
  const existingIndex = cachedCategories.findIndex(c => c.id === category.id);
  
  if (existingIndex >= 0) {
    // Update existing category
    cachedCategories[existingIndex] = { ...category };
    console.log('Обновлена существующая категория:', category.id);
  } else {
    // Add new category with next available ID
    const maxId = Math.max(0, ...cachedCategories.map(c => c.id));
    const newCategory = { ...category, id: category.id || maxId + 1 };
    cachedCategories.push(newCategory);
    console.log('Добавлена новая категория с ID:', newCategory.id);
  }
  
  // Обновляем исходный массив defaultCategories для сохранения между перезагрузками
  try {
    // Сначала очищаем массив
    while (defaultCategories.length > 0) {
      defaultCategories.pop();
    }
    
    // Затем добавляем все категории из кеша
    cachedCategories.forEach(c => defaultCategories.push({...c}));
    
    // Save changes to source code
    updateCategoriesFile();
  } catch (error) {
    console.error('Ошибка при обновлении исходного массива категорий:', error);
  }
};

/**
 * Delete a category if not in use
 * @returns true if deleted, false if category is in use and can't be deleted
 */
export const deleteCategory = (categoryId: number): boolean => {
  initializeCache();
  
  // Check if any products use this category
  const isInUse = products.some(product => product.categoryId === categoryId);
  
  if (isInUse) {
    return false;
  }
  
  const index = cachedCategories.findIndex(c => c.id === categoryId);
  if (index >= 0) {
    cachedCategories.splice(index, 1);
    console.log('Удалена категория с ID:', categoryId);
    
    try {
      // Обновляем исходный массив defaultCategories для сохранения между перезагрузками
      while (defaultCategories.length > 0) {
        defaultCategories.pop();
      }
      
      cachedCategories.forEach(c => defaultCategories.push({...c}));
      
      // Save changes to source code
      updateCategoriesFile();
    } catch (error) {
      console.error('Ошибка при обновлении исходного массива категорий после удаления:', error);
    }
    
    return true;
  }
  
  return false;
};

/**
 * Update categories file
 */
const updateCategoriesFile = () => {
  try {
    const content = `export interface Category {\n  id: number;\n  name: string;\n  slug: string;\n}\n\nexport const categories: Category[] = ${JSON.stringify(cachedCategories, null, 2)};`;
    
    console.log('Сохраняем данные категорий в исходный код');
    
    fetch('/_lovable/sourcecode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: 'src/data/categories.ts',
        content 
      })
    }).then(() => {
      console.log("Categories data updated in source code");
    }).catch(error => {
      console.error("Error saving categories to source code:", error);
    });
  } catch (error) {
    console.error("Error preparing categories data:", error);
  }
};
