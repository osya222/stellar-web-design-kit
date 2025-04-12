
import Logo from "@/components/layout/Logo";

const Hero = () => {
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
      </div>
    </section>
  );
};

export default Hero;
