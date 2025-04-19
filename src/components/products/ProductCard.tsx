
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        {product.description && (
          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mb-2">
          {product.weight && (
            <span className="text-sm text-gray-500">Вес: {product.weight}</span>
          )}
          {product.packaging && (
            <span className="text-sm text-gray-500">Упаковка: {product.packaging}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
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
  );
};

export default ProductCard;
