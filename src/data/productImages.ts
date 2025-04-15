
// Define product image paths by category and product name
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {
    "default": "/placeholder.svg"
  },
  "Форель (Турция)": {
    "default": "/placeholder.svg"
  },
  "Морепродукты": {
    "default": "/placeholder.svg"
  },
  "Филе рыбы": {
    "default": "/placeholder.svg"
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
  
  return categoryImages["default"];
}
