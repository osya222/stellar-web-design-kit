
// Map of product images from sea-legends.ru for different categories and product types
export const productImages = {
  // Лосось
  "Лосось (Чили)": {
    default: "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/losos-chili-2.jpg",
    "5-6 кг": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/losos-chili-3.jpg",
    "6-7 кг": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/losos-chili-1.jpg"
  },
  // Форель
  "Форель (Турция)": {
    default: "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/forel-sv-m-turciya-1.jpg",
    "1,3-1,8 кг": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/forel-sv-m-turciya-2.jpg",
    "1,8-2,7 кг": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/forel-sv-m-turciya-3.jpg",
    "2,7-3,6 кг": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/forel-sv-m-turciya-4.jpg"
  },
  // Креветки
  "Креветки и морепродукты": {
    default: "https://sea-legends.ru/assets/files/products/krevetki-moreprodukty/krevetka-v-bt-1.jpg",
    "Креветка": "https://sea-legends.ru/assets/files/products/krevetki-moreprodukty/krevetka-v-panc-1.jpg",
    "Лангустины": "https://sea-legends.ru/assets/files/products/krevetki-moreprodukty/langustin-2.jpg",
    "Медальоны": "https://sea-legends.ru/assets/files/products/krevetki-moreprodukty/medalony-morep-1.jpg",
    "Мясо мидий": "https://sea-legends.ru/assets/files/products/krevetki-moreprodukty/midii-chile-1.jpg"
  },
  // Другие виды рыбы
  "Другие виды рыбы": {
    default: "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/kambala-1.jpg",
    "Сорадо": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/dorado-1.jpg",
    "Сибас": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/sibas-1.jpg",
    "Сельдь": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/seld-atlant-1.jpg",
    "Скумбрия": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/skumbriya-1.jpg",
    "Кек тунца": "https://sea-legends.ru/assets/files/products/ryba-vyalenaya-solenaya-kopchenaya/kek-tunca-vyal-1.jpg",
    "Камбала": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/kambala-1.jpg",
    "Окунь": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/okun-1.jpg",
    "Минтай": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/mintaj-1.jpg",
    "Тунец": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/tunec-1.jpg",
    "Филе пангасиуса": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/file-pangasius-1.jpg",
    "Филе тилапии": "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/file-tilapii-1.jpg",
    "Филе трески": "https://sea-legends.ru/assets/files/products/ryba-file/file-treski-2.jpg",
    "Филе пикши": "https://sea-legends.ru/assets/files/products/ryba-file/file-piksha-1.jpg"
  },
  // Полуфабрикаты
  "Полуфабрикаты": {
    default: "https://sea-legends.ru/assets/files/products/polufabrikaty/kotl-losos-1.jpg",
    "Котлеты": "https://sea-legends.ru/assets/files/products/polufabrikaty/kotl-losos-2.jpg",
    "Пельмени": "https://sea-legends.ru/assets/files/products/polufabrikaty/pelm-losos-1.jpg",
    "Палочки": "https://sea-legends.ru/assets/files/products/polufabrikaty/pal-krab-syrnye-1.jpg"
  }
};

// Function to get the appropriate image URL for a product
export function getProductImage(product: { category: string; name: string; size?: string }): string {
  const categoryImages = productImages[product.category as keyof typeof productImages];
  
  if (!categoryImages) {
    return "https://sea-legends.ru/assets/files/products/ryba-svezhemorozhenaya/forel-sv-m-turciya-1.jpg"; // Default fallback
  }

  // Check for specific product name matches
  for (const [key, url] of Object.entries(categoryImages)) {
    if (key !== 'default' && product.name.includes(key)) {
      return url;
    }
  }
  
  // Check for size match if available
  if (product.size && categoryImages[product.size as keyof typeof categoryImages]) {
    return categoryImages[product.size as keyof typeof categoryImages];
  }

  // Return default category image
  return categoryImages.default;
}
