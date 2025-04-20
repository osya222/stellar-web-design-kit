
import { v4 as uuidv4 } from 'uuid';

// Функция для получения изображения из localStorage (устаревшая, но оставлена для совместимости)
export const getImageFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Ошибка при получении изображения из localStorage:', error);
    return null;
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  try {
    if (!file) {
      throw new Error('Файл не был выбран');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Неподдерживаемый тип файла. Разрешены только JPEG, PNG, GIF и WEBP');
    }

    // Отправляем файл на сервер
    const formData = new FormData();
    formData.append('file', file);
    
    // Добавляем временную метку к запросу для предотвращения кэширования
    const timestamp = new Date().getTime();
    
    try {
      console.log('Отправка файла на сервер...');
      const response = await fetch(`/api/upload?t=${timestamp}`, {
        method: 'POST',
        body: formData
      });

      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Текст ошибки от сервера:', errorText);
        throw new Error('Ошибка при загрузке файла на сервер');
      }
      
      const data = await response.json();
      console.log('Ответ сервера:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Ошибка загрузки файла на сервер');
      }
      
      // Возвращаем путь к файлу на сервере
      return data.filePath;
    } catch (error: any) {
      console.error('Ошибка при отправке запроса:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
