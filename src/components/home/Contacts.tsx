
import { Phone, Mail, MapPin, Building } from "lucide-react";

const Contacts = () => {
  return (
    <section className="section-padding bg-white" id="contacts">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Контакты</h2>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Связаться с нами</h3>
              <div className="flex items-start mb-4">
                <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <p className="text-lg">+7 977 994 14 27</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Электронная почта:</p>
                  <p className="text-lg">Statiy.info@bk.ru</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Адрес:</p>
                  <p className="text-lg">111123, г. Москва, Электродный проезд, д. 6</p>
                </div>
              </div>
              <div className="flex items-start">
                <Building className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Юридическая информация:</p>
                  <p className="text-lg">ООО "СИТЕКС"</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Время работы</h3>
              <div className="bg-white p-6 rounded-xl shadow">
                <p className="mb-2"><span className="font-medium">Пн-Пт:</span> 9:00 - 20:00</p>
                <p className="mb-2"><span className="font-medium">Сб:</span> 10:00 - 20:00</p>
                <p><span className="font-medium">Вс:</span> Выходной</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

