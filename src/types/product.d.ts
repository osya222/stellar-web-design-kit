
export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
  weight?: number;
  unit?: 'кг' | 'г' | 'шт';
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
