
import React, { useState, useEffect, useRef } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setProductImage(product.imageUrl || '/placeholder.svg');
  }, [product.imageUrl]);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      setIsUploading(true);
      
      // Read the file as a base64 string
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          if (!e.target?.result) {
            throw new Error('Не удалось прочитать файл');
          }
          
          const base64String = e.target.result.toString();
          
          // Generate a unique filename
          const ext = file.name.split('.').pop() || 'jpg';
          const uniqueFilename = `product_${product.id}_${Date.now()}.${ext}`;
          const imagePath = `/images/products/${uniqueFilename}`;
          
          // Save the image in localStorage with the path
          const imageData = {
            path: imagePath,
            content: base64String
          };
          
          localStorage.setItem(`image_${imagePath}`, JSON.stringify(imageData));
          
          // Update product with new image path
          const updatedProduct = await updateProductImage(product.id, imagePath);
          
          if (updatedProduct) {
            setProductImage(imagePath);
            toast({
              title: "Успешно",
              description: "Изображение загружено и сохранено",
            });
          } else {
            throw new Error('Не удалось обновить данные продукта');
          }
        } catch (error) {
          console.error('Ошибка сохранения:', error);
          toast({
            title: "Ошибка",
            description: (error as Error).message || 'Не удалось сохранить изображение',
            variant: "destructive"
          });
          setProductImage(product.imageUrl || '/placeholder.svg');
        } finally {
          setIsUploading(false);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: "Ошибка",
          description: "Не удалось прочитать файл",
          variant: "destructive"
        });
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      toast({
        title: "Ошибка",
        description: (error as Error).message || 'Не удалось загрузить изображение',
        variant: "destructive"
      });
      setProductImage(product.imageUrl || '/placeholder.svg');
      setIsUploading(false);
    }
    
    // Clear the file input for future uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
            // Check if there's a saved image in localStorage
            try {
              const savedImageKey = `image_${productImage}`;
              const savedImage = localStorage.getItem(savedImageKey);
              
              if (savedImage) {
                const imageData = JSON.parse(savedImage);
                (e.target as HTMLImageElement).src = imageData.content;
              } else {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }
            } catch (err) {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }
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
              ref={fileInputRef}
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
