
import { Product } from '@/types/product';
import { salmonProducts } from './salmon';
import { troutProducts } from './trout';
import { shrimpProducts } from './shrimp';
import { fishFilletProducts } from './fishFillets';
import { musselProducts } from './mussels';
import { getCategoryByName } from './types';

// Combine all products
export const products: Product[] = [
  ...salmonProducts,
  ...troutProducts,
  ...shrimpProducts,
  ...fishFilletProducts,
  ...musselProducts
];

// Export individual category products
export {
  salmonProducts,
  troutProducts,
  shrimpProducts,
  fishFilletProducts,
  musselProducts,
  getCategoryByName
};
