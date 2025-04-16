
import fs from 'fs';
import path from 'path';

export const handleUpload = async (req: Request) => {
  try {
    console.log("Upload handler called");
    
    // Проверяем метод запроса
    if (req.method !== 'POST') {
      console.log("Method not allowed:", req.method);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Получаем данные формы
    let formData;
    try {
      formData = await req.formData();
      console.log("Form data received, entries:", [...formData.entries()].map(e => e[0]));
    } catch (error) {
      console.error("Error parsing form data:", error);
      return new Response(JSON.stringify({ error: 'Failed to parse form data' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const file = formData.get('file');
    const filename = formData.get('filename');
    
    console.log("File received:", file ? "yes" : "no", "Type:", file ? (file as any).type : "unknown");
    console.log("Filename:", filename);

    if (!file || !filename) {
      console.error("Upload API error: No file or filename provided");
      return new Response(JSON.stringify({ error: 'No file or filename provided' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!(file instanceof File)) {
      console.error("Upload API error: Invalid file object");
      return new Response(JSON.stringify({ error: 'Invalid file object' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Получаем данные файла
    let buffer;
    try {
      buffer = await file.arrayBuffer();
      console.log("File buffer received, size:", buffer.byteLength);
    } catch (error) {
      console.error("Error reading file buffer:", error);
      return new Response(JSON.stringify({ error: 'Failed to read file data' }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Получаем правильное имя файла
    const sanitizedFilename = String(filename).replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
    
    // Создаем пути к директориям
    const publicDir = path.resolve('public');
    const imagesDir = path.join(publicDir, 'images');
    const filePath = path.join(imagesDir, sanitizedFilename);
    
    console.log("Writing file to:", filePath);
    console.log("Public dir:", publicDir);
    console.log("Images dir:", imagesDir);
    
    // Создаем директорию, если она не существует
    if (!fs.existsSync(imagesDir)) {
      console.log("Creating images directory");
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Записываем файл
    try {
      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log("File written successfully");
    } catch (error) {
      console.error("Error writing file:", error);
      return new Response(JSON.stringify({ 
        error: 'Failed to save file', 
        details: error instanceof Error ? error.message : String(error) 
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Возвращаем успешный ответ
    const imagePath = `/images/${sanitizedFilename}`;
    console.log("Success, returning path:", imagePath);
    
    return new Response(JSON.stringify({ 
      path: imagePath,
      success: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
  } catch (error) {
    console.error('Upload API critical error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error uploading file', 
      details: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
