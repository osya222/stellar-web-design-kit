
/**
 * File upload utility for product images
 * Uploads files to /public/images/products/ directory
 */

/**
 * Upload a file to the server
 * @param file The file to upload
 * @returns Promise that resolves to the path of the uploaded file
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
    
    // Устанавливаем целевой путь для файла в публичной директории
    const targetPath = `/images/products/${uniqueFileName}`;
    
    // Отправляем файл на сервер Lovable
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
    
    // Возвращаем путь к загруженному файлу
    return targetPath;
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
