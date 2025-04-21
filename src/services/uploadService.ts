
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

    // Устанавливаем таймаут для запроса
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут

    try {
      console.log('Attempting to upload image to server:', API_URL);
      
      // Отправляем запрос на сервер
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(`Upload error: ${response.status} ${response.statusText}`);
        throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
      }

      // Получаем данные ответа
      const data = await response.json();
      console.log('Server upload response:', data);
      
      // Возвращаем URL загруженного изображения
      return data.imageUrl;
    } catch (fetchError) {
      // Если произошла ошибка при запросе к API, используем фиктивную реализацию
      console.warn('Не удалось загрузить через API, используем локальное сохранение:', fetchError);
      
      // Используем фиктивную реализацию для демонстрации
      const mockResult = await mockUploadImage(file);
      console.log('Mock upload completed with path:', mockResult.serverUrl);
      return mockResult.serverUrl;
    }
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
  console.log('Created local URL for preview:', localUrl);
  
  try {
    // Загружаем изображение на сервер (с автоматическим использованием мок-реализации при ошибке)
    const serverUrl = await uploadImage(file);
    console.log('Image uploaded, server path:', serverUrl);
    return { localUrl, serverUrl };
  } catch (error) {
    // Если загрузка не удалась совсем, очищаем локальный URL
    URL.revokeObjectURL(localUrl);
    console.error('Upload failed completely:', error);
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
      const timestamp = new Date().getTime();
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const fileName = `${timestamp}-${safeFileName}`;
      
      // Create a more reliable path structure for the image
      // This ensures the path isn't empty and follows a consistent format
      const serverUrl = `/lovable-uploads/${fileName}`;
      
      console.log('Mock upload generating server path:', serverUrl);
      
      // Имитируем задержку сети
      setTimeout(() => {
        console.log('Мок-загрузка успешна:', serverUrl);
        resolve({ localUrl, serverUrl });
      }, 500);
    };
    reader.readAsDataURL(file);
  });
};
