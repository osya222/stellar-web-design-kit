
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, User, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-slate-50">
        <div className="container-custom py-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center mb-6 border-b pb-4">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Политика конфиденциальности и обработки персональных данных
              </h1>
            </div>

            <p className="text-gray-700 mb-6">
              Настоящая Политика конфиденциальности описывает, каким образом интернет-магазин Рыба Shop 
              (далее — «Мы», «Наш», «Нас») собирает, использует, защищает и передает информацию о пользователях 
              (далее — «Вы», «Ваш») при использовании нашего веб-сайта https://рыба.shop/ (далее — «Сайт»).
            </p>

            <div className="space-y-8">
              <section>
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">1. Сбор информации</h2>
                </div>
                <div className="text-gray-700 ml-7">
                  <p className="mb-2">Мы можем собирать следующую информацию:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Личная информация:</strong> имя, номер телефона, адрес доставки, адрес электронной почты, 
                      платёжные реквизиты и другую информацию, которую Вы предоставляете при оформлении заказа или 
                      регистрации на Сайте.
                    </li>
                    <li>
                      <strong>Техническая и аналитическая информация:</strong> IP-адрес, тип устройства, 
                      данные о Вашей активности на Сайте, история заказов и предпочтения — для анализа и улучшения сервиса.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">2. Использование информации</h2>
                </div>
                <div className="text-gray-700 ml-7">
                  <p className="mb-2">Собранная информация может использоваться для следующих целей:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Оформление и доставка заказов рыбы и морепродуктов.</li>
                    <li>Связь с Вами по вопросам, связанным с заказами, доставкой или оплатой.</li>
                    <li>Улучшение функционала Сайта и качества сервиса.</li>
                    <li>Персонализация Вашего пользовательского опыта.</li>
                    <li>Отправка уведомлений, акций и предложений (если Вы дали согласие).</li>
                    <li>Ведение статистики и маркетингового анализа для улучшения работы магазина.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">3. Передача информации третьим лицам</h2>
                </div>
                <div className="text-gray-700 ml-7">
                  <p className="mb-2">
                    Мы не передаём и не продаём Вашу личную информацию третьим лицам, за исключением следующих случаев:
                  </p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <strong>Надёжные партнёры:</strong> службы доставки, платёжные системы и технические подрядчики, 
                      которые работают от нашего имени и только в объёме, необходимом для выполнения их задач.
                    </li>
                    <li>
                      В случае законного требования от государственных органов или в рамках судебного разбирательства.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Lock className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">4. Защита информации</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Мы используем современные методы защиты информации, включая защищённые соединения (SSL) и ограничение 
                  доступа к персональным данным внутри компании, чтобы исключить возможность утечки, несанкционированного 
                  доступа или потери данных.
                </p>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">5. Ваши права</h2>
                </div>
                <div className="text-gray-700 ml-7">
                  <p className="mb-2">Вы имеете право:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Запросить доступ к Вашим личным данным.</li>
                    <li>Исправить или обновить предоставленные Вами данные.</li>
                    <li>Запросить удаление Ваших данных, если они больше не требуются.</li>
                    <li>Отказаться от рассылок и рекламных уведомлений в любой момент.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">6. Изменения в политике</h2>
                </div>
                <p className="text-gray-700 ml-7">
                  Мы оставляем за собой право обновлять настоящую Политику конфиденциальности. 
                  Все изменения будут публиковаться на этой странице с датой вступления в силу. 
                  Рекомендуем периодически проверять эту страницу на предмет актуальности.
                </p>
              </section>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-gray-700 italic">
                Спасибо, что выбрали Рыба Shop (https://рыба.shop/)!<br />
                Мы ценим ваше доверие и делаем всё возможное, чтобы ваш опыт покупок был безопасным и приятным.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Контактная информация</h2>
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
