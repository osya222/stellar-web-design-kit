
// Define product image paths by category and product name
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/lovable-uploads/0d6e972e-0353-45aa-907b-5f193220c4bb.png",
    "ЛОСОСЬ с/г потр. штучн": "",
    "ЛОСОСЬ с/г потр.": ""
  },
  "Форель (Турция)": {
    "default": "/lovable-uploads/7f979307-fd86-4fd7-a28a-428c30583726.png",
    "ФОРЕЛЬ б/г потр М": ""
  },
  "Креветки и морепродукты": {
    "default": "/lovable-uploads/9d283ac4-5a1a-45f8-b15b-f6e5d2812d1b.png",
    "КРЕВЕТКА ваннамей свежая в панцире б/г": "https://avatars.mds.yandex.net/get-altay/5099256/2a00000180b2e824b521af2f5b74b39c789b/XXL_height",
    "КРЕВЕТКА ваннамей свежая очищенная б/г": "https://avatars.mds.yandex.net/get-altay/5099256/2a00000180b2e824b521af2f5b74b39c789b/XXL_height",
    "КРЕВЕТКА ваннамей вареная очищенная б/г": "",
    "ЛАНГУСТИНЫ с/м L 2": "",
    "ЛАНГУСТИНЫ с/м L 1": "",
    "ЛАНГУСТИНЫ с/м С 2": "",
    "МЕДАЛЬОНЫ из креветки": ""
  },
  "Филе рыбы": {
    "default": "/lovable-uploads/0632a158-3850-45ef-a601-a34a94ab758a.png",
    "ФИЛЕ ПАНГАСИУСА": "https://www.bernardaoemcasa.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/i/file-peixe.jpg",
    "ФИЛЕ ТИЛАПИИ": "",
    "ФИЛЕ ТРЕСКИ б/к фас.": "",
    "ФИЛЕ ХЕКА в тубе": ""
  },
  "Мидии": {
    "default": "/lovable-uploads/0a745aa0-fdc0-4662-ad63-068c846bdb43.png",
    "МИДИИ раковина в собственном соку": "",
    "МИДИИ раковина сливки-чеснок/томат-чеснок/вино": "",
    "МЯСО МИДИЙ в/м": ""
  }
};

export function getProductImage(product: { category: string; name: string; size?: string }): string | undefined {
  if (!productImages[product.category]) {
    return undefined;
  }
  
  if (productImages[product.category][product.name] && productImages[product.category][product.name] !== "") {
    return productImages[product.category][product.name];
  }
  
  if (productImages[product.category]["default"]) {
    return productImages[product.category]["default"];
  }
  
  return undefined;
}

export async function isImageUrlValid(url: string): Promise<boolean> {
  return true;
}
