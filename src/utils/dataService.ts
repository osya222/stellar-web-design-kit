
import { Product } from "@/types/product";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ЛОСОСЬ с/г потр. штучн",
    category: "Лосось (Чили)",
    manufacturer: "Чили Premium",
    price: 1413,
    inStock: true
  },
  {
    id: "2",
    name: "ЛОСОСЬ с/г потр.",
    category: "Лосось (Чили)", 
    manufacturer: "Чили Premium",
    price: 1457,
    inStock: true
  },
  {
    id: "3",
    name: "ФОРЕЛЬ б/г потр М",
    category: "Форель (Турция)",
    manufacturer: "Турция",
    price: 1014,
    inStock: true
  },
  {
    id: "4", 
    name: "ФОРЕЛЬ б/г потр М",
    category: "Форель (Турция)",
    manufacturer: "Турция",
    price: 1064,
    inStock: true
  },
  {
    id: "5",
    name: "ФОРЕЛЬ б/г потр М",
    category: "Форель (Турция)",
    manufacturer: "Турция",
    price: 1166,
    inStock: true
  },
  {
    id: "6",
    name: "КРЕВЕТКА ваннамей свежая в панцире б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1002,
    inStock: true
  },
  {
    id: "7",
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1004,
    inStock: true
  },
  {
    id: "8",
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1071,
    inStock: true
  },
  {
    id: "9",
    name: "КРЕВЕТКА ваннамей вареная очищенная б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1240,
    inStock: true
  },
  {
    id: "10",
    name: "ЛАНГУСТИНЫ с/м L 2",
    category: "Креветки и морепродукты",
    manufacturer: "Аргентина",
    price: 795,
    inStock: true
  },
  {
    id: "11",
    name: "ЛАНГУСТИНЫ с/м L 1",
    category: "Креветки и морепродукты",
    manufacturer: "Аргентина",
    price: 884,
    inStock: true
  },
  {
    id: "12",
    name: "ЛАНГУСТИНЫ с/м С 2",
    category: "Креветки и морепродукты",
    manufacturer: "Аргентина",
    price: 1022,
    inStock: true
  },
  {
    id: "13",
    name: "МЕДАЛЬОНЫ из креветки",
    category: "Креветки и морепродукты",
    manufacturer: "Китай",
    price: 1192,
    inStock: true
  },
  {
    id: "14",
    name: "МИДИИ раковина в собственном соку",
    category: "Мидии",
    manufacturer: "Чили",
    price: 391,
    inStock: true
  },
  {
    id: "15",
    name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино",
    category: "Мидии",
    manufacturer: "Чили",
    price: 483,
    inStock: true
  },
  {
    id: "16",
    name: "МЯСО МИДИЙ в/м",
    category: "Мидии",
    manufacturer: "Чили",
    price: 520,
    inStock: true
  },
  {
    id: "17",
    name: "МЯСО МИДИЙ в/м",
    category: "Мидии",
    manufacturer: "Чили",
    price: 509,
    inStock: true
  },
  {
    id: "18",
    name: "ДОРАДО н/р",
    category: "Другие виды рыбы",
    manufacturer: "Турция",
    price: 0,
    inStock: false
  },
  {
    id: "19",
    name: "ДОРАДО н/р",
    category: "Другие виды рыбы",
    manufacturer: "Турция",
    price: 895,
    inStock: true
  },
  {
    id: "20",
    name: "СИБАС н/р",
    category: "Другие виды рыбы",
    manufacturer: "Турция",
    price: 828,
    inStock: true
  },
  {
    id: "21",
    name: "СЕЛЬДЬ н/р",
    category: "Другие виды рыбы",
    manufacturer: "Фарерские о-ва",
    price: 266,
    inStock: true
  }
];

export async function fetchProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const product = PRODUCTS.find(p => p.id === id);
  return product || null;
}

// Функция для получения списка всех категорий
export async function fetchCategories(): Promise<string[]> {
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));
  return categories;
}

// Функция для получения всех производителей
export async function fetchManufacturers(): Promise<string[]> {
  const manufacturers = Array.from(new Set(PRODUCTS.map(p => p.manufacturer)));
  return manufacturers;
}

// Функция для получения URL изображения для героя
export function getHeroImageUrl(): string {
  // Возвращаем URL-адрес изображения для героя
  return "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
}
