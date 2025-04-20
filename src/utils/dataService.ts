
import { Product } from "@/types/product";

// Temporary mock function - will be replaced with actual API calls
export async function fetchProducts(): Promise<Product[]> {
  // Mock data
  return [];
}

// Temporary mock function - will be replaced with actual API calls
export async function fetchProductById(id: string): Promise<Product | null> {
  return null;
}

// Temporary placeholder for hero image upload functionality
export function getHeroImageUrl(): string {
  return "/placeholder.svg";
}

// Temporary placeholder for product image functionality
export function getProductImageUrl(path: string): string {
  if (!path) return "/placeholder.svg";
  return path;
}
