
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/layout/Logo";

const Header = () => {
  const { getTotalItems } = useCart();
  
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6 sticky top-0 z-50 shadow-md">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo size="lg" />
          <nav>
            <ul className="flex gap-8 font-medium">
              <li><a href="#" className="hover:text-blue-200 transition-colors">Главная</a></li>
              <li><a href="#catalog" className="hover:text-blue-200 transition-colors">Каталог</a></li>
              <li><a href="#about" className="hover:text-blue-200 transition-colors">О нас</a></li>
              <li><a href="#contacts" className="hover:text-blue-200 transition-colors">Контакты</a></li>
              <li>
                <Link to="/cart" className="flex items-center hover:text-blue-200 transition-colors">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Корзина
                  {getTotalItems() > 0 && (
                    <span className="ml-1 bg-white text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
