
import React, { useRef, useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { uploadFile, getImageFromLocalStorage } from '@/utils/fileUpload';
import { useToast } from '@/hooks/use-toast';
import { getImageUrl } from '@/routes';

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
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    currentImage ? getImageUrl(currentImage) : undefined
  );

  // Загружаем изображение при монтировании или изменении currentImage
  useEffect(() => {
    if (currentImage) {
      setPreviewImage(getImageUrl(currentImage));
    } else {
      setPreviewImage(undefined);
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
      
      console.log('Начинаем загрузку файла на сервер:', file.name);
      
      // Затем загружаем файл на сервер
      const imagePath = await uploadFile(file);
      
      console.log('Загрузка успешна, путь к файлу:', imagePath);
      
      // После загрузки обновляем путь к изображению
      setPreviewImage(getImageUrl(imagePath));
      
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
      if (currentImage) {
        setPreviewImage(getImageUrl(currentImage));
      } else {
        setPreviewImage(undefined);
      }
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
    if (previewImage && previewImage.includes('/lovable-uploads/')) {
      const imagePath = previewImage.split('?')[0]; // Remove any query params
      const cachedImage = getImageFromLocalStorage(imagePath);
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
        accept="image/jpeg,image/png,image/gif,image/webp"
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
      
      {isUploading && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white rounded-md p-2 shadow-lg">
            <div className="loading-spinner h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
