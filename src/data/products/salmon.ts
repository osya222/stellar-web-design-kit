
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
    image: "/images/salmon-1.jpg",
    price: 1413.9
  },
  { 
    id: 2, 
    name: "ЛОСОСЬ с/г потр.", 
    category: "Лосось (Чили)",
    size: "6-7 кг", 
    packaging: "27 кг", 
    catchDate: "Август",
    manufacturer: "Чили Premium", 
    image: "/images/salmon-2.jpg",
    price: 1457.9
  },
];
