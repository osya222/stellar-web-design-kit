
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
          'Cache-Control': 'no-cache, no-store, must-revalidate'
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

// Improved utility function to get uploaded images
export const getUploadedImageUrl = (path: string): string | null => {
  if (!path) return null;
  
  try {
    console.log("Getting image URL for path:", path);
    
    // If it's a data URL or blob URL, return it directly
    if (path.startsWith('data:') || path.startsWith('blob:')) {
      return path;
    }
    
    // For paths like /lovable-uploads/... look in localStorage
    if (path.includes('lovable-uploads')) {
      const filename = path.split('/').pop();
      
      if (filename) {
        // Check for blob URL first (most direct access)
        const blobUrl = localStorage.getItem(`blob_url_${filename}`);
        if (blobUrl && blobUrl.startsWith('blob:')) {
          console.log("Found blob URL for:", filename);
          return blobUrl;
        }
        
        // Check for the stored path
        const storedPath = localStorage.getItem(`uploaded_image_${filename}`);
        if (storedPath) {
          console.log("Found stored path for:", filename);
          return path;
        }
        
        // Check for image data
        const imageData = localStorage.getItem(`image_data_${filename}`);
        if (imageData && imageData.startsWith('data:')) {
          console.log("Found image data for:", filename);
          return imageData;
        }
      }
    }
    
    // If it's a relative path to a static resource, return it directly
    if (path.startsWith('/') && !path.includes('lovable-uploads')) {
      return path;
    }
    
    // If it's a lovable-uploads path but missing the leading slash, add it
    if (path.includes('lovable-uploads') && !path.startsWith('/')) {
      return `/${path}`;
    }
    
    // Try looking for any filename match in localStorage as last resort
    const filename = path.includes('/') ? path.split('/').pop() : path;
    if (filename) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes(filename)) {
          const value = localStorage.getItem(key);
          if (value && (value.startsWith('blob:') || value.startsWith('data:') || value.includes('lovable-uploads'))) {
            console.log("Found matching storage item for:", filename);
            return value;
          }
        }
      }
    }
    
    console.log("No valid image found for path:", path);
    return path; // Return original path as fallback
  } catch (error) {
    console.error("Error in getUploadedImageUrl:", error);
    return path; // Return original path if there was an error
  }
};
