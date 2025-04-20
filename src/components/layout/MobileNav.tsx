
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  handleHomeClick: () => void;
  handleCatalogClick: () => void;
  scrollToSection: (sectionId: string) => void;
}

const MobileNav = ({
  isMenuOpen,
  setIsMenuOpen,
  handleHomeClick,
  handleCatalogClick,
  scrollToSection,
}: MobileNavProps) => {
  const { getTotalItems } = useCart();

  return (
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
            <button 
              className="text-lg font-medium hover:text-blue-200 transition-colors text-left bg-transparent border-0 p-0" 
              onClick={handleHomeClick}
            >
              Главная
            </button>
            <button 
              className="text-lg font-medium hover:text-blue-200 transition-colors text-left bg-transparent border-0" 
              onClick={handleCatalogClick}
            >
              Каталог
            </button>
            <button 
              className="text-lg font-medium hover:text-blue-200 transition-colors text-left bg-transparent border-0" 
              onClick={() => scrollToSection("about")}
            >
              О нас
            </button>
            <button 
              className="text-lg font-medium hover:text-blue-200 transition-colors text-left bg-transparent border-0" 
              onClick={() => scrollToSection("delivery")}
            >
              Доставка
            </button>
            <button 
              className="text-lg font-medium hover:text-blue-200 transition-colors text-left bg-transparent border-0" 
              onClick={() => scrollToSection("contacts")}
            >
              Контакты
            </button>
            <Link 
              to="/cart" 
              className="flex items-center text-lg font-medium hover:text-blue-200 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
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
};

export default MobileNav;
