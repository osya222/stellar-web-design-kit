
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { ShoppingCart, Edit } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Нет изображения</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-600 flex-grow">
          {product.description && (
            <p className="text-gray-500">{product.description}</p>
          )}
          
          <div className="space-y-1">
            {product.size && (
              <div className="flex justify-between">
                <span>Размер:</span>
                <span className="font-medium text-gray-800">{product.size}</span>
              </div>
            )}
            {product.weight && (
              <div className="flex justify-between">
                <span>Вес:</span>
                <span className="font-medium text-gray-800">{product.weight}</span>
              </div>
            )}
            {product.packaging && (
              <div className="flex justify-between">
                <span>Упаковка:</span>
                <span className="font-medium text-gray-800">{product.packaging}</span>
              </div>
            )}
            {product.catchDate && (
              <div className="flex justify-between">
                <span>Вылов:</span>
                <span className="font-medium text-gray-800">{product.catchDate}</span>
              </div>
            )}
            {product.manufacturer && (
              <div className="flex justify-between">
                <span>Производитель:</span>
                <span className="font-medium text-gray-800">{product.manufacturer}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Розничная цена:</span>
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="icon"
                onClick={onEdit}
                className="h-9 w-9"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button 
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
