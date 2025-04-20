
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from '@/lib/formatters';
import type { Product } from '@/types/product';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProductImage } from '@/utils/dataService';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [productImage, setProductImage] = React.useState<string>(product.imageUrl || '/placeholder.svg');

  // При монтировании пробуем загрузить картинку из localStorage, если есть, иначе используем из продукта
  React.useEffect(() => {
    setProductImage(product.imageUrl || '/placeholder.svg');
    const cachedImage = getProductImage(product.id);
    if (cachedImage) {
      // Пробуем загрузить картинку с сервера, если не вышло — используем cached
      let pathImageFailed = false;
      const testImg = new window.Image();
      testImg.onload = () => { pathImageFailed = false; };
      testImg.onerror = () => {
        pathImageFailed = true;
        setProductImage(cachedImage);
      };
      testImg.src = product.imageUrl || '';
      if (!product.imageUrl || product.imageUrl === '/placeholder.svg') {
        setProductImage(cachedImage);
      }
    }
  }, [product.id, product.imageUrl]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <AspectRatio ratio={4/3} className="relative">
        <img 
          src={productImage} 
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            const cachedImage = getProductImage(product.id);
            if (cachedImage && (e.target as HTMLImageElement).src !== cachedImage) {
              (e.target as HTMLImageElement).src = cachedImage;
            } else {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }
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

