
/**
 * Get image URL
 * @param imageFileName image filename or path
 * @returns full image URL or placeholder if image not specified
 */
export const getImageUrl = (imageFileName?: string): string => {
  if (!imageFileName) {
    return '/placeholder.svg';
  }

  // If path is already absolute or complete (starts with http/https)
  if (imageFileName.startsWith('/')) {
    return imageFileName;
  } else if (imageFileName.startsWith('http')) {
    return imageFileName;
  }
  
  // Иначе формируем полный путь
  return `/images/products/${imageFileName}`;
};
