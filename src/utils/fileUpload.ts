
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
    
    try {
      // Создаем объект FormData для загрузки файла
      const formData = new FormData();
      formData.append('file', file);
      
      // Отправляем файл на сервер
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      // Преобразовываем файл в Data URL для отображения сразу
      const fileDataUrl = await fileToDataURL(file);
      
      if (!response.ok) {
        console.warn('API загрузки недоступен или вернул ошибку, используем Data URL');
        return fileDataUrl;
      }
      
      // Проверяем тип контента ответа
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          const data = await response.json();
          
          if (!data.success) {
            console.warn('Ошибка API:', data.message);
            return fileDataUrl;
          }
          
          console.log('Файл успешно загружен:', data.filePath);
          return data.filePath;
        } catch (jsonError) {
          console.warn('Ошибка при разборе JSON ответа:', jsonError);
          return fileDataUrl;
        }
      } else {
        console.warn('Сервер вернул не JSON ответ, используем Data URL');
        return fileDataUrl;
      }
    } catch (error: any) {
      console.error('Ошибка при отправке запроса:', error);
      // В случае сетевой ошибки используем Data URL
      return fileToDataURL(file);
    }
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};

/**
 * Преобразует файл в Data URL
 */
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};
