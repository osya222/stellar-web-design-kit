
// Product image paths by category and product name
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/images/salmon-default.jpg"
  },
  "Форель (Турция)": {
    "default": "/images/trout-default.jpg"
  },
  "Креветки и морепродукты": {
    "default": "/images/seafood-default.jpg",
  },
  "Мидии": {
    "default": "/images/mussels-default.jpg",
  },
  "Другие виды рыбы": {
    "default": "/images/other-fish-default.jpg",
  },
  "Филе рыбы": {
    "default": "/images/fish-fillet-default.jpeg"
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
