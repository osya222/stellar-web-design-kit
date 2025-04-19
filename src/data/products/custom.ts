
import { Product } from "@/types/product";

// Simple stubs for the functions referenced in productStorage
export const getCustomProducts = (): Product[] => {
  return [];
};

export const saveCustomProduct = (product: Product): void => {
  console.log("Product saving functionality has been removed");
};

export const deleteCustomProduct = (productId: number): void => {
  console.log("Product deletion functionality has been removed");
};
