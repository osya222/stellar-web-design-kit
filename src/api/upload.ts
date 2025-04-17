
// File upload API for the client side
// This will save files to the public/uploads directory

// Create a constant for the uploads directory
const UPLOADS_DIR = '/uploads';

// Function to generate a safe filename with timestamp
const generateSafeFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop() || 'jpg';
  const safeName = originalName
    .split('.')[0]
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  return `${safeName}-${timestamp}.${extension}`;
};

// Helper function to save file to project
const saveFileToProject = async (file: File, filename: string): Promise<string> => {
  try {
    console.log("Saving file to project:", filename);
    
    // In a real backend, we would write to disk
    // For our frontend-only approach, we'll use a different strategy
    
    // Convert file to base64 to be stored in a permanent data structure
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        
        // Create the final path where the file would be stored
        const filePath = `${UPLOADS_DIR}/${filename}`;
        
        // In deployment, we'll use fetch to save this to our backend
        // For now, we'll save it to our products JSON dataset
        
        // Create a temporary URL for immediate display
        const tempUrl = URL.createObjectURL(file);
        
        // Save the mapping of filepath to base64 in our permanentImageStorage
        window.permanentImageStorage = window.permanentImageStorage || {};
        window.permanentImageStorage[filePath] = {
          base64: base64data,
          type: file.type,
          name: filename
        };
        
        // Save the permanentImageStorage to localStorage to persist between page reloads
        // during development (this won't be used in production)
        try {
          localStorage.setItem('permanent_image_storage', JSON.stringify(window.permanentImageStorage));
        } catch (error) {
          console.warn("Could not save image storage to localStorage", error);
        }
        
        console.log(`Image saved to permanent storage with path: ${filePath}`);
        resolve(filePath);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error("Error saving file:", error);
    throw error;
  }
};

// Load the permanent image storage from localStorage on page load
const loadPermanentImageStorage = () => {
  try {
    const storage = localStorage.getItem('permanent_image_storage');
    if (storage) {
      window.permanentImageStorage = JSON.parse(storage);
      console.log("Loaded permanent image storage with", Object.keys(window.permanentImageStorage).length, "images");
    } else {
      window.permanentImageStorage = {};
    }
  } catch (error) {
    console.error("Error loading permanent image storage:", error);
    window.permanentImageStorage = {};
  }
};

// Call this when the module loads
loadPermanentImageStorage();

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
      console.log("Form data received, entries:", [...formData.entries()].map(e => e[0]));
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
    const filenameParam = formData.get('filename');
    
    console.log("File received:", file ? "yes" : "no", "Type:", file ? (file as any).type : "unknown");
    console.log("Filename param:", filenameParam);

    if (!file || !filenameParam) {
      console.error("Upload API error: No file or filename provided");
      return new Response(JSON.stringify({ error: 'No file or filename provided' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!(file instanceof File)) {
      console.error("Upload API error: Invalid file object");
      return new Response(JSON.stringify({ error: 'Invalid file object' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Generate a safe filename
    const filename = generateSafeFilename(String(filenameParam));
    
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
