
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { ShoppingCart, ImageIcon, Edit } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { getProductImage, updateProductImage } from '@/data/productImages';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.image || getProductImage(product));
  
  const handleAddToCart = () => {
    addToCart(product);
    
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleImageError = () => {
    console.log(`Image error loading: ${imageUrl}`);
    setImageError(true);
  };

  const handleImageUrlSubmit = (newUrl: string) => {
    if (!newUrl.startsWith('/lovable-uploads/') && !newUrl.startsWith('http')) {
      toast({
        title: "Ошибка",
        description: "URL изображения должен начинаться с /lovable-uploads/ или http",
        variant: "destructive"
      });
      return;
    }
    
    setImageUrl(newUrl);
    setImageError(false);
    setIsEditingImage(false);
    
    // Save the image URL to the productImages data
    updateProductImage(product.category, product.name, newUrl);
    
    toast({
      title: "Изображение обновлено",
      description: "Новое изображение товара сохранено",
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col relative">
        <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden group">
          {!imageUrl || imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="object-cover w-full h-full"
              onError={handleImageError}
            />
          )}
          <button
            onClick={() => setIsEditingImage(true)}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="w-4 h-4" />
          </button>
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

      <Dialog open={isEditingImage} onOpenChange={setIsEditingImage}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить изображение товара</DialogTitle>
            <DialogDescription>
              Введите URL нового изображения для товара
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border rounded"
              defaultValue={imageUrl}
              onChange={(e) => handleImageUrlSubmit(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditingImage(false)}>
                Отмена
              </Button>
              <Button onClick={() => handleImageUrlSubmit(imageUrl)}>
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
