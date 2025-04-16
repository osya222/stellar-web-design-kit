
import fs from 'fs';
import path from 'path';

export const handleUpload = async (req: Request) => {
  try {
    console.log("Upload API called");
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;

    if (!file || !filename) {
      console.error("Upload API error: No file or filename provided");
      return new Response(JSON.stringify({ error: 'No file or filename provided' }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const buffer = await file.arrayBuffer();
    
    // Sanitize filename and create proper path
    const sanitizedFilename = filename.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
    
    // Create absolute paths to ensure files are written to the correct location
    const publicDir = path.resolve('public');
    const imagesDir = path.join(publicDir, 'images');
    
    console.log("Upload API: Writing to path:", path.join(imagesDir, sanitizedFilename));
    console.log("Absolute public directory:", publicDir);
    console.log("Absolute images directory:", imagesDir);
    
    // Ensure the images directory exists
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log("Upload API: Created images directory:", imagesDir);
    }

    // Write the file
    fs.writeFileSync(path.join(imagesDir, sanitizedFilename), Buffer.from(buffer));
    console.log("Upload API: File written successfully");
    
    // Return success response with proper headers and cache control
    return new Response(JSON.stringify({ 
      path: `/images/${sanitizedFilename}`,
      success: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
  } catch (error) {
    console.error('Upload API error:', error);
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
