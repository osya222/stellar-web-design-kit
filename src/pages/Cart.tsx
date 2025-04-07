import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Fish, ShellIcon, Soup, GanttChart } from "lucide-react";
import { formatPrice } from '@/lib/formatters';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  const handleCheckout = () => {
    alert('Функция оформления заказа будет доступна скоро!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold">МореПродукт</h1>
            <nav>
              <ul className="flex gap-6">
                <li><Link to="/" className="hover:underline">Главная</Link></li>
                <li><Link to="/" className="hover:underline">Каталог</Link></li>
                <li><Link to="/" className="hover:underline">О нас</Link></li>
                <li><Link to="/" className="hover:underline">Контакты</Link></li>
                <li><Link to="/cart" className="hover:underline font-bold">Корзина ({getTotalItems()})</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Cart content */}
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Вернуться к покупкам
          </Link>
        </div>

        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-6 h-6 mr-2" />
              Корзина ({getTotalItems()})
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {items.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
                <Link to="/">
                  <Button>Перейти к каталогу</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  const price = item.product.prices.smallWholesale || 
                                item.product.prices.mediumWholesale || 
                                item.product.prices.largeWholesale || 0;
                  
                  return (
                    <div key={item.product.id} className="flex flex-col sm:flex-row justify-between border-b pb-4">
                      <div className="flex-1">
                        <div className="flex gap-4 items-center">
                          <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-md">
                            {renderProductIcon(item.product.category)}
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
                })}
              </div>
            )}
          </CardContent>
          
          {items.length > 0 && (
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-gray-50">
              <Button 
                variant="outline" 
                onClick={clearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Очистить корзину
              </Button>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Итого:</div>
                  <div className="text-2xl font-bold">{formatPrice(getTotalPrice())}</div>
                </div>
                <Button 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">МореПродукт</h3>
              <p>Москва</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Время работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб: 10:00 - 15:00</p>
              <p>Вс: Выходной</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-800 text-center">
            <p>&copy; 2024 МореПродукт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const renderProductIcon = (category: string) => {
  switch (category) {
    case 'Лосось (Чили)':
    case 'Форель (Турция)':
    case 'Другие виды рыбы':
      return <Fish className="w-8 h-8 text-blue-600" />;
    case 'Креветки и морепродукты':
      return <ShellIcon className="w-8 h-8 text-pink-500" />;
    case 'Полуфабрикаты':
      return <Soup className="w-8 h-8 text-orange-500" />;
    default:
      return <GanttChart className="w-8 h-8 text-blue-300" />;
  }
};

export default Cart;
