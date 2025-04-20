
/**
 * Upload a file to the project's public directory
 * @param file - File to upload
 * @param destination - Target folder (relative to /public)
 * @returns Path to the uploaded file (relative to root)
 */
export const uploadFile = async (file: File, destination: string = 'images/products'): Promise<string> => {
  if (!file) {
    throw new Error('File not provided');
  }

  // Create a unique filename with timestamp
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const cleanFilename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
  const filename = `${timestamp}-${cleanFilename}`;
  const fullPath = `/${destination}/${filename}`;

  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    
    console.log(`Uploading file to path: ${fullPath}`);
    
    // Use the correct Lovable API endpoint for file uploads
    const response = await fetch('/_lovable/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Target-Path': fullPath,
      }
    });

    if (!response.ok) {
      console.error(`Upload error: ${response.status} ${response.statusText}`);
      throw new Error('Failed to upload file');
    }

    const result = await response.json();
    console.log('File uploaded successfully:', result);
    
    return fullPath;
  } catch (error) {
    console.error('Error during file upload:', error);
    throw error;
  }
};
