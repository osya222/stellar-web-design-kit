
/**
 * Утилита для загрузки изображений товаров
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Загрузить файл на сервер
 * @param file Файл для загрузки
 * @returns Promise с путем к загруженному файлу
 */
export const uploadFile = async (file: File): Promise<string> => {
  try {
    if (!file) {
      throw new Error('Файл не был выбран');
    }

    // Проверяем тип файла
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Неподдерживаемый тип файла. Разрешены только JPEG, PNG, GIF и WEBP');
    }
    
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
    
    // В демонстрационных целях для отображения загруженных изображений
    // мы будем использовать placeholder, поскольку у нас нет настоящего сервера
    return `/placeholder.svg?filename=${encodeURIComponent(data.filePath)}`;
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
