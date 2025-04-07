import { Button } from "@/components/ui/button";
import ProductCatalog from "@/components/ProductCatalog";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/formatters";
import ProductShowcase from "@/components/catalog/ProductShowcase";

const Index = () => {
  const { getTotalItems } = useCart();
  
  const handleContactUs = () => {
    toast({
      title: "Спасибо за интерес!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
  };

  const handleDownloadPriceList = () => {
    let csvContent = "Наименование,Категория,Производитель,Малый опт,Средний опт,Крупный опт\n";
    
    products.forEach(product => {
      const row = [
        `"${product.name.replace(/"/g, '""')}"`,
        `"${product.category}"`,
        `"${product.manufacturer || ''}"`,
        formatPrice(product.prices.smallWholesale || 0).replace(/\s/g, ""),
        formatPrice(product.prices.mediumWholesale || 0).replace(/\s/g, ""),
        formatPrice(product.prices.largeWholesale || 0).replace(/\s/g, "")
      ];
      csvContent += row.join(",") + "\n";
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'МореПродукт-Прайс-лист.csv');
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
    
    toast({
      title: "Прайс-лист загружается",
      description: "Файл сохранен в формате CSV",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold">МореПродукт</h1>
            <nav>
              <ul className="flex gap-6">
                <li><a href="#" className="hover:underline">Главная</a></li>
                <li><a href="#" className="hover:underline">Каталог</a></li>
                <li><a href="#" className="hover:underline">О нас</a></li>
                <li><a href="#" className="hover:underline">Контакты</a></li>
                <li>
                  <Link to="/cart" className="flex items-center hover:underline">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Корзина
                    {getTotalItems() > 0 && (
                      <span className="ml-1 bg-white text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
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

      {/* Hero section */}
      <section className="bg-blue-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Свежие морепродукты оптом</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Широкий ассортимент качественной морской продукции с доставкой по всей России.
            Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              onClick={handleContactUs}
            >
              Связаться с нами
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleDownloadPriceList}
            >
              Скачать прайс-лист
            </Button>
          </div>
        </div>
      </section>

      {/* Product Showcase - NEW SECTION */}
      <ProductShowcase />
      
      {/* Product catalog section */}
      <section className="py-12" id="catalog">
        <div className="container mx-auto px-4">
          <ProductCatalog />
        </div>
      </section>

      {/* Footer - SIMPLIFIED */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">МореПродукт</h3>
              <p>Москва</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Время работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб: 10:00 - 15:00</p>
              <p>Вс: Выходной</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-800 text-center">
            <p>&copy; 2024 МореПродукт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
