
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types/product';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Upload, Image, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Reset previous error state
    setUploadError(null);

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл изображения",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      
      const formData = new FormData();
      const renamedFile = new File([file], fileName, { type: file.type });
      formData.append('image', renamedFile);

      console.log('Sending upload request...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Ошибка загрузки' }));
        throw new Error(errorData.error || 'Ошибка загрузки');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });

      // Copy path to clipboard for convenience
      await navigator.clipboard.writeText(data.path);
      toast({
        title: "Путь скопирован",
        description: "Путь к изображению скопирован в буфер обмена",
      });

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError((error as Error).message || 'Не удалось загрузить изображение');
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <AspectRatio ratio={4/3} className="relative">
        <img 
          src={product.imageUrl || '/placeholder.svg'} 
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
          <Button
            variant="outline"
            className="relative bg-white hover:bg-gray-100"
            disabled={isUploading}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept="image/*"
              disabled={isUploading}
            />
            {isUploading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                Загрузка...
              </span>
            ) : (
              <>
                <Upload className="mr-2" />
                Загрузить
              </>
            )}
          </Button>
          
          {uploadError && (
            <Alert variant="destructive" className="mt-2 p-2 max-w-[90%]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-xs">Ошибка</AlertTitle>
              <AlertDescription className="text-xs">
                {uploadError}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </AspectRatio>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.manufacturer}</p>
          <div className="flex justify-between items-center pt-2">
            <p className="font-bold text-lg">
              {product.price === 0 ? "По запросу" : formatPrice(product.price)}
            </p>
            <span className={`px-2 py-1 rounded text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
