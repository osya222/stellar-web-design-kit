
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

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define upload directory
const UPLOAD_DIRECTORY = path.join(__dirname, 'public/images/products');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIRECTORY)) {
  fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
  console.log(`Created upload directory: ${UPLOAD_DIRECTORY}`);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, UPLOAD_DIRECTORY);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Create unique filename
    const uniqueName = `product-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Create multer uploader
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
    files: 1 // Limit to 1 file per upload
  },
  fileFilter: (req, file, cb) => {
    // Only accept images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!') as any, false);
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
      usePolling: false,
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/public/images/**'],
    },
    hmr: {
      protocol: 'ws',
      timeout: 5000,
    },
    proxy: {
      '/api/upload': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('Proxy error:', err);
            if (!res.headersSent) {
              res.writeHead(500, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
            }
          });
        },
        handle: (req: IncomingMessage, res: ServerResponse) => {
          if (req.url !== '/api/upload' && !req.url?.startsWith('/api/upload?')) {
            return false;
          }

          // Set CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');
          
          // Handle OPTIONS request (preflight)
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return true;
          }
          
          // Handle POST request for file upload
          if (req.method === 'POST') {
            try {
              console.log("Processing POST request for file upload");
              
              // Always set JSON content type for any response
              res.setHeader('Content-Type', 'application/json');
              
              const handleUpload = () => new Promise<boolean>((resolve) => {
                const uploadTimeout = setTimeout(() => {
                  console.error("Upload timeout reached");
                  if (!res.headersSent) {
                    res.statusCode = 408;
                    res.end(JSON.stringify({ 
                      error: 'Upload timeout', 
                      details: 'Request took too long to process' 
                    }));
                  }
                  resolve(true);
                }, 15000); // 15 seconds timeout
                
                upload(req as unknown as Request, res as unknown as Response, (err: any) => {
                  clearTimeout(uploadTimeout);
                  
                  // Always ensure response is JSON
                  res.setHeader('Content-Type', 'application/json');
                  
                  if (err) {
                    console.error("Error uploading file:", err);
                    if (!res.headersSent) {
                      res.statusCode = 500;
                      res.end(JSON.stringify({ 
                        error: 'Upload error', 
                        details: err.message 
                      }));
                    }
                    return resolve(true);
                  }
                  
                  const file = (req as any).file;
                  if (!file) {
                    console.error("No file received");
                    if (!res.headersSent) {
                      res.statusCode = 400;
                      res.end(JSON.stringify({ 
                        error: 'No file was received'
                      }));
                    }
                    return resolve(true);
                  }
                  
                  console.log("File uploaded successfully:", file.filename);
                  
                  // Generate relative path to the file for client
                  const imagePath = `/images/products/${file.filename}`;
                  
                  // Send successful response
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
              
              return handleUpload();
            } catch (error) {
              console.error("Critical error processing upload:", error);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  error: 'Critical server error', 
                  details: (error as Error).message 
                }));
              }
              return true;
            }
          }
          
          // For other methods return 405 Method Not Allowed
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
  optimizeDeps: {
    force: false,
    entries: ['./src/main.tsx']
  },
}));
