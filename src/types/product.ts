
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  manufacturer: string;
  description?: string;
  imagePath?: string; // Path to the image in /public/images/products/
}
