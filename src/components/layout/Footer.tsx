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

  const handleCatalogClick = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'products' } });
    } else {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-start space-y-4">
            <Logo size="md" />
            <p className="text-blue-200 text-sm max-w-xs">
              Качественные морепродукты для вашего стола. Свежесть и качество - наш главный приоритет.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-white/10 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={handleHomeClick}
                >
                  Главная
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-white/10 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={handleCatalogClick}
                >
                  Каталог
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-white/10 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={() => scrollToSection("about")}
                >
                  О нас
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-white/10 transition-colors p-2 h-auto w-full text-left justify-start"
                  onClick={() => scrollToSection("contacts")}
                >
                  Контакты
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-white/10 transition-colors p-2 h-auto w-full text-left justify-start"
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
                  className="text-blue-200 hover:text-white hover:bg-white/10 transition-colors p-2 h-auto w-full text-left justify-start"
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
            <h4 className="text-lg font-medium mb-4 text-white">Контакты</h4>
            <div className="space-y-4">
              <a href="tel:+79779941427" className="flex items-center group">
                <Phone className="w-4 h-4 mr-2 text-blue-300 group-hover:text-white transition-colors" />
                <span className="text-blue-200 group-hover:text-white transition-colors">+7 977 994 14 27</span>
              </a>
              <a href="mailto:riba@рыба.shop" className="flex items-center group">
                <Mail className="w-4 h-4 mr-2 text-blue-300 group-hover:text-white transition-colors" />
                <span className="text-blue-200 group-hover:text-white transition-colors">riba@рыба.shop</span>
              </a>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-blue-200">Москва, Электродный проезд, д. 6</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-blue-800/50 text-center md:text-left">
          <p className="text-blue-200 text-sm">&copy; {new Date().getFullYear()} ООО «Ситекс». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
