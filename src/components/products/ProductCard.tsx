
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types/product';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateProductImage, getProductImage } from '@/utils/dataService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [productImage, setProductImage] = useState<string>(product.imageUrl || '/placeholder.svg');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Try to load image from local storage on component mount
  useEffect(() => {
    // First try to use the path directly
    setProductImage(product.imageUrl || '/placeholder.svg');
    
    // Try to get image from localStorage if it exists
    const cachedImage = getProductImage(product.id);
    if (cachedImage) {
      // Set a flag to track if the image from path failed to load
      let pathImageFailed = false;
      
      // Create an image element to test if the path image loads
      const testImg = new Image();
      testImg.onload = () => {
        // Path image loaded successfully, no need to use cached
        pathImageFailed = false;
      };
      
      testImg.onerror = () => {
        // Path image failed, use cached image
        pathImageFailed = true;
        setProductImage(cachedImage);
      };
      
      // Start loading test image
      testImg.src = product.imageUrl || '';
      
      // If path is not set or is placeholder, use cached immediately
      if (!product.imageUrl || product.imageUrl === '/placeholder.svg') {
        setProductImage(cachedImage);
      }
    }
  }, [product.id, product.imageUrl]);
  
  // Function to compress image before saving
  const compressImage = (file: File, maxWidth = 600, maxHeight = 400, quality = 0.5): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
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
          
          // Get compressed image as base64 string with lower quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
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

    if (file.size > 10 * 1024 * 1024) { // 10MB max upload size before compression
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 10MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Compress the image with lower quality and size
      const compressedDataUrl = await compressImage(file, 600, 400, 0.5);
      
      // Generate a unique filename
      const ext = 'jpg'; // We'll always save as JPG after compression
      const uniqueFilename = `product_${product.id}_${Date.now()}.${ext}`;
      const imagePath = `/images/products/${uniqueFilename}`;
      
      // Update product with new image path and show immediate feedback
      setProductImage(compressedDataUrl);
      
      // Update product with new image path
      const updatedProduct = await updateProductImage(product.id, imagePath, compressedDataUrl);
      
      if (updatedProduct) {
        toast({
          title: "Успешно",
          description: "Изображение загружено и сохранено",
        });
      } else {
        throw new Error('Не удалось обновить данные продукта');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      
      // Check if it's a localStorage quota error
      if ((error as Error).name === 'QuotaExceededError') {
        toast({
          title: "Превышен лимит хранилища",
          description: "Попробуйте уменьшить размер изображения или очистить кэш браузера",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Ошибка",
          description: (error as Error).message || 'Не удалось сохранить изображение',
          variant: "destructive"
        });
      }
      
      // Reset to original image path if error occurs
      setProductImage(product.imageUrl || '/placeholder.svg');
    } finally {
      setIsUploading(false);
      
      // Clear the file input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
            // If the image from path fails to load, try to get from localStorage
            const cachedImage = getProductImage(product.id);
            if (cachedImage && (e.target as HTMLImageElement).src !== cachedImage) {
              (e.target as HTMLImageElement).src = cachedImage;
            } else {
              // Final fallback to placeholder
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
