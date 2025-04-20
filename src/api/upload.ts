
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

/**
 * Обработчик API для загрузки файлов
 * Сохраняет файлы в директорию public/uploads
 */
export async function handleFileUpload(request: Request): Promise<Response> {
  try {
    // Проверяем метод запроса
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, message: 'Метод не разрешен' }),
        { 
          status: 405, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Получаем данные формы из запроса
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, message: 'Файл не был загружен' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Проверяем тип файла
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Неподдерживаемый тип файла. Разрешены только JPEG, PNG, GIF и WEBP' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    try {
      // Создаем уникальное имя файла
      const fileExtension = file.name.split('.').pop() || 'jpg';
      const fileName = `${uuidv4()}.${fileExtension}`;
      
      // Путь для сохранения файла (относительно public)
      const uploadDir = 'uploads';
      const filePath = `/${uploadDir}/${fileName}`;
      const fullSavePath = path.join(process.cwd(), 'public', uploadDir);
      
      // Создаем директорию, если она не существует
      if (!fs.existsSync(fullSavePath)) {
        fs.mkdirSync(fullSavePath, { recursive: true });
      }
      
      // Преобразуем File в Buffer для сохранения
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Сохраняем файл
      const fullFilePath = path.join(fullSavePath, fileName);
      fs.writeFileSync(fullFilePath, buffer);
      
      console.log(`Файл сохранен: ${fullFilePath}`);
      
      // Возвращаем успешный ответ с путем к файлу
      return new Response(
        JSON.stringify({ success: true, filePath }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } catch (error: any) {
      console.error('Ошибка при обработке файла:', error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: error.message || 'Ошибка обработки файла' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'Ошибка загрузки файла' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
