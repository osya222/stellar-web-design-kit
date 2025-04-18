
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contacts = () => {
  return (
    <section id="contacts" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Наши контакты</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <p>+7 977 994 14 27</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email:</p>
                  <p>riba@рыба.shop</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Адрес:</p>
                  <p>Москва, Электродный проезд, д. 6</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Режим работы:</p>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб: 10:00 - 15:00</p>
                  <p>Вс: Выходной</p>
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

