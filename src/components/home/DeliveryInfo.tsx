
import React from 'react';
import { Truck, Clock, CreditCard } from "lucide-react";

const DeliveryInfo = () => {
  return (
    <section className="py-20 bg-white" id="delivery">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Доставка и оплата</h2>
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
          {/* Delivery Speed Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Как быстро мы можем доставить
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Мы стараемся отвозить заказы по мере их поступления, обычно доставка происходит в день заказа. 
              Если у нас есть свободный курьер, мы привезем продукты в течении 2х часов!
            </p>
          </div>

          {/* Delivery Cost Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              <Truck className="w-6 h-6" />
              Стоимость доставки
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>• В пределах МКАД и весом заказа до 7кг - 490 рублей</li>
              <li>• Экспресс доставка - от 790 рублей (рассчитывается индивидуально в зависимости от веса заказа, дальности и способа доставки)</li>
              <li>• За МКАД - от 590 рублей (рассчитывается индивидуально в зависимости от веса заказа, дальности и способа доставки)</li>
              <li className="font-semibold text-blue-800">• Бесплатная доставка от 5000 рублей</li>
              <li>• Если ваш заказ больше 7 кг, то стоимость рассчитывается индивидуально</li>
            </ul>
          </div>

          {/* Delivery Conditions Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Условия доставки
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Доставка скоропортящихся продуктов (замороженные продукты, свежая икра) осуществляются в специальных сумках-холодильниках.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
