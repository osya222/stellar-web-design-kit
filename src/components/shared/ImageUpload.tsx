import React, { useState, useRef } from 'react';
import { Upload, Loader2, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/routes';
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
  const [imagePath, setImagePath] = useState<string | null>(initialImage || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage ? getImageUrl(initialImage) : null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    setError(null);
    
    try {
      // Generate a unique ID for the product if not exists
      const uniqueId = productId || Date.now();
      const prefix = `product-${uniqueId}`;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', `${prefix}-${file.name}`);

      console.log(`Uploading image with filename: ${prefix}-${file.name}`);

      // Create a temporary preview for immediate feedback
      const tempPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(tempPreviewUrl);

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
      
      // Store the server path
      setImagePath(result.path);
      
      // Notify parent component with the successfully uploaded image path
      onImageUploaded(result.path);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error) {
      console.error(`Upload error:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setError(errorMessage);
      
      // Keep the preview URL even if the server upload failed
      // This allows the user to see what they uploaded
      
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
    // Revoke any object URL to prevent memory leaks
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl(null);
    setImagePath(null);
    setError(null);
    onImageUploaded('');
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Загруженное фото" 
            className="w-full h-48 object-contain bg-gray-100"
            onError={() => {
              console.error("Image failed to load:", previewUrl);
              // If the preview fails to load, try using the original path
              if (imagePath) {
                setPreviewUrl(getImageUrl(imagePath));
              }
            }}
          />
          <div className="absolute top-2 right-2">
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
          
          {error ? (
            <div className="text-center">
              <p className="text-red-500 text-sm mb-2">{error}</p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  setError(null);
                }}
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
