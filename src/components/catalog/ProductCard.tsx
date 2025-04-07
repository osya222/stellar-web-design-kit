
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { Fish, ShellIcon, Soup, GanttChart, ShoppingCart, ImageOff, Egg, Package, Utensils } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/data/productImages';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  
  // Функция для выбора иконки в зависимости от категории товара
  const renderProductIcon = (category: string) => {
    switch (category) {
      case 'Лосось (Чили)':
      case 'Форель (Турция)':
      case 'Другие виды рыбы':
        return <Fish className="w-16 h-16 text-blue-600" />;
      case 'Креветки и морепродукты':
        return <ShellIcon className="w-16 h-16 text-pink-500" />;
      case 'Полуфабрикаты':
        return <Soup className="w-16 h-16 text-orange-500" />;
      case 'Икра':
        return <Egg className="w-16 h-16 text-red-500" />;
      case 'Консервы':
        return <Package className="w-16 h-16 text-amber-600" />;
      case 'Деликатесы':
        return <Utensils className="w-16 h-16 text-purple-500" />;
      default:
        return <GanttChart className="w-16 h-16 text-blue-300" />;
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Get appropriate image for this product
  const productImageUrl = getProductImage(product);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-blue-50 flex items-center justify-center relative overflow-hidden">
        {!imageError ? (
          <img 
            src={productImageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            {renderProductIcon(product.category)}
            <span className="text-xs text-gray-500 mt-2">
              <ImageOff className="w-4 h-4 inline mr-1" />
              Изображение недоступно
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold line-clamp-2 h-12 mb-2" title={product.name}>
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
          <ProductPrices prices={product.prices} />
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
