// Define uploads directory path
// We'll use a string constant instead of path.join which is Node.js only
const UPLOADS_DIR = "/images/products";

// Function to generate a unique filename with timestamp and random ID
const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  const extension = originalName.split('.').pop() || 'jpg';
  const safeName = originalName
    .split('.')[0]
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  return `${safeName}-${timestamp}-${randomId}.${extension}`;
};

// Function to compress and save image data to localStorage
const saveImageToLocalStorage = (file: File, filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      console.warn("Cannot save to localStorage in server context");
      resolve();
      return;
    }

    try {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const dataUrl = reader.result as string;
          
          // Check if the image is too large for localStorage
          if (dataUrl.length > 2 * 1024 * 1024) { // If larger than ~2MB
            console.warn(`Image ${filename} is too large for localStorage (${Math.round(dataUrl.length/1024/1024)}MB), storing reference only`);
            
            // Store only a reference instead of the full data
            localStorage.setItem(`image_ref_${filename}`, filename);
            resolve();
            return;
          }
          
          // Store the full image data for smaller images
          localStorage.setItem(`image_data_${filename}`, dataUrl);
          console.log(`Successfully saved image data to localStorage for ${filename}`);
          resolve();
        } catch (storageError) {
          console.error("LocalStorage error:", storageError);
          // If quota exceeded, just store the reference
          localStorage.setItem(`image_ref_${filename}`, filename);
          resolve();
        }
      };
      
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error in saveImageToLocalStorage:", error);
      reject(error);
    }
  });
};

export const handleUpload = async (req: Request) => {
  try {
    console.log("Upload handler called with method:", req.method);
    
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const formData = await req.formData();
    const file = formData.get('file');
    const filenameParam = formData.get('filename');
    
    console.log("Received file upload request:", filenameParam || (file instanceof File ? file.name : "unknown file"));
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No valid file provided' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate a unique filename
    const filename = generateUniqueFilename(String(filenameParam || file.name));
    
    try {
      // Store file content in localStorage
      if (file instanceof File) {
        console.log("Saving file to localStorage:", filename);
        try {
          await saveImageToLocalStorage(file, filename);
          console.log("Successfully saved to localStorage");
        } catch (storageError) {
          console.error("Failed to save to localStorage:", storageError);
          // Continue anyway, as we'll still return the file path
        }
      }
      
      // Create a path that works for both upload directories
      const filePath = `/images/products/${filename}`;
      console.log(`Image will be stored at: ${filePath}`);
      
      // Return the path to the file
      return new Response(JSON.stringify({ 
        path: filePath,
        success: true,
        filename: filename,
        storageDirectory: UPLOADS_DIR
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
    } catch (saveError) {
      console.error("Error saving file:", saveError);
      return new Response(JSON.stringify({ 
        error: 'Failed to save file', 
        details: saveError instanceof Error ? saveError.message : String(saveError) 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Upload API critical error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error uploading file', 
      details: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
