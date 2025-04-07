
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
    prices: {
      smallWholesale: 252.9,
      mediumWholesale: 247.9,
      largeWholesale: 245.9
    }
  },
  { 
    id: 33, 
    name: "ФИЛЕ ТИЛАПИИ", 
    category: "Филе рыбы",
    size: "5-7", 
    packaging: "10", 
    catchDate: "Сентябрь",
    manufacturer: "Вьетнам", 
    prices: {
      smallWholesale: 609.9,
      mediumWholesale: 598.9,
      largeWholesale: 593.9
    }
  },
  { 
    id: 34, 
    name: "ФИЛЕ ТРЕСКИ б/к фас.", 
    category: "Филе рыбы",
    size: "100-150", 
    packaging: "5*1 кг", 
    catchDate: "Декабрь",
    manufacturer: "Норд Вест/Мурманск", 
    prices: {
      smallWholesale: 722.9,
      mediumWholesale: 722.9,
      largeWholesale: 722.9
    }
  },
  { 
    id: 35, 
    name: "ФИЛЕ ХЕКА в тубе", 
    category: "Филе рыбы",
    size: "~ 3", 
    packaging: "~ 12", 
    catchDate: "Август",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 497.9,
      mediumWholesale: 490.9,
      largeWholesale: 484.9
    }
  },
];
