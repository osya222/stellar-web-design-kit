
// Global window interface extensions
interface Window {
  customProducts: import('@/types/product').Product[];
  permanentImageStorage: Record<string, {
    base64: string;
    type: string;
    name: string;
  }>;
}
