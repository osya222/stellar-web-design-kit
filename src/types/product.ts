
// Product type definition
export interface Product {
  id: number;
  name: string;
  category: string;
  size?: string;
  packaging?: string;
  catchDate?: string;
  manufacturer: string;
  expiryDate?: string;
  weight?: string;
  prices: {
    smallWholesale?: number;
    mediumWholesale?: number;
    largeWholesale?: number;
  };
}
