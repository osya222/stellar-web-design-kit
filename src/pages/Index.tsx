
import { Button } from "@/components/ui/button";
import ProductCatalog from "@/components/ProductCatalog";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { AnchorIcon, Download, ShoppingCart, Mail, Phone, MapPin } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-6 sticky top-0 z-50 shadow-md">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/9ae097fc-d5b2-4b02-a072-3d1aeb8c211f.png" 
                alt="МореПродукт логотип" 
                className="h-12 mr-3"
              />
              <h1 className="text-3xl font-bold tracking-tight">МореПродукт</h1>
            </div>
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

      {/* Hero section with improved background */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20 overflow-hidden">
        {/* Overlay with solid color to make text more readable */}
        <div className="absolute inset-0 bg-blue-50/70 z-0"></div>
        
        {/* Background image with better positioning and no opacity filter */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/0fd3ac43-ec30-425b-b149-fd187b22e947.png" 
            alt="Морепродукты фон" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8 text-blue-800">Свежие морепродукты оптом</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed bg-white/70 p-4 rounded-xl backdrop-blur-sm">
            Широкий ассортимент качественной морской продукции с доставкой по всей России.
            Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg"
              onClick={handleContactUs}
              className="bg-blue-700 hover:bg-blue-800 text-lg px-8 py-6 h-auto rounded-xl shadow-lg"
            >
              <Mail className="mr-2 h-5 w-5" />
              Связаться с нами
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleDownloadPriceList}
              className="border-blue-600 text-blue-700 hover:bg-blue-50 bg-white/90 text-lg px-8 py-6 h-auto rounded-xl shadow-md backdrop-blur-sm"
            >
              <Download className="mr-2 h-5 w-5" />
              Скачать прайс-лист
            </Button>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />
      
      {/* Product catalog section */}
      <section className="section-padding bg-white" id="catalog">
        <div className="container-custom">
          <ProductCatalog />
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100" id="about">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">О нас</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Наша компания работает напрямую с заказчиком, что существенно влияет на стоимость продукции. Нам не нужно тратить денежные средства на содержание розничного магазина и выплату заработной платы продавцам и грузчикам.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Сотрудничество с нами позволяет вам не только экономить на любимых деликатесах, но и получать продукцию в свежем виде.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Качество</h3>
                <p>Тщательный контроль на всех этапах доставки</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Надежность</h3>
                <p>10+ лет опыта работы с оптовыми поставками</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Сервис</h3>
                <p>Индивидуальный подход к каждому клиенту</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts section */}
      <section className="section-padding bg-white" id="contacts">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Контакты</h2>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Связаться с нами</h3>
                <div className="flex items-start mb-4">
                  <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Телефон:</p>
                    <p className="text-lg">+7 (000) 000-00-00</p>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Электронная почта:</p>
                    <p className="text-lg">info@moreproduct.ru</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Адрес:</p>
                    <p className="text-lg">г. Москва, ул. Примерная, 123</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Время работы</h3>
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="mb-2"><span className="font-medium">Пн-Пт:</span> 9:00 - 18:00</p>
                  <p className="mb-2"><span className="font-medium">Сб:</span> 10:00 - 15:00</p>
                  <p><span className="font-medium">Вс:</span> Выходной</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 mt-auto">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/9ae097fc-d5b2-4b02-a072-3d1aeb8c211f.png" 
                alt="МореПродукт логотип" 
                className="h-10 mr-3"
              />
              <div>
                <h3 className="text-2xl font-bold mb-4">МореПродукт</h3>
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
    </div>
  );
};

export default Index;
