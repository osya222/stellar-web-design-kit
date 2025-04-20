
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { ServerResponse, IncomingMessage } from 'http';
import type { Request, Response } from 'express';
import type { ConfigEnv, ProxyOptions } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const uploadPath = path.join(__dirname, 'public/images/products');
    // Убедимся, что директория существует
    console.log("Создание директории:", uploadPath);
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log("Директория создана:", uploadPath);
      }
      cb(null, uploadPath);
    } catch (error) {
      console.error("Ошибка при создании директории:", error);
      cb(new Error("Не удалось создать директорию для загрузки"), uploadPath);
    }
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    try {
      // Уникальное имя файла на основе времени и оригинального имени
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const filename = uniqueSuffix + ext;
      console.log("Генерация имени файла:", filename);
      cb(null, filename);
    } catch (error) {
      console.error("Ошибка при генерации имени файла:", error);
      cb(new Error("Не удалось сгенерировать имя файла"), "error.jpg");
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      strict: false,
    },
    proxy: {
      '/api/upload': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('Proxy error:', err);
            if (res.headersSent) return;
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
          });
        },
        handle: (req: IncomingMessage, res: ServerResponse) => {
          console.log("Получен запрос:", req.method, req.url);
          
          // Проверяем, что это запрос на /api/upload
          if (req.url !== '/api/upload') {
            return false;
          }

          // Устанавливаем CORS заголовки
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          
          // Обработка OPTIONS запроса
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return true;
          }
          
          // Обработка POST запроса для загрузки файла
          if (req.method === 'POST') {
            console.log("Обработка POST запроса на загрузку");
            
            try {
              // Инициализируем multer с обработкой ошибок
              const upload = multer({ 
                storage,
                limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
                fileFilter: (req, file, cb) => {
                  if (!file.mimetype.startsWith('image/')) {
                    return cb(new Error('Разрешены только изображения'));
                  }
                  cb(null, true);
                }
              }).single('image');
              
              upload(req as unknown as Request, res as unknown as Response, (err: any) => {
                console.log("Мультер завершил обработку файла");
                
                // Устанавливаем Content-Type заголовок для JSON
                res.setHeader('Content-Type', 'application/json');
                
                if (err) {
                  console.error("Ошибка multer при загрузке:", err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ 
                    error: 'Ошибка загрузки файла', 
                    details: err.message 
                  }));
                  return;
                }
                
                const file = (req as any).file;
                if (!file) {
                  console.error("Файл не получен multer");
                  res.statusCode = 400;
                  res.end(JSON.stringify({ 
                    error: 'Файл не был получен'
                  }));
                  return;
                }
                
                console.log("Файл успешно загружен:", file.filename, "в", file.destination);
                
                // Формируем относительный путь к файлу для клиента
                const imagePath = `/images/products/${file.filename}`;
                
                // Проверяем, что файл действительно создан
                const fullPath = path.join(__dirname, 'public', imagePath);
                if (!fs.existsSync(fullPath)) {
                  console.error("Файл не был создан по пути:", fullPath);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ 
                    error: 'Файл не был сохранен на диск',
                    details: 'Проверьте права доступа к директории'
                  }));
                  return;
                }
                
                // Отправляем успешный ответ
                res.statusCode = 200;
                const responseData = { 
                  success: true,
                  path: imagePath
                };
                
                console.log("Отправка ответа:", responseData);
                res.end(JSON.stringify(responseData));
              });
              
              return true;
            } catch (error) {
              console.error("Ошибка при обработке загрузки:", error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Ошибка сервера', 
                details: (error as Error).message 
              }));
              return true;
            }
          }
          
          // Для других методов возвращаем 405 Method Not Allowed
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return true;
        }
      } as ProxyOptions
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
