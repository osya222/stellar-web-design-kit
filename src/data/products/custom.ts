
import { Product } from '@/types/product';

// Define the array of custom products
export const customProducts: Product[] = [
  {
    id: 1001,
    name: "Морской коктейль", // Using name instead of title to match Product type
    category: "Морепродукты",
    description: "Микс из креветок, мидий, кальмаров и других морепродуктов",
    price: 1190,
    image: "/images/products/seafood-mix.png",
    manufacturer: "Морская Коллекция",
    packaging: "Вакуумная упаковка",
    size: "250г"
  },
  {
    id: 1002,
    name: "Креветки тигровые",
    category: "Морепродукты",
    description: "Крупные креветки в панцире, отличные для гриля",
    price: 1590,
    image: "/images/products/tiger-shrimp.png",
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
    image: "/images/products/mussels.png",
    manufacturer: "Морская Коллекция",
    packaging: "В раковине",
    size: "400г"
  }
];

// In-memory storage for custom products
let inMemoryCustomProducts = [...customProducts];

// Helper function to get custom products
export const getCustomProducts = (): Product[] => {
  return inMemoryCustomProducts;
};

// Helper function to add or update a custom product
export const saveCustomProduct = (product: Product): void => {
  // If it's a new product, assign an ID
  if (!product.id) {
    const maxId = Math.max(0, ...inMemoryCustomProducts.map(p => p.id));
    product.id = maxId + 1;
  }
  
  // Find and replace existing product or add new one
  const index = inMemoryCustomProducts.findIndex(p => p.id === product.id);
  if (index >= 0) {
    inMemoryCustomProducts[index] = product;
  } else {
    inMemoryCustomProducts.push(product);
  }
  
  console.log(`Product saved: ${product.name} (ID: ${product.id})`);
};

// Helper function to delete a custom product
export const deleteCustomProduct = (productId: number): void => {
  inMemoryCustomProducts = inMemoryCustomProducts.filter(p => p.id !== productId);
  console.log(`Product deleted: ID ${productId}`);
};
