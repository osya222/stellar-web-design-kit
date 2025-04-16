import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrices from './ProductPrices';
import { Product } from '@/types/product';
import { ShoppingCart, ImageIcon, Upload, AlertCircle } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { getProductImage } from '@/data/productImages';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUploadedImageUrl } from '@/routes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  useEffect(() => {
    setImageError(false);
    if (!product) return;
    
    // Check for saved image in localStorage
    const savedProductImagePath = localStorage.getItem(`productImage-${product.id}`);
    if (savedProductImagePath) {
      console.log(`Using saved image path for product ${product.id}:`, savedProductImagePath);
      
      // Try to get the actual image URL
      const actualImageUrl = getUploadedImageUrl(savedProductImagePath);
      if (actualImageUrl) {
        console.log(`Found uploaded image URL for product ${product.id}:`, actualImageUrl);
        setImageUrl(actualImageUrl);
      } else {
        console.log(`No uploaded image URL found, using saved path directly for product ${product.id}:`, savedProductImagePath);
        setImageUrl(savedProductImagePath);
      }
      return;
    }
    
    const productImage = getProductImage({ 
      category: product.category, 
      name: product.name, 
      id: product.id 
    });
    
    setImageUrl(product.image || productImage || '');
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Товар добавлен",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleImageError = () => {
    console.log(`Image error for ${product.name}: ${imageUrl}`);
    setImageError(true);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log(`Uploading image for product ${product.id}:`, file.name);
    setIsUploading(true);
    setUploadError('');
    
    try {
      // Generate a unique filename with proper sanitization
      const timestamp = Date.now();
      const safeFilename = file.name.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-');
      const filename = `product-${product.id}-${timestamp}-${safeFilename}`;
      
      // Create a new FormData object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      console.log("Sending upload request for product image");
      
      // Use the correct API endpoint with absolute path
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: 'no-store'
      });

      // Handle error responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed with status:", response.status, errorText);
        throw new Error(`Failed to upload image: ${response.statusText || 'Server error'}`);
      }

      const result = await response.json();
      console.log(`Product ${product.id} image upload response:`, result);
      
      if (!result.path) {
        throw new Error('No image path returned from server');
      }
      
      // Save the path for persistence
      const savedImagePath = result.path;
      localStorage.setItem(`productImage-${product.id}`, savedImagePath);
      
      // Display the image - try multiple sources
      let imageToDisplay = null;
      
      // First try direct image URL if available
      if (result.directImageUrl) {
        console.log(`Using direct image URL for product ${product.id}:`, result.directImageUrl);
        imageToDisplay = result.directImageUrl;
      } 
      // Then try blob URL
      else if (result.blobUrl) {
        console.log(`Using blob URL for product ${product.id}`);
        imageToDisplay = result.blobUrl;
      }
      // Then try base64 data
      else if (result.base64) {
        console.log(`Using base64 data for product ${product.id}`);
        imageToDisplay = result.base64;
      }
      // Fall back to saved path
      else {
        console.log(`Using saved image path for product ${product.id}`);
        imageToDisplay = savedImagePath;
      }
      
      console.log(`Setting image for product ${product.id} to:`, 
        typeof imageToDisplay === 'string' ? imageToDisplay.substring(0, 50) + '...' : imageToDisplay);
      
      // Update the UI with the new image
      setImageUrl(imageToDisplay);
      setImageError(false);
      
      toast({
        title: "Успешно",
        description: "Изображение загружено",
      });
    } catch (error) {
      console.error(`Upload error for product ${product.id}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setUploadError(errorMessage);
      toast({
        title: "Ошибка",
        description: `Не удалось загрузить изображение: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col relative">
      <div className="h-48 bg-white flex items-center justify-center relative overflow-hidden">
        {(!imageUrl || imageError) ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            {uploadError ? (
              <div className="mt-2 px-3 py-1 bg-red-50 text-red-600 text-xs rounded flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {uploadError}
              </div>
            ) : (
              <label className="cursor-pointer mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-white px-3 py-1.5 rounded-md shadow-sm">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <Upload className="w-4 h-4" />
                {isUploading ? 'Загрузка...' : 'Загрузить фото'}
              </label>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="object-cover w-full h-full"
              onError={handleImageError}
            />
            <label className="absolute bottom-2 right-2 cursor-pointer bg-white p-1.5 rounded-md shadow-sm opacity-80 hover:opacity-100 transition-opacity">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <Upload className="w-4 h-4 text-blue-600" />
            </label>
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
