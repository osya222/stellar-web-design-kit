
import { Product } from '@/types/product';
import { getProductImage } from '../productImages';

// Филе рыбы products
export const fishFilletProducts: Product[] = [
  { 
    id: 32, 
    name: "ФИЛЕ ПАНГАСИУСА", 
    category: "Филе рыбы",
    size: "220+", 
    packaging: "10", 
    catchDate: "Июнь/июль",
    manufacturer: "Вьетнам", 
    image: getProductImage({ category: "Филе рыбы", name: "ФИЛЕ ПАНГАСИУСА" }),
    price: 252.9
  },
  { 
    id: 33, 
    name: "ФИЛЕ ТИЛАПИИ", 
    category: "Филе рыбы",
    size: "5-7", 
    packaging: "10", 
    catchDate: "Сентябрь",
    manufacturer: "Вьетнам", 
    image: getProductImage({ category: "Филе рыбы", name: "ФИЛЕ ТИЛАПИИ" }),
    price: 609.9
  },
  { 
    id: 34, 
    name: "ФИЛЕ ТРЕСКИ б/к фас.", 
    category: "Филе рыбы",
    size: "100-150", 
    packaging: "5*1 кг", 
    catchDate: "Декабрь",
    manufacturer: "Норд Вест/Мурманск", 
    image: getProductImage({ category: "Филе рыбы", name: "ФИЛЕ ТРЕСКИ б/к фас." }),
    price: 722.9
  },
  { 
    id: 35, 
    name: "ФИЛЕ ХЕКА в тубе", 
    category: "Филе рыбы",
    size: "~ 3", 
    packaging: "~ 12", 
    catchDate: "Август",
    manufacturer: "Аргентина", 
    image: getProductImage({ category: "Филе рыбы", name: "ФИЛЕ ХЕКА в тубе" }),
    price: 497.9
  },
];
