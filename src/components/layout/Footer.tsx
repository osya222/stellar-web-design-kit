
import Logo from "@/components/layout/Logo";
import { Phone, Mail, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center">
            <Logo size="md" />
            <div className="ml-4">
              <p className="text-blue-100">Качественные морепродукты оптом с доставкой по всей России</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-200 hover:text-white transition-colors">Главная</Link></li>
              <li><a href="#catalog" className="text-blue-200 hover:text-white transition-colors">Каталог</a></li>
              <li><a href="#about" className="text-blue-200 hover:text-white transition-colors">О нас</a></li>
              <li><a href="#contacts" className="text-blue-200 hover:text-white transition-colors">Контакты</a></li>
              <li><Link to="/privacy-policy" className="text-blue-200 hover:text-white transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Контакты</h4>
            <p className="flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2" />
              +7 925 264-13-41
            </p>
            <p className="flex items-center mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Statiy.info@bk.ru
            </p>
            <p className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              111123, г. Москва, Электродный проезд, д. 6 стр. 1, помещ. 3/1
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-blue-700 text-center md:text-left">
          <p className="mb-1">&copy; {new Date().getFullYear()} ООО "СИТЕКС". Все права защищены.</p>
          <p className="text-sm text-blue-200">ИНН 7720939157 | Генеральный директор: Статий Владислав Николаевич</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
