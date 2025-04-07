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
  // --- Новые продукты ---
  { 
    id: 44, 
    name: "Барабулька н/р", 
    category: "Другие виды рыбы",
    size: "100 гр+", 
    packaging: "вес", 
    catchDate: "Апрель, 24",
    manufacturer: "Мавритания", 
    prices: {
      smallWholesale: 350,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 45, 
    name: "Вомер н/р", 
    category: "Другие виды рыбы",
    size: "100-150 гр", 
    packaging: "10 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 280,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 46, 
    name: "Вомер н/р", 
    category: "Другие виды рыбы",
    size: "150-200 гр", 
    packaging: "10 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 335,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 47, 
    name: "Вомер н/р", 
    category: "Другие виды рыбы",
    size: "200-300 гр", 
    packaging: "10 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 425,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 48, 
    name: "Горбуша б/г", 
    category: "Другие виды рыбы",
    size: "1 кг+", 
    packaging: "22 кг", 
    catchDate: "Июль, 24",
    manufacturer: "Океан", 
    prices: {
      smallWholesale: 458,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 49, 
    name: "Гренадер-тушка", 
    category: "Другие виды рыбы",
    size: "200-500 гр", 
    packaging: "вес", 
    catchDate: "Июль, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 225,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 50, 
    name: "Гренадер-тушка", 
    category: "Другие виды рыбы",
    size: "500-1500 гр", 
    packaging: "вес", 
    catchDate: "Июль, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 265,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 51, 
    name: "Дорадо н/р", 
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "5 кг", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 880,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 52, 
    name: "Дори Б/Г", 
    category: "Другие виды рыбы",
    size: "420 гр+", 
    packaging: "Вес", 
    catchDate: "Сент-окт, 23",
    manufacturer: "Н.Зеландия", 
    prices: {
      smallWholesale: 565,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 53, 
    name: "Игла н/р", 
    category: "Другие виды рыбы",
    size: "300-500 гр", 
    packaging: "10 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 330,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 54, 
    name: "Икра сельди в ястыках", 
    category: "Деликатесы",  // Changed from "Икра" to "Деликатесы"
    packaging: "12 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Ряжская РПК", 
    prices: {
      smallWholesale: 455,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 55, 
    name: "Камбала б/г IQF", 
    category: "Другие виды рыбы",
    size: "500-1000 гр", 
    packaging: "20 кг", 
    catchDate: "Март, 24",
    manufacturer: "Норд Вест", 
    prices: {
      smallWholesale: 282,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 56, 
    name: "Килька с/м IQF", 
    category: "Другие виды рыбы",
    packaging: "15 кг", 
    catchDate: "Декабрь, 24",
    manufacturer: "«Балт Иней»", 
    prices: {
      smallWholesale: 192,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 57, 
    name: "Кижуч б/г (6-8)", 
    category: "Другие виды рыбы",
    size: "2,7-3,6 кг", 
    packaging: "вес", 
    catchDate: "Август, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 1140,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 58, 
    name: "Кижуч б/г (8-10)", 
    category: "Другие виды рыбы",
    size: "3,6 кг+", 
    packaging: "вес", 
    catchDate: "Август, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 1185,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 59, 
    name: "Кижуч б/г (10+)", 
    category: "Другие виды рыбы",
    size: "4,5 кг+", 
    packaging: "вес", 
    catchDate: "Август, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 1240,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  }
];

// Helper function to get category by name
export const getCategoryByName = (name: string) => {
  // Add any category-specific info here if needed
  return { id: name.toLowerCase().replace(/\s+/g, '-') };
};
