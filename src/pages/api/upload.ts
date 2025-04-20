
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Создаем директорию, если её нет
    const targetDir = path.join(process.cwd(), 'public', 'images', 'products');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    // Создаем уникальное имя файла
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  }
});

// Ограничиваем типы файлов
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла. Разрешены только JPEG, PNG, GIF и WEBP'));
  }
};

// Создаем middleware для загрузки
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
}).single('file');

export default function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешен' });
  }

  // Оборачиваем multer в промис для лучшей обработки ошибок
  new Promise<void>((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
  .then(() => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Файл не был загружен' });
    }

    // Получаем относительный путь для использования в img src
    const relativePath = `/images/products/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      filePath: relativePath
    });
  })
  .catch((error) => {
    console.error('Ошибка загрузки файла:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Ошибка загрузки файла'
    });
  });
}
