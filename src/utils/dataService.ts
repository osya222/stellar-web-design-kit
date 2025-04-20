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

// Local storage key for product data
const PRODUCTS_STORAGE_KEY = 'productsData';
// Новое хранилище для кеширования изображений
const IMAGE_CACHE_STORAGE_KEY = 'productImagesCache';

// Load persistent product data if available
let activeProducts: Product[] = [];
// Глобальный кеш для изображений
let imageCache: Record<string, string> = {};

// Initialize products and image cache from localStorage
const initializeProducts = () => {
  try {
    if (typeof window !== 'undefined') {
      // Загрузка продуктов
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
      
      // Загрузка кеша изображений
      const savedImageCache = localStorage.getItem(IMAGE_CACHE_STORAGE_KEY);
      if (savedImageCache) {
        imageCache = JSON.parse(savedImageCache);
        console.log('Loaded image cache from localStorage');
      } else {
        // Инициализация пустого кеша
        imageCache = {};
        localStorage.setItem(IMAGE_CACHE_STORAGE_KEY, JSON.stringify(imageCache));
        console.log('Initialized empty image cache');
      }
    }
  } catch (error) {
    console.error('Error loading data:', error);
    activeProducts = [...PRODUCTS]; // Fallback to default products
    imageCache = {}; // Empty cache as fallback
  }
};

// Initialize on module load
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

// Helper function to persist image cache
const persistImageCache = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(IMAGE_CACHE_STORAGE_KEY, JSON.stringify(imageCache));
      console.log('Image cache saved to localStorage');
    }
  } catch (error) {
    console.error('Error saving image cache:', error);
  }
};

/**
 * Get product image URL from cache
 * @param productId Product ID
 * @returns Image URL from cache or null if not found
 */
export function getProductImage(productId: string): string | null {
  return imageCache[productId] || null;
}

/**
 * Cache product image preview for temporary use
 * @param productId Product ID
 * @param imageUrl Image URL
 */
export function cacheProductImage(productId: string, imageUrl: string): void {
  imageCache[productId] = imageUrl;
  persistImageCache();
}

/**
 * Clears the image cache for a specific product
 * @param productId Product ID
 */
export function clearProductImageCache(productId: string): void {
  if (imageCache[productId]) {
    delete imageCache[productId];
    persistImageCache();
  }
}

// Основные функции для работы с продуктами
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
  console.log('Creating product with data:', product);
  
  // Ensure required fields are present
  if (!product.id || !product.name || !product.category || !product.manufacturer) {
    throw new Error('Required product fields are missing');
  }

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
  console.log('Updating product with data:', product);
  
  const index = activeProducts.findIndex(p => p.id === product.id);
  
  if (index === -1) {
    throw new Error(`Product with ID ${product.id} not found`);
  }
  
  // Update product preserving any fields not included in the update
  activeProducts[index] = {
    ...activeProducts[index],
    ...product
  };
  
  // Persist changes
  persistProductData();
  
  return activeProducts[index];
}

/**
 * Deletes a product by ID
 * @param productId ID of the product to delete
 * @returns boolean indicating success
 */
export async function deleteProduct(productId: string): Promise<boolean> {
  console.log('Deleting product with ID:', productId);
  
  const initialLength = activeProducts.length;
  activeProducts = activeProducts.filter(p => p.id !== productId);
  
  // If product was removed, persist changes and clear image cache
  if (initialLength !== activeProducts.length) {
    persistProductData();
    clearProductImageCache(productId);
    return true;
  }
  
  return false;
}

/**
 * Updates product image path
 * @param productId ID of the product
 * @param imagePath Path to the image
 * @returns Updated product or null if not found
 */
export async function updateProductImage(
  productId: string, 
  imagePath: string
): Promise<Product | null> {
  console.log('Updating product image:', productId, imagePath);
  
  const productIndex = activeProducts.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    console.error(`Product with ID ${productId} not found`);
    return null;
  }
  
  activeProducts[productIndex] = {
    ...activeProducts[productIndex],
    imageUrl: imagePath
  };
  
  // Очищаем кеш изображения, т.к. теперь используем постоянный путь
  clearProductImageCache(productId);
  
  persistProductData();
  return activeProducts[productIndex];
}
