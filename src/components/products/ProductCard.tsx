
import { Product } from "@/types/product";
import { Category } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { ShoppingCart, Edit } from "lucide-react";
import { getImageUrl } from "@/routes";

interface ProductCardProps {
  product: Product;
  category?: Category;
  onEdit?: () => void;
}

const ProductCard = ({ product, category, onEdit }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <img 
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {onEdit && (
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <div className="text-sm text-purple-600 mb-2">{category?.name || ''}</div>
        
        <div className="space-y-2 mb-3 flex-grow">
          {product.description && (
            <p className="text-sm text-gray-600">{product.description}</p>
          )}
          
          <div className="text-sm text-gray-500">
            Производитель: <span className="font-medium text-gray-700">{product.manufacturer}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="font-bold text-lg text-gray-900">{formatPrice(product.price)}</div>
          <Button 
            onClick={() => addToCart(product)}
            className="bg-purple-600 hover:bg-purple-700"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
