
import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadFile } from '@/utils/fileUpload';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded: (imagePath: string) => void;
  currentImage?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImage,
  className = '',
  size = 'md'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imagePath = await uploadFile(file);
      onImageUploaded(imagePath);
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error: any) {
      console.error('Ошибка загрузки:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось загрузить изображение",
      });
    } finally {
      setIsUploading(false);
      // Сбрасываем значение input, чтобы позволить повторную загрузку того же файла
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`relative group ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div 
        onClick={handleUploadClick}
        className={`${sizeClasses[size]} opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center cursor-pointer z-10`}
      >
        <Upload className={`w-4 h-4 ${isUploading ? 'animate-pulse' : ''}`} />
      </div>
    </div>
  );
};

export default ImageUpload;
