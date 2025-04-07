
import { Product } from '@/types/product';

// Данные о продуктах
export const products: Product[] = [
  // --- Лосось (Чили) ---
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
  // --- Форель (Турция) ---
  { 
    id: 3, 
    name: "ФОРЕЛЬ б/г потр М", 
    category: "Форель (Турция)",
    size: "1,3-1,8 кг", 
    packaging: "25 кг", 
    catchDate: "Июнь",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 1014.9,
      mediumWholesale: 1009.9,
      largeWholesale: 1004.9
    }
  },
  { 
    id: 4, 
    name: "ФОРЕЛЬ б/г потр М", 
    category: "Форель (Турция)",
    size: "1,8-2,7 кг", 
    packaging: "25 кг", 
    catchDate: "Июль",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 1064.9,
      mediumWholesale: 1059.9,
      largeWholesale: 1054.9
    }
  },
  { 
    id: 5, 
    name: "ФОРЕЛЬ б/г потр М", 
    category: "Форель (Турция)",
    size: "2,7-3,6 кг", 
    packaging: "25 кг", 
    catchDate: "Июнь",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 1166.9,
      mediumWholesale: 1161.9,
      largeWholesale: 1156.9
    }
  },
  // --- Креветки и морепродукты ---
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
  // --- Мидии ---
  { 
    id: 14, 
    name: "МИДИИ раковина в собственном соку", 
    category: "Мидии",
    size: "50-70", 
    packaging: "10*1", 
    catchDate: "Июнь-август",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 391.9,
      mediumWholesale: 387.9,
      largeWholesale: 380.9
    }
  },
  { 
    id: 15, 
    name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино", 
    category: "Мидии",
    size: "50-70", 
    packaging: "10*0,5", 
    catchDate: "Апрель/май/ноябрь",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 483.9,
      mediumWholesale: 479.9,
      largeWholesale: 472.9
    }
  },
  { 
    id: 16, 
    name: "МЯСО МИДИЙ в/м", 
    category: "Мидии",
    size: "200-300", 
    packaging: "9,2", 
    catchDate: "Май",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 520.9,
      mediumWholesale: 512.9,
      largeWholesale: 504.9
    }
  },
  { 
    id: 17, 
    name: "МЯСО МИДИЙ в/м", 
    category: "Мидии",
    size: "300-500", 
    packaging: "9,2", 
    catchDate: "Май",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 509.9,
      mediumWholesale: 501.9,
      largeWholesale: 496.9
    }
  },
  // --- Другие виды рыбы ---
  { 
    id: 18, 
    name: "ДОРАДО н/р", 
    category: "Другие виды рыбы",
    size: "300-400", 
    packaging: "5", 
    manufacturer: "Турция", 
    prices: {
      smallWholesale: undefined, // ожидаем
      mediumWholesale: undefined, // ожидаем
      largeWholesale: undefined // ожидаем
    }
  },
  { 
    id: 19, 
    name: "ДОРАДО н/р", 
    category: "Другие виды рыбы",
    size: "400-600", 
    packaging: "5", 
    catchDate: "Сентябрь",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 895.9,
      mediumWholesale: 895.9,
      largeWholesale: 891.9
    }
  },
  { 
    id: 20, 
    name: "СИБАС н/р", 
    category: "Другие виды рыбы",
    size: "300-400", 
    packaging: "5", 
    catchDate: "Июль",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 828.9,
      mediumWholesale: 823.9,
      largeWholesale: 818.9
    }
  },
  { 
    id: 21, 
    name: "СЕЛЬДЬ н/р", 
    category: "Другие виды рыбы",
    size: "380+", 
    packaging: "28", 
    catchDate: "Ноябрь 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 266.9,
      mediumWholesale: 262.9,
      largeWholesale: 260.9
    }
  },
  { 
    id: 22, 
    name: "СКУМБРИЯ н/р", 
    category: "Другие виды рыбы",
    size: "400-600", 
    packaging: "25", 
    catchDate: "Октябрь 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 399.9,
      mediumWholesale: 393.9,
      largeWholesale: 389.9
    }
  },
  { 
    id: 23, 
    name: "СКУМБРИЯ н/р", 
    category: "Другие виды рыбы",
    size: "500+", 
    packaging: "25", 
    catchDate: "Сентябрь 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 414.9,
      mediumWholesale: 410.9,
      largeWholesale: 406.9
    }
  },
  { 
    id: 24, 
    name: "СКУМБРИЯ н/р", 
    category: "Другие виды рыбы",
    size: "500+", 
    packaging: "25", 
    catchDate: "Февраль 25",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 429.9,
      mediumWholesale: 423.9,
      largeWholesale: 419.9
    }
  },
  { 
    id: 25, 
    name: "ХЕК ТУШКА пролож вес.", 
    category: "Другие виды рыбы",
    size: "150-250", 
    catchDate: "Январь",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 341.9,
      mediumWholesale: 333.9,
      largeWholesale: 327.9
    }
  },
  { 
    id: 26, 
    name: "КАМБАЛА б/г штучная", 
    category: "Другие виды рыбы",
    size: "0,5-1,0", 
    packaging: "20", 
    catchDate: "Июль",
    manufacturer: "Норд Вест", 
    prices: {
      smallWholesale: undefined, // ожидаем
      mediumWholesale: undefined, // ожидаем
      largeWholesale: undefined // ожидаем
    }
  },
  { 
    id: 27, 
    name: "ОКУНЬ б/г потр. 4*6,5", 
    category: "Другие виды рыбы",
    size: "150-300", 
    packaging: "26", 
    catchDate: "Июль",
    manufacturer: "ФОР", 
    prices: {
      smallWholesale: 307.9,
      mediumWholesale: 299.9,
      largeWholesale: 296.9
    }
  },
  { 
    id: 28, 
    name: "МИНТАЙ б/г потр. штуч", 
    category: "Другие виды рыбы",
    size: "25+", 
    packaging: "13", 
    catchDate: "Август",
    manufacturer: "Русский минтай", 
    prices: {
      smallWholesale: undefined, // ожидаем
      mediumWholesale: undefined, // ожидаем
      largeWholesale: undefined // ожидаем
    }
  },
  { 
    id: 29, 
    name: "МИНТАЙ б/г потр.", 
    category: "Другие виды рыбы",
    size: "25+", 
    packaging: "22", 
    catchDate: "Май",
    manufacturer: "ОКРФ", 
    prices: {
      smallWholesale: 185.9,
      mediumWholesale: 181.9,
      largeWholesale: 178.9
    }
  },
  { 
    id: 30, 
    name: "МИНТАЙ б/г потр.", 
    category: "Другие виды рыбы",
    size: "25+", 
    packaging: "24", 
    catchDate: "Октябрь",
    manufacturer: "ПК РКЗ", 
    prices: {
      smallWholesale: 185.9,
      mediumWholesale: 181.9,
      largeWholesale: 178.9
    }
  },
  { 
    id: 31, 
    name: "ТУНЕЦ ОБРЕЗЬ в/у порц.", 
    category: "Другие виды рыбы",
    size: "по 0,5 в/у", 
    packaging: "0,5", 
    catchDate: "Март",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 417.9,
      mediumWholesale: 417.9,
      largeWholesale: 417.9
    }
  },
  // --- Филе рыбы ---
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
  // --- Полуфабрикаты ---
  { 
    id: 36, 
    name: "КОТЛЕТЫ из горбуши", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Декабрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 400.9,
      mediumWholesale: 396.9,
      largeWholesale: 392.9
    }
  },
  { 
    id: 37, 
    name: "КОТЛЕТЫ из щуки", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Декабрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 400.9,
      mediumWholesale: 396.9,
      largeWholesale: 392.9
    }
  },
  { 
    id: 38, 
    name: "КОТЛЕТЫ из трески", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Декабрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 400.9,
      mediumWholesale: 396.9,
      largeWholesale: 392.9
    }
  },
  { 
    id: 39, 
    name: "ПАЛОЧКИ с МОЦАРЕЛЛОЙ", 
    category: "Полуфабрикаты",
    packaging: "10*1", 
    weight: "10",
    catchDate: "Ноябрь",
    manufacturer: "Водный мир", 
    prices: {
      smallWholesale: 477.9,
      mediumWholesale: 475.9,
      largeWholesale: 471.9
    }
  },
  { 
    id: 40, 
    name: "ПЕЛЬМЕНИ креветка/кальм", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Ноябрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 471.9,
      mediumWholesale: 463.9,
      largeWholesale: 459.9
    }
  },
  { 
    id: 41, 
    name: "ПЕЛЬМЕНИ с семгой", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Ноябрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 401.9,
      mediumWholesale: 393.9,
      largeWholesale: 389.9
    }
  },
  { 
    id: 42, 
    name: "ПЕЛЬМЕНИ с треской", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Ноябрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 330.9,
      mediumWholesale: 322.9,
      largeWholesale: 318.9
    }
  },
  { 
    id: 43, 
    name: "ПЕЛЬМЕНИ со щукой", 
    category: "Полуфабрикаты",
    packaging: "7*0,45", 
    weight: "3,15",
    catchDate: "Ноябрь",
    manufacturer: "Уральские п/фабрикаты", 
    prices: {
      smallWholesale: 383.9,
      mediumWholesale: 379.9,
      largeWholesale: 375.9
    }
  }
];

// Категории продуктов
export const productCategories = [
  {
    id: "lososs-chili",
    name: "Лосось (Чили)",
    description: "Свежемороженый лосось прямыми поставками из Чили",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: "forel-turkey",
    name: "Форель (Турция)",
    description: "Свежемороженая форель морская высшего качества",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: "krevetki-i-moreprodukty",
    name: "Креветки и морепродукты",
    description: "Широкий ассортимент свежих и замороженных креветок и морепродуктов",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: "midii",
    name: "Мидии",
    description: "Вкусные и полезные мидии в различных видах",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: "drugie-vidy-ryby",
    name: "Другие виды рыбы",
    description: "Разнообразие свежемороженой рыбы высокого качества",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: "file-ryby",
    name: "Филе рыбы",
    description: "Филе различных видов рыб, готовое к приготовлению",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: "polufabrikaty",
    name: "Полуфабрикаты",
    description: "Готовые рыбные полуфабрикаты для быстрого приготовления",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  }
];

// Функция для получения категории по имени
export function getCategoryByName(categoryName: string) {
  return productCategories.find(category => category.name === categoryName);
}
