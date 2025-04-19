
import { Product } from "@/types/product";

export const products: Product[] = [
  // Форель категория
  {
    id: 1,
    name: "Форель охлажденная",
    price: 1200,
    category: "Форель (Турция)",
    description: "Свежая форель высшего качества",
    weight: "1 кг",
    packaging: "Вакуумная упаковка",
    manufacturer: "Морепродукт",
    image: "/lovable-uploads/923eda92-d974-48f3-813d-339626f70616.png"
  },
  {
    id: 2,
    name: "Форель стейк",
    price: 950,
    category: "Форель (Турция)",
    description: "Стейк из свежей форели",
    weight: "500 г",
    packaging: "Вакуумная упаковка",
    manufacturer: "Морепродукт",
    image: "/lovable-uploads/923eda92-d974-48f3-813d-339626f70616.png"
  },
  // Лосось категория
  {
    id: 3,
    name: "Лосось премиум",
    price: 1500,
    category: "Лосось (Чили)",
    description: "Премиальный лосось из Чили",
    weight: "1 кг",
    packaging: "Вакуумная упаковка",
    manufacturer: "Морепродукт",
    image: "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png"
  },
  {
    id: 4,
    name: "Лосось филе",
    price: 1300,
    category: "Лосось (Чили)", 
    description: "Филе лосося без костей",
    weight: "500 г",
    packaging: "Вакуумная упаковка",
    manufacturer: "Морепродукт",
    image: "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png"
  },
  // Креветки категория
  {
    id: 5,
    name: "Креветки тигровые",
    price: 1800,
    category: "Креветки и морепродукты",
    description: "Крупные тигровые креветки",
    weight: "500 г",
    packaging: "Пластиковый контейнер",
    manufacturer: "Морепродукт",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  },
  {
    id: 6,
    name: "Креветки королевские",
    price: 2100,
    category: "Креветки и морепродукты",
    description: "Королевские креветки премиум качества",
    weight: "500 г",
    packaging: "Пластиковый контейнер",
    manufacturer: "Морепродукт",
    image: "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
  }
];

