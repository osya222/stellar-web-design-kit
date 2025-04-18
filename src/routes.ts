
import { handleUpload } from './api/upload';

// Define route handlers for API endpoints
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
          'Content-Type': 'application/json'
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

// Add a utility function to get uploaded images
export const getUploadedImageUrl = (path: string): string | null => {
  if (!path) return null;
  
  // If it's a data URL or blob URL, return it directly
  if (path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  // If it's a relative path to a static resource, return it directly
  if (path.startsWith('/')) {
    // Check if this is a lovable-uploads path that we've stored in localStorage
    if (path.includes('/lovable-uploads/')) {
      // For preview/development, check if we have the image in localStorage
      const filename = path.split('/').pop();
      if (filename) {
        const storedPath = localStorage.getItem(`uploaded_image_${filename}`);
        if (storedPath) {
          return path; // Use the original path as the reference
        }
      }
    }
    return path;
  }
  
  // If it's a lovable-uploads path, ensure it starts with a slash
  if (path.includes('lovable-uploads') && !path.startsWith('/')) {
    return `/${path}`;
  }
  
  console.log("No image found for path:", path);
  return null;
};
