
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { Fish, ShoppingCart, ShellIcon, Shell } from "lucide-react";
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  
  // Функция для выбора иконки в зависимости от категории товара
  const renderProductIcon = () => {
    switch (product.category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
      case 'Филе рыбы':
        return <Fish className="w-16 h-16 text-gray-600" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-16 h-16 text-gray-600" />;
      case 'Мидии':
        return <Shell className="w-16 h-16 text-gray-600" />;
      default:
        return <Fish className="w-16 h-16 text-gray-600" />;
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleImageError = () => {
    console.log(`Image error loading: ${product.image}`);
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {product.image && !imageError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {renderProductIcon()}
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
          <div className="flex justify-end items-center mt-4">
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
