
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { formatPrice } from '@/lib/formatters';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import OrderForm from '@/components/OrderForm';
import CartItem from '@/components/cart/CartItem';
import CartHeader from '@/components/cart/CartHeader';

const Cart = () => {
  const { 
    items, 
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCart();
  
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckout = () => {
    setErrorMessage(null);
    setPaymentDialogOpen(true);
  };

  const orderItemsString = items.map(item => 
    `${item.product.name} - ${item.quantity} шт. x ${formatPrice(item.product.price || 0)} = ${formatPrice((item.product.price || 0) * item.quantity)}`
  ).join('\n');

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />

      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Вернуться на главную
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border rounded-lg shadow-sm">
              <div className="bg-blue-50 p-4 rounded-t-lg">
                <h2 className="text-lg font-semibold flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Корзина ({getTotalItems()})
                </h2>
              </div>
              
              <div className="p-6">
                {items.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
                    <Link to="/">
                      <Button>Вернуться на главную</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
              
              {items.length > 0 && (
                <div className="flex justify-between p-6 bg-gray-50 rounded-b-lg border-t">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Очистить корзину
                  </Button>
                </div>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <div className="lg:col-span-1">
              <div className="border rounded-lg shadow-sm p-6 bg-white sticky top-24 space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-4">Сводка заказа</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Товары ({getTotalItems()}):</span>
                      <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                    </div>
                    
                    <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold">
                      <span>Итого:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md w-[95%] p-4">
          <DialogHeader className="mb-2">
            <DialogTitle>Оформление заказа</DialogTitle>
            <DialogDescription>
              Общая сумма заказа: {formatPrice(getTotalPrice())}
            </DialogDescription>
          </DialogHeader>
          
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <OrderForm 
            orderDetails={{
              items: orderItemsString,
              totalPrice: formatPrice(getTotalPrice()),
              totalItems: getTotalItems()
            }}
            onSuccess={() => {
              setProcessingPayment(false);
              setPaymentDialogOpen(false);
              clearCart();
            }}
            onError={(error) => {
              setProcessingPayment(false);
              setErrorMessage(error);
            }}
          />
          
          <div className="space-y-2 pt-2">
            <h3 className="font-medium text-sm">Способ оплаты</h3>
            <div className="flex items-center p-2 border rounded-md bg-white">
              <img 
                src="/lovable-uploads/0fa26d3b-9843-48d7-afaf-e69bddbee7b5.png" 
                alt="СБП через Альфа-Банк" 
                className="h-6 mr-2"
              />
              <div>
                <div className="font-medium text-sm">Оплата СБП через Альфа-Банк</div>
                <div className="text-xs text-gray-500">Быстро и безопасно</div>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between mt-2 gap-2">
            <Button 
              variant="outline" 
              onClick={() => setPaymentDialogOpen(false)}
              size="sm"
              className="text-sm h-8"
            >
              Отмена
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <footer className="bg-blue-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">МореПродукт</h3>
              <p>Москва</p>
              <div className="flex items-center mt-3">
                <a href="tel:+79999999999" className="hover:underline">+7 (999) 999-99-99</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Время работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб: 10:00 - 15:00</p>
              <p>Вс: Выходной</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Оплата и доставка</h3>
              <p>Доставка по Москве и МО</p>
              <p>Оплата наличными или картой</p>
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

export default Cart;
