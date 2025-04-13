
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, User } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-slate-50">
        <div className="container-custom py-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-6 border-b pb-4">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Политика конфиденциальности и обработки персональных данных
              </h1>
            </div>

            <div className="space-y-8">
              <section>
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">1. Сбор информации</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Мы собираем информацию, которую вы предоставляете при заполнении форм на нашем сайте, 
                  включая контактные данные, необходимые для обработки заказов (имя, адрес электронной почты, 
                  номер телефона, адрес доставки).
                </p>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Lock className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">2. Использование информации</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Собранная информация используется для обработки заказов, доставки продукции, 
                  информирования о статусе заказа, ответов на запросы, а также для улучшения 
                  качества обслуживания и функциональности нашего сайта.
                </p>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">3. Защита информации</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Мы принимаем соответствующие меры для защиты вашей личной информации от 
                  несанкционированного доступа, изменения, раскрытия или уничтожения. 
                  Все данные передаются с использованием защищенного соединения.
                </p>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Lock className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">4. Передача данных третьим лицам</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Мы не продаем и не передаем ваши личные данные третьим лицам, за исключением 
                  случаев, необходимых для выполнения заказа (например, службе доставки), а также 
                  в случаях, предусмотренных законодательством РФ.
                </p>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">5. Права пользователей</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Вы имеете право на доступ к своим личным данным, их исправление или удаление. 
                  Для реализации этих прав, пожалуйста, свяжитесь с нами по указанным контактным данным.
                </p>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">6. Изменения в политике конфиденциальности</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                  Актуальная версия всегда доступна на нашем сайте.
                </p>
              </section>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Контактная информация</h2>
              <p className="text-gray-700">
                Если у вас возникли вопросы относительно нашей Политики конфиденциальности, 
                пожалуйста, свяжитесь с нами:
              </p>
              <ul className="mt-2 text-gray-700">
                <li>Телефон: +7 925 264-13-41</li>
                <li>Email: Statiy.info@bk.ru</li>
                <li>Адрес: 111123, г. Москва, Электродный проезд, д. 6 стр. 1, помещ. 3/1</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
