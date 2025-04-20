
import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatters';
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CartItem = ({ item }) => {
  const { 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
        {item.product.imageUrl ? (
          <img 
            src={item.product.imageUrl} 
            alt={item.product.name} 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-gray-400 text-xs text-center px-1">Нет изображения</div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {item.product.weight && `${item.product.weight} ${item.product.unit || 'кг'}`}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-gray-500"
              onClick={() => decreaseQuantity(item.product.id)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-gray-500"
              onClick={() => increaseQuantity(item.product.id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-medium">
              {formatPrice((item.product.price || 0) * item.quantity)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400"
              onClick={() => removeFromCart(item.product.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
