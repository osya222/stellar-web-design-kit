import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/layout/Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger
} from "@/components/ui/sheet";
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Header = () => {
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
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
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCatalogClick = () => {
    setIsMenuOpen(false);
    
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
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 md:py-6 sticky top-0 z-50 shadow-md">
      <div className="container-custom">
        <div className="flex flex-row justify-between items-center">
          <Logo size={isMobile ? "md" : "lg"} />
          <div className="flex items-center">
            {isMobile ? (
              <div className="flex items-center">
                <Link to="/cart" className="mr-5 relative">
                  <ShoppingCart className="w-6 h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <MobileNav 
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  handleHomeClick={handleHomeClick}
                  handleCatalogClick={handleCatalogClick}
                  scrollToSection={scrollToSection}
                />
              </div>
            ) : (
              <DesktopNav 
                handleHomeClick={handleHomeClick}
                handleCatalogClick={handleCatalogClick}
                scrollToSection={scrollToSection}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
