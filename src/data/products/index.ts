
import { Product } from '@/types/product';
import { salmonProducts } from './salmon';
import { troutProducts } from './trout';
import { shrimpProducts } from './shrimp';
import { musselProducts } from './mussels';
import { otherFishProducts } from './otherFish';
import { fishFilletProducts } from './fishFillets';
import { getCategoryByName } from './types';

// Combine all products
export const products: Product[] = [
  ...salmonProducts,
  ...troutProducts,
  ...shrimpProducts,
  ...musselProducts,
  ...otherFishProducts,
  ...fishFilletProducts
];

// Export individual category products
export {
  salmonProducts,
  troutProducts,
  shrimpProducts,
  musselProducts,
  otherFishProducts,
  fishFilletProducts,
  getCategoryByName
};
