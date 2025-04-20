
/**
 * File upload utility for product images
 * Uploads files to /public/images/products/ directory
 */

/**
 * Upload a file to the server
 * @param file The file to upload
 * @returns Promise that resolves to the path of the uploaded file
 */
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Create form data for the file upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Set the target path for the file in the public directory
    const targetPath = `/images/products/${file.name}`;
    
    // Send the file to the Lovable upload endpoint
    const response = await fetch('/_lovable/upload', {
      method: 'POST',
      headers: {
        'X-Target-Path': targetPath,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Return the path to the uploaded file
    return targetPath;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
