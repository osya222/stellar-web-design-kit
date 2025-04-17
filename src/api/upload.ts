
// No need for actual fs and path in browser environment
// We'll simulate file storage for client-side development

// Helper function to save file to project
const saveFileToProject = async (file: File, filename: string): Promise<string> => {
  console.log("Attempting to save file to project:", filename);
  
  try {
    // Create a blob URL for immediate use in browser
    const blobUrl = URL.createObjectURL(file);
    console.log("Created blob URL:", blobUrl);
    
    // For smaller files, we can still try to store base64 in localStorage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        
        // Store the uploaded image path
        const imagePath = `/images/${filename}`;
        
        try {
          // We'll try to store the blob URL mapping first (this is small)
          localStorage.setItem(`image_url_${imagePath}`, blobUrl);
          
          // Then try to store the base64 - this might fail for large images
          try {
            localStorage.setItem(`uploaded_image_${filename}`, base64data);
            localStorage.setItem(imagePath, base64data);
          } catch (storageError) {
            console.warn("Image too large for localStorage, using blob URL only:", storageError);
            // Store a flag that we only have the blob URL
            localStorage.setItem(`image_blob_only_${imagePath}`, "true");
          }
          
          console.log("Saved image mapping to localStorage with path:", imagePath);
          resolve(imagePath);
        } catch (error) {
          console.error("Error saving to localStorage:", error);
          // Still return the path and blobUrl since we have that
          resolve(imagePath);
        }
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
    const filename = formData.get('filename');
    
    console.log("File received:", file ? "yes" : "no", "Type:", file ? (file as any).type : "unknown");
    console.log("Filename:", filename);

    if (!file || !filename) {
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
    
    // Sanitize filename
    const sanitizedFilename = String(filename).replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
    
    try {
      // Save the file to the project
      const imagePath = await saveFileToProject(file, sanitizedFilename);
      
      // Create a URL for the image
      const blobUrl = URL.createObjectURL(file);
      
      return new Response(JSON.stringify({ 
        path: imagePath,
        success: true,
        blobUrl: blobUrl,
        directImageUrl: `/images/${sanitizedFilename}` // Direct URL to access the image
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
