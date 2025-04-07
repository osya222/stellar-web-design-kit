
// Изображения продуктов по категориям
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "https://oyster.market/upload/iblock/f7c/tz4brucz8x8itkxex47fto6zejlfh4wt.jpg"
  },
  "Форель (Турция)": {
    "default": "https://halalmsk.ru/wp-content/uploads/2021/03/morskaya-forel-4-6-kg.jpg"
  },
  "Креветки и морепродукты": {
    "default": "https://delikatesy72.ru/wp-content/uploads/2023/04/1646782757_1-vostorg-buzz-p-moreprodukti-zamorozhennie-4.jpg",
    "Креветка Ваномэй": "/lovable-uploads/d231c5c4-a1ac-424c-9e44-4c4f4ccae778.png",
    "Лангустины": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м L 2": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м L 1": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м C 2": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png"
  },
  "Мидии": {
    "default": "https://100foto.club/uploads/posts/2022-06/1655751628_1-100foto-club-p-golubie-midii-1.jpg"
  },
  "Другие виды рыбы": {
    "default": "https://cdnstatic.rg.ru/uploads/images/123/81/13/26.jpg"
  },
  "Филе рыбы": {
    "default": "https://avatars.mds.yandex.net/get-mpic/5242010/img_id4824576176666087310.jpeg/900x1200"
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
