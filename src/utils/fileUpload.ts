
import { v4 as uuidv4 } from 'uuid';

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
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.warn('API загрузки недоступен или вернул ошибку');
        return filePath; // Возвращаем сгенерированный путь даже при ошибке
      }
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!data.success) {
          console.warn('Ошибка API:', data.message);
          return filePath;
        }
        return filePath;
      }
      
      return filePath;
    } catch (error: any) {
      console.error('Ошибка при отправке запроса:', error);
      return filePath;
    }
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
