
/**
 * Утилита для загрузки изображений товаров
 */

/**
 * Загрузить файл на сервер
 * @param file Файл для загрузки
 * @returns Promise с путем к загруженному файлу
 */
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Создаем объект FormData для загрузки файла
    const formData = new FormData();
    formData.append('file', file);
    
    // Отправляем файл на сервер
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      let errorMessage = `Ошибка загрузки: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        console.error('Не удалось распарсить ответ сервера:', jsonError);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Неизвестная ошибка при загрузке файла');
    }
    
    console.log('Файл успешно загружен:', data.filePath);
    
    // Возвращаем полный путь к файлу для использования в src изображения
    return data.filePath;
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
