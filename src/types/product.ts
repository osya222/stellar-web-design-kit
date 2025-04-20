

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  manufacturer: string;
  description?: string;
  imagePath?: string; // Add the imagePath property as optional
}

