
// Изображения продуктов по категориям
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/images/salmon-default.jpg"
  },
  "Форель (Турция)": {
    "default": "/images/trout-default.jpg"
  },
  "Креветки и морепродукты": {
    "default": "/images/seafood-default.jpg",
    "Креветка Ваномэй": "/lovable-uploads/d231c5c4-a1ac-424c-9e44-4c4f4ccae778.png",
    "КРЕВЕТКА ваннамей свежая очищенная б/г": "/images/shrimp-peeled.jpg",
    "КРЕВЕТКА ваннамей свежая в панцире б/г": "/images/shrimp-shell.webp",
    "Креветка северная": "/images/northern-shrimp.webp",
    "Креветка Королевская Ваннамей (Глазурь)": "/images/king-shrimp.jpg",
    "Креветка с/м очищенная": "/images/frozen-peeled-shrimp.jpg",
    "Креветки (лангустины": "/images/langoustines.jpg",
    "Креветка Королевская Ваннамей (14%)": "/images/king-shrimp-glazed.jpg",
    "Лангустины": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м L 2": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м L 1": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м C 2": "/images/langoustines-c2.jpeg"
  },
  "Мидии": {
    "default": "/images/mussels-default.jpg",
    "МИДИИ раковина в собственном соку": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png",
    "МИДИИ раковина сливки-чеснок/томат-чеснок/вино": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png"
  },
  "Другие виды рыбы": {
    "default": "/images/other-fish-default.jpg",
    "Сельдь н/р": "/images/herring.jpg",
    "Сардина (иваси) н/р": "/images/sardine.jpg",
    "ДОРАДО н/р": "/images/dorado.jpeg",
    "СКУМБРИЯ н/р": "/images/mackerel.webp",
    "СИБАС н/р": "/images/seabass.jpg",
    "Вомер н/р": "/images/vomer.jpg",
    "Камбала б/г IQF": "/images/flounder.jpg",
    "КАМБАЛА б/г штучная": "/images/flounder.jpg",
    "Килька с/м IQF": "/images/sprat.jpg",
    "Кижуч б/г (6-8)": "/images/coho-salmon-1.jpg",
    "Кижуч б/г (8-10)": "/images/coho-salmon-2.jpg",
    "Кижуч б/г (10+)": "/images/coho-salmon-2.jpg",
    "Дори Б/Г": "/images/john-dory.jpg",
    "ОКУНЬ б/г потр. 4*6,5": "/images/perch.png",
    "Игла н/р": "/images/needlefish.webp",
    "МИНТАЙ б/г потр.": "/images/pollock.png",
    "МИНТАЙ б/г потр. штуч": "/images/pollock.png"
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
