
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { Fish, ShellIcon, Soup, GanttChart, ShoppingCart } from "lucide-react";
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
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
      default:
        return <GanttChart className="w-16 h-16 text-blue-300" />;
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 bg-blue-50 flex items-center justify-center">
        {renderProductIcon(product.category)}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold line-clamp-2 h-12 mb-2" title={product.name}>
          {product.name}
        </h3>
        <div className="space-y-1 text-sm mb-4">
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
        <div className="mt-4">
          <ProductPrices prices={product.prices} />
        </div>
        <div className="flex justify-end items-center mt-4">
          <Button size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-1" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
