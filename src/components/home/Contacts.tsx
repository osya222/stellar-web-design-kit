
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contacts = () => {
  return (
    <section id="contacts" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
            <p className="mb-6 text-gray-600">
              Остались вопросы? Отправьте нам сообщение, и мы ответим вам в ближайшее время.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Иван Иванов"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ivan@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ваше сообщение..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
