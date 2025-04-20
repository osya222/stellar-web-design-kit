import { Product } from "@/types/product";

// Initial product data
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ЛОСОСЬ с/г потр. штучн",
    category: "Лосось (Чили)",
    manufacturer: "Чили Premium",
    price: 1413,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "ЛОСОСЬ с/г потр.",
    category: "Лосось (Чили)", 
    manufacturer: "Чили Premium",
    price: 1457,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    name: "ФОРЕЛЬ б/г потр М",
    category: "Форель (Турция)",
    manufacturer: "Турция",
    price: 1014,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4", 
    name: "ФОРЕЛЬ б/г потр М",
    category: "Форель (Турция)",
    manufacturer: "Турция",
    price: 1064,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    name: "ФОРЕЛЬ б/г потр М",
    category: "Форель (Турция)",
    manufacturer: "Турция",
    price: 1166,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    name: "КРЕВЕТКА ваннамей свежая в панцире б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1002,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "7",
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1004,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "8",
    name: "КРЕВЕТКА ваннамей свежая очищенная б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1071,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "9",
    name: "КРЕВЕТКА ваннамей вареная очищенная б/г",
    category: "Креветки и морепродукты",
    manufacturer: "Индия",
    price: 1240,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "10",
    name: "ЛАНГУСТИНЫ с/м L 2",
    category: "Креветки и морепродукты",
    manufacturer: "Аргентина",
    price: 795,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "11",
    name: "ЛАНГУСТИНЫ с/м L 1",
    category: "Креветки и морепродукты",
    manufacturer: "Аргентина",
    price: 884,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "12",
    name: "ЛАНГУСТИНЫ с/м С 2",
    category: "Креветки и морепродукты",
    manufacturer: "Аргентина",
    price: 1022,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "13",
    name: "МЕДАЛЬОНЫ из креветки",
    category: "Креветки и морепродукты",
    manufacturer: "Китай",
    price: 1192,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "14",
    name: "МИДИИ раковина в собственном соку",
    category: "Мидии",
    manufacturer: "Чили",
    price: 391,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "15",
    name: "МИДИИ раковина сливки-чеснок/томат-чеснок/вино",
    category: "Мидии",
    manufacturer: "Чили",
    price: 483,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "16",
    name: "МЯСО МИДИЙ в/м",
    category: "Мидии",
    manufacturer: "Чили",
    price: 520,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "17",
    name: "МЯСО МИДИЙ в/м",
    category: "Мидии",
    manufacturer: "Чили",
    price: 509,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "18",
    name: "ДОРАДО н/р",
    category: "Другие виды рыбы",
    manufacturer: "Турция",
    price: 0,
    inStock: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "19",
    name: "ДОРАДО н/р",
    category: "Другие виды рыбы",
    manufacturer: "Турция",
    price: 895,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "20",
    name: "СИБАС н/р",
    category: "Другие виды рыбы",
    manufacturer: "Турция",
    price: 828,
    inStock: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "21",
    name: "СЕЛЬДЬ н/р",
    category: "Другие виды рыбы",
    manufacturer: "Фарерские о-ва",
    price: 266,
    inStock: true,
    imageUrl: "/placeholder.svg"
  }
];

// -- Очищаем работу с localStorage и blob-картинками --

// Local storage key for product data
const PRODUCTS_STORAGE_KEY = 'productsData';

// Load persistent product data if available
let activeProducts: Product[] = [];

// Initialize products from localStorage or default data
const initializeProducts = () => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side: try to load from localStorage
      const savedData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (savedData) {
        activeProducts = JSON.parse(savedData);
        console.log('Loaded products from localStorage');
      } else {
        // If no data in localStorage, use default products
        activeProducts = [...PRODUCTS];
        // Save initial data to localStorage
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(activeProducts));
        console.log('Initialized products with default data');
      }
    } else {
      // On server or in build - just use defaults
      activeProducts = [...PRODUCTS];
    }
  } catch (error) {
    console.error('Error loading product data:', error);
    activeProducts = [...PRODUCTS]; // Fallback to default products
  }
};

// Initialize products on module load
initializeProducts();

// Helper function to persist product data
const persistProductData = () => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side: save to localStorage
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(activeProducts));
      console.log('Products saved to localStorage');
    }
  } catch (error) {
    console.error('Error saving product data:', error);
  }
};

// Больше ничего не храним в localStorage! Всё только через путь к файлу.

// Для обратной совместимости getProductImage просто возвращает imageUrl
export const getProductImage = (productId: string): string | null => {
  const product = activeProducts.find((p) => p.id === productId);
  if (product && product.imageUrl && product.imageUrl !== '/placeholder.svg') {
    return product.imageUrl;
  }
  return null;
};

export async function fetchProducts(): Promise<Product[]> {
  return activeProducts;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const product = activeProducts.find(p => p.id === id);
  return product || null;
}

export async function fetchCategories(): Promise<string[]> {
  const categories = Array.from(new Set(activeProducts.map(p => p.category)));
  return categories;
}

export async function fetchManufacturers(): Promise<string[]> {
  const manufacturers = Array.from(new Set(activeProducts.map(p => p.manufacturer)));
  return manufacturers;
}

export function getHeroImageUrl(): string {
  return "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";
}

/**
 * Creates a new product and persists it
 * @param product Product to create
 * @returns Created product
 */
export async function createProduct(product: Partial<Product>): Promise<Product> {
  // Ensure required fields are present
  if (!product.id || !product.name || !product.category || !product.manufacturer) {
    throw new Error('Required product fields are missing');
  }

  // Create the new product
  const newProduct: Product = {
    id: product.id,
    name: product.name,
    category: product.category,
    manufacturer: product.manufacturer,
    price: product.price ?? 0,
    description: product.description ?? '',
    imageUrl: product.imageUrl ?? '/placeholder.svg',
    inStock: product.inStock ?? true,
    weight: product.weight,
    unit: product.unit as Product['unit'],
    isPopular: product.isPopular ?? false
  };

  activeProducts.push(newProduct);
  persistProductData();
  return newProduct;
}

/**
 * Updates an existing product
 * @param product Product with updated fields
 * @returns Updated product or null if not found
 */
export async function updateProduct(product: Partial<Product> & { id: string }): Promise<Product> {
  const index = activeProducts.findIndex(p => p.id === product.id);

  if (index === -1) {
    throw new Error(`Product with ID ${product.id} not found`);
  }

  activeProducts[index] = {
    ...activeProducts[index],
    ...product
  };

  persistProductData();
  return activeProducts[index];
}

/**
 * Deletes a product by ID
 * @param productId ID of the product to delete
 * @returns boolean indicating success
 */
export async function deleteProduct(productId: string): Promise<boolean> {
  const initialLength = activeProducts.length;
  activeProducts = activeProducts.filter(p => p.id !== productId);

  if (initialLength !== activeProducts.length) {
    persistProductData();
    return true;
  }
  return false;
}

/**
 * Updates a product's image and persists the change
 * @param productId ID of the product
 * @param imagePath Path to the image
 * @returns Updated product or null if not found
 */
export async function updateProductImage(
  productId: string,
  imagePath: string
): Promise<Product | null> {
  // Find the product index
  const productIndex = activeProducts.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    console.error(`Product with ID ${productId} not found`);
    return null;
  }

  // Обновляем путь изображения (imageUrl)
  activeProducts[productIndex] = {
    ...activeProducts[productIndex],
    imageUrl: imagePath
  };

  persistProductData();
  return activeProducts[productIndex];
}
