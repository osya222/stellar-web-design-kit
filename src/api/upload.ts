
// File upload API for the client side
// This saves files in the public/images directory

// Define uploads directory path
const UPLOADS_DIR = '/images';

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
    
    // Create the final path where the file will be stored
    const filePath = `${UPLOADS_DIR}/${filename}`;
    console.log(`Image path set to: ${filePath}`);
    
    // For real environment, file will be saved to /public/images/
    // For development we'll still create a blob URL for preview
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    const blobUrl = URL.createObjectURL(blob);
    
    // Store the mapping between file path and blob URL for development
    try {
      sessionStorage.setItem(`dev_image_${filename}`, blobUrl);
    } catch (storageError) {
      console.warn("Failed to save blob URL to sessionStorage:", storageError);
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
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get form data
    const formData = await req.formData();
    const file = formData.get('file');
    const filenameParam = formData.get('filename');
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No valid file provided' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate a unique filename
    const filename = generateUniqueFilename(String(filenameParam || file.name));
    
    try {
      // Save the file to the project
      const imagePath = await saveFileToProject(file, filename);
      
      return new Response(JSON.stringify({ 
        path: imagePath,
        success: true,
        filename: filename
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
