
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { ShoppingCart, ImageIcon, Edit2, X } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { getUploadedImageUrl } from '@/routes';
import { ImageUpload } from '../shared/ImageUpload';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setImageError(false);
    if (!product) return;
    
    if (product.image) {
      try {
        const uploadedImageUrl = getUploadedImageUrl(product.image);
        console.log(`ProductCard: Processing image for ${product.name}:`, product.image, "->", uploadedImageUrl);
        if (uploadedImageUrl) {
          setImageUrl(uploadedImageUrl);
          return;
        }
      } catch (error) {
        console.error("Error resolving product image:", error);
        setImageError(true);
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleImageUploaded = (uploadedUrl: string) => {
    console.log(`Image uploaded for product ${product.name}:`, uploadedUrl);
    
    // If empty URL is provided, it means the image was removed
    if (!uploadedUrl) {
      setImageUrl('');
      setImageError(false);
      setIsEditing(false);
      
      toast({
        title: "Изображение удалено",
        description: `Изображение для товара "${product.name}" удалено`,
      });
      return;
    }
    
    // Update with the new URL
    setImageUrl(uploadedUrl);
    setImageError(false);
    setIsEditing(false);
    
    toast({
      title: "Изображение загружено",
      description: `Изображение для товара "${product.name}" успешно обновлено`,
    });
  };

  const handleImageError = () => {
    console.error(`Image error for ${product.name}: ${imageUrl}`);
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col relative">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {isEditing ? (
          <div className="absolute inset-0 bg-white p-4 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Загрузка изображения</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ImageUpload 
              initialImage={imageUrl}
              onImageUploaded={handleImageUploaded}
              productId={product.id}
            />
          </div>
        ) : (
          <>
            {(!imageUrl || imageError) ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                <ImageIcon className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Нет изображения</span>
              </div>
            ) : (
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="object-contain w-full h-full p-2"
                onError={handleImageError}
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </>
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
