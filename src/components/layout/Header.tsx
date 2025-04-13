
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/layout/Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Header = () => {
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Desktop navigation
  const DesktopNav = () => (
    <nav>
      <ul className="flex gap-8 font-medium">
        <li><Link to="/" className="hover:text-blue-200 transition-colors">Главная</Link></li>
        <li><Link to="/#catalog" className="hover:text-blue-200 transition-colors">Каталог</Link></li>
        <li><Link to="/#about" className="hover:text-blue-200 transition-colors">О нас</Link></li>
        <li><Link to="/#contacts" className="hover:text-blue-200 transition-colors">Контакты</Link></li>
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
  
  // Mobile navigation using Sheet component
  const MobileNav = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <button className="text-white p-1 focus:outline-none" aria-label="Открыть меню">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[75vw] bg-blue-700 text-white border-blue-800">
        <SheetHeader>
          <SheetTitle className="text-white text-xl">Меню</SheetTitle>
          <SheetClose className="absolute right-4 top-4 text-white opacity-70 rounded-sm">
            <X className="h-5 w-5" />
            <span className="sr-only">Закрыть</span>
          </SheetClose>
        </SheetHeader>
        <div className="mt-6">
          <nav className="flex flex-col gap-6">
            <Link to="/" className="text-lg font-medium hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Главная
            </Link>
            <Link to="/#catalog" className="text-lg font-medium hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Каталог
            </Link>
            <Link to="/#about" className="text-lg font-medium hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
              О нас
            </Link>
            <Link to="/#contacts" className="text-lg font-medium hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Контакты
            </Link>
            <Link to="/cart" className="flex items-center text-lg font-medium hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Корзина
              {getTotalItems() > 0 && (
                <span className="ml-1 bg-white text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

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
                <MobileNav />
              </div>
            ) : (
              <DesktopNav />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
