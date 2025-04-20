
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

// Упростим путь загрузки изображений
const UPLOAD_DIRECTORY = path.join(__dirname, 'public/images/products');

// Убедимся, что директория существует
if (!fs.existsSync(UPLOAD_DIRECTORY)) {
  fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
  console.log(`Created upload directory: ${UPLOAD_DIRECTORY}`);
}

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, UPLOAD_DIRECTORY);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Простое, но уникальное имя файла
    const uniqueName = `product-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Настройка multer с проверками
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB макс размер
  },
  fileFilter: (req, file, cb) => {
    // Принимаем только изображения
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения могут быть загружены!') as any, false);
    }
  }
}).single('image'); // Обратите внимание: здесь сразу применяем .single('image')

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
        selfHandleResponse: true, // Важно для предотвращения дублирования ответов
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('Proxy error:', err);
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
            }
          });
        },
        handle: (req: IncomingMessage, res: ServerResponse) => {
          // Проверяем, что это запрос на /api/upload
          if (req.url !== '/api/upload' && !req.url?.startsWith('/api/upload?')) {
            return false;
          }

          // Установка CORS заголовков
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
          
          // Обработка OPTIONS запроса
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return true;
          }
          
          // Обработка POST запроса для загрузки файла
          if (req.method === 'POST') {
            try {
              console.log("Обработка POST запроса на загрузку файла");
              
              // Создаем обработчик промиса для загрузки
              return new Promise((resolve) => {
                // Мы используем upload, который уже настроен как single('image')
                upload(req as unknown as Request, res as unknown as Response, (err: any) => {
                  res.setHeader('Content-Type', 'application/json');
                  
                  if (err) {
                    console.error("Ошибка при загрузке файла:", err);
                    res.statusCode = 500;
                    res.end(JSON.stringify({ 
                      error: 'Ошибка загрузки файла', 
                      details: err.message 
                    }));
                    return resolve(true);
                  }
                  
                  const file = (req as any).file;
                  if (!file) {
                    console.error("Файл не получен");
                    res.statusCode = 400;
                    res.end(JSON.stringify({ 
                      error: 'Файл не был получен'
                    }));
                    return resolve(true);
                  }
                  
                  console.log("Файл успешно загружен:", file.filename);
                  
                  // Формируем относительный путь к файлу для клиента
                  const imagePath = `/images/products/${file.filename}`;
                  
                  // Отправляем успешный ответ
                  res.statusCode = 200;
                  const responseData = { 
                    success: true,
                    path: imagePath
                  };
                  
                  res.end(JSON.stringify(responseData));
                  return resolve(true);
                });
              });
            } catch (error) {
              console.error("Критическая ошибка при обработке загрузки:", error);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  error: 'Критическая ошибка сервера', 
                  details: (error as Error).message 
                }));
              }
              return true;
            }
          }
          
          // Для других методов возвращаем 405 Method Not Allowed
          if (!res.headersSent) {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          }
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
