import { Product } from '@/types/product';
import { getProductImage } from '../productImages';

// Креветки и морепродукты products
export const shrimpProducts: Product[] = [
  { 
    id: 6, 
    name: "КРЕВЕТКА ваннамей свежая в панцире б/г", 
    category: "Креветки и морепродукты",
    size: "21-25", 
    packaging: "10*1 кг", 
    catchDate: "Апрель/май",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Креветки и морепродукты", name: "КРЕВЕТКА ваннамей свежая в панцире б/г" }),
    price: 1002.9
  },
  { 
    id: 7, 
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г", 
    category: "Креветки и морепродукты",
    size: "26-30", 
    packaging: "10*1 кг", 
    catchDate: "Май",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Креветки и морепродукты", name: "КРЕВЕТКА ваннамей свежая очищенная б/г" }),
    price: 1004.9
  },
  { 
    id: 8, 
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г", 
    category: "Креветки и морепродукты",
    size: "16-20", 
    packaging: "10*1 кг", 
    catchDate: "Июль",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Креветки и морепродукты", name: "КРЕВЕТКА ваннамей свежая очищенная б/г" }),
    price: 1071.9
  },
  { 
    id: 9, 
    name: "КРЕВЕТКА ваннамей вареная очищенная б/г", 
    category: "Креветки и морепродукты",
    size: "16-20", 
    packaging: "10*1 кг", 
    catchDate: "Апрель",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Креветки и морепродукты", name: "КРЕВЕТКА ваннамей вареная очищенная б/г" }),
    price: 1240.9
  },
  { 
    id: 10, 
    name: "ЛАНГУСТИНЫ с/м L 2", 
    category: "Креветки и морепродукты",
    size: "20-30", 
    packaging: "6*2 кг", 
    catchDate: "Июль",
    manufacturer: "Аргентина",
    image: getProductImage({ category: "Креветки и морепродукты", name: "ЛАНГУСТИНЫ с/м L 2" }),
    price: 795.9
  },
  { 
    id: 11, 
    name: "ЛАНГУСТИНЫ с/м L 1", 
    category: "Креветки и морепродукты",
    size: "10-20", 
    packaging: "6*2 кг", 
    catchDate: "Январь/апрель",
    manufacturer: "Аргентина",
    image: getProductImage({ category: "Креветки и морепродукты", name: "ЛАНГУСТИНЫ с/м L 1" }),
    price: 884.9
  },
  { 
    id: 12, 
    name: "ЛАНГУСТИНЫ с/м С 2", 
    category: "Креветки и морепродукты",
    size: "56-101", 
    packaging: "6*2 кг", 
    catchDate: "Январь",
    manufacturer: "Аргентина", 
    image: getProductImage({ category: "Креветки и морепродукты", name: "ЛАНГУСТИНЫ с/м С 2" }),
    price: 1022.9
  },
  { 
    id: 13, 
    name: "МЕДАЛЬОНЫ из креветки", 
    category: "Креветки и морепродукты",
    size: undefined, 
    packaging: "40*0,24", 
    weight: "9,6",
    catchDate: "Июль",
    manufacturer: "Китай", 
    image: getProductImage({ category: "Креветки и морепродукты", name: "МЕДАЛЬОНЫ из креветки" }),
    price: 1192.9
  },
];
