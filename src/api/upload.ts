
import { v4 as uuidv4 } from 'uuid';

/**
 * Обработчик API для загрузки файлов
 * Имитирует серверное хранилище, используя localStorage в демонстрационных целях
 * В реальном приложении здесь был бы обработчик загрузки на сервер
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
      
      // В реальном приложении здесь была бы загрузка на сервер
      // В демонстрационных целях просто возвращаем путь
      const filePath = `/lovable-uploads/${fileName}`;
      
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
