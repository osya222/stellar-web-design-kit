
export const getImageUrl = (image?: string): string => {
  if (!image) return '/placeholder.svg';
  
  // Проверяем, начинается ли путь с http или https (для внешних изображений)
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  // Проверяем, не является ли изображение путем к lovable-uploads
  if (image.startsWith('/lovable-uploads/')) {
    return image;
  }
  
  // Для загруженных файлов через админку
  return `/images/products/${image}`;
};
