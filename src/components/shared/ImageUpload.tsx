
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Loader2, X, ImageIcon, RefreshCw } from 'lucide-react';
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
  const [isImageLoading, setIsImageLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialImage) {
      try {
        setIsImageLoading(true);
        const resolvedUrl = getUploadedImageUrl(initialImage) || initialImage;
        console.log(`ImageUpload: Got initial image: ${initialImage}, resolved to: ${resolvedUrl}`);
        setImage(resolvedUrl);
      } catch (error) {
        console.error("Error resolving initial image:", error);
        setImage(null);
      } finally {
        setIsImageLoading(false);
      }
    } else {
      setImage(null);
    }
  }, [initialImage]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Файл слишком большой. Максимальный размер: 5MB`,
      });
      return;
    }

    setIsUploading(true);
    setUploadError('');
    
    try {
      // Generate a unique ID for the product if not exists
      const uniqueId = productId || Date.now();
      const prefix = `product-${uniqueId}`;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', `${prefix}-${file.name}`);

      console.log(`Uploading image with filename: ${prefix}-${file.name}`);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to upload image: ${response.statusText || 'Server error'} ${errorData.details || ''}`);
      }

      const result = await response.json();
      
      if (!result.path) {
        throw new Error('No image path returned from server');
      }
      
      console.log("Upload successful, received path:", result.path);
      
      // Set the preview image with cache busting
      const previewUrl = getUploadedImageUrl(result.path);
      if (previewUrl) {
        setImage(previewUrl);
      }
      
      // Notify parent component with the successfully uploaded image path
      onImageUploaded(result.path);
      
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageUploaded('');
    setUploadError('');
  };

  const handleRetryLoadImage = () => {
    if (initialImage) {
      setIsImageLoading(true);
      // Force a timestamp to bust cache
      const timestamp = Date.now();
      let url = initialImage;
      if (!url.startsWith('/')) url = `/${url}`;
      const cacheBustUrl = `${url}?t=${timestamp}`;
      
      setImage(cacheBustUrl);
      setTimeout(() => setIsImageLoading(false), 500);
    }
  };

  const handleImageError = () => {
    console.error("Failed to load image:", image);
    setUploadError('Не удалось загрузить изображение');
  };

  return (
    <div className="w-full">
      {image ? (
        <div className="relative border rounded-md overflow-hidden">
          {isImageLoading ? (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              <span className="text-sm text-gray-500 mt-2">Загрузка изображения...</span>
            </div>
          ) : (
            <img 
              src={image} 
              alt="Загруженное фото" 
              className="w-full h-48 object-contain bg-gray-100"
              onError={handleImageError}
            />
          )}
          <div className="absolute top-2 right-2 flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white"
              onClick={handleRetryLoadImage}
              title="Обновить изображение"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              className="rounded-full"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 relative bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={triggerFileInput}
        >
          <input 
            type="file" 
            id="image-upload"
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={isUploading}
            ref={fileInputRef}
          />
          
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
            <div className="text-center w-full">
              <div className="mb-3">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
                <p className="text-gray-500 mb-4">Нажмите для загрузки изображения</p>
              </div>
              
              <Button 
                type="button" 
                variant="default" 
                size="default" 
                className="w-full cursor-pointer"
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
              <p className="text-gray-400 text-xs mt-2">Макс. размер: 5MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
