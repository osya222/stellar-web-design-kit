
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Image, Upload, X } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, currentImage, className = "" }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Create a temporary URL for preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onImageSelect(objectUrl);

    // Reset the file input so the same file can be selected again if needed
    if (event.target.value) {
      event.target.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageSelect('');
    
    // Reset the file input
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = '';
    }
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
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
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
        >
          <Image className="h-8 w-8 mb-2 text-blue-500" />
          <span>Загрузить изображение</span>
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
