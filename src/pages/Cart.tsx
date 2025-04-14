import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Fish, ShellIcon, Soup, GanttChart, CreditCard, Phone } from "lucide-react";
import { formatPrice } from '@/lib/formatters';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { getProductImage } from '@/data/productImages';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
  
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const handleCheckout = () => {
    setErrorMessage(null);
    setPaymentDialogOpen(true);
  };
  
  const handleProcessPayment = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля (имя и телефон)",
        variant: "destructive"
      });
      return;
    }

    setProcessingPayment(true);
    setErrorMessage(null);
    
    const orderItems = items.map(item => 
      `${item.product.name} - ${item.quantity} шт. x ${formatPrice(item.product.price || 0)} = ${formatPrice((item.product.price || 0) * item.quantity)}`
    ).join('\n');
    
    const orderDetails = {
      customer_name: customerInfo.name,
      customer_phone: customerInfo.phone,
      customer_email: customerInfo.email || 'Не указан',
      customer_address: customerInfo.address || 'Не указан',
      customer_comment: customerInfo.comment || 'Нет комментариев',
      order_items: orderItems,
      total_price: formatPrice(getTotalPrice()),
      total_items: getTotalItems(),
      date: new Date().toLocaleString('ru-RU')
    };

    emailjs.init("H6bEEmiaCDZAYmQVO");

    emailjs.send(
      "service_3zmmybf",
      "template_3lzcrli",
      orderDetails
    )
    .then(() => {
      setProcessingPayment(false);
      setPaymentDialogOpen(false);
      
      toast({
        title: "Заказ оформлен",
        description: "Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время.",
      });
      
      clearCart();
      console.log("Заказ оформлен:", orderDetails);
    })
    .catch((error) => {
      console.error("Ошибка отправки:", error);
      setProcessingPayment(false);
      
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
    });
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Вернуться к покупкам
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
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
                      const price = item.product.price || 0;
                      const productImage = item.product.image || getProductImage(item.product);
                      
                      return (
                        <div key={item.product.id} className="flex flex-col sm:flex-row justify-between border-b pb-4">
                          <div className="flex-1">
                            <div className="flex gap-4 items-center">
                              <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-md overflow-hidden">
                                {productImage ? (
                                  <img src={productImage} alt={item.product.name} className="w-full h-full object-cover" />
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
                    })}
                  </div>
                )}
              </CardContent>
              
              {items.length > 0 && (
                <CardFooter className="flex justify-between p-6 bg-gray-50">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Очистить корзину
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>

          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-lg">Сводка заказа</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Товары ({getTotalItems()}):</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold">
                    <span>Итого:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleCheckout}
                  >
                    Оформить заказ
                  </Button>
                </CardFooter>
              </Card>
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
          
          <div className="grid gap-3 py-2">
            <div className="space-y-1">
              <h3 className="font-medium text-sm">Контактная информация</h3>
              <div className="grid gap-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Имя*</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Иван Иванов" 
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Телефон*</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="+7 (999) 999-99-99" 
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="example@mail.ru" 
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    placeholder="Москва, ул. Примерная, д. 1, кв. 1" 
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="comment">Комментарий к заказу</Label>
                  <Textarea 
                    id="comment" 
                    name="comment" 
                    placeholder="Дополнительная информация к заказу" 
                    value={customerInfo.comment}
                    onChange={handleCustomerInfoChange}
                  />
                </div>
              </div>
            </div>
            
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
            
            <Button
              onClick={handleProcessPayment}
              disabled={processingPayment}
              className="bg-green-600 hover:bg-green-700 text-sm h-8"
              size="sm"
            >
              {processingPayment ? (
                <>Обработка...</>
              ) : (
                <>
                  <CreditCard className="w-3 h-3 mr-1" />
                  Подтвердить заказ
                </>
              )}
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
                <Phone className="w-4 h-4 mr-2" />
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

const renderProductIcon = (category: string) => {
  switch (category) {
    case 'Лосось (Чили)':
    case 'Форель (Турция)':
    case 'Филе рыбы':
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
