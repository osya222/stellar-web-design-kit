import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';
import { renderProductIcon } from './CartUtils';
import { getImageUrl } from '@/routes';

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const price = item.product.price || 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between border-b pb-4">
      <div className="flex-1">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-md overflow-hidden">
            {item.product.image ? (
              <img src={getImageUrl(item.product.image)} alt={item.product.name} className="w-full h-full object-cover" />
            ) : (
              renderProductIcon(item.product.category)
            )}
          </div>
          <div>
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-sm text-gray-500">{item.product.category}</p>
            <p className="text-sm text-gray-500">
              {item.product.size && `Размер: ${item.product.size}`}
              {item.product.packaging && `, Упаковка: ${item.product.packaging}`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => decreaseQuantity(item.product.id)}
            className="h-8 px-2"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-3">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => increaseQuantity(item.product.id)}
            className="h-8 px-2"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="w-24 text-right">
          <div className="font-medium">{formatPrice(price)}</div>
          <div className="text-sm text-gray-500">за единицу</div>
        </div>
        
        <div className="w-24 text-right">
          <div className="font-semibold">{formatPrice(price * item.quantity)}</div>
          <div className="text-sm text-gray-500">всего</div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
