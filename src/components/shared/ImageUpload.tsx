
import React, { useState, useRef } from 'react';
import { Upload, Loader2, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/supabase';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

    // Create immediate preview with a timestamp to force refresh
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    setIsUploading(true);

    try {
      // Generate a unique filename with product ID if available
      const uniqueId = productId || Date.now();
      const timestamp = Date.now();
      const safeFileName = file.name.replace(/[^\w\s.-]/g, '').toLowerCase();
      const path = `products/${uniqueId}-${timestamp}-${safeFileName}`;
      
      // Upload using the storage service (either Supabase or localStorage fallback)
      const result = await storage.upload(file, path);
      
      // Get the public URL with timestamp to prevent caching
      const publicUrl = `${storage.getPublicUrl(path)}?t=${timestamp}`;
      
      console.log("Uploaded image URL:", publicUrl);
      
      // Update preview with the final URL
      setPreviewUrl(publicUrl);
      
      // Notify parent component
      onImageUploaded(publicUrl);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });

      // Cleanup the local preview URL
      URL.revokeObjectURL(localPreviewUrl);
    } catch (error) {
      console.error(`Upload error:`, error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Не удалось загрузить изображение: ${error instanceof Error ? error.message : String(error)}`,
      });
      // Keep the preview even if upload failed
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageUploaded('');
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-contain bg-gray-100"
            onError={(e) => {
              console.error("Preview image failed to load:", previewUrl);
              e.currentTarget.src = '/placeholder.svg';
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
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={isUploading}
            ref={fileInputRef}
          />
          
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
        </div>
      )}
    </div>
  );
};
