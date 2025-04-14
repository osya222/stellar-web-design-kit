
import { Product } from '@/types/product';
import { getProductImage } from '../productImages';

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
    image: getProductImage({ category: "Лосось (Чили)", name: "ЛОСОСЬ с/г потр. штучн" }),
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
    image: getProductImage({ category: "Лосось (Чили)", name: "ЛОСОСЬ с/г потр." }),
    price: 1457.9
  },
];
