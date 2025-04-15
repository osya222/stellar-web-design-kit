
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { ImageIcon, ShoppingCart, RefreshCw } from "lucide-react";
import { useCart } from '@/context/CartContext';
import ImageUploader from '@/components/common/ImageUploader';
import { useToast } from "@/components/ui/use-toast";
import { getProductImage, isImageUrlValid } from '@/data/productImages';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [customImage, setCustomImage] = useState<string>('');
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  
  // Generate a storage key for this product
  const getStorageKey = () => `product-image-${product.id}-${product.category}`;
  
  // Load saved image on component mount
  useEffect(() => {
    const loadSavedImage = async () => {
      setIsLoadingImage(true);
      const storageKey = getStorageKey();
      const savedImage = localStorage.getItem(storageKey);
      
      if (savedImage) {
        // Validate saved image from localStorage
        const isValid = await isImageUrlValid(savedImage);
        if (isValid) {
          setCustomImage(savedImage);
          setImageError(false);
        } else {
          // Remove invalid image from localStorage
          localStorage.removeItem(storageKey);
          setCustomImage(product.image || getProductImage(product) || '');
        }
      } else {
        setCustomImage(product.image || getProductImage(product) || '');
      }
      
      setIsLoadingImage(false);
    };
    
    loadSavedImage();
  }, [product.id, product.image, product.category]);
  
  const handleAddToCart = () => {
    const productToAdd = customImage 
      ? { ...product, image: customImage }
      : product;
    
    addToCart(productToAdd);
    
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleImageError = () => {
    console.log(`Image error loading: ${customImage}`);
    setImageError(true);
    
    // If the custom image failed to load, try to fall back to the product image
    if (customImage !== product.image && product.image) {
      setCustomImage(product.image);
    } else {
      // If we're already using the product image or it doesn't exist, try to use the category image
      const categoryImage = getProductImage(product);
      if (categoryImage) {
        setCustomImage(categoryImage);
      }
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    if (!imageUrl) {
      handleRemoveCustomImage();
      return;
    }
    
    setCustomImage(imageUrl);
    setImageError(false);
    setShowImageUploader(false);
    
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, imageUrl);
    
    toast({
      title: "Изображение обновлено",
      description: "Изображение товара успешно сохранено",
    });
  };
  
  const handleRemoveCustomImage = () => {
    const storageKey = getStorageKey();
    localStorage.removeItem(storageKey);
    
    // Revert to the original product image or category image
    setCustomImage(product.image || getProductImage(product) || '');
    setImageError(false);
    setShowImageUploader(false);
    
    toast({
      title: "Изображение удалено",
      description: "Изображение товара сброшено до исходного",
    });
  };
  
  const handleRefreshImage = () => {
    setImageError(false);
    
    // Force re-render of the image by adding a timestamp
    const timestamp = new Date().getTime();
    setCustomImage(prevImage => {
      const baseUrl = prevImage.split('?')[0]; // Remove any existing query params
      return `${baseUrl}?t=${timestamp}`;
    });
    
    toast({
      title: "Изображение обновлено",
      description: "Превью обновлено",
    });
  };

  // Determine which image to display
  const displayImage = customImage || (product.image && !imageError ? product.image : getProductImage(product));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {showImageUploader ? (
          <ImageUploader 
            onImageSelect={handleImageSelect} 
            currentImage={customImage}
            className="w-full h-full"
          />
        ) : !displayImage || imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowImageUploader(true)}
            >
              Добавить фото
            </Button>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {isLoadingImage ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : null}
            <img 
              src={displayImage} 
              alt={product.name} 
              className="object-cover w-full h-full"
              onError={handleImageError}
              onLoad={() => setIsLoadingImage(false)}
            />
            <button 
              onClick={handleRefreshImage} 
              className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
              title="Обновить превью"
            >
              <RefreshCw className="w-4 h-4 text-blue-500" />
            </button>
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
          <div className="flex justify-between items-center mt-4">
            {displayImage && !imageError ? (
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
