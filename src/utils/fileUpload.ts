
import { v4 as uuidv4 } from 'uuid';

// Функция для сохранения изображения в localStorage
const saveImageToLocalStorage = (key: string, dataUrl: string): void => {
  try {
    localStorage.setItem(key, dataUrl);
  } catch (error) {
    console.error('Ошибка при сохранении изображения в localStorage:', error);
  }
};

// Функция для получения изображения из localStorage
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

    // Создаем уникальное имя файла
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `/lovable-uploads/${fileName}`;

    try {
      // Создаем data URL из файла для сохранения в localStorage
      const reader = new FileReader();
      const dataUrlPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Ошибка чтения файла'));
        reader.readAsDataURL(file);
      });

      const dataUrl = await dataUrlPromise;
      
      // Сохраняем изображение в localStorage
      saveImageToLocalStorage(filePath, dataUrl);

      // Отправляем на сервер, если API доступен
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          console.warn('API загрузки недоступен или вернул ошибку');
          // Всё равно возвращаем путь, так как изображение сохранено в localStorage
          return filePath;
        }
        
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (!data.success) {
            console.warn('Ошибка API:', data.message);
          }
        }
      } catch (error: any) {
        console.error('Ошибка при отправке запроса:', error);
      }
      
      return filePath;
    } catch (error: any) {
      console.error('Ошибка при создании data URL:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
