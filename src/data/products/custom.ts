
import { Product } from '@/types/product';

export const customProducts: Product[] = [
  {
    id: 1001, // Using a unique numeric ID as per existing type
    name: "Морской коктейль",
    category: "Морепродукты", // Match existing category naming
    description: "Микс из креветок, мидий, кальмаров и других морепродуктов",
    price: 1190,
    image: "/images/products/seafood-mix.png",
    manufacturer: "Морская Коллекция", // Adding a required manufacturer field
    packaging: "Вакуумная упаковка",
    size: "250г"
  },
  {
    id: 1002,
    name: "Креветки тигровые",
    category: "Морепродукты",
    description: "Крупные креветки в панцире, отличные для гриля",
    price: 1590,
    image: "/images/products/tiger-shrimp.png", // Note: changed image path
    manufacturer: "Морская Коллекция",
    packaging: "В панцире",
    size: "500г"
  },
  {
    id: 1003,
    name: "Мидии в раковине",
    category: "Морепродукты",
    description: "Свежие мидии из северных морей",
    price: 890,
    image: "/images/products/mussels.png", // Note: changed image path
    manufacturer: "Морская Коллекция",
    packaging: "В раковине",
    size: "400г"
  }
];
