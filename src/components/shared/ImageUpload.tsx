
import React, { useState, useEffect } from 'react';
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUploadedImageUrl } from '@/routes';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  initialImage?: string;
  onImageUploaded: (url: string) => void;
  productId?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  initialImage, 
  onImageUploaded,
  productId 
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (initialImage) {
      // Try to get the actual image URL from localStorage or other sources
      const resolvedUrl = getUploadedImageUrl(initialImage) || initialImage;
      setImage(resolvedUrl);
    }
  }, [initialImage]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log(`Uploading image:`, file.name);
    setIsUploading(true);
    setUploadError('');
    
    try {
      // Generate a unique filename with proper sanitization
      const timestamp = Date.now();
      const safeFilename = file.name.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
      const filename = productId 
        ? `product-${productId}-${timestamp}-${safeFilename}`
        : `product-new-${timestamp}-${safeFilename}`;
      
      // Create a new FormData object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      console.log("Sending upload request for image");
      
      // Use the correct API endpoint with absolute path
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: 'no-store'
      });

      // Handle error responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed with status:", response.status, errorText);
        throw new Error(`Failed to upload image: ${response.statusText || 'Server error'}`);
      }

      const result = await response.json();
      console.log(`Image upload response:`, result);
      
      if (!result.path) {
        throw new Error('No image path returned from server');
      }
      
      // Save the path for persistence
      const savedImagePath = result.path;
      
      // Display the image - try multiple sources
      let imageToDisplay = null;
      
      // First try direct image URL if available
      if (result.directImageUrl) {
        console.log(`Using direct image URL:`, result.directImageUrl);
        imageToDisplay = result.directImageUrl;
      } 
      // Then try blob URL
      else if (result.blobUrl) {
        console.log(`Using blob URL`);
        imageToDisplay = result.blobUrl;
      }
      // Then try base64 data
      else if (result.base64) {
        console.log(`Using base64 data`);
        imageToDisplay = result.base64;
      }
      // Fall back to saved path
      else {
        console.log(`Using saved image path`);
        imageToDisplay = savedImagePath;
      }
      
      console.log(`Setting image to:`, 
        typeof imageToDisplay === 'string' ? imageToDisplay.substring(0, 50) + '...' : imageToDisplay);
      
      // Update the UI with the new image
      setImage(imageToDisplay);
      
      // Call the callback with the saved image path (this is what will be stored in the product)
      onImageUploaded(savedImagePath);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error) {
      console.error(`Upload error:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setUploadError(errorMessage);
      toast({
        title: "Ошибка",
        description: `Не удалось загрузить изображение: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageUploaded('');
  };

  return (
    <div className="w-full">
      {image ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={image} 
            alt="Uploaded" 
            className="w-full h-48 object-contain bg-gray-100"
            onError={() => {
              setUploadError('Не удалось загрузить изображение');
              setImage(null);
            }}
          />
          <Button 
            type="button" 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48">
          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
          
          {uploadError ? (
            <div className="text-center">
              <p className="text-red-500 text-sm mb-2">{uploadError}</p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setUploadError('')}
              >
                Попробовать снова
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Загрузите изображение товара</p>
              <label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="cursor-pointer"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Выбрать файл
                    </>
                  )}
                </Button>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
