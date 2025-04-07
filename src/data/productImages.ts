
// Изображения продуктов по категориям
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "https://oyster.market/upload/iblock/f7c/tz4brucz8x8itkxex47fto6zejlfh4wt.jpg"
  },
  "Форель (Турция)": {
    "default": "https://magazinribi.ru/image/cache/catalog/products/riba/forel/%20%D0%BF%D0%BE%D1%82%D1%80%D0%BE%D1%88%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%B1%D0%B5%D0%B7%20%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D1%8B%20%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D1%83%D0%BC%201,8-2,7%D0%BA%D0%B3-1000x1000.jpg"
  },
  "Креветки и морепродукты": {
    "default": "https://oyster.market/upload/iblock/b8a/wq2knk7y2aefoupgczo0aciug191by5c.jpeg",
    "Креветка Ваномэй": "https://oyster.market/upload/iblock/b8a/wq2knk7y2aefoupgczo0aciug191by5c.jpeg",
    "Лангустины": "https://lovable.dev/projects/74713fb0-ff7b-4c64-b340-917792fa2979",
    "ЛАНГУСТИНЫ с/м L 2": "https://lovable.dev/projects/74713fb0-ff7b-4c64-b340-917792fa2979",
    "ЛАНГУСТИНЫ с/м L 1": "https://lovable.dev/projects/74713fb0-ff7b-4c64-b340-917792fa2979",
    "ЛАНГУСТИНЫ с/м C 2": "https://lovable.dev/projects/74713fb0-ff7b-4c64-b340-917792fa2979"
  }
};

// Функция для получения изображения продукта
export function getProductImage(product: { category: string; name: string; size?: string }): string | undefined {
  if (!productImages[product.category]) {
    return undefined;
  }
  
  // Попытка получить изображение по названию продукта
  if (productImages[product.category][product.name]) {
    return productImages[product.category][product.name];
  }
  
  // Если нет изображения для конкретного продукта, используем изображение категории по умолчанию
  if (productImages[product.category]["default"]) {
    return productImages[product.category]["default"];
  }
  
  return undefined;
}

// Вспомогательная функция для проверки валидности URL изображения
export async function isImageUrlValid(url: string): Promise<boolean> {
  // Если URL является относительным путем к локальному файлу, считаем его валидным
  if (url.startsWith('/')) {
    return true;
  }
  
  // Для внешних URL проверяем доступность
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
    return true; // При использовании no-cors мы не можем проверить статус, поэтому предполагаем, что URL валиден
  } catch (error) {
    console.error('Error checking image URL:', error);
    return false;
  }
}
