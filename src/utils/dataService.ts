
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { products as initialProducts } from "@/data/products";
import { categories as initialCategories } from "@/data/categories";

/**
 * Get all products
 */
export const getProducts = (): Product[] => {
  return [...initialProducts];
};

/**
 * Get a product by ID
 */
export const getProductById = (id: number): Product | undefined => {
  return initialProducts.find(product => product.id === id);
};

/**
 * Save a product (create or update)
 */
export const saveProduct = (product: Product): Product => {
  const products = [...initialProducts];
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  // Create a copy with all properties
  const productToSave = { ...product };
  
  if (existingIndex >= 0) {
    // Update existing
    products[existingIndex] = productToSave;
    console.log('Товар обновлен:', productToSave.id);
  } else {
    // Add new with next ID
    const maxId = Math.max(0, ...products.map(p => p.id));
    productToSave.id = maxId + 1;
    products.push(productToSave);
    console.log('Новый товар добавлен:', productToSave.id);
  }
  
  // Update source array
  updateProductsData(products);
  
  return productToSave;
};

/**
 * Delete a product
 */
export const deleteProduct = (id: number): boolean => {
  const products = [...initialProducts];
  const index = products.findIndex(p => p.id === id);
  
  if (index >= 0) {
    products.splice(index, 1);
    updateProductsData(products);
    console.log('Товар удален:', id);
    return true;
  }
  
  return false;
};

/**
 * Get all categories
 */
export const getCategories = (): Category[] => {
  return [...initialCategories];
};

/**
 * Get a category by ID
 */
export const getCategoryById = (id: number): Category | undefined => {
  return initialCategories.find(category => category.id === id);
};

/**
 * Save a category (create or update)
 */
export const saveCategory = (category: Category): Category => {
  const categories = [...initialCategories];
  const existingIndex = categories.findIndex(c => c.id === category.id);
  
  // Create a copy
  const categoryToSave = { ...category };
  
  if (existingIndex >= 0) {
    // Update existing
    categories[existingIndex] = categoryToSave;
    console.log('Категория обновлена:', categoryToSave.id);
  } else {
    // Add new with next ID
    const maxId = Math.max(0, ...categories.map(c => c.id));
    categoryToSave.id = maxId + 1;
    categories.push(categoryToSave);
    console.log('Новая категория добавлена:', categoryToSave.id);
  }
  
  // Update source array
  updateCategoriesData(categories);
  
  return categoryToSave;
};

/**
 * Delete a category
 * Returns false if category is in use and can't be deleted
 */
export const deleteCategory = (id: number): boolean => {
  // Check if any products use this category
  const isInUse = initialProducts.some(product => product.categoryId === id);
  
  if (isInUse) {
    console.log('Категория не может быть удалена, так как используется в товарах');
    return false;
  }
  
  const categories = [...initialCategories];
  const index = categories.findIndex(c => c.id === id);
  
  if (index >= 0) {
    categories.splice(index, 1);
    updateCategoriesData(categories);
    console.log('Категория удалена:', id);
    return true;
  }
  
  return false;
};

/**
 * Update products data in the source file
 */
const updateProductsData = (products: Product[]) => {
  try {
    // Clear original array and add new data
    initialProducts.length = 0;
    products.forEach(product => initialProducts.push({ ...product }));
    
    // Format data for source file
    const content = `import { Product } from "@/types/product";\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};`;
    
    console.log('Сохранение данных о товарах в исходный код');
    
    // Save to source code
    fetch('/_lovable/source', {
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
 * Update categories data in the source file
 */
const updateCategoriesData = (categories: Category[]) => {
  try {
    // Clear original array and add new data
    initialCategories.length = 0;
    categories.forEach(category => initialCategories.push({ ...category }));
    
    // Format data for source file
    const content = `import { Category } from "@/types/category";\n\nexport const categories: Category[] = ${JSON.stringify(categories, null, 2)};`;
    
    console.log('Сохранение данных о категориях в исходный код');
    
    // Save to source code
    fetch('/_lovable/source', {
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
