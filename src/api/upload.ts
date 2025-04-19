
// Minimal placeholder for upload API
// This functionality is no longer used but kept for backwards compatibility

// Define uploads directory path
const UPLOADS_DIR = "/images/products";

// Handle upload function
export const handleUpload = async (req: Request) => {
  return new Response(JSON.stringify({ 
    error: 'Upload functionality has been disabled',
    success: false
  }), { 
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
};
