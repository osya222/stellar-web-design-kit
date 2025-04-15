
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import { Phone, Mail, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-blue-800 text-white py-12 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center">
            <Logo size="md" />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4 text-blue-100">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={handleHomeClick}
                >
                  Главная
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={() => scrollToSection("catalog")}
                >
                  Каталог
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={() => scrollToSection("about")}
                >
                  О нас
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={() => scrollToSection("contacts")}
                >
                  Контакты
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 transition-colors p-2 h-auto w-full text-left justify-start"
                  asChild
                >
                  <Link to="/public-offer">
                    Публичная оферта
                  </Link>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 transition-colors p-2 h-auto w-full text-left justify-start"
                  asChild
                >
                  <Link to="/privacy-policy">
                    Политика конфиденциальности
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4 text-blue-100">Контакты</h4>
            <p className="flex items-center mb-2 text-blue-200">
              <Phone className="w-4 h-4 mr-2" />
              +7 977 994 14 27
            </p>
            <p className="flex items-center mb-2 text-blue-200">
              <Mail className="w-4 h-4 mr-2" />
              Statiy.info@bk.ru
            </p>
            <p className="flex items-center text-blue-200">
              <Building className="w-4 h-4 mr-2" />
              Москва, Электродный проезд, д. 6
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-blue-700 text-center md:text-left">
          <p className="mb-1 text-blue-200">&copy; {new Date().getFullYear()} ООО "СИТЕКС". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
