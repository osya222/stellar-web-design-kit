
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types/product';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <AspectRatio ratio={4/3}>
        <img 
          src={product.imageUrl || '/placeholder.svg'} 
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
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
