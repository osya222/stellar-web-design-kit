
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { Fish, ShoppingCart, ShellIcon, Shell, ImageIcon } from "lucide-react";
import { useCart } from '@/context/CartContext';
import ImageUploader from '@/components/common/ImageUploader';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [customImage, setCustomImage] = useState<string>('');
  
  // Функция для выбора иконки в зависимости от категории товара
  const renderProductIcon = () => {
    return (
      <img 
        src="/lovable-uploads/02eda944-c8e4-4ddc-b061-5b197c2c118a.png" 
        alt="Fish icon" 
        className="w-16 h-16 opacity-70"
      />
    );
  };

  const handleAddToCart = () => {
    // If we have a custom image, add it to the product before adding to cart
    const productToAdd = customImage 
      ? { ...product, image: customImage }
      : product;
    
    addToCart(productToAdd);
  };

  const handleImageError = () => {
    console.log(`Image error loading: ${product.image}`);
    setImageError(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    setCustomImage(imageUrl);
    setImageError(false);
  };

  // Determine which image to display
  const displayImage = customImage || (product.image && !imageError ? product.image : null);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={product.name} 
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <ImageUploader 
            onImageSelect={handleImageSelect} 
            className="w-full h-full"
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
          <div className="flex justify-between items-center mt-4">
            {displayImage ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setImageError(true)} 
                className="text-blue-500"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Изменить фото
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setImageError(true)} 
                className="text-blue-500"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Добавить фото
              </Button>
            )}
            <Button size="sm" onClick={handleAddToCart} className="ml-auto">
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
