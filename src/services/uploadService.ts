
/**
 * Сервис для загрузки файлов на сервер
 */

// Базовый URL API
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

/**
 * Загружает изображение на сервер
 * @param file - Файл для загрузки
 * @returns Промис с URL загруженного изображения
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Проверяем, что файл - изображение
    if (!file.type.startsWith('image/')) {
      throw new Error('Только изображения могут быть загружены');
    }

    // Создаем объект FormData для отправки файла
    const formData = new FormData();
    formData.append('image', file);

    // Отправляем запрос на сервер
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }

    // Получаем данные ответа
    const data = await response.json();
    
    // Возвращаем URL загруженного изображения
    return data.imageUrl;
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error);
    throw error;
  }
};

/**
 * Загружает изображение и возвращает временный URL для предпросмотра
 * @param file - Файл для загрузки
 * @returns Объект с локальным URL и URL на сервере
 */
export const uploadImageWithPreview = async (file: File): Promise<{ localUrl: string, serverUrl: string }> => {
  // Создаем локальный URL для предпросмотра
  const localUrl = URL.createObjectURL(file);
  
  try {
    // Загружаем изображение на сервер
    const serverUrl = await uploadImage(file);
    return { localUrl, serverUrl };
  } catch (error) {
    // Если загрузка не удалась, очищаем локальный URL
    URL.revokeObjectURL(localUrl);
    throw error;
  }
};

/**
 * Фиктивная реализация загрузки для демонстрации
 * (используется, если реальный API недоступен)
 */
export const mockUploadImage = (file: File): Promise<{ localUrl: string, serverUrl: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const localUrl = ev.target?.result as string;
      
      // Генерируем имя файла, очищая от спецсимволов
      const fileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const serverUrl = `/lovable-uploads/${fileName}`;
      
      // Имитируем задержку сети
      setTimeout(() => {
        resolve({ localUrl, serverUrl });
      }, 1000);
    };
    reader.readAsDataURL(file);
  });
};
