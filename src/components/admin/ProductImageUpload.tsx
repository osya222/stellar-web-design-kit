import React, { useState } from 'react';
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

  const compressImage = (file: File, maxWidth = 800, maxHeight = 600, quality = 0.7): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * maxWidth / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * maxHeight / height);
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Compression failed'));
            },
            'image/jpeg',
            quality
          );
        };

        img.onerror = (error) => {
          reject(error);
        };
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
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

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 10MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);

      const compressedBlob = await compressImage(file, 800, 600, 0.7);

      const previewDataUrl = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.readAsDataURL(compressedBlob);
        r.onloadend = () => resolve(r.result as string);
        r.onerror = reject;
      });
      setImagePreview(previewDataUrl);

      const formData = new FormData();
      const filename = `product_${productId || 'new'}_${Date.now()}.jpg`;
      formData.append('image', compressedBlob, filename);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке изображения на сервер');
      }

      const result = await response.json();

      if (!result?.success || !result?.path) {
        throw new Error('Некорректный ответ сервера при загрузке изображения');
      }

      onImageChange(result.path, previewDataUrl);

      toast({
        title: "Изображение загружено",
        description: "Изображение сохранено на сервере и будет привязано к продукту",
      });

    } catch (error) {
      toast({
        title: "Ошибка",
        description: (error as Error).message || "Не удалось загрузить изображение",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Изображение продукта</p>
      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-md overflow-hidden mb-4">
        <img
          src={imagePreview}
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
