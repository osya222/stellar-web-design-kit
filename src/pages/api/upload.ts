
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Настройка multer для обработки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Получаем путь назначения из заголовка запроса
    const targetPath = path.dirname(req.headers['x-target-path'] as string);
    // Создаем абсолютный путь к директории
    const absolutePath = path.join(process.cwd(), 'public', targetPath);
    
    // Создаем директорию, если она не существует
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
    }
    
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    // Берем имя файла из заголовка запроса
    const fileName = path.basename(req.headers['x-target-path'] as string);
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Обработчик загрузки файлов
export default function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Использование middleware multer для загрузки файла
  const uploadMiddleware = upload.single('file');
  
  uploadMiddleware(req, res, function (err) {
    if (err) {
      console.error('Ошибка загрузки файла:', err);
      return res.status(500).json({ error: 'Ошибка загрузки файла' });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не был загружен' });
    }
    
    // Возвращаем успешный ответ с информацией о загруженном файле
    return res.status(200).json({
      success: true,
      filePath: req.headers['x-target-path']
    });
  });
}
