
/**
 * Утилита для загрузки изображений товаров
 * Загружает файлы в директорию /public/images/products/
 */

/**
 * Загрузить файл на сервер
 * @param file Файл для загрузки
 * @returns Promise с путем к загруженному файлу
 */
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Создаем уникальное имя файла, чтобы избежать конфликтов
    const timestamp = new Date().getTime();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}-${safeName}`;
    
    // Создаем объект FormData для загрузки файла
    const formData = new FormData();
    formData.append('file', file);
    
    // Целевой путь для файла в публичной директории
    const targetPath = `/images/products/${uniqueFileName}`;
    
    // Отправляем файл на сервер
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Target-Path': targetPath
      }
    });

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Файл успешно загружен:', data);
    
    // Возвращаем полный путь к файлу для использования в src изображения
    return targetPath;
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
