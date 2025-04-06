
import { Button } from "@/components/ui/button";
import ProductCatalog from "@/components/ProductCatalog";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const handleContactUs = () => {
    toast({
      title: "Спасибо за интерес!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            >
              Скачать прайс-лист
            </Button>
          </div>
        </div>
      </section>

      {/* Product catalog section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductCatalog />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">МореПродукт</h3>
              <p>Поставки морепродуктов высшего качества с 2010 года. Работаем со всеми регионами России.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p>Адрес: г. Москва, ул. Морская, 123</p>
              <p>Телефон: +7 (495) 123-45-67</p>
              <p>Email: info@moreproduct.ru</p>
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
