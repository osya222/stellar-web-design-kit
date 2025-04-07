import { Product } from '@/types/product';

// Другие виды рыбы products
export const otherFishProducts: Product[] = [
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
    image: "https://fish-or-meat.ru/d/051a4437.jpg",
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
    image: "https://nau54.ru/2/tradeboardkbqU37_img.jpg",
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
    image: "https://rybexpert.ru/wp-content/uploads/2023/12/kambala-1.jpg",
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
    name: "МИНТА�� б/г потр. штуч", 
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
    image: "https://i0.wp.com/xn--80agnucfc0a.xn--p1ai/wp-content/uploads/2018/10/vomer___.jpg?fit=600%2C518&ssl=1", 
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
    image: "https://i0.wp.com/xn--80agnucfc0a.xn--p1ai/wp-content/uploads/2018/10/vomer___.jpg?fit=600%2C518&ssl=1",
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
    image: "https://i0.wp.com/xn--80agnucfc0a.xn--p1ai/wp-content/uploads/2018/10/vomer___.jpg?fit=600%2C518&ssl=1",
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
    name: "Гре��адер-тушка", 
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
    image: "https://cdn1.ozone.ru/s3/multimedia-c/c600/6069702384.jpg",
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
    category: "Другие виды рыбы",
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
    image: "https://rybexpert.ru/wp-content/uploads/2023/12/kambala-1.jpg",
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
    image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/288/225/654/117/212/3/100029691550b0.jpg",
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
    image: "https://sun1-26.userapi.com/s/v1/ig2/D8R-fACvTmyqmghGZcQEHe8m4VIWeghxEygbT9u1UEG8OyPOJVYVIvAMITPjSTD9d39ZIOTlmYN1lJxsQTdT8Vkm.jpg",
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
    image: "https://biomore.ru/upload/iblock/659/pcj7nol0d5uusgeukbdayvx28gxtdgno.jpg",
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
    image: "https://biomore.ru/upload/iblock/659/pcj7nol0d5uusgeukbdayvx28gxtdgno.jpg",
    prices: {
      smallWholesale: 1240,
      mediumWholesale: undefined,
      largeWholesale: undefined
    }
  }
];
