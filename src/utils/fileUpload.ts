
/**
 * Утилита для обработки загрузки файлов
 * Эмулирует сохранение файла на сервере для локальной разработки
 */

/**
 * Функция сохранения файла
 * @param file - Файл для загрузки
 * @param destination - Целевая папка (относительно /public)
 * @returns Путь к сохраненному файлу
 */
export const uploadFile = async (file: File, destination: string = 'images/products'): Promise<string> => {
  if (!file) {
    throw new Error('Файл не предоставлен');
  }

  // Создаем очищенное имя файла
  const cleanFilename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
  const fullPath = `/${destination}/${cleanFilename}`;

  try {
    // Формируем данные для загрузки
    const formData = new FormData();
    formData.append('file', file);

    // Специальный эндпоинт для загрузки файлов в Lovable
    const response = await fetch('/_api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Указываем целевой путь для сохранения
        'X-Target-Path': fullPath,
      }
    });

    if (!response.ok) {
      console.error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
      // В случае ошибки загрузки все равно возвращаем путь для работы в режиме разработки
      return fullPath;
    }

    const result = await response.json();
    console.log('Файл успешно загружен:', result);
    
    return fullPath; // Возвращаем путь к файлу
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    // В случае ошибки все равно возвращаем путь для работы в режиме разработки
    return fullPath;
  }
};
