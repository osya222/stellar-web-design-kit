import { Product } from '@/types/product';
import { getProductImage } from '../productImages';

// Combine shrimp and mussel products under "Морепродукты" category
export const shrimpProducts: Product[] = [
  { 
    id: 6, 
    name: "КРЕВЕТКА ваннамей свежая в панцире б/г", 
    category: "Морепродукты",
    size: "21-25", 
    packaging: "10*1 кг", 
    catchDate: "Апрель/май",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Морепродукты", name: "КРЕВЕТКА ваннамей свежая в панцире б/г", id: 6 }),
    price: 1002.9
  },
  { 
    id: 7, 
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г", 
    category: "Морепродукты",
    size: "26-30", 
    packaging: "10*1 кг", 
    catchDate: "Май",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Морепродукты", name: "КРЕВЕТКА ваннамей свежая очищенная б/г", id: 7 }),
    price: 1004.9
  },
  { 
    id: 8, 
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г", 
    category: "Морепродукты",
    size: "16-20", 
    packaging: "10*1 кг", 
    catchDate: "Июль",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Морепродукты", name: "КРЕВЕТКА ваннамей свежая очищенная б/г", id: 8 }),
    price: 1071.9
  },
  { 
    id: 9, 
    name: "КРЕВЕТКА ваннамей вареная очищенная б/г", 
    category: "Морепродукты",
    size: "16-20", 
    packaging: "10*1 кг", 
    catchDate: "Апрель",
    manufacturer: "Индия", 
    image: getProductImage({ category: "Морепродукты", name: "КРЕВЕТКА ваннамей вареная очищенная б/г" }),
    price: 1240.9
  },
  { 
    id: 10, 
    name: "ЛАНГУСТИНЫ с/м L 2", 
    category: "Морепродукты",
    size: "20-30", 
    packaging: "6*2 кг", 
    catchDate: "Июль",
    manufacturer: "Аргентина",
    image: getProductImage({ category: "Морепродукты", name: "ЛАНГУСТИНЫ с/м L 2" }),
    price: 795.9
  },
  { 
    id: 11, 
    name: "ЛАНГУСТИНЫ с/м L 1", 
    category: "Морепродукты",
    size: "10-20", 
    packaging: "6*2 кг", 
    catchDate: "Январь/апрель",
    manufacturer: "Аргентина",
    image: getProductImage({ category: "Морепродукты", name: "ЛАНГУСТИНЫ с/м L 1" }),
    price: 884.9
  },
  { 
    id: 12, 
    name: "ЛАНГУСТИНЫ с/м С 2", 
    category: "Морепродукты",
    size: "56-101", 
    packaging: "6*2 кг", 
    catchDate: "Январь",
    manufacturer: "Аргентина", 
    image: getProductImage({ category: "Морепродукты", name: "ЛАНГУСТИНЫ с/м С 2" }),
    price: 1022.9
  },
  { 
    id: 13, 
    name: "МЕДАЛЬОНЫ из креветки", 
    category: "Морепродукты",
    size: undefined, 
    packaging: "40*0,24", 
    weight: "9,6",
    catchDate: "Июль",
    manufacturer: "Китай", 
    image: getProductImage({ category: "Морепродукты", name: "МЕДАЛЬОНЫ из креветки" }),
    price: 1192.9
  },
  { 
    id: 14, 
    name: "МИДИИ раковина в собственном соку", 
    category: "Морепродукты",
    size: "50-70", 
    packaging: "10*1", 
    catchDate: "Июнь-август",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Морепродукты", name: "МИДИИ раковина в собственном соку" }),
    price: 391.9
  },
  { 
    id: 15, 
    name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино", 
    category: "Морепродукты",
    size: "50-70", 
    packaging: "10*0,5", 
    catchDate: "Апрель/май/ноябрь",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Морепродукты", name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино" }),
    price: 483.9
  },
  { 
    id: 16, 
    name: "МЯСО МИДИЙ в/м", 
    category: "Морепродукты",
    size: "200-300", 
    packaging: "9,2", 
    catchDate: "Май",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Морепродукты", name: "МЯСО МИДИЙ в/м", id: 16 }),
    price: 520.9
  },
  { 
    id: 17, 
    name: "МЯСО МИДИЙ в/м", 
    category: "Морепродукты",
    size: "300-500", 
    packaging: "9,2", 
    catchDate: "Май",
    manufacturer: "Чили", 
    image: getProductImage({ category: "Морепродукты", name: "МЯСО МИДИЙ в/м", id: 17 }),
    price: 509.9
  }
];
