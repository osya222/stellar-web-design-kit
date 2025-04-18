
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
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    // Reset error and loading state when product changes or refresh is triggered
    setImageError(false);
    setIsLoadingImage(true);
    
    const loadImage = async () => {
      if (!product) {
        setIsLoadingImage(false);
        return;
      }
      
      if (product.image) {
        try {
          // Add cache-busting parameter to force browser to reload the image
          const cacheBustParam = `?_cb=${refreshKey}`;
          
          // Get the resolved image URL
          const uploadedImageUrl = getUploadedImageUrl(product.image);
          console.log(`ProductCard: Processing image for ${product.name}:`, product.image, "->", uploadedImageUrl);
          
          // Set the image URL if we have one
          if (uploadedImageUrl) {
            // Append cache-busting parameter
            const finalUrl = uploadedImageUrl.includes('?') 
              ? `${uploadedImageUrl}&_cb=${refreshKey}` 
              : `${uploadedImageUrl}${cacheBustParam}`;
              
            setImageUrl(finalUrl);
          } else {
            setImageUrl('');
            setImageError(true);
          }
        } catch (error) {
          console.error("Error resolving product image:", error);
          setImageError(true);
        }
      } else {
        setImageUrl('');
      }
      
      setIsLoadingImage(false);
    };
    
    loadImage();
  }, [product, refreshKey]);

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
  
  const handleRefreshImage = () => {
    setRefreshKey(prev => prev + 1);
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
            {product.image && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="mt-2 text-xs" 
                onClick={handleRefreshImage}
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Обновить
              </Button>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="object-contain w-full h-full p-2"
              onError={handleImageError}
            />
            <Button 
              size="sm" 
              variant="ghost" 
              className="absolute bottom-1 right-1 h-6 w-6 p-1 opacity-50 hover:opacity-100" 
              onClick={handleRefreshImage}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
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
