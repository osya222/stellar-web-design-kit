
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { ImageIcon, ShoppingCart } from "lucide-react";
import { useCart } from '@/context/CartContext';
import ImageUploader from '@/components/common/ImageUploader';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [customImage, setCustomImage] = useState<string>(product.image || '');
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  const handleAddToCart = () => {
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
    setShowImageUploader(false);
    
    // Show success toast
    toast({
      title: "Изображение обновлено",
      description: "Изображение товара успешно изменено",
    });

    // Save the image URL to localStorage
    const storageKey = `product-image-${product.id}`;
    localStorage.setItem(storageKey, imageUrl);
  };

  // Load saved image from localStorage on component mount
  React.useEffect(() => {
    const storageKey = `product-image-${product.id}`;
    const savedImage = localStorage.getItem(storageKey);
    if (savedImage) {
      setCustomImage(savedImage);
      setImageError(false);
    }
  }, [product.id]);

  // Determine which image to display
  const displayImage = customImage || (product.image && !imageError ? product.image : null);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {showImageUploader || (!displayImage) ? (
          <ImageUploader 
            onImageSelect={handleImageSelect} 
            className="w-full h-full"
          />
        ) : (
          <img 
            src={displayImage} 
            alt={product.name} 
            className="object-cover w-full h-full"
            onError={handleImageError}
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
                onClick={() => setShowImageUploader(true)} 
                className="text-blue-500"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Изменить фото
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowImageUploader(true)} 
                className="text-blue-500"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Добавить фото
              </Button>
            )}
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
