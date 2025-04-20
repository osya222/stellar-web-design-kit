
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  manufacturer: string;
  description?: string;
  image?: string; // Path to the product image
}
