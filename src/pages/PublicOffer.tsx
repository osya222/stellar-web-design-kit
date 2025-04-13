
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Shield, Lock, User } from "lucide-react";

const PublicOffer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-slate-50">
        <div className="container-custom py-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-6 border-b pb-4">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                ПУБЛИЧНАЯ ОФЕРТА
              </h1>
            </div>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Общие положения</h2>
                <div className="space-y-2 ml-4">
                  <p>1.1. https://рыба.shop/ (ООО "СИТЕКС" ИНН 7720939157) далее Продавец, публикует Публичную оферту о продаже товаров (рыбы и морепродуктов) с доставкой, представленных на официальном интернет-сайте Продавца https://рыба.shop/</p>
                  <p>1.2. В соответствии со статьей 437 Гражданского Кодекса Российской Федерации (ГК РФ) данный документ является публичной офертой. В случае принятия изложенных ниже условий физическое лицо, производящее акцепт этой оферты, осуществляет оплату товара Продавца в соответствии с условиями настоящего Договора. В соответствии с пунктом 3 статьи 438 ГК РФ, оплата товара Покупателем является акцептом оферты, что считается равносильным заключению Договора на условиях, изложенных в оферте.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Термины и определения</h2>
                <div className="space-y-2 ml-4">
                  <p>2.1. Оферта — настоящий документ «Договор публичной оферты о продаже товаров с доставкой», опубликованный на сайте Продавца https://рыба.shop/</p>
                  <p>2.2. Договор Оферты — договор между Продавцом и Покупателем о продаже товаров, который заключается посредством акцепта Оферты. Договор не требует скрепления печатями и/или подписания сторонами.</p>
                  <p>2.3. Покупатель — физическое лицо, заключившее с Продавцом договор на условиях, изложенных в настоящей Оферте.</p>
                  <p>2.4. Акцепт Оферты — принятие Покупателем условий настоящей Оферты. Акцептом считается нажатие кнопки «Оплатить» на странице оформления заказа на сайте https://рыба.shop/.</p>
                  <p>2.5. Товары — рыба и морепродукты, представленные на сайте Продавца.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Предмет Оферты</h2>
                <div className="space-y-2 ml-4">
                  <p>3.1. Продавец продаёт, а Покупатель приобретает товары (рыбу и морепродукты) с доставкой на условиях, изложенных в настоящем Договоре Оферты и по ценам, указанным на сайте https://рыба.shop/.</p>
                  <p>3.2. Покупатель обязуется оплатить заказанные товары, а Продавец — обеспечить их доставку по указанному адресу.</p>
                  <p>3.3. Покупатель, размещая отзыв о товаре, соглашается на размещение имени и/или инициалов в разделе «Отзывы».</p>
                  <p>3.4. Совершая акцепт настоящей Оферты, Покупатель подтверждает, что полностью ознакомлен и согласен со всеми условиями настоящего Договора.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Сроки исполнения Договора</h2>
                <div className="space-y-2 ml-4">
                  <p>4.1. Договор вступает в силу с момента акцепта и действует до полного исполнения обязательств сторонами.</p>
                  <p>4.2. Заказ доставляется в течение срока, указанного при оформлении, в зависимости от адреса доставки. Возможна задержка до 24 часов при повышенной нагрузке или неблагоприятных условиях.</p>
                  <p>4.3. В случае предоставления Покупателем некорректной информации, Продавец не несёт ответственности за возможные задержки или невозможность доставки.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Права и обязанности сторон</h2>
                <div className="space-y-2 ml-4">
                  <p>5.1. Продавец обязуется:</p>
                  <ul className="list-disc ml-8 space-y-1">
                    <li>Организовать доставку товара в указанные сроки.</li>
                    <li>Обеспечить сохранность персональных данных Покупателя.</li>
                    <li>Обеспечить качество и свежесть продукции.</li>
                  </ul>
                  <p className="mt-2">5.2. Покупатель обязуется:</p>
                  <ul className="list-disc ml-8 space-y-1">
                    <li>Указать достоверную информацию при оформлении заказа.</li>
                    <li>Принять и оплатить заказ в согласованные сроки.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Стоимость товаров и порядок оплаты</h2>
                <div className="space-y-2 ml-4">
                  <p>6.1. Оплата осуществляется онлайн через платёжную систему на сайте или иным способом, предложенным Продавцом.</p>
                  <p>6.2. Цены на товары указаны в рублях РФ и размещены на страницах сайта с описанием продукции.</p>
                  <p>6.3. Продавец вправе изменять цены на сайте без предварительного уведомления. Цена товара после оформления заказа изменению не подлежит.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Доставка товара</h2>
                <div className="space-y-2 ml-4">
                  <p>7.1. Доставка осуществляется курьерской службой Продавца по Москве и Московской области.</p>
                  <p>7.2. Подробные условия доставки, в том числе стоимость и сроки, указаны на странице «Доставка» сайта https://рыба.shop/</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Возврат товара</h2>
                <div className="space-y-2 ml-4">
                  <p>8.1. В соответствии с п. 5 ст. 25 Закона РФ «О защите прав потребителей», скоропортящиеся продукты питания (в том числе рыба и морепродукты) возврату и обмену не подлежат.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Заключительные положения</h2>
                <div className="space-y-2 ml-4">
                  <p>9.1. Продавец оставляет за собой право изменять условия Оферты без согласия Покупателя. Актуальная редакция публикуется на сайте.</p>
                  <p>9.2. Все споры, возникающие в связи с исполнением настоящей Оферты, решаются в соответствии с законодательством Российской Федерации в судебном порядке по месту нахождения Продавца.</p>
                </div>
              </section>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="font-medium">Юридический адрес Продавца: 111123, г. Москва, Электродный проезд, д. 6 стр. 1, помещ. 3/1</p>
              </div>
            </div>
            
            {/* Adding Privacy Policy content here */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Политика конфиденциальности и обработки персональных данных
                </h1>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <p>
                  Настоящая Политика конфиденциальности описывает, каким образом интернет-магазин <strong>Рыба Shop</strong> 
                  (далее — «Мы», «Наш», «Нас») собирает, использует, защищает и передает информацию о пользователях 
                  (далее — «Вы», «Ваш») при использовании нашего веб-сайта.
                </p>
                
                <section>
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">1. Сбор информации</h2>
                  </div>
                  <p className="ml-7">
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
                  <p className="ml-7">
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
                  <p className="ml-7">
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
                  <p className="ml-7">
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
                  <p className="ml-7">
                    Вы имеете право на доступ к своим личным данным, их исправление или удаление. 
                    Для реализации этих прав, пожалуйста, свяжитесь с нами по указанным контактным данным.
                  </p>
                </section>
                
                <section>
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">6. Изменения в политике конфиденциальности</h2>
                  </div>
                  <p className="ml-7">
                    Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                    Актуальная версия всегда доступна на нашем сайте.
                  </p>
                </section>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Контактная информация</h2>
                  <p>
                    Если у вас возникли вопросы относительно нашей Политики конфиденциальности, 
                    пожалуйста, свяжитесь с нами:
                  </p>
                  <ul className="mt-2">
                    <li>Телефон: +7 925 264-13-41</li>
                    <li>Email: Statiy.info@bk.ru</li>
                    <li>Адрес: 111123, г. Москва, Электродный проезд, д. 6 стр. 1, помещ. 3/1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicOffer;
