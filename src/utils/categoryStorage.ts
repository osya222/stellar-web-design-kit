
import { Category } from '@/data/categories';
import { categories as defaultCategories } from '@/data/categories';
import { products } from '@/data/products';

/**
 * Get all categories
 */
export const getCategories = (): Category[] => {
  return [...defaultCategories];
};

/**
 * Save a category
 */
export const saveCategory = (category: Category): void => {
  const existingIndex = defaultCategories.findIndex(c => c.id === category.id);
  
  if (existingIndex >= 0) {
    // Update existing category
    defaultCategories[existingIndex] = { ...category };
  } else {
    // Add new category with next available ID
    const maxId = Math.max(0, ...defaultCategories.map(c => c.id));
    const newCategory = { ...category, id: category.id || maxId + 1 };
    defaultCategories.push(newCategory);
  }
  
  // Save changes to source code
  updateCategoriesFile();
};

/**
 * Delete a category if not in use
 * @returns true if deleted, false if category is in use and can't be deleted
 */
export const deleteCategory = (categoryId: number): boolean => {
  // Check if any products use this category
  const isInUse = products.some(product => product.categoryId === categoryId);
  
  if (isInUse) {
    return false;
  }
  
  const index = defaultCategories.findIndex(c => c.id === categoryId);
  if (index >= 0) {
    defaultCategories.splice(index, 1);
    
    // Save changes to source code
    updateCategoriesFile();
    return true;
  }
  
  return false;
};

/**
 * Update categories file
 */
const updateCategoriesFile = () => {
  fetch('/_source/data/categories.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `export interface Category {\n  id: number;\n  name: string;\n  slug: string;\n}\n\nexport const categories: Category[] = ${JSON.stringify(defaultCategories, null, 2)};`
    })
  }).then(() => {
    console.log("Categories data updated in source code");
  }).catch(error => {
    console.error("Error saving categories to source code:", error);
  });
};
