
// Product type definition
export interface Product {
  id: number;
  name: string;
  category: string;
  description?: string; // Added description field
  size?: string;
  packaging?: string;
  catchDate?: string;
  manufacturer: string;
  expiryDate?: string;
  weight?: string;
  image?: string; // New field for product images
  price?: number; // Single retail price
}
