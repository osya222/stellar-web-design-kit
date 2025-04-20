
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { ServerResponse } from 'http';
import type { Request } from 'express';
import type { NextFunction } from 'connect';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public/images/products');
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: true,
    fs: {
      strict: false,
    },
    proxy: {
      '/api/upload': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        bypass: (req, res, options) => {
          if (req.url === '/api/upload' && req.method === 'POST') {
            try {
              upload.single('image')(req as any, res as any, (err) => {
                if (err) {
                  console.error("Upload error:", err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Ошибка загрузки файла' }));
                  return;
                }
                
                // @ts-ignore: multer adds file property to req
                const file = req.file;
                if (!file) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Файл не был загружен' }));
                  return;
                }

                console.log("File uploaded successfully:", file.filename);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  success: true,
                  path: `/images/products/${file.filename}` 
                }));
              });
              return true;
            } catch (error) {
              console.error("Server error:", error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Ошибка сервера' }));
              return true;
            }
          }
          return false;
        }
      }
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
