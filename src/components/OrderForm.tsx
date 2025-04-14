
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';

interface OrderFormProps {
  orderDetails: {
    items: string;
    totalPrice: string;
    totalItems: number;
  };
  onSuccess: () => void;
  onError: (error: string) => void;
}

const OrderForm = ({ orderDetails, onSuccess, onError }: OrderFormProps) => {
  // Initialize EmailJS with the correct public key
  useEffect(() => {
    emailjs.init("H6bEEmiaCDZAYmQVO");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const addressInput = form.elements.namedItem('address') as HTMLInputElement;
    const commentInput = form.elements.namedItem('comment') as HTMLTextAreaElement;
    
    const templateParams = {
      customer_name: nameInput.value,
      customer_phone: phoneInput.value,
      customer_email: emailInput.value || 'Не указан',
      customer_address: addressInput.value || 'Не указан',
      customer_comment: commentInput.value || 'Нет комментариев',
      order_items: orderDetails.items,
      total_price: orderDetails.totalPrice,
      total_items: orderDetails.totalItems,
      date: new Date().toLocaleString('ru-RU')
    };

    // Improved error handling for EmailJS
    emailjs.send(
      'service_3zmmbyf',
      'template_3lzcrli',
      templateParams
    )
    .then(() => {
      onSuccess();
      toast({
        title: "Заказ оформлен",
        description: "Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время.",
      });
    })
    .catch((error) => {
      console.error("Ошибка отправки:", error);
      onError(`Произошла ошибка при отправке заказа: ${error.text || 'Неизвестная ошибка'}. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.`);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="order-form">
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Имя*</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="Иван Иванов" 
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone">Телефон*</Label>
          <Input 
            id="phone" 
            name="phone" 
            placeholder="+7 (999) 999-99-99" 
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
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="address">Адрес доставки</Label>
          <Input 
            id="address" 
            name="address" 
            placeholder="Москва, ул. Примерная, д. 1, кв. 1" 
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="comment">Комментарий к заказу</Label>
          <Textarea 
            id="comment" 
            name="comment" 
            placeholder="Дополнительная информация к заказу" 
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Оформить заказ
      </Button>
    </form>
  );
};

export default OrderForm;
