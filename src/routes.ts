
export const getImageUrl = (image?: string): string => {
  if (!image) return '/placeholder.svg';
  
  // Check if path starts with http or https (for external images)
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  // Check if image path is already a full path
  if (image.startsWith('/')) {
    return image;
  }
  
  // For files uploaded through admin panel
  return `/images/products/${image}`;
};
