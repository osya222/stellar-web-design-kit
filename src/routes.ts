
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

// Add a cache layer for image URLs
const imageUrlCache: Record<string, { url: string, timestamp: number }> = {};

// Improved utility function to get uploaded images
export const getUploadedImageUrl = (path: string): string | null => {
  if (!path) return null;
  
  try {
    // Generate a cache key from the path
    const cacheKey = `image_path_${path}`;
    
    // Check if we have a recent cached version (less than 3 seconds old)
    const cachedItem = localStorage.getItem(`image_url_cache_${cacheKey}`);
    if (cachedItem) {
      try {
        const cached = JSON.parse(cachedItem);
        if (cached && cached.timestamp && Date.now() - cached.timestamp < 3000) {
          console.log(`Using cached image URL for ${path}:`, cached.url);
          return cached.url;
        }
      } catch (e) {
        console.warn("Error parsing cache:", e);
      }
    }
    
    console.log("Getting image URL for path:", path);
    
    // If it's a data URL or blob URL, return it directly
    if (path.startsWith('data:') || path.startsWith('blob:')) {
      // Cache and return
      cacheImageUrl(cacheKey, path);
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
          cacheImageUrl(cacheKey, blobUrl);
          return blobUrl;
        }
        
        // Check for the stored path
        const storedPath = localStorage.getItem(`uploaded_image_${filename}`);
        if (storedPath) {
          console.log("Found stored path for:", filename);
          cacheImageUrl(cacheKey, storedPath);
          return storedPath;
        }
        
        // Check for image data
        const imageData = localStorage.getItem(`image_data_${filename}`);
        if (imageData && imageData.startsWith('data:')) {
          console.log("Found image data for:", filename);
          cacheImageUrl(cacheKey, imageData);
          return imageData;
        }
        
        // Check in the uploaded files list (for persistence)
        try {
          const uploadedFiles = JSON.parse(localStorage.getItem('lovable_uploaded_files') || '[]');
          const fileRecord = uploadedFiles.find((f: any) => f.filename === filename || f.path === path);
          if (fileRecord) {
            console.log("Found file record in uploaded files list:", fileRecord);
            cacheImageUrl(cacheKey, fileRecord.path);
            return fileRecord.path;
          }
        } catch (e) {
          console.warn("Error parsing uploaded files list:", e);
        }
      }
    }
    
    // If it's a relative path to a static resource, return it directly
    if (path.startsWith('/') && !path.includes('lovable-uploads')) {
      cacheImageUrl(cacheKey, path);
      return path;
    }
    
    // If it's a lovable-uploads path but missing the leading slash, add it
    if (path.includes('lovable-uploads') && !path.startsWith('/')) {
      const fixedPath = `/${path}`;
      cacheImageUrl(cacheKey, fixedPath);
      return fixedPath;
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
            cacheImageUrl(cacheKey, value);
            return value;
          }
        }
      }
    }
    
    // If we have a direct lovable-uploads path, make sure to add the full URL
    if (path.includes('lovable-uploads')) {
      // For relative paths, try to get the base URL
      if (!path.startsWith('http') && !path.startsWith('/')) {
        const fixedPath = `/${path}`;
        cacheImageUrl(cacheKey, fixedPath);
        return fixedPath;
      }
      cacheImageUrl(cacheKey, path);
      return path;
    }
    
    console.log("No valid image found for path:", path);
    return path; // Return original path as fallback
  } catch (error) {
    console.error("Error in getUploadedImageUrl:", error);
    return path; // Return original path if there was an error
  }
};

// Helper function to cache image URLs
function cacheImageUrl(key: string, url: string): void {
  try {
    localStorage.setItem(`image_url_cache_${key}`, JSON.stringify({
      url,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn("Error caching image URL:", e);
  }
}
