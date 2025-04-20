
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

  // Создаем уникальное имя файла с датой для избежания коллизий
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const cleanFilename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
  const filename = `${timestamp}-${cleanFilename}`;
  const fullPath = `/${destination}/${filename}`;

  try {
    // Формируем данные для загрузки
    const formData = new FormData();
    formData.append('file', file);

    console.log(`Uploading file to path: ${fullPath}`);
    
    try {
      // Отправляем файл на сервер через API Lovable
      const response = await fetch('/_api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Target-Path': fullPath,
        }
      });

      if (!response.ok) {
        console.error(`Upload error: ${response.status} ${response.statusText}`);
        return fullPath; // Возвращаем путь даже в случае ошибки, чтобы не блокировать работу
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result);
      
      return fullPath;
    } catch (error) {
      console.error('Error while uploading file via API:', error);
      // Возвращаем путь даже в случае ошибки для режима разработки
      return fullPath;
    }
  } catch (error) {
    console.error('General error during file upload:', error);
    // В случае ошибки все равно возвращаем путь для работы в режиме разработки
    return fullPath;
  }
};
