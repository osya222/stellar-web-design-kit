
// Define route handlers for API endpoints
import { handleUpload } from './api/upload';

const API_BASE = '/api';
const UPLOADS_DIR = '/images/products';

export const apiRoutes = {
  '/api/upload': async (req: Request) => {
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
  
  // If it's already a full URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Make sure path starts with a forward slash
  const resolvedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Add cache buster to prevent browsers from using cached images
  const timestamp = Date.now();
  return `${resolvedPath}?t=${timestamp}`;
};

// Function to get the URL for uploaded images
export const getUploadedImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  
  // If it's already a full URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Make sure the path starts with the uploads directory
  if (!path.includes(UPLOADS_DIR) && !path.startsWith('/lovable-uploads/')) {
    // If the path doesn't include the uploads directory, assume it's in the uploads directory
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
    path = `${UPLOADS_DIR}/${normalizedPath}`;
  }
  
  // Return the path with cache busting
  return getImageUrl(path);
};
