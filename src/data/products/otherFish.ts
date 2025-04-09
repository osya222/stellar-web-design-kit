
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
    image: "/lovable-uploads/0fd3ac43-ec30-425b-b149-fd187b22e947.png",
    price: undefined // ожидаем
  },
  { 
    id: 19, 
    name: "ДОРАДО н/р", 
    category: "Другие виды рыбы",
    size: "400-600", 
    packaging: "5", 
    catchDate: "Сентябрь",
    manufacturer: "Турция", 
    image: "/lovable-uploads/0fd3ac43-ec30-425b-b149-fd187b22e947.png",
    price: 895.9
  },
  { 
    id: 20, 
    name: "СИБАС н/р", 
    category: "Другие виды рыбы",
    size: "300-400", 
    packaging: "5", 
    catchDate: "Июль",
    manufacturer: "Турция", 
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png",
    price: 828.9
  },
  { 
    id: 21, 
    name: "СЕЛЬДЬ н/р", 
    category: "Другие виды рыбы",
    size: "380+", 
    packaging: "28", 
    catchDate: "Ноябрь 24",
    manufacturer: "Фарерские о-ва", 
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png",
    price: 266.9
  },
  { 
    id: 22, 
    name: "СКУМБРИЯ н/р", 
    category: "Другие виды рыбы",
    size: "400-600", 
    packaging: "25", 
    catchDate: "Октябрь 24",
    manufacturer: "Фарерские о-ва", 
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png",
    price: 399.9
  },
  { 
    id: 23, 
    name: "СКУМБРИЯ н/р", 
    category: "Другие виды рыбы",
    size: "500+", 
    packaging: "25", 
    catchDate: "Сентябрь 24",
    manufacturer: "Фарерские о-ва", 
    image: "/images/mackerel.webp",
    price: 414.9
  },
  { 
    id: 24, 
    name: "СКУМБРИЯ н/р", 
    category: "Другие виды рыбы",
    size: "500+", 
    packaging: "25", 
    catchDate: "Февраль 25",
    manufacturer: "Фарерские о-ва", 
    image: "/images/mackerel.webp",
    price: 429.9
  },
  { 
    id: 25, 
    name: "ХЕК ТУШКА пролож вес.", 
    category: "Другие виды рыбы",
    size: "150-250", 
    catchDate: "Январь",
    manufacturer: "Аргентина", 
    image: "/images/hake.jpg",
    price: 341.9
  },
  { 
    id: 26, 
    name: "КАМБАЛА б/г штучная", 
    category: "Другие виды рыбы",
    size: "0,5-1,0", 
    packaging: "20", 
    catchDate: "Июль",
    manufacturer: "Норд Вест", 
    image: "/images/flounder.jpg",
    price: undefined // ожидаем
  },
  { 
    id: 27, 
    name: "ОКУНЬ б/г потр. 4*6,5", 
    category: "Другие виды рыбы",
    size: "150-300", 
    packaging: "26", 
    catchDate: "Июль",
    manufacturer: "ФОР", 
    image: "/images/perch.png",
    price: 307.9
  },
  { 
    id: 28, 
    name: "МИНТАЙ б/г потр. штуч", 
    category: "Другие виды рыбы",
    size: "25+", 
    packaging: "13", 
    catchDate: "Август",
    manufacturer: "Русский минтай", 
    image: "/images/pollock.png",
    price: undefined // ожидаем
  },
  { 
    id: 29, 
    name: "МИНТАЙ б/г потр.", 
    category: "Другие виды рыбы",
    size: "25+", 
    packaging: "22", 
    catchDate: "Май",
    manufacturer: "ОКРФ", 
    image: "/images/pollock.png",
    price: 185.9
  },
  { 
    id: 30, 
    name: "МИНТАЙ б/г потр.", 
    category: "Другие виды рыбы",
    size: "25+", 
    packaging: "24", 
    catchDate: "Октябрь",
    manufacturer: "ПК РКЗ", 
    image: "/images/pollock.png",
    price: 185.9
  },
  { 
    id: 31, 
    name: "ТУНЕЦ ОБРЕЗЬ в/у порц.", 
    category: "Другие виды рыбы",
    size: "по 0,5 в/у", 
    packaging: "0,5", 
    catchDate: "Март",
    manufacturer: "Китай", 
    image: "/images/tuna.jpg",
    price: 417.9
  },
  { 
    id: 44, 
    name: "Барабулька н/р", 
    category: "Другие виды рыбы",
    size: "100 гр+", 
    packaging: "вес", 
    catchDate: "Апрель, 24",
    manufacturer: "Мавритания", 
    image: "/images/red-mullet.jpg",
    price: 350
  },
  { 
    id: 45, 
    name: "Вомер н/р", 
    category: "Другие виды рыбы",
    size: "100-150 гр", 
    packaging: "10 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Эквадор",
    image: "/images/vomer.jpg", 
    price: 280
  },
  { 
    id: 46, 
    name: "Вомер н/р", 
    category: "Другие виды рыбы",
    size: "150-200 гр", 
    packaging: "10 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Эквадор", 
    image: "/images/vomer.jpg",
    price: 335
  },
  { 
    id: 47, 
    name: "Вомер н/р", 
    category: "Другие виды рыбы",
    size: "200-300 гр", 
    packaging: "10 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Эквадор", 
    image: "/images/vomer.jpg",
    price: 425
  },
  { 
    id: 48, 
    name: "Горбуша б/г", 
    category: "Другие виды рыбы",
    size: "1 кг+", 
    packaging: "22 кг", 
    catchDate: "Июль, 24",
    manufacturer: "Океан", 
    image: "/images/pink-salmon.jpg",
    price: 458
  },
  { 
    id: 49, 
    name: "Гренадер-тушка", 
    category: "Другие виды рыбы",
    size: "200-500 гр", 
    packaging: "вес", 
    catchDate: "Июль, 24",
    manufacturer: "Аргентина", 
    image: "/images/grenadier.jpg",
    price: 225
  },
  { 
    id: 50, 
    name: "Гренадер-тушка", 
    category: "Другие виды рыбы",
    size: "500-1500 гр", 
    packaging: "вес", 
    catchDate: "Июль, 24",
    manufacturer: "Аргентина", 
    image: "/images/grenadier.jpg",
    price: 265
  },
  { 
    id: 51, 
    name: "Дорадо н/р", 
    category: "Другие виды рыбы",
    size: "400-600 гр", 
    packaging: "5 кг", 
    catchDate: "Май, 24",
    manufacturer: "Турция", 
    image: "/images/dorado.jpeg",
    price: 880
  },
  { 
    id: 52, 
    name: "Дори Б/Г", 
    category: "Другие виды рыбы",
    size: "420 гр+", 
    packaging: "Вес", 
    catchDate: "Сент-окт, 23",
    manufacturer: "Н.Зеландия", 
    image: "/images/john-dory.jpg",
    price: 565
  },
  { 
    id: 53, 
    name: "Игла н/р", 
    category: "Другие виды рыбы",
    size: "300-500 гр", 
    packaging: "10 кг", 
    catchDate: "Июнь, 24",
    manufacturer: "Эквадор", 
    image: "/images/needlefish.webp",
    price: 330
  },
  { 
    id: 54, 
    name: "Икра сельди в ястыках", 
    category: "Другие виды рыбы",
    packaging: "12 кг", 
    catchDate: "Апрель, 24",
    manufacturer: "Ряжская РПК", 
    image: "/images/herring-roe.jpg",
    price: 455
  },
  { 
    id: 55, 
    name: "Камбала б/г IQF", 
    category: "Другие виды рыбы",
    size: "500-1000 гр", 
    packaging: "20 кг", 
    catchDate: "Март, 24",
    manufacturer: "Норд Вест", 
    image: "/images/flounder.jpg",
    price: 282
  },
  { 
    id: 56, 
    name: "Килька с/м IQF", 
    category: "Другие виды рыбы",
    packaging: "15 кг", 
    catchDate: "Декабрь, 24",
    manufacturer: "«Балт Иней»", 
    image: "/images/sprat.jpg",
    price: 192
  },
  { 
    id: 57, 
    name: "Кижуч б/г (6-8)", 
    category: "Другие виды рыбы",
    size: "2,7-3,6 кг", 
    packaging: "вес", 
    catchDate: "Август, 24",
    manufacturer: "Чили", 
    image: "/images/coho-salmon-1.jpg",
    price: 1140
  },
  { 
    id: 58, 
    name: "Кижуч б/г (8-10)", 
    category: "Другие виды рыбы",
    size: "3,6 кг+", 
    packaging: "вес", 
    catchDate: "Август, 24",
    manufacturer: "Чили", 
    image: "/images/coho-salmon-2.jpg",
    price: 1185
  },
  { 
    id: 59, 
    name: "Кижуч б/г (10+)", 
    category: "Другие виды рыбы",
    size: "4,5 кг+", 
    packaging: "вес", 
    catchDate: "Август, 24",
    manufacturer: "Чили", 
    image: "/images/coho-salmon-2.jpg",
    price: 1240
  }
];
