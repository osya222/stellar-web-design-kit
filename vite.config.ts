
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
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Используем оригинальное имя файла
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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
        handle: (req: IncomingMessage, res: ServerResponse) => {
          if (req.url === '/api/upload' && req.method === 'POST') {
            try {
              console.log("Обработка запроса загрузки");
              
              // Установка Content-Type для всех ответов
              res.setHeader('Content-Type', 'application/json');
              
              // Обработка загрузки
              const handleUpload = () => {
                try {
                  // Обработка формы с multer
                  upload.single('image')(req as unknown as Request, res as unknown as Response, (err: any) => {
                    if (err) {
                      console.error("Ошибка multer:", err);
                      res.statusCode = 500;
                      res.end(JSON.stringify({ error: 'Ошибка загрузки файла', details: err.message }));
                      return;
                    }
                    
                    const file = (req as any).file;
                    if (!file) {
                      console.error("Файл не загружен");
                      res.statusCode = 400;
                      res.end(JSON.stringify({ error: 'Файл не был загружен' }));
                      return;
                    }
                    
                    console.log("Файл успешно загружен:", file.filename);
                    
                    // Отправка успешного ответа в формате JSON
                    res.statusCode = 200;
                    const responseData = { 
                      success: true,
                      path: `/images/products/${file.filename}` 
                    };
                    const responseJson = JSON.stringify(responseData);
                    console.log("Отправка ответа:", responseJson);
                    res.end(responseJson);
                  });
                } catch (innerError) {
                  console.error("Внутренняя ошибка при загрузке:", innerError);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Внутренняя ошибка сервера', details: (innerError as Error).message }));
                }
              };
              
              handleUpload();
              return true;
            } catch (error) {
              console.error("Ошибка сервера:", error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Ошибка сервера', details: (error as Error).message }));
              return true;
            }
          }
          return false;
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
