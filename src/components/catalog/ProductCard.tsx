import React, { useState, useRef, useEffect } from 'react';
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Upload, ImageIcon } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { storage } from '@/utils/supabase';
import { getUploadedImageUrl } from '@/routes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('/placeholder.svg');
  
  useEffect(() => {
    if (!product.image || imageError) {
      setImageSrc('/placeholder.svg');
      return;
    }
    
    try {
      if (product.image.startsWith('blob:')) {
        setImageSrc(product.image);
        return;
      }
      
      const resolvedUrl = getUploadedImageUrl(product.image);
      console.log(`ProductCard: Resolved image URL for ${product.name}:`, resolvedUrl);
      setImageSrc(resolvedUrl);
    } catch (error) {
      console.error(`Error resolving image URL for ${product.name}:`, error);
      setImageSrc('/placeholder.svg');
    }
  }, [product.image, imageError]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleImageError = () => {
    console.error(`Image error for ${product.name}: ${product.image}`);
    setImageError(true);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Файл слишком большой. Максимальный размер: 5MB",
      });
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);
    product.image = localPreviewUrl;
    setImageSrc(localPreviewUrl);
    setImageError(false);
    
    setIsUploading(true);

    try {
      const timestamp = Date.now();
      const safeFileName = file.name.replace(/[^\w\s.-]/g, '').toLowerCase();
      const path = `${product.id}-${timestamp}-${safeFileName}`;
      
      await storage.upload(file, path);
      const publicUrl = storage.getPublicUrl(path);
      
      setImageError(false);
      product.image = publicUrl;
      
      setImageSrc(getUploadedImageUrl(publicUrl));

      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
      
      URL.revokeObjectURL(localPreviewUrl);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Не удалось загрузить изображение: ${error instanceof Error ? error.message : String(error)}`,
      });
      setImageError(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload}
          disabled={isUploading}
          ref={fileInputRef}
        />
        
        {!imageSrc || imageSrc === '/placeholder.svg' || imageError ? (
          <div 
            className="w-full h-full flex flex-col items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className={`w-12 h-12 ${isUploading ? 'animate-bounce text-gray-600' : 'text-gray-400'} mb-2`} />
            <span className="text-sm text-gray-500">
              {isUploading ? 'Загрузка...' : 'Загрузить изображение'}
            </span>
          </div>
        ) : (
          <div className="relative w-full h-full group">
            <img 
              src={imageSrc} 
              alt={product.name} 
              className="object-contain w-full h-full p-2"
              onError={handleImageError}
              onLoad={() => console.log(`Image loaded successfully for ${product.name}: ${imageSrc}`)}
            />
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base line-clamp-2 h-12 mb-2 text-black" title={product.name}>
          {product.name}
        </h3>
        <div className="space-y-1 text-sm mb-4 flex-grow">
          {product.size && (
            <div className="flex justify-between">
              <span className="text-gray-500">Размер:</span>
              <span className="font-medium">{product.size}</span>
            </div>
          )}
          {product.packaging && (
            <div className="flex justify-between">
              <span className="text-gray-500">Упаковка:</span>
              <span className="font-medium">{product.packaging}</span>
            </div>
          )}
          {product.catchDate && (
            <div className="flex justify-between">
              <span className="text-gray-500">Вылов:</span>
              <span className="font-medium">{product.catchDate}</span>
            </div>
          )}
          {product.manufacturer && (
            <div className="flex justify-between">
              <span className="text-gray-500">Производитель:</span>
              <span className="font-medium">{product.manufacturer}</span>
            </div>
          )}
        </div>
        <div className="mt-auto">
          <ProductPrices price={product.price} />
          <div className="flex justify-end mt-4">
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-1" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
