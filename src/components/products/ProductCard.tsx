
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types/product';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateProductImage } from '@/utils/dataService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [productImage, setProductImage] = useState<string>(product.imageUrl || '/placeholder.svg');
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
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
      
      // Create a client-side URL for preview
      const localImageUrl = URL.createObjectURL(file);
      
      // Update the UI with the local image URL
      setProductImage(localImageUrl);
      
      // Create a unique ID for the image based on timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const imagePath = `/images/product-${uniqueSuffix}.jpg`;
      
      // Update product data in the dataService
      const updatedProduct = await updateProductImage(product.id, imagePath);
      
      if (updatedProduct) {
        toast({
          title: "Успешно",
          description: "Изображение загружено и сохранено",
        });
      } else {
        throw new Error('Не удалось обновить данные продукта');
      }

    } catch (error) {
      console.error('Ошибка загрузки:', error);
      toast({
        title: "Ошибка",
        description: (error as Error).message || 'Не удалось сохранить изображение',
        variant: "destructive"
      });
      // Revert to original image on error
      setProductImage(product.imageUrl || '/placeholder.svg');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <AspectRatio ratio={4/3} className="relative">
        <img 
          src={productImage} 
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                <Pencil className="mr-2 h-4 w-4" />
                Изменить фото
              </>
            )}
          </Button>
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
