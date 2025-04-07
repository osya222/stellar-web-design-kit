
import { Product } from '@/types/product';

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
    prices: {
      smallWholesale: 1002.9,
      mediumWholesale: 997.9,
      largeWholesale: 992.9
    }
  },
  { 
    id: 7, 
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г", 
    category: "Креветки и морепродукты",
    size: "26-30", 
    packaging: "10*1 кг", 
    catchDate: "Май",
    manufacturer: "Индия", 
    prices: {
      smallWholesale: 1004.9,
      mediumWholesale: 999.9,
      largeWholesale: 994.9
    }
  },
  { 
    id: 8, 
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г", 
    category: "Креветки и морепродукты",
    size: "16-20", 
    packaging: "10*1 кг", 
    catchDate: "Июль",
    manufacturer: "Индия", 
    prices: {
      smallWholesale: 1071.9,
      mediumWholesale: 1066.9,
      largeWholesale: 1061.9
    }
  },
  { 
    id: 9, 
    name: "КРЕВЕТКА ваннамей вареная очищенная б/г", 
    category: "Креветки и морепродукты",
    size: "16-20", 
    packaging: "10*1 кг", 
    catchDate: "Апрель",
    manufacturer: "Индия", 
    prices: {
      smallWholesale: 1240.9,
      mediumWholesale: undefined, // обсуждаем
      largeWholesale: undefined  // обсуждаем
    }
  },
  { 
    id: 10, 
    name: "ЛАНГУСТИНЫ с/м L 2", 
    category: "Креветки и морепродукты",
    size: "20-30", 
    packaging: "6*2 кг", 
    catchDate: "Июль",
    manufacturer: "Аргентина",
    image: "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    prices: {
      smallWholesale: 795.9,
      mediumWholesale: 790.9,
      largeWholesale: 785.9
    }
  },
  { 
    id: 11, 
    name: "ЛАНГУСТИНЫ с/м L 1", 
    category: "Креветки и морепродукты",
    size: "10-20", 
    packaging: "6*2 кг", 
    catchDate: "Январь/апрель",
    manufacturer: "Аргентина",
    image: "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    prices: {
      smallWholesale: 884.9,
      mediumWholesale: 878.9,
      largeWholesale: 873.9
    }
  },
  { 
    id: 12, 
    name: "ЛАНГУСТИНЫ с/м С 2", 
    category: "Креветки и морепродукты",
    size: "56-101", 
    packaging: "6*2 кг", 
    catchDate: "Январь",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 1022.9,
      mediumWholesale: 1017.9,
      largeWholesale: 1012.9
    }
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
    prices: {
      smallWholesale: 1192.9,
      mediumWholesale: 1189.9,
      largeWholesale: 1184.9
    }
  },
];
