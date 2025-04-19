
// Define route handlers for API endpoints
import { handleUpload } from './api/upload';

const API_BASE = '/api';
const UPLOADS_DIR = '/images/products';

export const apiRoutes = {
  [`${API_BASE}/upload`]: async (req: Request) => {
    try {
      console.log("API route called:", req.method, req.url);
      
      if (req.method === 'POST') {
        console.log("Forwarding to handleUpload");
        return await handleUpload(req);
      }
      
      return new Response(JSON.stringify({ message: 'Upload API is working' }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
    } catch (error) {
      console.error("Error in API route:", error);
      return new Response(JSON.stringify({ 
        error: 'Error processing request', 
        details: error instanceof Error ? error.message : String(error) 
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
};

// Simple function to get an image URL with cache busting
export const getImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  
  // Add timestamp to prevent caching
  const timestamp = Date.now();
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return `${path}?t=${timestamp}`;
  } else if (path.startsWith('/images/')) {
    return `${path}?t=${timestamp}`;
  }
  
  const resolvedPath = path.startsWith('/') ? path : `/${path}`;
  return `${resolvedPath}?t=${timestamp}`;
};

// Function to get the URL for uploaded images
export const getUploadedImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  console.log("Getting uploaded image URL for path:", path);
  
  // Add timestamp to prevent caching
  const timestamp = Date.now();
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return `${path}?t=${timestamp}`;
  } else if (path.startsWith('/images/')) {
    return `${path}?t=${timestamp}`;
  }
  
  // Normalize the path and use the new products directory
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  return `${UPLOADS_DIR}/${normalizedPath}?t=${timestamp}`;
};
