
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export default function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path: filePath, content } = req.body;
  
  if (!filePath || !content) {
    return res.status(400).json({ error: 'Missing path or content' });
  }

  try {
    // Получаем абсолютный путь к файлу
    const absolutePath = path.join(process.cwd(), filePath);
    
    // Создаем директорию, если она не существует
    const directory = path.dirname(absolutePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    
    // Записываем содержимое в файл
    fs.writeFileSync(absolutePath, content, 'utf8');
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка сохранения файла:', error);
    return res.status(500).json({ error: 'Ошибка сохранения файла' });
  }
}
