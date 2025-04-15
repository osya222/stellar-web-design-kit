
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, currentImage, className = "" }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Ошибка загрузки",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // File size check (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Файл слишком большой",
        description: "Максимальный размер файла - 5МБ",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Create a temporary URL for preview
    const objectUrl = URL.createObjectURL(file);
    
    // Create an image element to check if the file loads correctly
    const img = new Image();
    img.onload = () => {
      setPreviewUrl(objectUrl);
      onImageSelect(objectUrl);
      setIsLoading(false);
      
      toast({
        title: "Изображение загружено",
        description: "Изображение успешно добавлено",
      });
    };
    
    img.onerror = () => {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      });
      URL.revokeObjectURL(objectUrl);
      setIsLoading(false);
    };
    
    img.src = objectUrl;

    // Reset the file input so the same file can be selected again if needed
    if (event.target.value) {
      event.target.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl(null);
    onImageSelect('');
    
    toast({
      title: "Изображение удалено",
      description: "Изображение успешно удалено",
    });
    
    // Reset the file input
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageError = () => {
    toast({
      title: "Ошибка изображения",
      description: "Не удалось загрузить изображение. Попробуйте другое.",
      variant: "destructive"
    });
    
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl(null);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover rounded-md"
            onError={handleImageError}
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            aria-label="Remove image"
          >
            <X className="h-5 w-5 text-red-500" />
          </button>
        </div>
      ) : (
        <Button
          onClick={handleButtonClick}
          variant="outline"
          className="w-full h-full min-h-[120px] flex flex-col items-center justify-center border-dashed border-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
              <span>Загрузка...</span>
            </div>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 mb-2 text-blue-500" />
              <span>Загрузить изображение</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
