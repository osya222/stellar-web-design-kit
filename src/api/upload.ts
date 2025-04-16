
// No need for actual fs and path in browser environment
// We'll simulate file storage for client-side development

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
    
    // Create a blob URL for immediate use
    const fileUrl = URL.createObjectURL(file);
    console.log("Created blob URL:", fileUrl);
    
    // Store the file as base64 in localStorage for persistence
    const reader = new FileReader();
    
    return new Promise<Response>((resolve) => {
      reader.onloadend = () => {
        const base64data = reader.result;
        if (typeof base64data === 'string') {
          // Using a prefix to identify our uploaded images
          localStorage.setItem(`uploaded_image_${sanitizedFilename}`, base64data);
          console.log("File saved to localStorage as base64");
          
          // Generate a unique image path that will be recognized by our app
          const imagePath = `/images/${sanitizedFilename}`;
          
          // Store the mapping between path and blob URL
          localStorage.setItem(`image_url_${imagePath}`, fileUrl);
          
          console.log("Success, returning path:", imagePath);
          
          resolve(new Response(JSON.stringify({ 
            path: imagePath,
            success: true,
            base64: base64data, // Include the base64 data for immediate use
            blobUrl: fileUrl
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            },
          }));
        } else {
          console.error("Failed to convert file to base64");
          resolve(new Response(JSON.stringify({ 
            error: 'Failed to process image' 
          }), { 
            status: 500,
            headers: {
              'Content-Type': 'application/json'
            }
          }));
        }
      };
      
      reader.onerror = () => {
        console.error("FileReader error:", reader.error);
        resolve(new Response(JSON.stringify({ 
          error: 'Error reading file', 
          details: reader.error?.message || 'Unknown error'
        }), { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      };
      
      reader.readAsDataURL(file);
    });
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
