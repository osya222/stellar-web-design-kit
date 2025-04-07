
import Logo from "@/components/layout/Logo";
import { Phone, Mail } from "lucide-react";

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
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Главная</a></li>
              <li><a href="#catalog" className="text-blue-200 hover:text-white transition-colors">Каталог</a></li>
              <li><a href="#about" className="text-blue-200 hover:text-white transition-colors">О нас</a></li>
              <li><a href="#contacts" className="text-blue-200 hover:text-white transition-colors">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4">Контакты</h4>
            <p className="flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2" />
              +7 (000) 000-00-00
            </p>
            <p className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              info@moreproduct.ru
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-blue-700 text-center">
          <p>&copy; {new Date().getFullYear()} МореПродукт. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
