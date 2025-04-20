
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductImageUploadProps {
  productId: string | undefined;
  initialPreview: string;
  imageUrl: string;
  uploadActive?: boolean;
  onImageChange: (imagePath: string, preview: string) => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  productId,
  initialPreview,
  imageUrl,
  uploadActive = true,
  onImageChange,
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(
    imageUrl || initialPreview || '/placeholder.svg'
  );
  const uploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Функция отправки файла на сервер (/api/upload)
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Устанавливаем таймаут для запроса
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 30000); // 30 секунд таймаут
      
      uploadTimeoutRef.current = timeoutId;
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: abortController.signal,
      });
      
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
        uploadTimeoutRef.current = null;
      }
      
      const result = await response.json();

      if (response.ok && result?.path) {
        return result.path as string;
      } else {
        throw new Error(result?.error || 'Ошибка загрузки');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast({
          title: "Ошибка",
          description: "Превышено время ожидания загрузки",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Ошибка",
          description: error.message ?? "Не удалось загрузить изображение",
          variant: "destructive"
        });
      }
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Для превью: сжимаем локально чтобы отображать, но в продукт кладем только путь
      const reader = new FileReader();
      reader.onload = async (ev) => {
        setImagePreview(ev.target?.result as string || '/placeholder.svg');
      };
      reader.readAsDataURL(file);

      const imagePath = await uploadFile(file);
      if (imagePath) {
        onImageChange(imagePath, URL.createObjectURL(file));
        toast({
          title: "Готово",
          description: "Изображение загружено",
        });
      }
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при загрузке изображения",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Очистка таймаута при размонтировании компонента
  React.useEffect(() => {
    return () => {
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Изображение продукта</p>
      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-md overflow-hidden mb-4">
        <img
          src={imagePreview || '/placeholder.svg'}
          alt="Product preview"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </AspectRatio>
      {uploadActive ? (
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full relative" disabled={isUploading}>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full" />
                Загрузка...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Загрузить изображение
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full relative" disabled>
            <Upload className="mr-2 h-4 w-4" />
            Загрузка изображений отключена
          </Button>
        </div>
      )}
    </div>
  );
};
