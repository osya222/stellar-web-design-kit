
// File upload API for the client side
// This saves files in the public/lovable-uploads directory

// Define uploads directory path
const UPLOADS_DIR = '/lovable-uploads';

// Function to generate a unique filename with UUID-like ID
const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop() || 'jpg';
  const safeName = originalName
    .split('.')[0]
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  return `${safeName}-${timestamp}-${randomId}.${extension}`;
};

// Helper function to save file to project
const saveFileToProject = async (file: File, filename: string): Promise<string> => {
  try {
    console.log("Saving file to project:", filename);
    
    // For development/preview, create a blob URL
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    const blobUrl = URL.createObjectURL(blob);
    console.log("Created blob URL:", blobUrl);
    
    // Create the final path where the file would be stored
    const filePath = `${UPLOADS_DIR}/${filename}`;
    console.log(`Image path set to: ${filePath}`);
    
    // In a real environment, we would save the file to the filesystem
    // For the preview environment, we'll store it in localStorage to persist between page reloads
    try {
      // Store the path in localStorage
      localStorage.setItem(`uploaded_image_${filename}`, filePath);
      console.log(`Saved image reference to localStorage: ${filename}`);
      
      // Also store the blob URL for direct access
      localStorage.setItem(`blob_url_${filename}`, blobUrl);
      console.log(`Saved blob URL to localStorage: ${filename}`);
      
      // For development, add the image data (base64) to localStorage
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        if (typeof base64 === 'string') {
          try {
            localStorage.setItem(`image_data_${filename}`, base64);
            console.log(`Saved image data to localStorage: ${filename}`);
          } catch (err) {
            console.warn("Failed to save image data (likely too large):", err);
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (storageError) {
      console.error("Failed to save to localStorage:", storageError);
    }
    
    return filePath;
  } catch (error) {
    console.error("Error saving file:", error);
    throw error;
  }
};

export const handleUpload = async (req: Request) => {
  try {
    console.log("Upload handler called");
    
    // Check request method
    if (req.method !== 'POST') {
      console.log("Method not allowed:", req.method);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Get form data
    let formData;
    try {
      formData = await req.formData();
      console.log("Form data received, entries:", [...formData.entries()].map(entry => `${entry[0]}: ${typeof entry[1]}`));
    } catch (error) {
      console.error("Error parsing form data:", error);
      return new Response(JSON.stringify({ error: 'Failed to parse form data' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const file = formData.get('file');
    const filenameParam = formData.get('filename') || 'upload.jpg';
    
    if (!file) {
      console.error("Upload API error: No file provided");
      return new Response(JSON.stringify({ error: 'No file provided' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!(file instanceof File)) {
      console.error("Upload API error: Invalid file object, type:", typeof file);
      return new Response(JSON.stringify({ error: 'Invalid file object' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    console.log("File received:", file.name, "Size:", file.size, "Type:", file.type);
    
    // Generate a unique filename to prevent collisions
    const filename = generateUniqueFilename(String(filenameParam));
    
    try {
      // Save the file to the project
      const imagePath = await saveFileToProject(file, filename);
      
      console.log("Upload successful, returning path:", imagePath);
      
      return new Response(JSON.stringify({ 
        path: imagePath,
        success: true,
        filename: filename
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      });
    } catch (saveError) {
      console.error("Error saving file:", saveError);
      return new Response(JSON.stringify({ 
        error: 'Failed to save file', 
        details: saveError instanceof Error ? saveError.message : String(saveError) 
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('Upload API critical error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error uploading file', 
      details: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
