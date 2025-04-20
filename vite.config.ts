
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

// Настройка multer для загрузки файлов с более простой конфигурацией
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    // Упрощенный путь для загрузки в публичную директорию
    const uploadPath = path.join(__dirname, 'public/images/products');
    
    try {
      // Проверка и создание директории
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log("[Upload] Директория создана:", uploadPath);
      }
      cb(null, uploadPath);
    } catch (error) {
      console.error("[Upload] Ошибка при создании директории:", error);
      cb(new Error(`Не удалось создать директорию: ${(error as Error).message}`), uploadPath);
    }
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Генерация уникального имени файла
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + ext;
    console.log("[Upload] Генерация имени файла:", filename);
    cb(null, filename);
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
            console.error('[Proxy] Ошибка:', err);
            if (res.headersSent) return;
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
          });
        },
        handle: (req: IncomingMessage, res: ServerResponse) => {
          console.log("[Upload] Получен запрос:", req.method, req.url);
          
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
            console.log("[Upload] Обработка POST запроса на загрузку");
            
            try {
              // Используем multer с упрощенными настройками
              const upload = multer({ 
                storage,
                limits: { fileSize: 5 * 1024 * 1024 }, // Уменьшено до 5MB
                fileFilter: (req, file, cb) => {
                  if (!file.mimetype.startsWith('image/')) {
                    return cb(new Error('Разрешены только изображения'));
                  }
                  cb(null, true);
                }
              }).single('image');
              
              upload(req as unknown as Request, res as unknown as Response, (err: any) => {
                console.log("[Upload] Multer завершил обработку");
                
                res.setHeader('Content-Type', 'application/json');
                
                if (err) {
                  console.error("[Upload] Ошибка при обработке:", err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ 
                    error: 'Ошибка загрузки файла', 
                    details: err.message 
                  }));
                  return;
                }
                
                const file = (req as any).file;
                if (!file) {
                  console.error("[Upload] Файл не получен");
                  res.statusCode = 400;
                  res.end(JSON.stringify({ 
                    error: 'Файл не был получен'
                  }));
                  return;
                }
                
                console.log("[Upload] Файл успешно загружен:", file.filename);
                
                // Формируем относительный путь к файлу для клиента
                const imagePath = `/images/products/${file.filename}`;
                
                // Проверяем, что файл действительно создан
                const fullPath = path.join(__dirname, 'public', imagePath);
                
                try {
                  // Проверка существования файла и его доступности
                  fs.accessSync(fullPath, fs.constants.F_OK);
                  console.log("[Upload] Файл проверен и существует:", fullPath);
                  
                  // Отправляем успешный ответ
                  res.statusCode = 200;
                  const responseData = { 
                    success: true,
                    path: imagePath
                  };
                  
                  console.log("[Upload] Отправка успешного ответа:", responseData);
                  res.end(JSON.stringify(responseData));
                } catch (fileError) {
                  console.error("[Upload] Ошибка при проверке файла:", fileError);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ 
                    error: 'Файл не был сохранен корректно',
                    details: (fileError as Error).message
                  }));
                }
              });
              
              return true;
            } catch (error) {
              console.error("[Upload] Критическая ошибка при обработке:", error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Критическая ошибка сервера', 
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
