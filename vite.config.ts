
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
    middleware: [
      async (req, res, next) => {
        if (req.url === '/api/upload' && req.method === 'POST') {
          try {
            upload.single('image')(req, res, async (err) => {
              if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Upload failed' }));
                return;
              }
              
              const file = req.file;
              if (!file) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'No file uploaded' }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: true,
                path: `/images/products/${file.filename}` 
              }));
            });
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        } else {
          next();
        }
      }
    ]
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
