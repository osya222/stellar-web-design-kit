
import { Product } from '@/types/product';

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
    image: "/images/pangasius-fillet.jpg",
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
    image: "/images/tilapia-fillet.jpg",
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
    image: "/images/cod-fillet.jpg",
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
    image: "/images/hake-fillet.jpg",
    price: 497.9
  },
];
