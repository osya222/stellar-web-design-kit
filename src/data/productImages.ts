
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
    "КРЕВЕТКА ваннамей свежая очищенная б/г": "https://fish-express.ru/upload/iblock/fc2/geazqhk08azb2j0z6gui9grv1jk3clnz/28969_1.jpg",
    "КРЕВЕТКА ваннамей свежая в панцире б/г": "https://sibifood.ru/image/cachewebp/catalog/foto-white/krevetka_tigrovaja%282%29-800x533.webp",
    "Креветка северная": "https://pervie.ru/files/product/images/l_44c69d0e814f419793796f561114da7a.webp",
    "Креветка Королевская Ваннамей (Глазурь)": "https://cdn.ikramore.com/wp-content/uploads/2023/09/langustiny_c0_2kg_bez_golovy.jpg",
    "Креветка с/м очищенная": "https://static.tildacdn.com/tild3738-6538-4161-a439-396361653137/photo.jpg",
    "Креветки (лангустины": "https://avatars.mds.yandex.net/get-eda/3583862/1b4c7c8626996d399641ca390a2dc126/orig",
    "Креветка Королевская Ваннамей (14%)": "https://cdn.rf-sp.ru/72/7f/727f26e191096f73d3048c1daee8c3b9.jpg",
    "Лангустины": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м L 2": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м L 1": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "ЛАНГУСТИНЫ с/м C 2": "https://fishinhome.ru/upload/iblock/15c/15cd9e35a5fe16c763477948bdd83279.jpeg"
  },
  "Мидии": {
    "default": "https://excelercomercial.com.br/wp-content/uploads/2014/03/mariscos.jpg",
    "МИДИИ раковина в собственном соку": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png",
    "МИДИИ раковина сливки-чеснок/томат-чеснок/вино": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png"
  },
  "Другие виды рыбы": {
    "default": "https://cdnstatic.rg.ru/uploads/images/123/81/13/26.jpg",
    "Сельдь н/р": "https://nau54.ru/2/tradeboardkbqU37_img.jpg",
    "Сардина (иваси) н/р": "https://istokfish.ru/upload/iblock/32c/lo0wi17c70zt1xnaqhz6dlfoyk5cbx6k/DSC_0163.JPG",
    "ДОРАДО н/р": "https://agromp.ru/wp-content/uploads/2022/03/str015.jpeg",
    "СКУМБРИЯ н/р": "https://ruikra.ru/image/cache/webp/catalog/products-new/svezhemorozhenaya-ryba/skumbriya-nr/skumbriya-nr-3-1500x1000.webp",
    "СИБАС н/р": "https://fish-or-meat.ru/d/051a4437.jpg",
    "Вомер н/р": "https://i0.wp.com/xn--80agnucfc0a.xn--p1ai/wp-content/uploads/2018/10/vomer___.jpg?fit=600%2C518&ssl=1",
    "Камбала б/г IQF": "https://rybexpert.ru/wp-content/uploads/2023/12/kambala-1.jpg",
    "КАМБАЛА б/г штучная": "https://rybexpert.ru/wp-content/uploads/2023/12/kambala-1.jpg",
    "Килька с/м IQF": "https://main-cdn.sbermegamarket.ru/big1/hlr-system/288/225/654/117/212/3/100029691550b0.jpg"
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
