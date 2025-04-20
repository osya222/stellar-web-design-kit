
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешен' });
  }

  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.maxFileSize = 5 * 1024 * 1024; // 5 MB

    const { fields, files } = await new Promise<{fields: formidable.Fields, files: formidable.Files}>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    
    // @ts-ignore
    const file = files.file;
    
    if (!file) {
      return res.status(400).json({ success: false, message: 'Файл не был загружен' });
    }

    // @ts-ignore
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    // @ts-ignore
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Неподдерживаемый тип файла. Разрешены только JPEG, PNG, GIF и WEBP' 
      });
    }

    // Создаем директорию, если её нет
    const uploadsDir = path.join(process.cwd(), 'public/lovable-uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Генерируем уникальное имя файла
    const fileExt = path.extname(file.originalFilename || 'image.jpg');
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadsDir, fileName);

    // @ts-ignore
    const fileData = fs.readFileSync(file.filepath);
    fs.writeFileSync(filePath, fileData);
    
    // Возвращаем путь к файлу
    const relativePath = `/lovable-uploads/${fileName}`;
    
    return res.status(200).json({
      success: true,
      filePath: relativePath
    });
  } catch (error: any) {
    console.error('Ошибка загрузки файла:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Ошибка загрузки файла' 
    });
  }
}
