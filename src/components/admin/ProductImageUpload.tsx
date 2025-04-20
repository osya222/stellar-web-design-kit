
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ProductImageUploadProps {
  productId: string | undefined;
  initialPreview: string;
  imageUrl: string;
  uploadActive?: boolean;
  onImageChange: (imagePath: string, preview: string) => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  productId,
  initialPreview,
  imageUrl,
  uploadActive = true,
  onImageChange,
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    imageUrl || initialPreview || '/placeholder.svg'
  );
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
      }
    };
  }, []);

  // Function to send file to server
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Create new abort controller for each request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      // Set upload timeout
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          console.log('Aborting request due to timeout');
          abortControllerRef.current.abort();
          setUploadError('Upload timeout exceeded');
          toast({
            title: "Error",
            description: "Upload timeout exceeded",
            variant: "destructive"
          });
        }
      }, 10000); // 10 seconds timeout
      
      uploadTimeoutRef.current = timeoutId;
      
      console.log('Sending request to /api/upload...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      // Clear timeout after response received
      clearTimeout(timeoutId);
      uploadTimeoutRef.current = null;
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Check content type to handle possible non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Unexpected response content type:', contentType);
        const textResponse = await response.text();
        console.error('Raw response:', textResponse);
        throw new Error(`Server returned non-JSON response. Status: ${response.status}`);
      }
      
      // Try to parse JSON response
      let result;
      try {
        result = await response.json();
        console.log('Server response:', result);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        const textResponse = await response.text();
        console.error('Raw response that failed to parse:', textResponse);
        throw new Error('Failed to parse server response as JSON');
      }
      
      // Check for success
      if (result?.success && result?.path) {
        console.log('Image path:', result.path);
        setUploadError(null);
        return result.path as string;
      } else {
        console.error('Unexpected response format:', result);
        throw new Error(result?.error || 'Server returned invalid response format');
      }
    } catch (error: any) {
      // Handle different error types
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        return null;
      }
      
      if (error.name === 'SyntaxError') {
        console.error('JSON parse error:', error.message);
        setUploadError('Server returned invalid JSON response');
      } else {
        console.error('Upload error:', error);
        setUploadError(error.message || 'Unknown upload error');
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
      
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file (JPEG, PNG, GIF, etc.)');
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit');
      toast({
        title: "Error",
        description: "File size must not exceed 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create image preview
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target?.result as string || '/placeholder.svg');
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      // Show preview immediately
      setImagePreview(preview);
      
      // Upload file to server
      console.log('Starting server upload...');
      const imagePath = await uploadFile(file);
      
      if (imagePath) {
        console.log('Upload successful, path:', imagePath);
        // Update product with new image path
        onImageChange(imagePath, preview);
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } else {
        // Restore previous preview if upload failed
        console.error('Upload failed, restoring preview');
        setImagePreview(imageUrl || initialPreview || '/placeholder.svg');
      }
    } catch (error) {
      console.error('Critical image handling error:', error);
      setImagePreview(imageUrl || initialPreview || '/placeholder.svg');
      setUploadError('Failed to process image file');
      
      toast({
        title: "Error",
        description: "Failed to process image file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetry = () => {
    setUploadError(null);
    // Reset file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Product Image</p>
      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-md overflow-hidden mb-4">
        <img
          src={imagePreview || '/placeholder.svg'}
          alt="Product preview"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Image load error:", imagePreview);
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </AspectRatio>
      
      {uploadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>
            {uploadError}
          </AlertDescription>
        </Alert>
      )}
      
      {uploadActive ? (
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full relative" 
            disabled={isUploading}
            onClick={() => uploadError ? handleRetry() : null}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full" />
                Uploading...
              </>
            ) : uploadError ? (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Retry Upload
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full relative" disabled>
            <Upload className="mr-2 h-4 w-4" />
            Image uploads disabled
          </Button>
        </div>
      )}
    </div>
  );
};
