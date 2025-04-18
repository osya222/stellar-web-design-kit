
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contacts = () => {
  return (
    <section id="contacts" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Наши контакты
        </h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Phone className="w-5 h-5" />
                Связаться с нами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <MapPin className="w-5 h-5" />
                Как нас найти
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border-blue-100">
            <CardContent className="p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.4338680976766!2d37.72724511610031!3d55.79340049562131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b5350f8674c1d1%3A0x5e853981368b02!2z0K3Qu9C10LrRgtGA0L7QtNC90YvQuSDQv9GA0L7QtdC30LQsIDYsINCc0L7RgdC60LLQsCwg0KDQvtGB0YHQuNGPLCAxMDUwOTQ!5e0!3m2!1sru!2s!4v1650284589519!5m2!1sru!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
