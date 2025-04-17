
import React, { useState, useEffect } from 'react';
import { Upload, Loader2, X, ImageIcon } from 'lucide-react';
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
      const resolvedUrl = getUploadedImageUrl(initialImage) || initialImage;
      setImage(resolvedUrl);
    }
  }, [initialImage]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Файл слишком большой. Максимальный размер: 2MB`,
      });
      return;
    }

    console.log(`Uploading image:`, file.name, `Size: ${(file.size / 1024).toFixed(2)} KB`);
    
    setIsUploading(true);
    setUploadError('');
    
    try {
      const prefix = productId 
        ? `product-${productId}`
        : `product-new`;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', `${prefix}-${file.name}`);

      console.log("Sending upload request for image");
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: 'no-store'
      });

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
      
      const savedImagePath = result.path;
      
      // Create a blob URL for preview
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
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
        variant: "destructive",
        title: "Ошибка",
        description: `Не удалось загрузить изображение: ${errorMessage}`,
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
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 relative bg-gray-50 hover:bg-gray-100 transition-colors">
          <input 
            type="file" 
            id="image-upload"
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          
          <label 
            htmlFor="image-upload" 
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
          >
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
                <div className="mb-3">
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-500 mb-4">Нажмите для загрузки изображения</p>
                </div>
                
                <Button 
                  type="button" 
                  variant="default" 
                  size="default" 
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
                      Загрузить фото
                    </>
                  )}
                </Button>
                <p className="text-gray-400 text-xs mt-2">Макс. размер: 2MB</p>
              </div>
            )}
          </label>
        </div>
      )}
    </div>
  );
};
