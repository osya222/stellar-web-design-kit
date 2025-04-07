
// Empty images map to be populated one by one
export const productImages: Record<string, Record<string, string>> = {};

// Function to get the appropriate image URL for a product - will return undefined until images are added
export function getProductImage(product: { category: string; name: string; size?: string }): string | undefined {
  return undefined; // Return undefined until images are added
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
