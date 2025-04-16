
import { handleUpload } from '../../api/upload';

// This file creates the actual API route for uploads
export async function POST(req: Request) {
  return handleUpload(req);
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Upload API endpoint is working' }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
