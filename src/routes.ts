
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
    // For paths like /lovable-uploads/... check if they exist in localStorage
    if (path.includes('/lovable-uploads/')) {
      const filename = path.split('/').pop();
      
      // First try with the exact key
      if (filename) {
        // Look for the image in localStorage by its full path or by key
        const storedPath = localStorage.getItem(`uploaded_image_${filename}`);
        if (storedPath) {
          console.log("Found path in localStorage for:", filename);
          
          // If we're in development, we can use the blob URL if available
          const blobUrl = localStorage.getItem(`blob_url_${filename}`);
          if (blobUrl && blobUrl.startsWith('blob:')) {
            console.log("Using blob URL for:", filename);
            return blobUrl;
          }
          
          return path;
        }
      }
    }
    
    // If we didn't find it in localStorage but it's a valid path, return it
    if (path.startsWith('/') && path.includes('.')) {
      return path;
    }
    
    // If all else fails, check if there's a placeholder image
    if (path.includes('/placeholder')) {
      return '/placeholder.svg';
    }
  }
  
  // If it's a lovable-uploads path but missing the leading slash, add it
  if (path.includes('lovable-uploads') && !path.startsWith('/')) {
    return `/${path}`;
  }
  
  console.log("No valid image found for path:", path);
  return null;
};
