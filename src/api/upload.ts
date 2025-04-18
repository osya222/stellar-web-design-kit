
// Define uploads directory path
const UPLOADS_DIR = '/lovable-uploads';

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
      // Create the final path where the file will be stored
      const filePath = `${UPLOADS_DIR}/${filename}`;
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
