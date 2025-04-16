
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
  console.log("Getting uploaded image for path:", path);
  
  // First check if the path is already a direct URL to the image
  if (path.startsWith('data:') || path.startsWith('blob:')) {
    console.log("Path is already a direct URL:", path.substring(0, 50) + '...');
    return path;
  }
  
  // Try to get the blob URL from localStorage
  const blobUrl = localStorage.getItem(`image_url_${path}`);
  if (blobUrl) {
    console.log("Found blob URL in localStorage:", blobUrl);
    return blobUrl;
  }
  
  // If no blob URL, try to get the base64 data
  const filename = path.split('/').pop();
  if (filename) {
    const base64data = localStorage.getItem(`uploaded_image_${filename}`);
    if (base64data) {
      console.log("Found base64 data in localStorage for:", filename);
      return base64data;
    }
  }
  
  // If we still don't have an image, look in localStorage directly with the path as key
  const directBase64 = localStorage.getItem(path);
  if (directBase64) {
    console.log("Found direct base64 data in localStorage for path:", path);
    return directBase64;
  }
  
  // Final attempt: check if the path is a valid image URL relative to the project
  // This helps when images are saved directly to the project's public directory
  if (path.startsWith('/images/')) {
    console.log("Using direct project image path:", path);
    return path; // Return the path as is, assuming it's valid within the project
  }
  
  console.log("No image found for path:", path);
  return null;
};
