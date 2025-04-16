
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
  // First try to get the blob URL from localStorage
  const blobUrl = localStorage.getItem(`image_url_${path}`);
  if (blobUrl) {
    return blobUrl;
  }
  
  // If no blob URL, try to get the base64 data
  const filename = path.split('/').pop();
  if (filename) {
    const base64data = localStorage.getItem(`uploaded_image_${filename}`);
    if (base64data) {
      return base64data;
    }
  }
  
  return null;
};
