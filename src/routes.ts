
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

// Function to get the correct image URL for both development and production
export const getUploadedImageUrl = (path: string): string | null => {
  if (!path) return null;
  
  try {
    console.log("Getting image URL for path:", path);
    
    // If it's a data URL or blob URL, return it directly
    if (path.startsWith('data:') || path.startsWith('blob:')) {
      return path;
    }
    
    // For development, check if we have a blob URL in sessionStorage or localStorage
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const filename = path.split('/').pop();
      if (filename) {
        // Check sessionStorage first
        const sessionBlobUrl = sessionStorage.getItem(`dev_image_${filename}`);
        if (sessionBlobUrl && sessionBlobUrl.startsWith('blob:')) {
          console.log(`Found blob URL in sessionStorage for ${filename}:`, sessionBlobUrl);
          return sessionBlobUrl;
        }
        
        // Then check localStorage
        const localBlobUrl = localStorage.getItem(`dev_image_${filename}`);
        if (localBlobUrl && localBlobUrl.startsWith('blob:')) {
          console.log(`Found blob URL in localStorage for ${filename}:`, localBlobUrl);
          return localBlobUrl;
        }
      }
    }
    
    // Generate a timestamp to force cache refresh for this request
    const timestamp = Date.now();
    
    // Make sure path starts with a forward slash
    let resolvedPath = path;
    if (!path.startsWith('/')) {
      resolvedPath = `/${path}`;
    }
    
    // Add cache buster to prevent browsers from using cached images
    const cacheBustedUrl = `${resolvedPath}?t=${timestamp}`;
    console.log(`Generated cache-busted URL: ${cacheBustedUrl}`);
    
    return cacheBustedUrl;
  } catch (error) {
    console.error("Error in getUploadedImageUrl:", error);
    // Return the original path as fallback
    return path;
  }
};
