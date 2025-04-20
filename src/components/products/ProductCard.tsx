
import React from "react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import ImageUpload from "@/components/shared/ImageUpload";
import { saveProduct } from "@/utils/dataService";

interface ProductCardProps {
  product: Product;
  category?: Category;
  onEdit?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category, onEdit }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleImageUploaded = (imagePath: string) => {
    const updatedProduct = { ...product, image: imagePath };
    saveProduct(updatedProduct);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn(`Не удалось загрузить изображение: ${product.image}`);
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-md group">
      <div className="aspect-square w-full relative bg-white p-4">
        <ImageUpload
          onImageUploaded={handleImageUploaded}
          currentImage={product.image}
          className="w-full h-full"
        />
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400">Нет изображения</span>
          </div>
        )}
        {category && (
          <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-lg">
            {category.name}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
        <h3 className="font-medium text-blue-900 mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg text-blue-900">{formatPrice(product.price)}</span>
          <div className="flex gap-2">
            {onEdit && (
              <Button onClick={onEdit} size="sm" variant="outline" className="text-xs px-2">
                Изменить
              </Button>
            )}
            <Button 
              onClick={handleAddToCart} 
              size="sm" 
              className="text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 rounded-lg"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
