
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

// Создаем multer uploader за пределами обработчика запросов
// для избежания утечек памяти и дескрипторов файлов
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB макс размер
    files: 1 // Ограничиваем до 1 файла за раз
  },
  fileFilter: (req, file, cb) => {
    // Принимаем только изображения
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения могут быть загружены!') as any, false);
    }
  }
}).single('image');

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      strict: false,
    },
    watch: {
      // Уменьшаем количество отслеживаемых файлов
      usePolling: false,
      // Игнорируем каталоги с большим количеством файлов
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
    // Добавляем опции для предотвращения утечек файловых дескрипторов
    hmr: {
      // Используем WebSockets для HMR вместо EventSource
      protocol: 'ws',
      timeout: 5000,
    },
    proxy: {
      '/api/upload': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        selfHandleResponse: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('Proxy error:', err);
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
            }
          });
          
          // Закрытие соединений по таймауту
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const bodyChunks: Buffer[] = [];
            proxyRes.on('data', (chunk) => {
              bodyChunks.push(Buffer.from(chunk));
            });
            
            proxyRes.on('end', () => {
              // Явно закрываем соединение после завершения
              (req as any).socket?.setKeepAlive(false);
            });
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
              
              // Создаем обработчик промиса для загрузки с таймаутом
              const uploadPromise = new Promise<boolean>((resolve) => {
                const uploadTimeout = setTimeout(() => {
                  console.error("Timeout on file upload");
                  if (!res.headersSent) {
                    res.statusCode = 408;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ 
                      error: 'Timeout on file upload', 
                      details: 'Request took too long to process' 
                    }));
                  }
                  resolve(true);
                }, 30000); // 30 секунд таймаут
                
                upload(req as unknown as Request, res as unknown as Response, (err: any) => {
                  clearTimeout(uploadTimeout);
                  
                  res.setHeader('Content-Type', 'application/json');
                  
                  if (err) {
                    console.error("Ошибка при загрузке файла:", err);
                    if (!res.headersSent) {
                      res.statusCode = 500;
                      res.end(JSON.stringify({ 
                        error: 'Ошибка загрузки файла', 
                        details: err.message 
                      }));
                    }
                    return resolve(true);
                  }
                  
                  const file = (req as any).file;
                  if (!file) {
                    console.error("Файл не получен");
                    if (!res.headersSent) {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ 
                        error: 'Файл не был получен'
                      }));
                    }
                    return resolve(true);
                  }
                  
                  console.log("Файл успешно загружен:", file.filename);
                  
                  // Формируем относительный путь к файлу для клиента
                  const imagePath = `/images/products/${file.filename}`;
                  
                  // Отправляем успешный ответ
                  if (!res.headersSent) {
                    res.statusCode = 200;
                    const responseData = { 
                      success: true,
                      path: imagePath
                    };
                    
                    res.end(JSON.stringify(responseData));
                  }
                  return resolve(true);
                });
              });
              
              return uploadPromise;
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
            } finally {
              // Явно очищаем любые незавершенные запросы
              setTimeout(() => {
                if (!res.headersSent) {
                  try {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Unknown error occurred' }));
                  } catch (e) {
                    console.error('Error ending response:', e);
                  }
                }
              }, 35000); // Дополнительный таймаут безопасности
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
  // Уменьшаем нагрузку на файловую систему
  optimizeDeps: {
    // Улучшаем кеширование для снижения количества открытых файлов
    force: false,
    entries: ['./src/main.tsx']
  },
}));
