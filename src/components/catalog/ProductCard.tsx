
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 bg-blue-100 flex items-center justify-center">
        <div className="text-6xl text-blue-300">🐟</div>
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
          <Button size="sm">Заказать</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
