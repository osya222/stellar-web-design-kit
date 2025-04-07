
import { Product } from '@/types/product';

// Данные о продуктах
export const products: Product[] = [
  // --- Лосось (Чили) ---
  { 
    id: 1, 
    name: "Лосось свежемороженый", 
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
    name: "Лосось свежемороженый", 
    category: "Лосось (Чили)",
    size: "6-7 кг", 
    packaging: "27 кг", 
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
    name: "Форель свежемороженая морская", 
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
    name: "Форель свежемороженая морская", 
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
    name: "Форель свежемороженая морская", 
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
  }
];

// Функция для получения категории по имени
export function getCategoryByName(categoryName: string) {
  return productCategories.find(category => category.name === categoryName);
}
