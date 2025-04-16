
import { handleUpload } from './api/upload';

// Define route handlers for API endpoints
export const apiRoutes = {
  '/api/upload': async (req: Request) => {
    if (req.method === 'POST') {
      return handleUpload(req);
    }
    
    return new Response(JSON.stringify({ message: 'Upload API is working' }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
