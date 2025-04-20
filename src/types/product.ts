
export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  manufacturer: string;
  description?: string;
  image?: string; // Path to the product image
}
