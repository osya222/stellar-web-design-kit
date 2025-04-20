
/**
 * Utility for handling file uploads
 * Emulates saving files on the server for local development
 */

/**
 * Save a file
 * @param file - File to upload
 * @param destination - Target folder (relative to /public)
 * @returns Path to the saved file
 */
export const uploadFile = async (file: File, destination: string = 'images/products'): Promise<string> => {
  if (!file) {
    throw new Error('File not provided');
  }

  // Create a unique filename with date to avoid collisions
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const cleanFilename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
  const filename = `${timestamp}-${cleanFilename}`;
  const fullPath = `/${destination}/${filename}`;

  try {
    // Prepare form data for upload
    const formData = new FormData();
    formData.append('file', file);

    console.log(`Uploading file to path: ${fullPath}`);
    
    try {
      // Send file to server via Lovable API
      const response = await fetch('/_api/upload', {
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
      console.error('Error while uploading file:', error);
      throw error;
    }
  } catch (error) {
    console.error('General error during file upload:', error);
    throw error;
  }
};
