
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contacts = () => {
  return (
    <section id="contacts" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Наши контакты
        </h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-blue-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden">
            <div className="p-4 bg-blue-50">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-800">
                <Phone className="w-5 h-5" />
                Связаться с нами
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-700">Телефон:</p>
                  <a href="tel:+79779941427" className="text-blue-600 hover:text-blue-800 transition-colors">
                    +7 977 994 14 27
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-700">Email:</p>
                  <a href="mailto:riba@рыба.shop" className="text-blue-600 hover:text-blue-800 transition-colors">
                    riba@рыба.shop
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-blue-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden">
            <div className="p-4 bg-blue-50">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-800">
                <MapPin className="w-5 h-5" />
                Как нас найти
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Адрес:</p>
                  <p className="text-gray-600">Москва, Электродный проезд, д. 6</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Режим работы:</p>
                  <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-gray-600">Сб: 10:00 - 15:00</p>
                  <p className="text-gray-600">Вс: Выходной</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
