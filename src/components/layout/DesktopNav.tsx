
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface DesktopNavProps {
  handleHomeClick: () => void;
  handleCatalogClick: () => void;
  scrollToSection: (sectionId: string) => void;
}

const DesktopNav = ({
  handleHomeClick,
  handleCatalogClick,
  scrollToSection,
}: DesktopNavProps) => {
  const { getTotalItems } = useCart();

  return (
    <nav>
      <ul className="flex gap-8 font-medium">
        <li>
          <button 
            onClick={handleHomeClick}
            className="hover:text-blue-200 transition-colors bg-transparent border-0 p-0"
          >
            Главная
          </button>
        </li>
        <li>
          <button 
            className="hover:text-blue-200 transition-colors bg-transparent border-0"
            onClick={handleCatalogClick}
          >
            Каталог
          </button>
        </li>
        <li>
          <button 
            className="hover:text-blue-200 transition-colors bg-transparent border-0"
            onClick={() => scrollToSection("about")}
          >
            О нас
          </button>
        </li>
        <li>
          <button 
            className="hover:text-blue-200 transition-colors bg-transparent border-0"
            onClick={() => scrollToSection("delivery")}
          >
            Доставка
          </button>
        </li>
        <li>
          <button 
            className="hover:text-blue-200 transition-colors bg-transparent border-0"
            onClick={() => scrollToSection("contacts")}
          >
            Контакты
          </button>
        </li>
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
  );
};

export default DesktopNav;

