
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { toast } from "@/hooks/use-toast";

interface HeroProps {
  onDownloadPriceList: () => void;
}

const Hero = ({ onDownloadPriceList }: HeroProps) => {
  const handleContactUs = () => {
    toast({
      title: "Спасибо за интерес!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
  };

  return (
    <section className="relative py-20 bg-white">        
      <div className="container-custom text-center">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>
        <h2 className="text-5xl font-bold mb-8 text-blue-800">Свежие морепродукты оптом</h2>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
          <p className="text-xl text-gray-800 leading-relaxed">
            Широкий ассортимент качественной морской продукции с доставкой по всей России.
            Работаем с ресторанами, магазинами и оптовыми покупателями.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-10">
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
            onClick={onDownloadPriceList}
            className="border-2 border-blue-700 text-blue-700 hover:bg-blue-50 bg-transparent text-lg px-8 py-6 h-auto rounded-xl shadow-md"
          >
            <Download className="mr-2 h-5 w-5" />
            Скачать прайс-лист
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
