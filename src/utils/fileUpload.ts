
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
      // Для демо-режима, если получаем 404, эмулируем успешную загрузку
      if (response.status === 404) {
        console.warn('API загрузки недоступен в демо-режиме, эмулируем успешную загрузку');
        
        // Генерируем имя файла
        const fileExtension = file.name.split('.').pop() || 'jpg';
        const fileName = `${uuidv4()}.${fileExtension}`;
        
        // Читаем файл как Data URL для отображения
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Возвращаем Data URL в качестве пути к изображению
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      }
      
      let errorMessage = `Ошибка загрузки: ${response.status} ${response.statusText}`;
      
      try {
        // Пытаемся прочитать тело ответа, если есть
        const text = await response.text();
        if (text) {
          try {
            const errorData = JSON.parse(text);
            if (errorData && errorData.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.error('Не удалось распарсить ответ сервера:', jsonError);
            if (text.length > 0) {
              errorMessage += ` - ${text}`;
            }
          }
        }
      } catch (textError) {
        console.error('Не удалось прочитать ответ сервера:', textError);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Неизвестная ошибка при загрузке файла');
    }
    
    console.log('Файл успешно загружен:', data.filePath);
    
    return data.filePath;
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
};
