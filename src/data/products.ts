
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
    category: "Икра",
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
  },
  { 
    id: 60, 
    name: "Котлеты кальмаровые", 
    category: "Полуфабрикаты",
    packaging: "5 кг", 
    catchDate: "Сентябрь, 24",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 255,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 61, 
    name: "Котлеты куриные", 
    category: "Полуфабрикаты",
    packaging: "10,5 кг", 
    catchDate: "Сентябрь, 24",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 400,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 62, 
    name: "Котлеты лососевые", 
    category: "Полуфабрикаты",
    packaging: "5 кг", 
    catchDate: "Июль, 24",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 240,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 63, 
    name: "Котлеты тресковые",
    category: "Полуфабрикаты",
    packaging: "5 кг", 
    catchDate: "Июль, 24",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 200,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 64, 
    name: "Котлеты — Филе горбуши ТРЕУГОЛЬНИКИ",
    category: "Полуфабрикаты",
    packaging: "5 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 445,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 65, 
    name: "Котлеты — из филе минтая (наггетсы/палочки/треуг/фишкейки)",
    category: "Полуфабрикаты",
    packaging: "5 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 315,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 66, 
    name: "Котлеты — Филе минтая в кляре",
    category: "Полуфабрикаты",
    packaging: "5 кг", 
    catchDate: "Февраль, 25",
    manufacturer: "«Юниант»", 
    prices: {
      smallWholesale: 410,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 67, 
    name: "Красноглазка н/р",
    category: "Другие виды рыбы",
    size: "300 гр+", 
    packaging: "20 кг", 
    catchDate: "Март, 24",
    manufacturer: "Н.Зеландия", 
    prices: {
      smallWholesale: 225,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 68, 
    name: "Креветка с/м очищенная Б/Хв (Фас по 1 кг)",
    category: "Креветки и морепродукты",
    size: "16-20 шт/ф", 
    packaging: "10*1 кг", 
    catchDate: "Август, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 1115,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 69, 
    name: "Креветка с/м очищенная Б/Хв (Фас по 1 кг)",
    category: "Креветки и морепродукты",
    size: "26-30 шт/ф", 
    packaging: "10*1 кг", 
    catchDate: "Август, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 1015,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 70, 
    name: "Креветка с/м очищенная С/Хв (Фас по 1 кг)",
    category: "Креветки и морепродукты",
    size: "26-30 шт/ф", 
    packaging: "10*1 кг", 
    catchDate: "Август, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 1005,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 71, 
    name: "Креветка Королевская Ваннамей (14%)",
    category: "Креветки и морепродукты",
    size: "50-70 шт", 
    packaging: "5 кг", 
    catchDate: "Август, 24",
    manufacturer: "«Камарон»", 
    prices: {
      smallWholesale: 560,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 72, 
    name: "Креветка Королевская Ваннамей (Глазурь)",
    category: "Креветки и морепродукты",
    size: "50-70 шт", 
    packaging: "5 кг", 
    catchDate: "Август, 24",
    manufacturer: "«Камарон»", 
    prices: {
      smallWholesale: 555,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 73, 
    name: "Креветки (лангустины) Б/Г С2",
    category: "Креветки и морепродукты",
    size: "56-100 шт/кг", 
    packaging: "6*2 кг", 
    catchDate: "Март, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 1000,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 74, 
    name: "Креветки (лангустины) Н/Р L1",
    category: "Креветки и морепродукты",
    size: "10-20 шт/кг", 
    packaging: "6*2 кг", 
    catchDate: "Август, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 860,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 75, 
    name: "Креветка северная",
    category: "Креветки и морепродукты",
    size: "150 шт+", 
    packaging: "5 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "«Беломорский Рыбак»", 
    prices: {
      smallWholesale: 560,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 76, 
    name: "Креветка северная",
    category: "Креветки и морепродукты",
    size: "90-120 шт/кг", 
    packaging: "5 кг", 
    catchDate: "Декабрь, 23",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 780,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 77, 
    name: "Лемонема-тушка",
    category: "Другие виды рыбы",
    packaging: "22 кг", 
    catchDate: "Август, 24",
    manufacturer: "Д. Восток", 
    prices: {
      smallWholesale: 168,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 78, 
    name: "Лосось С/Г premium",
    category: "Лосось (Чили)",
    size: "6-7 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 1450,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 79, 
    name: "Лосось С/Г premium",
    category: "Лосось (Чили)",
    size: "7-8 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 1470,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 80, 
    name: "Мидии на половинке раковины (Голубые)",
    category: "Мидии",
    size: "30-40 шт/кг", 
    packaging: "12 кг", 
    catchDate: "Сентябрь, 24",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 470,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 81, 
    name: "Минтай Б/Г",
    category: "Другие виды рыбы",
    size: "30 см+", 
    packaging: "ожидается", 
    catchDate: "Декабрь, 24",
    manufacturer: "Д. Восток", 
    prices: {
      smallWholesale: 185,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 82, 
    name: "Молочная н/р",
    category: "Другие виды рыбы",
    size: "700 гр+", 
    packaging: "10 кг", 
    catchDate: "Ноябрь, 23",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 490,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 83, 
    name: "Мойва с/м (18 мес)",
    category: "Другие виды рыбы",
    packaging: "33 кг", 
    catchDate: "Март, 24",
    manufacturer: "«Азимут»", 
    prices: {
      smallWholesale: 182,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 84, 
    name: "Мойва с/м IQF",
    category: "Другие виды рыбы",
    packaging: "11 кг", 
    catchDate: "Февраль, 24",
    manufacturer: "АОВК", 
    prices: {
      smallWholesale: 177,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 85, 
    name: "Мясо хека (колбаса)",
    category: "Другие виды рыбы",
    packaging: "вес", 
    catchDate: "Авг-сент, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 515,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 86, 
    name: "Окунь красный Б/Г короб",
    category: "Другие виды рыбы",
    size: "150-300 гр", 
    packaging: "26 кг", 
    catchDate: "Май, 24",
    manufacturer: "ФОР", 
    prices: {
      smallWholesale: 303,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 87, 
    name: "Путассу н/р",
    category: "Другие виды рыбы",
    size: "21 см+", 
    packaging: "24 кг", 
    catchDate: "Январь,25",
    manufacturer: "«АКРОС»", 
    prices: {
      smallWholesale: 68,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 88, 
    name: "Саворин Б/Г L",
    category: "Другие виды рыбы",
    size: "850-1300 гр", 
    packaging: "24 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "Н.Зеландия", 
    prices: {
      smallWholesale: 610,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 89, 
    name: "Саворин Б/Г 2L",
    category: "Другие виды рыбы",
    size: "1300 гр+", 
    packaging: "24 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "Н.Зеландия", 
    prices: {
      smallWholesale: 625,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 90, 
    name: "Салака н/р IQF",
    category: "Другие виды рыбы",
    size: "12 см+", 
    packaging: "22 кг", 
    catchDate: "Март, 24",
    manufacturer: "«Балт Иней»", 
    prices: {
      smallWholesale: 139,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 91, 
    name: "Сардина (иваси) н/р",
    category: "Другие виды рыбы",
    size: "17 см+", 
    packaging: "19 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "Ясный", 
    prices: {
      smallWholesale: 163,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 92, 
    name: "Сельдь н/р",
    category: "Другие виды рыбы",
    size: "300 гр+", 
    packaging: "24 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "Захар Сорокин", 
    prices: {
      smallWholesale: 202,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 93, 
    name: "Сельдь н/р",
    category: "Другие виды рыбы",
    size: "300 гр+", 
    packaging: "30 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Вестрыбфлот", 
    prices: {
      smallWholesale: 212,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 94, 
    name: "Сельдь н/р",
    category: "Другие виды рыбы",
    size: "350 гр+", 
    packaging: "29 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 240,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 95, 
    name: "Сельдь н/р",
    category: "Другие виды рыбы",
    size: "380 гр +", 
    packaging: "29 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 270,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 96, 
    name: "Сельдь н/р",
    category: "Другие виды рыбы",
    size: "400 гр+", 
    packaging: "29 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 310,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 97, 
    name: "Сибас н/р",
    category: "Другие виды рыбы",
    size: "300-400 гр", 
    packaging: "5 кг", 
    catchDate: "Июнь, 23",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 805,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 98, 
    name: "Сибас н/р",
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "5 кг", 
    catchDate: "Июнь, 23",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 795,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 99, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "300-600 гр", 
    packaging: "30 кг", 
    catchDate: "Август, 24",
    manufacturer: "«Лазурный»", 
    prices: {
      smallWholesale: 317,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 100, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "25 кг", 
    catchDate: "Сентябрь, 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 375,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 101, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "25 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 385,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 102, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "25 кг", 
    catchDate: "Январь,25",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 395,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 103, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "30 кг", 
    catchDate: "Сент-окт, 24",
    manufacturer: "Лазурный", 
    prices: {
      smallWholesale: 373,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 104, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "30 кг", 
    catchDate: "Август, 24",
    manufacturer: "Замоскворечье", 
    prices: {
      smallWholesale: 343,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 105, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "500 гр+", 
    packaging: "25 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 410,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 106, 
    name: "Скумбрия н/р",
    category: "Другие виды рыбы",
    size: "500 гр+", 
    packaging: "25 кг", 
    catchDate: "Январь,25",
    manufacturer: "Фарерские о-ва", 
    prices: {
      smallWholesale: 425,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 107, 
    name: "Ставрида н/р",
    category: "Другие виды рыбы",
    size: "900 гр+", 
    packaging: "20 кг", 
    catchDate: "Март, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 210,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 108, 
    name: "Угорь морской ПСГ",
    category: "Другие виды рыбы",
    size: "0,5-1 кг", 
    packaging: "12 кг", 
    catchDate: "Август, 24",
    manufacturer: "Н.Зеландия", 
    prices: {
      smallWholesale: 1365,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 109, 
    name: "Фарш минтая",
    category: "Другие виды рыбы",
    packaging: "22,452 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "«Восточный»", 
    prices: {
      smallWholesale: 157,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 110, 
    name: "Филе лосося В/У Трим D Premium",
    category: "Филе рыбы",
    size: "3-4 фунта", 
    packaging: "10 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "Чили", 
    prices: {
      smallWholesale: 1815,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 111, 
    name: "Филе масляной н/шк",
    category: "Филе рыбы",
    size: "4-6 кг", 
    packaging: "30 кг", 
    catchDate: "Май, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 890,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 112, 
    name: "Филе масляной н/шк",
    category: "Филе рыбы",
    size: "6 кг+", 
    packaging: "30 кг", 
    catchDate: "Май, 24",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 910,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 113, 
    name: "Филе минтая фасов по 1 кг",
    category: "Филе рыбы",
    packaging: "21 кг", 
    catchDate: "Декабрь, 24",
    manufacturer: "Русское море", 
    prices: {
      smallWholesale: 383,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 114, 
    name: "Филе пангасиуса белого (5%)",
    category: "Филе рыбы",
    size: "220 гр+", 
    packaging: "10 кг", 
    catchDate: "Февраль, 24",
    manufacturer: "Вьетнам", 
    prices: {
      smallWholesale: 275,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 115, 
    name: "Филе пангасиуса розов (5%)",
    category: "Филе рыбы",
    size: "220 гр+", 
    packaging: "10 кг", 
    catchDate: "Февраль, 24",
    manufacturer: "Вьетнам", 
    prices: {
      smallWholesale: 240,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 116, 
    name: "Филе пикши н/ш",
    category: "Филе рыбы",
    size: "400- гр", 
    packaging: "ожидается", 
    catchDate: "Ноябрь, 24",
    manufacturer: "«АОВК»", 
    prices: {
      smallWholesale: 498.0,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 117, 
    name: "Филе тилапии",
    category: "Филе рыбы",
    size: "3-5 ун", 
    packaging: "10 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 560,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 118, 
    name: "Филе тилапии",
    category: "Филе рыбы",
    size: "5-7 ун", 
    packaging: "10 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 570,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 119, 
    name: "Филе тунца (Лоины) 2-4 (AА)",
    category: "Филе рыбы",
    packaging: "25 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "Вьетнам", 
    prices: {
      smallWholesale: 820,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 120, 
    name: "Филе хека б/к",
    category: "Филе рыбы",
    size: "60-120 гр", 
    packaging: "18 кг", 
    catchDate: "Февраль, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 505,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 121, 
    name: "Филе хека б/к",
    category: "Филе рыбы",
    size: "120-200 гр", 
    packaging: "7 кг", 
    catchDate: "Ноябрь, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 525,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 122, 
    name: "Форель б/г (море)",
    category: "Форель (Турция)",
    size: "0,7-0,9 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 935,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 123, 
    name: "Форель Б/Г (Callut)",
    category: "Форель (Турция)",
    size: "0,9-1,4 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 950,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 124, 
    name: "Форель б/г (море)",
    category: "Форель (Турция)",
    size: "0,9-1,4 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 970,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 125, 
    name: "Форель б/г (море)",
    category: "Форель (Турция)",
    size: "1,4-1,8 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 990,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 126, 
    name: "Форель б/г (море)",
    category: "Форель (Турция)",
    size: "1,8-2,7 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 1045,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 127, 
    name: "Форель Б/Г (4-6)",
    category: "Форель (Турция)",
    size: "1,8-2,7 кг", 
    packaging: "25,2 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 1105,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 128, 
    name: "Форель б/г (море)",
    category: "Форель (Турция)",
    size: "2,7-3,6 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 1135,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 129, 
    name: "Форель Б/Г (6-9)",
    category: "Форель (Турция)",
    size: "2,7-3,6 кг", 
    packaging: "25,2 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "Китай", 
    prices: {
      smallWholesale: 1140,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 130, 
    name: "Форель б/г (море)",
    category: "Форель (Турция)",
    size: "3,6-4,5 кг", 
    packaging: "вес", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 1250,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 131, 
    name: "Форель ПСГ",
    category: "Форель (Турция)",
    size: "350-500 гр", 
    packaging: "12 кг", 
    catchDate: "Май, 24",
    manufacturer: "Иран", 
    prices: {
      smallWholesale: 390.0,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 132, 
    name: "Форель ПСГ",
    category: "Форель (Турция)",
    size: "500 гр+", 
    packaging: "12 кг", 
    catchDate: "Май, 24",
    manufacturer: "Иран", 
    prices: {
      smallWholesale: 400.0,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 133, 
    name: "Форель н/р",
    category: "Форель (Турция)",
    size: "800-1200 гр", 
    packaging: "вес", 
    catchDate: "Июнь, 24",
    manufacturer: "Турция", 
    prices: {
      smallWholesale: 715,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 134, 
    name: "Хамса с/м",
    category: "Другие виды рыбы",
    packaging: "22 кг", 
    catchDate: "Январь,25",
    manufacturer: "Крым", 
    prices: {
      smallWholesale: 137,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 135, 
    name: "Хек-тушка (пролож)",
    category: "Другие виды рыбы",
    size: "80-200 гр", 
    packaging: "вес", 
    catchDate: "Декабрь, 23",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 295,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 136, 
    name: "Хек-тушка (пролож)",
    category: "Другие виды рыбы",
    size: "150-250 гр", 
    packaging: "вес", 
    catchDate: "Март, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 315,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 137, 
    name: "Хек-тушка (пролож)",
    category: "Другие виды рыбы",
    size: "200-350 гр", 
    packaging: "3~7 кг", 
    catchDate: "Март, 24",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 320,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 138, 
    name: "Хек-тушка (пролож)",
    category: "Другие виды рыбы",
    size: "350-500 гр", 
    packaging: "3~7 кг", 
    catchDate: "Ноябрь, 23",
    manufacturer: "Аргентина", 
    prices: {
      smallWholesale: 350,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 139, 
    name: "Хек-тушка",
    category: "Другие виды рыбы",
    size: "500 гр+", 
    packaging: "10 кг", 
    catchDate: "Ноябрь, 23",
    manufacturer: "Эквадор", 
    prices: {
      smallWholesale: 315,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 140, 
    name: "Хребты форели",
    category: "Другие виды рыбы",
    packaging: "14 кг", 
    catchDate: "Октябрь, 24",
    manufacturer: "«Море Рыбы»", 
    prices: {
      smallWholesale: 185,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  },
  { 
    id: 141, 
    name: "Икра сельди в ястыках",
    category: "Икра",
    packaging: "12 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Ряжская РПК", 
    prices: {
      smallWholesale: 455,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  }
];

// Категории продуктов
export const productCategories = [
  { id: "losos-chili", name: "Лосось (Чили)", description: "Свежий лосось премиум-класса из холодных вод Чили" },
  { id: "forel-turciya", name: "Форель (Турция)", description: "Качественная форель из Турции разных размеров" },
  { id: "krevetki-moreprodukty", name: "Креветки и морепродукты", description: "Широкий выбор креветок и других морепродуктов" },
  { id: "midii", name: "Мидии", description: "Мидии в различных видах и упаковках" },
  { id: "drugie-vidy-ryby", name: "Другие виды рыбы", description: "Большой ассортимент различных видов рыбы" },
  { id: "file-ryby", name: "Филе рыбы", description: "Филе различных видов рыб" },
  { id: "polufabrikaty", name: "Полуфабрикаты", description: "Рыбные полуфабрикаты высокого качества" },
  { id: "ikra", name: "Икра", description: "Различные виды икры" }
];

// Получение информации о категории по названию
export const getCategoryByName = (categoryName: string) => {
  return productCategories.find(category => category.name === categoryName);
};

