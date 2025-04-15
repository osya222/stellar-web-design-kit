
// Define product image paths by category and product name
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/lovable-uploads/0d6e972e-0353-45aa-907b-5f193220c4bb.png",
    "ЛОСОСЬ с/г потр. штучн": "",
    "ЛОСОСЬ с/г потр.": ""
  },
  "Форель (Турция)": {
    "default": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png",
    "ФОРЕЛЬ б/г потр М": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png"
  },
  "Морепродукты": {
    "default": "/lovable-uploads/9d283ac4-5a1a-45f8-b15b-f6e5d2812d1b.png",
    "КРЕВЕТКА ваннамей свежая в панцире б/г": "/lovable-uploads/0fa26d3b-9843-48d7-afaf-e69bddbee7b5.png",
    "7_КРЕВЕТКА ваннамей свежая очищенная б/г": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "8_КРЕВЕТКА ваннамей свежая очищенная б/г": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "КРЕВЕТКА ваннамей вареная очищенная б/г": "/lovable-uploads/35f921ad-7bc0-4f9b-91a7-c8b68ca8e7fa.png",
    "ЛАНГУСТИНЫ с/м L 2": "/lovable-uploads/5a441a58-1636-4325-82e2-cee49ad20585.png",
    "ЛАНГУСТИНЫ с/м L 1": "/lovable-uploads/5a441a58-1636-4325-82e2-cee49ad20585.png",
    "ЛАНГУСТИНЫ с/м С 2": "/lovable-uploads/5a441a58-1636-4325-82e2-cee49ad20585.png",
    "МЕДАЛЬОНЫ из креветки": "/lovable-uploads/923eda92-d974-48f3-813d-339626f70616.png",
    "МИДИИ раковина в собственном соку": "/lovable-uploads/9ae097fc-d5b2-4b02-a072-3d1aeb8c211f.png",
    "МИДИИ раковина сливки-чеснок/томат-чеснок/вино": "/lovable-uploads/9ae097fc-d5b2-4b02-a072-3d1aeb8c211f.png",
    "МЯСО МИДИЙ в/м": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png"
  },
  "Филе рыбы": {
    "default": "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png",
    "ФИЛЕ ПАНГАСИУСА": "/lovable-uploads/d231c5c4-a1ac-424c-9e44-4c4f4ccae778.png",
    "ФИЛЕ ТИЛАПИИ": "/lovable-uploads/de983f8f-acb9-417a-9ba8-54b8f3c696ad.png",
    "ФИЛЕ ТРЕСКИ б/к фас.": "/lovable-uploads/0fd3ac43-ec30-425b-b149-fd187b22e947.png",
    "ФИЛЕ ХЕКА в тубе": "/lovable-uploads/0fa26d3b-9843-48d7-afaf-e69bddbee7b5.png"
  }
};

// Load saved images from localStorage if available
const loadSavedImages = () => {
  const savedImages = localStorage.getItem('productImages');
  if (savedImages) {
    try {
      const parsedImages = JSON.parse(savedImages);
      Object.keys(parsedImages).forEach(category => {
        if (!productImages[category]) {
          productImages[category] = {};
        }
        Object.assign(productImages[category], parsedImages[category]);
      });
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  }
};

// Initialize by loading saved images
loadSavedImages();

export function getProductImage(product: { category: string; name: string; id?: number }): string | undefined {
  if (product.id) {
    // Try to get image with ID prefix first for items with duplicate names
    const idKey = `${product.id}_${product.name}`;
    const imageWithId = productImages[product.category]?.[idKey];
    if (imageWithId) return imageWithId;
  }
  
  // Fall back to name-only lookup
  return productImages[product.category]?.[product.name] || 
         productImages[product.category]?.["default"];
}

export function updateProductImage(category: string, productName: string, imageUrl: string, productId?: number): void {
  if (!productImages[category]) {
    productImages[category] = {};
  }
  
  // If product ID is provided, use it to create a unique key
  const key = productId ? `${productId}_${productName}` : productName;
  
  productImages[category][key] = imageUrl;
  
  // Save to localStorage
  try {
    localStorage.setItem('productImages', JSON.stringify(productImages));
    console.log(`Сохранено изображение для ${category}/${key}: ${imageUrl}`);
    console.log('Текущие изображения:', JSON.stringify(productImages));
  } catch (error) {
    console.error('Error saving images:', error);
  }
}

// Функция для сброса кеша изображений
export function resetImageCache(): void {
  try {
    localStorage.removeItem('productImages');
    console.log('Кеш изображений сброшен');
    // Перезагрузить страницу для применения изменений
    window.location.reload();
  } catch (error) {
    console.error('Ошибка при сбросе кеша изображений:', error);
  }
}
