
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { ShoppingCart, ImageIcon, RefreshCw } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { getUploadedImageUrl } from '@/routes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  
  useEffect(() => {
    setImageError(false);
    setIsLoadingImage(true);
    
    if (product?.image) {
      try {
        const resolvedUrl = getUploadedImageUrl(product.image);
        console.log(`ProductCard: Processing image for ${product.name}:`, product.image, "->", resolvedUrl);
        setImageUrl(resolvedUrl || '');
      } catch (error) {
        console.error("Error resolving product image:", error);
        setImageError(true);
      } finally {
        setIsLoadingImage(false);
      }
    } else {
      setImageUrl('');
      setIsLoadingImage(false);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleImageError = () => {
    console.error(`Image error for ${product.name}: ${imageUrl}`);
    setImageError(true);
  };

  // Retry loading the image if it failed to load
  const retryLoadingImage = () => {
    if (product?.image) {
      setImageError(false);
      setIsLoadingImage(true);
      try {
        // Force a new timestamp in URL to bypass cache
        const timestamp = Date.now();
        let url = product.image;
        if (!url.startsWith('/')) url = `/${url}`;
        
        // Add timestamp to bypass cache
        const newUrl = `${url}?t=${timestamp}`;
        console.log(`Retrying image load for ${product.name} with URL:`, newUrl);
        setImageUrl(newUrl);
      } catch (error) {
        console.error("Error retrying image load:", error);
        setImageError(true);
      } finally {
        setIsLoadingImage(false);
      }
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {isLoadingImage ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            <span className="text-sm text-gray-500 mt-2">Загрузка...</span>
          </div>
        ) : (!imageUrl || imageError) ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <span className="text-sm text-gray-500 mt-2">Нет изображения</span>
            {imageError && (
              <Button 
                variant="link" 
                size="sm" 
                className="mt-2 text-xs text-blue-500"
                onClick={retryLoadingImage}
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Обновить
              </Button>
            )}
          </div>
        ) : (
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="object-contain w-full h-full p-2"
            onError={handleImageError}
            onLoad={() => console.log(`Image loaded successfully for ${product.name}`)}
          />
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
