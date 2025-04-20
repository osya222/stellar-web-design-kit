
import React from "react";
import Logo from "@/components/layout/Logo";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useNavHandlers } from './NavHandlers';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderMainProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMain: React.FC<HeaderMainProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();

  const { handleHomeClick, handleCatalogClick, scrollToSection } = useNavHandlers();

  // Wrap handlers to close menu when used
  const homeClick = () => {
    setIsMenuOpen(false);
    handleHomeClick();
  };
  const catalogClick = () => {
    setIsMenuOpen(false);
    handleCatalogClick();
  };
  const scrollSection = (id: string) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  return (
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
              handleHomeClick={homeClick}
              handleCatalogClick={catalogClick}
              scrollToSection={scrollSection}
            />
          </div>
        ) : (
          <DesktopNav
            handleHomeClick={homeClick}
            handleCatalogClick={catalogClick}
            scrollToSection={scrollSection}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderMain;
