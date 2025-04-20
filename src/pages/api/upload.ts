
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Настройка multer для обработки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const targetDir = path.join(process.cwd(), 'public', path.dirname(req.headers['x-target-path'] as string));
    
    // Создаем директорию, если она не существует
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    cb(null, path.basename(req.headers['x-target-path'] as string));
  }
});

const upload = multer({ storage: storage });

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
