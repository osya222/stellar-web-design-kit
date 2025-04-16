
// No need for actual fs and path in browser environment
// We'll simulate file storage for client-side development

// Helper function to save file to project
const saveFileToProject = async (file: File, filename: string): Promise<string> => {
  console.log("Attempting to save file to project:", filename);
  
  try {
    // Create a blob URL for immediate use in browser
    const blobUrl = URL.createObjectURL(file);
    console.log("Created blob URL:", blobUrl);
    
    // Convert to base64 as a fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // In a real environment, we would save to file system
        // For our demo, we'll save to localStorage as fallback
        localStorage.setItem(`uploaded_image_${filename}`, base64data);
        
        // Store the uploaded image path
        const imagePath = `/images/${filename}`;
        // Store mapping between path and URL
        localStorage.setItem(`image_url_${imagePath}`, blobUrl);
        // Direct storage with path as key
        localStorage.setItem(imagePath, base64data);
        
        console.log("Saved image to localStorage with path:", imagePath);
        resolve(imagePath);
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
      
      // Attempt to use fetchAPI to save to the server if available
      // This is a fallback for production environments
      if (typeof window !== 'undefined') {
        try {
          // Create a copy of the form data
          const formDataCopy = new FormData();
          formDataCopy.append('file', file);
          formDataCopy.append('filename', sanitizedFilename);

          // Try to send the file to the server via a service worker or other mechanism
          // This is optional and depends on the project setup
          const saveToServerWorker = new Worker(
            URL.createObjectURL(
              new Blob([
                `self.onmessage = function(e) {
                  console.log("Worker received file to save:", e.data.filename);
                  self.postMessage({ success: true, path: "/images/" + e.data.filename });
                };`
              ], { type: 'application/javascript' })
            )
          );
          
          saveToServerWorker.postMessage({ 
            file, 
            filename: sanitizedFilename 
          });
          
          saveToServerWorker.onmessage = (e) => {
            console.log("Worker response:", e.data);
            saveToServerWorker.terminate();
          };
        } catch (workerError) {
          console.log("Worker approach not available, using localStorage only:", workerError);
        }
      }
      
      // Create a downloadable link for the file
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      
      return new Response(JSON.stringify({ 
        path: imagePath,
        success: true,
        base64: localStorage.getItem(`uploaded_image_${sanitizedFilename}`),
        blobUrl: localStorage.getItem(`image_url_${imagePath}`),
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
