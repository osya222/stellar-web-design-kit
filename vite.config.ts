
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

// Simplify storage configuration for better reliability
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    // Use public/images directory for improved compatibility across environments
    const uploadPath = path.join(__dirname, 'public/images/products');
    
    try {
      // Ensure directory exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log("[Upload] Directory created:", uploadPath);
      }
      
      // Verify write permissions by writing a test file
      const testFile = path.join(uploadPath, '.test-write-permission');
      fs.writeFileSync(testFile, 'test', { flag: 'w' });
      fs.unlinkSync(testFile); // Remove test file
      console.log("[Upload] Write permission verified for:", uploadPath);
      
      cb(null, uploadPath);
    } catch (error) {
      console.error("[Upload] Directory or permission error:", error);
      // Pass null as first parameter and handle the error separately
      cb(null, uploadPath);
      // Log the error instead of passing it to callback
      console.error(`Upload directory error: ${(error as Error).message}`);
    }
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Simplified file naming for better compatibility
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    
    if (!allowedExtensions.includes(ext)) {
      console.error("[Upload] Invalid file extension:", ext);
      // Return empty string for filename, we'll handle this error later
      cb(null, '');
      return;
    }
    
    // Create a simple filename pattern
    const filename = `product_${uniqueSuffix}${ext}`;
    console.log("[Upload] Generated filename:", filename);
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
            console.error('[Proxy] Error:', err);
            if (res.headersSent) return;
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Proxy error', details: err.message }));
          });
        },
        handle: (req: IncomingMessage, res: ServerResponse) => {
          console.log("[Upload] Request received:", req.method, req.url);
          
          // Check if this is an upload request
          if (req.url !== '/api/upload') {
            return false;
          }

          // Set CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          
          // Handle preflight request
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return true;
          }
          
          // Handle file upload request
          if (req.method === 'POST') {
            console.log("[Upload] Processing POST upload request");
            
            try {
              // Configure multer with reduced file size (200KB) and strict validation
              const upload = multer({ 
                storage,
                limits: { fileSize: 200 * 1024 }, // Reduced to 200KB for better reliability
                fileFilter: (req, file, cb) => {
                  // Only allow image files
                  if (!file.mimetype.startsWith('image/')) {
                    console.error("[Upload] Invalid file type:", file.mimetype);
                    return cb(null, false);
                  }
                  cb(null, true);
                }
              }).single('image');
              
              // Use a shorter timeout to prevent EPIPE errors
              const uploadTimeout = setTimeout(() => {
                console.error("[Upload] Request timed out");
                if (!res.headersSent) {
                  res.statusCode = 408; 
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    error: 'Upload timeout', 
                    details: 'Request took too long to process' 
                  }));
                }
              }, 3000); // 3-second timeout
              
              // Process the upload with specific error handling for EPIPE
              upload(req as unknown as Request, res as unknown as Response, (err: any) => {
                clearTimeout(uploadTimeout);
                console.log("[Upload] Multer processing completed");
                
                res.setHeader('Content-Type', 'application/json');
                
                if (err) {
                  console.error("[Upload] Error:", err);
                  
                  // Specific handling for EPIPE errors
                  if (err.code === 'EPIPE' || err.message.includes('EPIPE')) {
                    console.error("[Upload] EPIPE error detected, this is a connection issue");
                    res.statusCode = 503; // Service Unavailable
                    res.end(JSON.stringify({ 
                      error: 'Connection error', 
                      details: 'write EPIPE',
                      message: 'The server connection was interrupted. Try a smaller image or try again later.'
                    }));
                    return;
                  }
                  
                  // Handle file size limits
                  if (err.code === 'LIMIT_FILE_SIZE') {
                    res.statusCode = 413; // Payload Too Large
                    res.end(JSON.stringify({
                      error: 'File too large',
                      details: 'The file exceeds the 200KB limit',
                      message: 'Please use a smaller image (max 200KB)'
                    }));
                    return;
                  }
                  
                  // Handle other errors
                  res.statusCode = 500;
                  res.end(JSON.stringify({ 
                    error: 'Upload failed', 
                    details: err.message 
                  }));
                  return;
                }
                
                const file = (req as any).file;
                if (!file) {
                  console.error("[Upload] No file received");
                  res.statusCode = 400;
                  res.end(JSON.stringify({ 
                    error: 'No file received'
                  }));
                  return;
                }
                
                console.log("[Upload] File successfully saved:", file.filename);
                
                // Format the path for client
                const imagePath = `/images/products/${file.filename}`;
                
                // Verify file exists before returning success
                const fullPath = path.join(__dirname, 'public', imagePath);
                
                try {
                  fs.accessSync(fullPath, fs.constants.F_OK);
                  console.log("[Upload] File verified:", fullPath);
                  
                  // Delay response slightly to prevent connection issues
                  setTimeout(() => {
                    // Return success response
                    res.statusCode = 200;
                    const responseData = { 
                      success: true,
                      path: imagePath
                    };
                    
                    res.end(JSON.stringify(responseData));
                  }, 100);
                } catch (fileErr) {
                  console.error("[Upload] File verification failed:", fileErr);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ 
                    error: 'File verification failed',
                    details: (fileErr as Error).message
                  }));
                }
              });
              
              return true;
            } catch (criticalErr) {
              console.error("[Upload] Critical error:", criticalErr);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: 'Server error', 
                details: (criticalErr as Error).message 
              }));
              return true;
            }
          }
          
          // Method not allowed for other requests
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
