
// Define product image paths by category and product name
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/lovable-uploads/0d6e972e-0353-45aa-907b-5f193220c4bb.png",
    "ЛОСОСЬ с/г потр. штучн": "/lovable-uploads/0d6e972e-0353-45aa-907b-5f193220c4bb.png",
    "ЛОСОСЬ с/г потр.": "/lovable-uploads/0d6e972e-0353-45aa-907b-5f193220c4bb.png"
  },
  "Форель (Турция)": {
    "default": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png",
    "ФОРЕЛЬ б/г потр М": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png",
    "3_ФОРЕЛЬ б/г потр М": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png",
    "4_ФОРЕЛЬ б/г потр М": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png",
    "5_ФОРЕЛЬ б/г потр М": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png"
  },
  "Морепродукты": {
    "default": "/lovable-uploads/9d283ac4-5a1a-45f8-b15b-f6e5d2812d1b.png",
    "КРЕВЕТКА ваннамей свежая в панцире б/г": "/lovable-uploads/0fa26d3b-9843-48d7-afaf-e69bddbee7b5.png",
    "КРЕВЕТКА ваннамей свежая очищенная б/г": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "7_КРЕВЕТКА ваннамей свежая очищенная б/г": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "8_КРЕВЕТКА ваннамей свежая очищенная б/г": "/lovable-uploads/12dc6093-23e2-46dc-adcb-b77884b15aae.png",
    "КРЕВЕТКА ваннамей вареная очищенная б/г": "/lovable-uploads/35f921ad-7bc0-4f9b-91a7-c8b68ca8e7fa.png",
    "ЛАНГУСТИНЫ с/м L 2": "/lovable-uploads/5a441a58-1636-4325-82e2-cee49ad20585.png",
    "ЛАНГУСТИНЫ с/м L 1": "/lovable-uploads/5a441a58-1636-4325-82e2-cee49ad20585.png",
    "ЛАНГУСТИНЫ с/м С 2": "/lovable-uploads/5a441a58-1636-4325-82e2-cee49ad20585.png",
    "МЕДАЛЬОНЫ из креветки": "/lovable-uploads/923eda92-d974-48f3-813d-339626f70616.png",
    "МИДИИ раковина в собственном соку": "/lovable-uploads/9ae097fc-d5b2-4b02-a072-3d1aeb8c211f.png",
    "МИДИИ раковина сливки-чеснок/томат-чеснок/вино": "/lovable-uploads/9ae097fc-d5b2-4b02-a072-3d1aeb8c211f.png",
    "МЯСО МИДИЙ в/м": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png",
    "16_МЯСО МИДИЙ в/м": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png",
    "17_МЯСО МИДИЙ в/м": "/lovable-uploads/af68b77a-0b8f-4a9d-8d21-c6b1f7b9ea54.png"
  },
  "Филе рыбы": {
    "default": "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png",
    "ФИЛЕ ПАНГАСИУСА": "/lovable-uploads/d231c5c4-a1ac-424c-9e44-4c4f4ccae778.png",
    "ФИЛЕ ТИЛАПИИ": "/lovable-uploads/de983f8f-acb9-417a-9ba8-54b8f3c696ad.png",
    "ФИЛЕ ТРЕСКИ б/к фас.": "/lovable-uploads/0fd3ac43-ec30-425b-b149-fd187b22e947.png",
    "ФИЛЕ ХЕКА в тубе": "/lovable-uploads/0fa26d3b-9843-48d7-afaf-e69bddbee7b5.png"
  }
};

// Simple getter function for product images
export function getProductImage(product: { category: string; name: string; id?: number }): string | undefined {
  if (!product || !product.category) {
    return undefined;
  }

  const categoryImages = productImages[product.category];
  if (!categoryImages) {
    return undefined;
  }

  // If we have an ID, try to get the image with ID prefix
  if (product.id && product.name) {
    const idKey = `${product.id}_${product.name}`;
    if (categoryImages[idKey]) {
      return categoryImages[idKey];
    }
  }
  
  // Then try by product name
  if (product.name && categoryImages[product.name]) {
    return categoryImages[product.name];
  }
  
  // Fall back to default category image
  return categoryImages["default"];
}
