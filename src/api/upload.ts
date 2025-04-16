
import fs from 'fs';
import path from 'path';

export const handleUpload = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;

    if (!file || !filename) {
      return new Response('No file or filename provided', { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const filePath = path.join(process.cwd(), 'public', 'images', filename);

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, Buffer.from(buffer));

    return new Response(JSON.stringify({ path: `/images/${filename}` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response('Error uploading file', { status: 500 });
  }
};
