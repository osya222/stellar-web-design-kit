
import { Product } from '@/types/product';
import { salmonProducts } from './salmon';
import { troutProducts } from './trout';
import { shrimpProducts } from './shrimp';
import { fishFilletProducts } from './fishFillets';
import { customProducts } from './custom'; // Import custom products
import { getCategoryByName } from './types';

// This file combines all product data and exports it
// Combine all products including custom ones
export const products: Product[] = [
  ...salmonProducts,
  ...troutProducts,
  ...shrimpProducts,
  ...fishFilletProducts,
  ...customProducts // Add custom products
];

// Export individual category products
export {
  salmonProducts,
  troutProducts,
  shrimpProducts,
  fishFilletProducts,
  customProducts, // Export custom products
  getCategoryByName
};
