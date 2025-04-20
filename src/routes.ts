// Define route handlers for API endpoints
import { handleUpload } from './api/upload';

const API_BASE = '/api';
const UPLOADS_DIR = '/images/products';

export const apiRoutes = {
  [`${API_BASE}/upload`]: async (req: Request) => {
    try {
      console.log("API route called:", req.method, req.url);
      
      return new Response(JSON.stringify({ 
        error: 'Upload functionality has been disabled',
        success: false
      }), { 
        status: 400,
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
  
  // Handle full URLs or image paths
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return `${path}?t=${timestamp}`;
  } 
  
  // Special case for blob URLs (used for local previews)
  if (path.startsWith('blob:')) {
    return path; // Don't add timestamp to blob URLs
  }
  
  // Ensure images are served from /images directory
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/images${normalizedPath}?t=${timestamp}`;
};

// Function to get the URL for uploaded images
export const getUploadedImageUrl = (path: string | undefined): string => {
  if (!path) return '/placeholder.svg';
  
  // Add timestamp to prevent caching
  const timestamp = Date.now();
  
  // Handle full URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return `${path}?t=${timestamp}`;
  } 
  
  // Special case for blob URLs (used for local previews)
  if (path.startsWith('blob:')) {
    return path; // Don't add timestamp to blob URLs
  }
  
  // Ensure images are served from /images directory
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/images${normalizedPath}?t=${timestamp}`;
};
