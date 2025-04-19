
import React, { useState, useEffect } from 'react';
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {!imageSrc || imageSrc === '/placeholder.svg' || imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <div className="w-12 h-12 text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <span className="text-sm text-gray-500">Изображение недоступно</span>
          </div>
        ) : (
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="object-contain w-full h-full p-2"
            onError={handleImageError}
          />
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
