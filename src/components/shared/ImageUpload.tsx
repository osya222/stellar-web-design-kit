
import React, { useRef, useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { uploadFile, getImageFromLocalStorage } from '@/utils/fileUpload';
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
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);

  // Загружаем изображение при монтировании
  useEffect(() => {
    if (currentImage && currentImage.startsWith('/lovable-uploads/')) {
      const cachedImage = getImageFromLocalStorage(currentImage);
      if (cachedImage) {
        setPreviewImage(cachedImage);
      } else {
        setPreviewImage(currentImage);
      }
    } else {
      setPreviewImage(currentImage);
    }
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Сначала показываем локальный предпросмотр для мгновенной обратной связи
      const localPreview = URL.createObjectURL(file);
      setPreviewImage(localPreview);
      
      // Затем загружаем файл на сервер
      const imagePath = await uploadFile(file);
      
      // После загрузки обновляем путь к изображению
      setPreviewImage(imagePath);
      
      // Сообщаем родительскому компоненту о новом пути
      onImageUploaded(imagePath);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено на сервер",
      });
    } catch (error: any) {
      console.error('Ошибка загрузки:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось загрузить изображение",
      });
      
      // Восстанавливаем исходное изображение при ошибке
      setPreviewImage(currentImage);
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn(`Не удалось загрузить изображение: ${previewImage}`);
    
    // Если изображение с путем из lovable-uploads не загрузилось, попробуем взять из localStorage
    if (previewImage && previewImage.startsWith('/lovable-uploads/')) {
      const cachedImage = getImageFromLocalStorage(previewImage);
      if (cachedImage) {
        e.currentTarget.src = cachedImage;
        return;
      }
    }
    
    e.currentTarget.src = "/placeholder.svg";
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
      
      {/* Показываем загруженное изображение или плейсхолдер */}
      {previewImage ? (
        <img
          src={previewImage}
          alt="Загруженное изображение"
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
          <span className="text-gray-400">Нет изображения</span>
        </div>
      )}
      
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
