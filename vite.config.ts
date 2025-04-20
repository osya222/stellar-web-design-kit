
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleFileUpload } from "./src/api/upload";
import type { ViteDevServer, Connect } from 'vite';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    setupMiddleware: (middleware: Connect.Server, server: ViteDevServer) => {
      // Создаем директорию для загрузок, если она не существует
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Настройка API роутов для загрузки файлов
      server.middlewares.use('/api/upload', async (req: Connect.IncomingMessage, res: any) => {
        try {
          console.log(`Получен запрос: ${req.method} ${req.url}`);
          
          if (req.method === 'OPTIONS') {
            // Handle preflight requests
            res.statusCode = 204;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.end();
            return;
          }
          
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Метод не разрешен' }));
            return;
          }
          
          // Конвертируем стандартный запрос в Request из Fetch API
          const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
          const headers = new Headers();
          
          Object.entries(req.headers).forEach(([key, value]) => {
            if (value) headers.append(key, Array.isArray(value) ? value.join(', ') : String(value));
          });
          
          // Создаем объект Request
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.from(chunk));
          }
          const body = Buffer.concat(chunks);
          
          const request = new Request(url.toString(), {
            method: 'POST',
            headers,
            body
          });
          
          console.log('Обработка загрузки файла...');
          
          // Обрабатываем запрос нашим API хендлером
          const response = await handleFileUpload(request);
          
          // Отправляем ответ
          res.statusCode = response.status;
          
          // Устанавливаем заголовки
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          
          // Отправляем тело ответа
          const responseBody = await response.text();
          console.log('Отправка ответа:', responseBody);
          res.end(responseBody);
        } catch (error) {
          console.error('Ошибка при обработке загрузки файла:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Внутренняя ошибка сервера' }));
        }
      });
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
