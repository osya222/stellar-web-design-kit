
import { Product } from '@/types/product';
import { salmonProducts } from './salmon';
import { troutProducts } from './trout';
import { shrimpProducts } from './shrimp';
import { fishFilletProducts } from './fishFillets';
import { getCategoryByName } from './types';

// This file combines all product data and exports it
// Combine all products with safeguards against undefined arrays
export const products: Product[] = [
  ...(salmonProducts || []),
  ...(troutProducts || []),
  ...(shrimpProducts || []),
  ...(fishFilletProducts || [])
];

// Export individual category products
export {
  salmonProducts,
  troutProducts,
  shrimpProducts,
  fishFilletProducts,
  getCategoryByName
};
