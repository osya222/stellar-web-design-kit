
/**
 * Получить URL изображения
 * @param imageFileName имя файла изображения или путь
 * @returns полный URL изображения или placeholder, если изображение не указано
 */
export const getImageUrl = (imageFileName?: string): string => {
  if (!imageFileName) {
    return '/placeholder.svg';
  }

  // Если путь уже абсолютный или полный (начинается с http/https)
  if (imageFileName.startsWith('/')) {
    return imageFileName;
  } else if (imageFileName.startsWith('http')) {
    return imageFileName;
  }
  
  // Иначе формируем полный путь
  return `/images/products/${imageFileName}`;
};
