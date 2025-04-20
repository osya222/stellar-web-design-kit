
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types/product';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} добавлен в корзину`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <AspectRatio ratio={4/3} className="relative">
        <img 
          src={product.imageUrl || '/placeholder.svg'} 
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </AspectRatio>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.manufacturer}</p>
          {product.description && (
            <p className="text-sm text-gray-700 line-clamp-3">{product.description}</p>
          )}
          <div className="flex justify-between items-center pt-2">
            <p className="font-bold text-lg">
              {product.price === 0 ? "По запросу" : formatPrice(product.price)}
            </p>
            <span className={`px-2 py-1 rounded text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-4"
            disabled={!product.inStock || product.price === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
