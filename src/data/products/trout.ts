
import { Product } from '@/types/product';
import { getProductImage } from '../productImages';

// Форель (Турция) products
export const troutProducts: Product[] = [
  { 
    id: 3, 
    name: "ФОРЕЛЬ б/г потр М", 
    category: "Форель (Турция)",
    size: "1,3-1,8 кг", 
    packaging: "25 кг", 
    catchDate: "Июнь",
    manufacturer: "Турция", 
    image: getProductImage({ category: "Форель (Турция)", name: "ФОРЕЛЬ б/г потр М", id: 3 }),
    price: 1014.9
  },
  { 
    id: 4, 
    name: "ФОРЕЛЬ б/г потр М", 
    category: "Форель (Турция)",
    size: "1,8-2,7 кг", 
    packaging: "25 кг", 
    catchDate: "Июль",
    manufacturer: "Турция", 
    image: getProductImage({ category: "Форель (Турция)", name: "ФОРЕЛЬ б/г потр М", id: 4 }),
    price: 1064.9
  },
  { 
    id: 5, 
    name: "ФОРЕЛЬ б/г потр М", 
    category: "Форель (Турция)",
    size: "2,7-3,6 кг", 
    packaging: "25 кг", 
    catchDate: "Июнь",
    manufacturer: "Турция", 
    image: getProductImage({ category: "Форель (Турция)", name: "ФОРЕЛЬ б/г потр М", id: 5 }),
    price: 1166.9
  },
];
