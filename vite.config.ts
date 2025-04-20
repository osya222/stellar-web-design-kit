
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
import type { NextFunction } from 'connect';
import type { ConfigEnv, ProxyOptions } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const uploadPath = path.join(__dirname, 'public/images/products');
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
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
        configure: (proxy, options) => {
          // Add a custom handler for the /api/upload endpoint
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (req.url === '/api/upload' && req.method === 'POST') {
              // This is just to log the request
              console.log('Proxying upload request');
            }
          });
        },
        handle: (req: IncomingMessage, res: ServerResponse) => {
          if (req.url === '/api/upload' && req.method === 'POST') {
            try {
              console.log("Handling upload request");
              
              // Set content type for all responses to ensure JSON is properly returned
              res.setHeader('Content-Type', 'application/json');
              
              // Create a simplified handler that doesn't rely on middleware chaining
              const handleUpload = () => {
                try {
                  // Process the form with multer
                  upload.single('image')(req as unknown as Request, res as unknown as Response, (err: any) => {
                    if (err) {
                      console.error("Multer error:", err);
                      res.statusCode = 500;
                      res.end(JSON.stringify({ error: 'Ошибка загрузки файла', details: err.message }));
                      return;
                    }
                    
                    const file = (req as any).file;
                    if (!file) {
                      console.error("No file uploaded");
                      res.statusCode = 400;
                      res.end(JSON.stringify({ error: 'Файл не был загружен' }));
                      return;
                    }
                    
                    console.log("File uploaded successfully:", file.filename);
                    
                    // Return success as JSON
                    res.statusCode = 200;
                    const responseData = { 
                      success: true,
                      path: `/images/products/${file.filename}` 
                    };
                    const responseJson = JSON.stringify(responseData);
                    console.log("Sending response:", responseJson);
                    res.end(responseJson);
                  });
                } catch (innerError) {
                  console.error("Inner error during upload:", innerError);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Внутренняя ошибка сервера', details: (innerError as Error).message }));
                }
              };
              
              handleUpload();
              return true;
            } catch (error) {
              console.error("Server error:", error);
              // Ensure error response is also JSON
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
