
export interface Product {
  id: string;
  name: string;
  category: string;
  manufacturer: string; 
  price: number;
  description?: string;
  imageUrl?: string;
  inStock?: boolean;
  weight?: number;
  unit?: 'кг' | 'г' | 'шт';
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
