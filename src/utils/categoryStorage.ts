
import { Category } from '@/data/categories';
import { categories as defaultCategories } from '@/data/categories';
import { products } from '@/data/products';

// Variable for caching categories in memory
let cachedCategories: Category[] = [];
let isInitialized = false;

/**
 * Initialize the categories cache
 */
const initializeCache = () => {
  if (!isInitialized) {
    // Create a deep copy of the original categories
    cachedCategories = JSON.parse(JSON.stringify(defaultCategories));
    isInitialized = true;
    console.log('Categories cache initialized:', cachedCategories.length);
  }
};

/**
 * Get all categories
 */
export const getCategories = (): Category[] => {
  initializeCache();
  console.log('Getting categories:', cachedCategories.length);
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
    console.log('Updated existing category:', category.id);
  } else {
    // Add new category with next available ID
    const maxId = Math.max(0, ...cachedCategories.map(c => c.id));
    const newCategory = { ...category, id: category.id || maxId + 1 };
    cachedCategories.push(newCategory);
    console.log('Added new category with ID:', newCategory.id);
  }
  
  // Update the original defaultCategories array for persistence between reloads
  try {
    // First clear the array
    while (defaultCategories.length > 0) {
      defaultCategories.pop();
    }
    
    // Then add all categories from cache
    cachedCategories.forEach(c => defaultCategories.push({...c}));
    
    // Save changes to source code
    updateCategoriesFile();
  } catch (error) {
    console.error('Error updating source categories array:', error);
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
    console.log('Deleted category with ID:', categoryId);
    
    try {
      // Update the original defaultCategories array
      while (defaultCategories.length > 0) {
        defaultCategories.pop();
      }
      
      cachedCategories.forEach(c => defaultCategories.push({...c}));
      
      // Save changes to source code
      updateCategoriesFile();
    } catch (error) {
      console.error('Error updating source categories array after deletion:', error);
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
    
    console.log('Saving categories data to source code');
    
    fetch('/_lovable/source', {
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
