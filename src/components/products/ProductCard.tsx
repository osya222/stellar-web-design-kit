
import React from "react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col transition-all hover:shadow-md">
      <div className="aspect-[4/3] w-full relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Image failed to load: ${product.image}`);
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Нет изображения</span>
          </div>
        )}
        {category && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            {category.name}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          <div className="flex gap-2">
            {onEdit && (
              <Button onClick={onEdit} size="sm" variant="outline">
                Изменить
              </Button>
            )}
            <Button onClick={handleAddToCart} size="sm">В корзину</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
