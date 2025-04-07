
import { Product } from '@/types/product';

// Лосось (Чили) products
export const salmonProducts: Product[] = [
  { 
    id: 1, 
    name: "ЛОСОСЬ с/г потр. штучн", 
    category: "Лосось (Чили)",
    size: "5-6 кг", 
    packaging: "27 кг", 
    catchDate: "Сентябрь",
    manufacturer: "Чили Premium", 
    prices: {
      smallWholesale: 1413.9,
      mediumWholesale: undefined, // штучный
      largeWholesale: undefined // штучный
    }
  },
  { 
    id: 2, 
    name: "ЛОСОСЬ с/г потр.", 
    category: "Лосось (Чили)",
    size: "6-7 кг", 
    packaging: "27 кг", 
    catchDate: "Август",
    manufacturer: "Чили Premium", 
    prices: {
      smallWholesale: 1457.9,
      mediumWholesale: 1452.9,
      largeWholesale: 1447.9
    }
  },
];
