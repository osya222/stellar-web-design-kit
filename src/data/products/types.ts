
import { Product } from '@/types/product';

// Helper function to get category by name
export const getCategoryByName = (name: string) => {
  // Add any category-specific info here if needed
  return { id: name.toLowerCase().replace(/\s+/g, '-') };
};
