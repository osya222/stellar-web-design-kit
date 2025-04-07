
// Empty images map to be populated one by one
export const productImages: Record<string, Record<string, string>> = {
  "Лосось (Чили)": {},
  "Форель (Турция)": {}
};

// Function to get the appropriate image URL for a product - will return undefined until images are added
export function getProductImage(product: { category: string; name: string; size?: string }): string | undefined {
  if (!productImages[product.category]) {
    return undefined;
  }
  
  // Try to get specific image by name
  if (productImages[product.category][product.name]) {
    return productImages[product.category][product.name];
  }
  
  // If no specific image, return undefined
  return undefined;
}

// Helper function to check if an image URL is valid (can be used client-side)
export async function isImageUrlValid(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
