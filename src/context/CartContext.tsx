
import React, { createContext, useState, useContext } from 'react';
import { Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Если товар уже в корзине, увеличиваем количество
        toast({
          description: `Количество "${product.name}" увеличено`,
        });
        return currentItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Если товара еще нет в корзине, добавляем его
        toast({
          description: `"${product.name}" добавлен в корзину`,
        });
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          description: `"${itemToRemove.product.name}" удален из корзины`,
        });
      }
      return currentItems.filter(item => item.product.id !== productId);
    });
  };

  const increaseQuantity = (productId: number) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === productId);
      
      if (existingItem && existingItem.quantity === 1) {
        // Если остался последний экземпляр товара, удаляем его из корзины
        toast({
          description: `"${existingItem.product.name}" удален из корзины`,
        });
        return currentItems.filter(item => item.product.id !== productId);
      }
      
      // Иначе, уменьшаем количество
      return currentItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      description: "Корзина очищена",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // Берем первую доступную цену для товара (мелкооптовая, если есть)
      const price = item.product.prices.smallWholesale || 
                    item.product.prices.mediumWholesale || 
                    item.product.prices.largeWholesale || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
