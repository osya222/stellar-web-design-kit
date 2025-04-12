
// Product image paths by category and product name
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/lovable-uploads/0d6e972e-0353-45aa-907b-5f193220c4bb.png"
  },
  "Форель (Турция)": {
    "default": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png"
  },
  "Креветки и морепродукты": {
    "default": "/lovable-uploads/9d283ac4-5a1a-45f8-b15b-f6e5d2812d1b.png",
  },
  "Мидии": {
    "default": "/images/mussels-default.jpg",
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
  // Для локальных путей всегда возвращаем true
  return true;
}
