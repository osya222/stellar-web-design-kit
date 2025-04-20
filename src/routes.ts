
export const getImageUrl = (image?: string): string => {
  if (!image) return '/placeholder.svg';
  
  // Проверяем, начинается ли путь с http или https (для внешних изображений)
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  // Проверяем, является ли путь к изображению уже полным путем
  if (image.startsWith('/')) {
    return image;
  }
  
  // Для файлов, загруженных через панель администратора
  return `/images/products/${image}`;
};
