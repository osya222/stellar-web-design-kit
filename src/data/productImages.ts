
// Изображения продуктов по категориям
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "https://oyster.market/upload/iblock/f7c/tz4brucz8x8itkxex47fto6zejlfh4wt.jpg"
  },
  "Форель (Турция)": {
    "default": "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png"
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
